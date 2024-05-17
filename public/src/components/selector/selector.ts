import { actionFiles } from '../../actions/actionFiles';
import { debounce } from '../../modules/utils';
import filesStore from '../../stores/filesStore';

const SelectorsValue = {
    TIME: 'modifiedTime',
    NAME: 'name',
    SIZE: 'quotaBytesUsed',
};

export class Selector {
    _root: HTMLElement;

    constructor(root: HTMLElement) {
        this._root = root;
    }

    addEventListeners() {
        const selector: HTMLElement = document.getElementById('ts-selector');
        selector.addEventListener('change', debounce(() => {
            actionFiles.getFiles(true);
        }, 200));

        const sort: HTMLElement = document.getElementById('ts-sort');
        sort.addEventListener('click', debounce(() => {
            sort.classList.toggle('desc');
            actionFiles.getFiles(true);
        }, 200));

        const trash: HTMLElement = document.getElementById('ts-trash');
        trash.addEventListener('click', debounce(() => {
            if (filesStore.chooseFilesId.length) {
                const arr = filesStore.chooseFilesId.map((item) => {
                    return filesStore.files[Number(item)];
                });
                actionFiles.removeFiles(arr);
            }
        }, 200));

        const download: HTMLElement = document.getElementById('ts-download');
        download.addEventListener('click', debounce(() => {
            if (filesStore.chooseFilesId.length) {
                const arr = filesStore.chooseFilesId.map((item) => {
                    return filesStore.files[Number(item)];
                });
                ([...arr]).forEach(actionFiles.downloadFiles);
            }
        }, 200));
    }

    render() {
        this._root.innerHTML = `
            <div class="selector">
                <select class="selector__field" id="ts-selector">
                    <option value="${ SelectorsValue.TIME }">По дате</option>
                    <option value="${ SelectorsValue.NAME }">По имени</option>
                    <option value="${ SelectorsValue.SIZE }">По размеру</option>
                </select>
            </div>
            <button class="select-button sort desc" id="ts-sort">
                <img src="http://localhost:8081/static/img/sort.svg" alt="sort">
            </button>
            <button class="select-button select-button_disabled" id="ts-download">
                <img src="http://localhost:8081/static/img/download.svg" alt="download">
            </button>
            <button class="select-button select-button_disabled" id="ts-trash">
                <img src="http://localhost:8081/static/img/trashm.svg" alt="trash">
            </button>
        `;

        this.addEventListeners();
    }
}
