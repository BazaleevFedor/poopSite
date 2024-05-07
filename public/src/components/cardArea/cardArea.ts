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

        const startIndex = filesStore.files.length ? filesStore.files.length : 0;
        filesStore.newFiles.forEach((file, index) => {
            new Card(this._view, file, startIndex + index);
        });
        filesStore.files = filesStore.files.concat(filesStore.newFiles);
    }

    private _addEventListeners() {
        this._view.addEventListener('click', (e) => {
            const clickedCard = e.target as HTMLElement;
            if (clickedCard.closest('.card') && !clickedCard.closest('.file-options')) {
                let cardId = clickedCard.closest('.card').getAttribute('data-tag');
                const ctrlPressed = e.ctrlKey;
                const shiftPressed = e.shiftKey;

                if (!ctrlPressed && !shiftPressed) {
                    this._clearChoose();
                    this._chooseFile(cardId);
                } else if (ctrlPressed) {
                    this._chooseFile(cardId);
                } else {
                    let { minId, maxId} = (() => {
                        let min = filesStore.files.length || 0;
                        let max = 0;
                        filesStore.chooseFilesId.forEach((item) => {
                            if (Number(item) > max) max = Number(item);
                            if (Number(item) < min) min = Number(item);
                        });

                        return {minId: min.toString(), maxId: max.toString()};
                    })();
                    this._clearChoose();

                    if (Number(cardId) < Number(minId)) {
                        minId = cardId;
                        cardId = maxId;
                    }

                    for (let i = Number(minId); i <= Number(cardId); i++) {
                        this._chooseFile(i.toString());
                    }
                }
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

    private _chooseFile(id: string, isChoose?: boolean) {
        this._view.querySelector(`[data-tag="${id}"]`).classList.toggle('card_choose');

        if (this._view.querySelector(`[data-tag="${id}"]`).classList.contains('card_choose')) {
            filesStore.chooseFilesId.push(id);
        }
    }

    private _clearChoose() {
        if (filesStore?.chooseFilesId?.length) {
            filesStore.chooseFilesId.forEach((item) => {
                this._chooseFile(item);
            });
            filesStore.chooseFilesId = [];
        }
    }

    private _addStore() {
        filesStore.registerCallback(this.render.bind(this));
    }
}


