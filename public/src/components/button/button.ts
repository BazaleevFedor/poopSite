export class Button {
    _root: HTMLElement;
    callback: any;
    text: string;

    constructor(root: HTMLElement, callback: any, text: string) {
        this._root = root;
        this.callback = callback;
        this.text = text;
    }

    addEventListeners() {
        const button = this._root.querySelector('[data-tag="button"]');
        button.addEventListener('click', this.callback);
    }

    render() {
        this._root.innerHTML = `
            <button class="button" data-tag="button">
                <span class="button__text">${ this.text }</span>
            </button>
        `;

        this.addEventListeners();
    }
}
