import cardHTML from './card.html';

export class Card {
    private _view: Element;
    private _cardData: any;
    private _id: number;
    private _className: string;

    constructor(root: HTMLElement, cardData: any, id: number, className?: string) {
        root.innerHTML += cardHTML;
        this._view = root.lastElementChild;
        this._cardData = cardData;
        this._id = id;
        this._className = className;

        this._render();
    }

    private _render() {
        this._className && this._view.classList.add(this._className);

        this._view.setAttribute('data-tag', String(this._id));
        this._view.querySelector('[data-tag="name"]').innerHTML = this._cardData.name;
        this._view.querySelector('[data-tag="name"]').setAttribute('title', this._cardData.name);
        this._view.querySelector('[data-tag="share"]').setAttribute('src', '/static/img/share.svg');

        const isImage = !!this._cardData.thumbnailLink;
        this._view.querySelector('[data-tag="img"]').setAttribute('src', isImage ? this._cardData.thumbnailLink : this._cardData.iconLink);
        this._view.querySelector('[data-tag="img"]').classList.toggle('card__img', isImage);
        this._view.querySelector('[data-tag="img"]').classList.toggle('card__pic', !isImage);

        // if (this._cardData.mimeType.includes('image')) {
        //     this._view.querySelector('[data-tag="img"]').setAttribute('src', this._cardData.thumbnailLink);
        // } else {
        //     this._view.querySelector('[data-tag="img"]').setAttribute('src', this._cardData.iconLink);
        //     this._view.querySelector('[data-tag="img"]').classList.remove('card__img');
        //     this._view.querySelector('[data-tag="img"]').classList.add('card__pic');
        // }
    }
}
