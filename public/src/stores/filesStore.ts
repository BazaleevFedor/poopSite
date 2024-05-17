import Dispatcher from '../dispatcher/dispatcher';
import Ajax from '../modules/ajax';

type FilesData = {
    mimeType: any;
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
        this.nextPageToken = undefined;
        this.nextOwnerIndex = undefined;
        Dispatcher.register(this._fromDispatch.bind(this));
    }

    clear() {
        this.files = [];
        this.newFiles = [];
        this.chooseFilesId = [];
        this.nextPageToken = undefined;
        this.nextOwnerIndex = undefined;
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
        case 'getViewLink':
            await this._getViewLink(action.options);
            break;
        case 'uploadsFiles':
            await this._uploadsFiles(action.options);
            break;
        default:
            return;
        }
    }

    async _getFiles(options: any) {
        if (options.isNewPage) {
            this.clear();
        } else if (this.nextPageToken === null && this.nextOwnerIndex === null) {
            return;
        }

        const selector: HTMLSelectElement = document.getElementById('ts-selector') as HTMLSelectElement;
        const sort: boolean = document.getElementById('ts-sort').classList.contains('desc');
        const search = document.getElementById('ts-search') as HTMLInputElement;

        options = {
            ...options,
            pageSize: '40',
            nextPageToken: this.nextPageToken,
            owner: this.nextOwnerIndex,
            parentFolder: window.location.pathname.includes('folder') ? window.location.pathname.split('/').at(-1) : undefined,
            searchQuery: search.value,
        };
        if (selector.value) options.sortOrder = sort ? selector.value + ' desc' : selector.value;

        const request = await Ajax.getFiles(options);

        if (options.isNewPage) this.files = [];
        this.newFiles = request?.fileDtos || [];
        this.nextPageToken = request?.nextPageToken;
        this.nextOwnerIndex = request?.nextOwnerIndex;

        this._refreshStore();
    }

    async _getViewLink(options: any) {
        console.log(options);
        console.log(this.files[options.id]);
        if (this.files[options.id].mimeType.includes('application/vnd.google-apps.folder')) {
            window.location.href = `/folders/${this.files[options.id].id}`;
            return;
        }
        const googleLink = await Ajax.getViewLink({ id: this.files[options.id].id.toString() });
        if (googleLink) {
            window.open(googleLink.url, '_blank');
        } else {
            alert('Ошибка получения ссылки просмотра файла Google.');
        }
    }

    async _uploadsFiles(options: any) {
        const response = await Ajax.uploadsFiles(options);

        const dropArea = document.getElementById('dropFiles');
        if (response) {
            dropArea.classList.add('drop-files_active');
            console.log('File uploaded successfully');
        } else {
            dropArea.classList.add('drop-files_error');
            console.log('File upload failed');
        }
    }
}

export default new filesStore();
