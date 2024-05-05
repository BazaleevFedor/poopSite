import Dispatcher from '../dispatcher/dispatcher';
import Ajax from '../modules/ajax';

type UserData = {
    isAuth: boolean;
    login: string;
    googleTokens: string[];
};

class UserStore {
    userData: UserData = {
        isAuth: false,
        login: '',
        googleTokens: []
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
        alert('_fromDispatch');
        switch (action.actionName) {
        case 'signIn':
            await this._signIn(action.options);
            break;
        default:
            return;
        }
    }

    async _signIn(options: { username: string; password: string }) {
        this.userData.isAuth = await Ajax.signIn(options);
        this._refreshStore();
    }
}

export const userStore = new UserStore();
