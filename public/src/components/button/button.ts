export class Button {
    root: HTMLElement;
    callback: any;
    text: string;
    id: string;

    constructor(root: HTMLElement, callback: any, text: string, id: string) {
        this.root = root;
        this.callback = callback;
        this.text = text;
        this.id = id;

        this.root.innerHTML = this.htmlReturn();
    }

    addEventListeners(): void {
    }

    htmlReturn() {
        return `
            <button class="button" id="${ this.id }">
                <span class="button__text">${ this.text }</span>
            </button>
        `
    }
}
