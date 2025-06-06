import Dispatcher from '../dispatcher/dispatcher';
import Ajax from '../modules/ajax';
import filesStore from './filesStore';
import { actionUser } from '../actions/actionUser';

type UserData = {
    isAuth: boolean;
    username: string | undefined;
};

export class UserStore {
    userData: UserData = {
        isAuth: false,
        username: undefined,
    };
    private _callbacks: any[];

    constructor() {
        this._callbacks = [];
        Dispatcher.register(this._fromDispatch.bind(this));
    }

    registerCallback(callback: any) {
        this._callbacks.push(callback);
    }

    _refreshStore() {
        this._callbacks.forEach((callback) => {
            if (callback) {
                callback();
            }
        });
    }

    async _fromDispatch(action: { actionName: string; options: any }) {
        switch (action.actionName) {
        case 'signIn':
            await this._signIn(action.options);
            break;
        case 'getUsername':
            await this._getUsername();
            break;
        case 'signUp':
            await this._signUp(action.options);
            break;
        case 'signOut':
            await this._signOut();
            break;
        default:
            return;
        }
    }

    async _signIn(options: { username: string; password: string }) {
        const resp = await Ajax.signIn(options);
        if (!resp) {
            document.getElementById('authModal').querySelectorAll('.input-block')[0].firstElementChild.classList.add('input-block__field-incorrect');
            document.getElementById('authModal').querySelectorAll('.input-block')[1].firstElementChild.classList.add('input-block__field-incorrect');
            document.getElementById('authModal').querySelectorAll('.input-block')[0].lastElementChild.classList.remove('hide');
            document.getElementById('authModal').querySelectorAll('.input-block')[0].lastElementChild.textContent = 'Неверный логин или пароль';
        } else {
            document.getElementById('authModal').querySelectorAll('.input-block')[0].firstElementChild.classList.remove('input-block__field-incorrect');
            document.getElementById('authModal').querySelectorAll('.input-block')[0].lastElementChild.classList.add('hide');

            this.userData.isAuth = resp;
            actionUser.getUsername();
        }
    }

    async _getUsername() {
        this.userData.username = await Ajax.getUsername();
        this.userData.isAuth = !!this.userData.username;
        this._refreshStore();
    }

    async _signUp(options: { username: string; password: string }) {
        const resp = await Ajax.signUp(options);

        if (!resp) {
            document.getElementById('authModal').querySelectorAll('.input-block')[0].firstElementChild.classList.add('input-block__field-incorrect');
            document.getElementById('authModal').querySelectorAll('.input-block')[1].firstElementChild.classList.add('input-block__field-incorrect');
            document.getElementById('authModal').querySelectorAll('.input-block')[0].lastElementChild.classList.remove('hide');
            document.getElementById('authModal').querySelectorAll('.input-block')[0].lastElementChild.textContent = 'Такой пользователь уже есть';
        } else {
            document.getElementById('authModal').querySelectorAll('.input-block')[0].firstElementChild.classList.remove('input-block__field-incorrect');
            document.getElementById('authModal').querySelectorAll('.input-block')[0].lastElementChild.classList.add('hide');

            this.userData.isAuth = resp;
            actionUser.getUsername();
        }
    }

    async _signOut() {
        this.userData.isAuth = false;
        this.userData.username = undefined;
        localStorage.removeItem('jwtToken');
        filesStore.clear();
        this._refreshStore();
    }
}

export const userStore = new UserStore();
