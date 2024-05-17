import { Card } from '../card/card';
import cardAreaHTML from './cardArea.html';
import filesStore from '../../stores/filesStore';
import {debounce, throttle} from '../../modules/utils';
import { actionFiles } from '../../actions/actionFiles';

export class CardArea {
    curMenuId: string;
    private _view: HTMLElement;

    constructor(root: HTMLElement) {
        root.innerHTML = cardAreaHTML;
        this._view = document.getElementById('cardArea');
        this.curMenuId = undefined;

        this._addStore();
        this._addEventListeners();
    }

    clear() {
        this._view.innerHTML = '';
    }

    render() {
        if (!filesStore.files.length) this.clear();
        if (!filesStore?.newFiles?.length) {
            setTimeout(() => {
                alert('добавь гугл акк, сцука');
            });
            return;
        }

        const startIndex = filesStore.files.length || 0;
        filesStore.newFiles.forEach((file, index) => {
            new Card(this._view, file, startIndex + index);
        });
        filesStore.files = filesStore.files.concat(filesStore.newFiles);
    }

    private _addEventListeners() {
        this._view.addEventListener('dblclick', (e) => {
            const clickedCard = e.target as HTMLElement;
            if (clickedCard.closest('.card') && !clickedCard.closest('.card__options')) {
                const cardId = clickedCard.closest('.card').getAttribute('data-tag');
                actionFiles.getViewLink(filesStore.files[cardId].id);
            }
        });

        this._view.addEventListener('click', (e) => {
            const clickedCard = e.target as HTMLElement;
            if (clickedCard.closest('.card') && !clickedCard.closest('.card__options')) {
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

                document.getElementById('ts-download').classList.toggle('select-button_disabled', !filesStore.chooseFilesId.length);
                document.getElementById('ts-trash').classList.toggle('select-button_disabled', !filesStore.chooseFilesId.length);
            }

            if (clickedCard.closest('.card__options')) {
                const menu = clickedCard.querySelector('[data-tag="menu"]');
                menu.classList.toggle('hide');
                if (!menu.classList.contains('hide')) this.curMenuId = clickedCard.parentElement.getAttribute('data-tag');

                this._clearChoose();
            }
        });

        /* document.addEventListener('click', () => {
            if (this.curMenuId) {
                this._closeMenu();
            }
        }); */

        window.addEventListener('scroll', debounce(() => {
            if (!filesStore.newFiles.length) return;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY || window.pageYOffset;

            if (scrollTop + windowHeight >= documentHeight - 500) {
                actionFiles.getFiles(false);
            }
        }, 200));
    }

    private _closeMenu() {
        this._view.querySelector(`[data-tag="${this.curMenuId}"]`).querySelector('[data-tag="menu"]').classList.add('hide');
        this.curMenuId = undefined;
    }

    private _chooseFile(id: string) {
        const elem = this._view.querySelector(`[data-tag="${id}"]`);
        elem.classList.toggle('card_choose');

        if (filesStore.chooseFilesId.includes(id)) {
            filesStore.chooseFilesId = filesStore.chooseFilesId.filter((item) => {
                return item !== id;
            });
            return;
        }

        filesStore.chooseFilesId.push(id);
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


