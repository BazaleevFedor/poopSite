import {Card} from '../card/card';
import cardAreaHTML from './cardArea.html';

const CARD_ON_PAGE = 100;

export class CardArea {
    private _view: HTMLElement;

    constructor(root: HTMLElement) {
        root.innerHTML = cardAreaHTML;
        this._view = document.getElementById('cardArea');
    }

    clear() {
        this._view.innerHTML = '';
    }

    render(cardList: any) {
        this.clear();

        for (let i = 0; i < Math.min(CARD_ON_PAGE, cardList.length); i++) {
            new Card(this._view, cardList[i]);
        }
        this._addEventListeners();
    }

    private _addEventListeners() {
        /* const fileOptions = document.querySelectorAll('.file-options');
        fileOptions.forEach((option) => {
            option.addEventListener('click', (e) => {
                option.querySelector('.file-options-menu').classList.toggle('hide');
                e.stopPropagation();
            });
        });

        document.addEventListener('click', (e) => {
            fileOptions.forEach((option) => {
                option.querySelector('.file-options-menu').classList.add('hide');
            });
        });*/
    }
}


