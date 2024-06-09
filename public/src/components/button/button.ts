export class Button {
    root: HTMLElement;
    callback: any;
    text: string;

    constructor(root: HTMLElement, callback: any, text: string) {
        this.root = root;
        this.callback = callback;
        this.text = text;
    }

    addEventListeners() {
        const button = this.root.querySelector('[data-tag="button"]');
        button.addEventListener('click', this.callback);
    }

    changeButtonText(newText: string) {
        const button = this.root.querySelector('[data-tag="button"]');
        if (button) button.innerHTML = `<span class="button__text">${ newText }</span>`;
    }

    render() {
        this.root.innerHTML = `
            <button class="button" data-tag="button">
                <span class="button__text">${ this.text }</span>
            </button>
        `;

        this.addEventListeners();
    }
}
