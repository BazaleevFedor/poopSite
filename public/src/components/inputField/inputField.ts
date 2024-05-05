export class InputField {
    private _root: HTMLElement;
    private _id: string;
    private _placeholder: string;

    constructor(root: HTMLElement, placeholder: string) {
        this._root = root;
        this._id = crypto.randomUUID();
        this._placeholder = placeholder;
    }

    setError(isError: string) {
        const inputField = document.getElementById(this._id);
        inputField.classList.toggle('input-block__field-correct', isError === '');
        inputField.classList.toggle('input-block__field-incorrect', isError !== '');

        const errorField = document.getElementById(`error-${this._id}`);
        errorField.classList.toggle('hide', isError === '');
        errorField.innerText = isError;
    }

    render() {
        this._root.innerHTML = `
            <div class="input-block">
                <input class="input-block__field input-block__field-correct" id="${ this._id }" placeholder="${ this._placeholder }">
                <div class="input-block__error hide" id="error-${ this._id }"></div>
            </div>
        `;
    }
}
