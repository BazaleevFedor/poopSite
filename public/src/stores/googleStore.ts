import Dispatcher from '../dispatcher/dispatcher';
import Ajax from '../modules/ajax';

class GoogleStore {
    private googleLink: string;
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
        case 'getGoogleLink':
            await this._getGoogleLink();
            break;
        case 'sendGoogleToken':
            await this._sendGoogleToken(action.options);
            break;
        default:
            return;
        }
    }

    async _getGoogleLink() {
        this.googleLink = await Ajax.getGoogleLink();
        window.location.href = this.googleLink;
        // this._refreshStore();
    }

    async _sendGoogleToken(options: { code: string }) {
        if (!await Ajax.sendGoogleToken(options)) {
            alert('ошибка добавления токена');
        }
    }
}

export const googleStore = new GoogleStore();
