import Dispatcher from '../dispatcher/dispatcher';
import Ajax from '../modules/ajax';

type FilesData = {
    id: number;
    name: string;
};

class filesStore {
    files: FilesData[];
    newFiles: FilesData[];
    chooseFilesId: string[];
    private _callbacks: any[];
    private nextPageToken: string;
    private nextOwnerIndex: string;

    constructor() {
        this._callbacks = [];
        this.files = [];
        this.newFiles = [];
        this.chooseFilesId = [];
        Dispatcher.register(this._fromDispatch.bind(this));
    }

    signOut() {
        this.files = [];
        this.newFiles = [];
        this.chooseFilesId = [];
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

    async _fromDispatch(action: { actionName: string; func: any; alg: any; options: any }) {
        switch (action.actionName) {
        case 'getFiles':
            await this._getFiles(action.options);
            break;
        default:
            return;
        }
    }

    async _getFiles(options: any) {
        options.pageSize = '40';
        options.nextPageToken = this.nextPageToken;
        options.nextOwnerIndex = this.nextOwnerIndex;
        const request = await Ajax.getFiles(options);

        if (options.isNewPage) this.files = [];
        this.newFiles = request?.fileDtos || [];
        this.nextPageToken = request?.nextPageToken;
        this.nextOwnerIndex = request?.nextOwnerIndex;

        this._refreshStore();
    }
}

export default new filesStore();
