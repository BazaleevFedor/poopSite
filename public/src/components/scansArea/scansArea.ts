import { Card } from '../card/card';
import scansAreaHTML from './scansArea.html';
import filesStore from '../../stores/filesStore';
import { actionFiles } from '../../actions/actionFiles';

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export class ScansArea {
    private _view: HTMLElement;

    constructor(root: HTMLElement) {
        if (window.location.pathname !== '/') return;

        root.innerHTML = scansAreaHTML;
        this._view = document.getElementById('scansArea');

        this._addStore();
        this._addEventListeners();

        new Swiper('.swiper', {
            loop: true,
            slidesPerView: 6,
            spaceBetween: 10,
            modules: [Navigation, Pagination],
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    clear() {
        this._view.innerHTML = '';
    }

    render() {
        const wrapper = document.getElementById('swiper-wrapper');

        if (wrapper) {
            filesStore.scans.forEach((file, index) => {
                new Card(wrapper, file, index, 'swiper-slide');
            });
        }
    }

    private _addEventListeners() {
        this._view.addEventListener('dblclick', (e) => {
            const clickedCard = e.target as HTMLElement;
            if (clickedCard.closest('.card') && !clickedCard.closest('.card__options')) {
                const cardId = clickedCard.closest('.card').getAttribute('data-tag');
                actionFiles.getViewLink(cardId);
            }
        });

        this._view.addEventListener('click', (e) => {
            const clickedCard = e.target as HTMLElement;
            if (clickedCard.closest('.card') && !clickedCard.closest('.card__share')) {
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

            if (clickedCard.closest('.card__share')) {
                const curFileId = clickedCard.parentElement.parentElement.getAttribute('data-tag');
                actionFiles.getLink(curFileId);
                clickedCard.setAttribute('src', '/static/img/share_active.svg');
                setTimeout(() => {
                    clickedCard.setAttribute('src', '/static/img/share.svg');
                }, 2000);
                this._clearChoose();
            }
        });
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


