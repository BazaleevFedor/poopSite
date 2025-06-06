import Dispatcher from '../dispatcher/dispatcher';
import Ajax from '../modules/ajax';
import {actionFiles} from '../actions/actionFiles';

type FilesData = {
    owner: string;
    mimeType: any;
    id: string;
    name: string;
};

export class filesStore {
    files: FilesData[];
    scans: FilesData[];
    newFiles: FilesData[];
    chooseFilesId: string[];
    private _callbacks: any[];
    private nextPageToken: string;
    private nextOwnerIndex: string;

    constructor() {
        this._callbacks = [];
        this.files = [];
        this.scans = [];
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
        document.getElementById('cardArea').innerHTML = '';
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
        case 'getScans':
            await this._getScans();
            break;
        case 'getViewLink':
            await this._getViewLink(action.options);
            break;
        case 'uploadsFiles':
            await this._uploadsFiles(action.options);
            break;
        case 'removeFiles':
            await this._removeFiles(action.options);
            break;
        case 'downloadFiles':
            await this._downloadFiles(action.options);
            break;
        case 'getLink':
            await this._getLink(action.options);
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
        const urlParams = new URLSearchParams(window.location.search);

        options = {
            ...options,
            pageSize: '40',
            nextPageToken: this.nextPageToken,
            owner: this.nextOwnerIndex,
            parentFolder: urlParams.get('id') || undefined,
            searchQuery: search.value,
        };
        if (selector.value) options.sortOrder = sort ? selector.value + ' desc' : selector.value;

        const request = options.parentFolder ? await Ajax.getFolder(options) : await Ajax.getFiles(options);

        if (options.isNewPage) this.files = [];
        this.newFiles = request?.fileDtos || [];
        this.nextPageToken = request?.nextPageToken;
        this.nextOwnerIndex = request?.nextOwnerIndex;

        if (!request) alert('Добавьте гугл аккаунт');

        this._refreshStore();
        if (this.files.length + this.newFiles.length < 40 && (this.nextPageToken || this.nextOwnerIndex)) {
            actionFiles.getFiles(false);
            return;
        }
    }

    async _getScans() {
        const options = {
            pageSize: '40',
            nextPageToken: this.nextPageToken,
            owner: this.nextOwnerIndex,
            parentFolder: '',
            searchQuery: '',
            isNewPage: '',
            sortOrder: '',
            nextOwnerIndex: '',
        };
        const request = await Ajax.getFiles(options);

        this.scans = request?.fileDtos || [];

        if (!request) alert('Добавьте гугл аккаунт');

        this._refreshStore();
    }

    async _getViewLink(options: any) {
        if (this.files[options.id].mimeType.includes('application/vnd.google-apps.folder')) {
            window.location.href = `/folders?id=${this.files[options.id].id}&owner=${this.files[options.id].owner}`;
            return;
        }
        const googleLink = await Ajax.getViewLink({ id: this.files[options.id].id.toString() });
        if (googleLink) {
            window.open(googleLink.url, '_blank');
        } else {
            alert('Ошибка получения ссылки просмотра файла Google.');
        }
    }

    async _getLink(options: any) {
        const googleLink = await Ajax.getLink({ id: this.files[options.id].id, owner: this.files[options.id].owner });
        if (googleLink.url) {
            navigator.clipboard.writeText(googleLink.url).then(() => {
                document.getElementById('copyAccess').textContent = 'Ссылка скопирована';
                document.getElementById('copyAccess').classList.add('show');
                document.getElementById('copyAccess').classList.remove('hide');
                setTimeout(() => {
                    document.getElementById('copyAccess').classList.remove('show');
                }, 2000);
            });
        } else {
            document.getElementById('copyAccess').textContent = 'Не удалось скопировать';
            document.getElementById('copyAccess').classList.add('show');
            document.getElementById('copyAccess').classList.remove('hide');
            setTimeout(() => {
                document.getElementById('copyAccess').classList.remove('show');
            }, 2000);
        }
    }

    async _uploadsFiles(options: any) {
        const urlParams = new URLSearchParams(window.location.search);
        const response = await Ajax.uploadsFiles(options, urlParams.get('owner') || undefined, urlParams.get('id') || undefined);

        const dropArea = document.getElementById('dropFiles');
        if (response) {
            dropArea.classList.add('drop-files_active');
        } else {
            dropArea.classList.add('drop-files_error');
        }

        const dropFilesWrapper = document.getElementById('dropFilesWrapper');
        setTimeout(() => {
            dropFilesWrapper.classList.add('hide');
            dropArea.classList.remove('drop-files_error');
            dropArea.classList.remove('drop-files_active');
            actionFiles.getFiles(true);
        }, 2000);
    }

    private async _removeFiles(options: any) {
        const response = await Ajax.removeFiles(options);

        if (response) {
            actionFiles.getFiles(true);
        } else {
            alert('не получилось удалить');
        }
    }

    private async _downloadFiles(options: any) {
        const response = await Ajax.downloadFiles(options);

        if (response) {
        } else {
            alert('не получилось скачать');
        }
    }
}

export default new filesStore();
