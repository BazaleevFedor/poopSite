import Dispatcher from '../dispatcher/dispatcher';
import Ajax from '../modules/ajax';

type FilesData = {
    id?: number;
    name?: string;
};

class filesStore {
    files: FilesData[];
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

    async _fromDispatch(action: { actionName: string; func: any; alg: any; options: any; }) {
        switch (action.actionName) {
        case 'getFiles':
            await this._getFiles(action.options);
            break;
        default:
            return;
        }
    }

    async _getFiles(options: any) {
        const request = await Ajax.getFiles();

        console.log(request);
        this.files = request;
        this._refreshStore();
    }
}

export default new filesStore();
