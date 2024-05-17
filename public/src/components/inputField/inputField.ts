import { actionFiles } from '../../actions/actionFiles';
import { debounce } from '../../modules/utils';

export class InputField {
    private _root: HTMLElement;
    private _placeholder: string;
    private _type: string;
    private isSearch: boolean;

    constructor(root: HTMLElement, placeholder: string, type: string, isSearch = false) {
        this._root = root;
        this._placeholder = placeholder;
        this._type = type;
        this.isSearch = isSearch;
    }

    setError(isError: string) {
        const inputField = this._root.querySelector('[data-tag="input"]');
        inputField.classList.toggle('input-block__field-incorrect', isError !== '');

        const errorField = this._root.querySelector('[data-tag="error"]');
        errorField.classList.toggle('hide', isError === '');
        errorField.textContent = isError;
    }

    getValue() {
        const inputField: HTMLInputElement = this._root.querySelector('[data-tag="input"]');
        return inputField.value;
    }

    render() {
        this._root.innerHTML = `
            <div class="input-block">
                <input class="input-block__field" ${this.isSearch ? 'id="ts-search"' : ''} data-tag="input" placeholder="${ this._placeholder }" type="${ this._type }">
                <div class="input-block__error hide" data-tag="error"></div>
            </div>
        `;

        if (this.isSearch) this._root.oninput = debounce(() => {
            actionFiles.getFiles(true);
        }, 800);
    }
}
