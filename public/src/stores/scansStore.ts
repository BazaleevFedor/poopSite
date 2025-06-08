import Dispatcher from '../dispatcher/dispatcher';
import Ajax from '../modules/ajax';

type FilesData = {
    owner: string;
    mimeType: any;
    id: string;
    name: string;
    thumbnailLink?: string;
};

export class scansStore {
    scans: FilesData[];
    newScans: FilesData[];
    chooseFilesId: string[];
    private _callbacks: any[];

    constructor() {
        this._callbacks = [];
        this.scans = [];
        this.newScans = [];
        this.chooseFilesId = [];
        Dispatcher.register(this._fromDispatch.bind(this));
    }

    clear() {
        this.newScans = [];
        this.scans = [];
        this.chooseFilesId = [];
        document.getElementById('scansArea').innerHTML = '';
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
        case 'getScans':
            await this._getScans();
            break;
        case 'getViewLinkScan':
            await this._getViewLink(action.options);
            break;
        default:
            return;
        }
    }

    async _getScans() {
        this.scans = [];
        const response = await Ajax.getFiles({ pageSize: '100' });
        const files = response?.fileDtos || [];

        for (let i = 0; i < files.length; i++) {
            const link = files[i].thumbnailLink?.replace('=s220', '=s640');
            if (!link) continue;

            const request = await Ajax.getScan(link);
            if (request.is_document) {
                this.scans.push(files[i]);
            }

            if (this.scans.length === 10) this._refreshStore();
        }

        this._refreshStore();
    }

    async _getViewLink(options: any) {
        console.log(1);
        if (this.scans[options.id].mimeType.includes('application/vnd.google-apps.folder')) {
            window.location.href = `/folders?id=${this.scans[options.id].id}&owner=${this.scans[options.id].owner}`;
            return;
        }
        const googleLink = await Ajax.getViewLink({ id: this.scans[options.id].id.toString() });
        if (googleLink) {
            window.open(googleLink.url, '_blank');
        } else {
            alert('Ошибка получения ссылки просмотра файла Google.');
        }
    }
}

export default new scansStore();
