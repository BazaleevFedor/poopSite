import { Card } from '../card/card';
import scansAreaHTML from './scansArea.html';
import scansStore from '../../stores/scansStore';
import { actionScans } from '../../actions/actionScans';

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
            slidesPerView: 6,
            spaceBetween: 10,
            modules: [Navigation, Pagination],
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        actionScans.getScans();
    }

    clear() {
        this._view.innerHTML = '';
    }

    render() {
        const wrapper = document.getElementById('swiper-wrapper');
        wrapper.innerHTML = '';

        if (wrapper && scansStore.scans.length) {
            scansStore.scans.forEach((file, index) => {
                new Card(wrapper, file, index, 'swiper-slide');
            });
        }
    }

    private _addEventListeners() {
        this._view.addEventListener('dblclick', (e) => {
            const clickedCard = e.target as HTMLElement;
            if (clickedCard.closest('.card') && !clickedCard.closest('.card__options') && clickedCard.closest('.swiper')) {
                const cardId = clickedCard.closest('.card').getAttribute('data-tag');
                actionScans.getViewLink(cardId);
            }
        });
    }

    private _addStore() {
        scansStore.registerCallback(this.render.bind(this));
    }
}


