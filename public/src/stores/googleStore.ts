import Dispatcher from '../dispatcher/dispatcher';
import Ajax from '../modules/ajax';

class GoogleStore {
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
        const googleLink = await Ajax.getGoogleLink();
        if (googleLink) window.location.href = googleLink;
        else alert('ошибка получения ссылки на авторизацию гугла');
    }

    async _sendGoogleToken(options: { code: string }) {
        await Ajax.sendGoogleToken(options);

        /* if (!await Ajax.sendGoogleToken(options)) {
            alert('ошибка добавления токена');
        } */
    }
}

export const googleStore = new GoogleStore();
