import Dispatcher from '../dispatcher/dispatcher';
import Ajax from '../modules/ajax';

type UserData = {
    isAuth: boolean;
    username: string | undefined;
    googleTokens: string[];
};

class UserStore {
    userData: UserData = {
        isAuth: false,
        username: undefined,
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
        this.userData.isAuth = await Ajax.signIn(options);
        this._refreshStore();
    }

    async _getUsername() {
        this.userData.username = await Ajax.getUsername();
        this.userData.isAuth = !!this.userData.username;

        this._refreshStore();
    }

    async _signUp(options: { username: string; password: string }) {
        this.userData.isAuth = await Ajax.signUp(options);
        this._refreshStore();
    }

    async _signOut() {
        this.userData.isAuth = false;
        this._refreshStore();
    }
}

export const userStore = new UserStore();
