import cardHTML from "./card.html";

export class Card {
    private _view: Element;
    private _cardData: any;

    constructor(root: HTMLElement, cardData: any) {
        root.innerHTML += cardHTML;
        this._view = root.lastElementChild;
        this._cardData = cardData;
        this._render();
    }

    private _render() {
        this._view.setAttribute('id', this._cardData.id);
        this._view.querySelector('[data-tag="name"]').innerHTML = this._cardData.name;
        this._view.querySelector('[data-tag="date"]').innerHTML = this._cardData.date;
        this._view.addEventListener('click', () => {
            this._view.classList.toggle('background-color-btn');
            alert(1);
            // ToDo: не срабатывает для всех кроме последнего
        });
    }
}
