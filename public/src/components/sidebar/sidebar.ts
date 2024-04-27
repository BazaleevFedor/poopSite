import sidebarHTML from './sidebar.html';

const adblockImg = [
    '1BPSBsejvqc.jpg',
    '2-MXF7HN4zU.jpg',
    'bj4kbboH3RQ.jpg',
    'Bqgk4DYOLoo.jpg',
    'dEcyxYBTsuQ.jpg',
    'EkOv6zBFZOI.jpg',
    'GmLoRf1pIko.jpg',
    'GpJHURhyhlI.jpg',
    'i5hz1U-2qb8.jpg',
    'irt3POdwa_Y.jpg',
    'mae5SCvOnC4.jpg',
    'mnhJsIvE8W8.jpg',
    'MoWMT7bmxWI.jpg',
    'OF3AYFcFsGs.jpg',
    'RSRw-9ycNXw.jpg',
    'ryGz8orHFzs.jpg',
    'TbTYhXSzGuI.jpg',
    'X4i_ESN1tGQ.jpg',
];

export class Sidebar {
    private _root: HTMLElement;
    private _view: HTMLElement;

    constructor(root: HTMLElement) {
        this._root = root;
        this._root.innerHTML = sidebarHTML;
        this._view = document.getElementById('sidebar');
        this.update();
    }

    update() {
        this.clear();

        for (let i = 0; i < 5; i++) {
            this._view.innerHTML += `<img class="sidebar__item" alt="реклама" src="/static/img/adblock/${ adblockImg[Math.floor(Math.random() * (adblockImg.length))] }">`
        }
    }

    clear() {
        this._view.innerHTML = '';
    }
}