import { Card } from '../card/card';
import cardAreaHTML from './cardArea.html';
import filesStore from '../../stores/filesStore';
import { throttle } from '../../modules/utils';

const CARD_ON_PAGE = 100;

export class CardArea {
    private _view: HTMLElement;

    constructor(root: HTMLElement) {
        root.innerHTML = cardAreaHTML;
        this._view = document.getElementById('cardArea');

        this._addStore();
        this._addEventListeners();
    }

    clear() {
        this._view.innerHTML = '';
    }

    render() {
        if (!filesStore?.newFiles?.length) return;

        const startIndex = filesStore.files.length - 1 || 0;
        filesStore.newFiles.forEach((file, index) => {
            new Card(this._view, file, startIndex + index);
        });
    }

    private _addEventListeners() {
        this._view.addEventListener('click', (e) => {
            const clickedCard = e.target as HTMLElement;
            if (clickedCard.closest('.card') && !clickedCard.closest('.file-options')) {
                const cardId = clickedCard.closest('.card').getAttribute('data-tag');
                const ctrlPressed = e.ctrlKey;
                const shiftPressed = e.shiftKey;

                if (!ctrlPressed && !shiftPressed) {

                    this._chooseFile(cardId, true);
                }
                this._chooseFile(cardId, true);
            }
        });

        window.addEventListener('scroll', throttle(() => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY || window.pageYOffset;

            if (scrollTop + windowHeight >= documentHeight) {
                console.log('Домотали до конца экрана!');
            }
        }, 200));
    }

    private _chooseFile(id: string, isChoose: boolean) {
        this._view.querySelector(`[data-tag="${id}"]`).classList.toggle('card_choose', isChoose);
        filesStore.chooseFilesId = filesStore.chooseFilesId.filter(item => {
            return item !== id;
        });
    }

    private _addStore() {
        filesStore.registerCallback(this.render.bind(this));
    }
}


