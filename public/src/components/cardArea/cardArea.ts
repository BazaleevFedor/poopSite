import { Card } from '../card/card';
import cardAreaHTML from './cardArea.html';
import filesStore from '../../stores/filesStore';

const CARD_ON_PAGE = 100;

export class CardArea {
    private _view: HTMLElement;

    constructor(root: HTMLElement) {
        root.innerHTML = cardAreaHTML;
        this._view = document.getElementById('cardArea');

        this._addStore();
    }

    clear() {
        this._view.innerHTML = '';
    }

    render() {
        this.clear();

        for (let i = 0; i < Math.min(CARD_ON_PAGE, filesStore.files.length); i++) {
            new Card(this._view, filesStore.files[i]);
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

    private _addStore() {
        filesStore.registerCallback(this.render.bind(this));
    }
}


