import { actionFiles } from '../../actions/actionFiles';
import { debounce } from '../../modules/utils';

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
            <button class="select-button desc" id="ts-sort">
                <img src="static/img/sort.svg" alt="sort">
            </button>
            <button class="select-button select-button_disabled" id="ts-download">
                <img src="static/img/download.svg" alt="download">
            </button>
            <button class="select-button select-button_disabled" id="ts-trash">
                <img src="static/img/trashm.svg" alt="trash">
            </button>
        `;

        this.addEventListeners();
    }
}
