export class InputField {
    private _root: HTMLElement;
    private _placeholder: string;
    private _type: string;

    constructor(root: HTMLElement, placeholder: string, type: string) {
        this._root = root;
        this._placeholder = placeholder;
        this._type = type;
    }

    setError(isError: string) {
        const inputField = this._root.querySelector('[data-tag="input"]');
        inputField.classList.toggle('input-block__field-correct', isError === '');
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
                <input class="input-block__field input-block__field-correct" data-tag="input" placeholder="${ this._placeholder }" type="${ this._type }">
                <div class="input-block__error hide" data-tag="error"></div>
            </div>
        `;
    }
}
