import mainHTML from './main.html';
import { Sidebar } from '../../components/sidebar/sidebar';
import { InputField } from '../../components/inputField/inputField';
import { CardArea } from '../../components/cardArea/cardArea';
import { ScansArea } from '../../components/scansArea/scansArea';
import { userStore } from '../../stores/userStore';
import { AuthModal } from '../../components/authModal/authModal';
import { actionUser } from '../../actions/actionUser';
import { actionFiles } from '../../actions/actionFiles';
import { actionGoogle } from '../../actions/actionGoogle';
import { ProfileArea } from '../../components/profile/profile';
import { googleStore } from '../../stores/googleStore';
import { Selector } from '../../components/selector/selector';

export class MainPage {
    private _view: HTMLElement;
    private _sidebar: Sidebar;
    private _search: InputField;
    private _selector: Selector;
    private _cardArea: CardArea;
    private _scansArea: ScansArea;
    private _authModal: AuthModal;
    private _profile: ProfileArea;

    constructor(root: HTMLElement) {
        const url = new URLSearchParams(window.location.search);
        if (url.has('code')) {
            actionGoogle.sendGoogleToken(url.get('code'));
            const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
            window.history.pushState({ path: newUrl }, '', newUrl);
        }

        root.innerHTML = mainHTML;
        this._view = document.getElementById('main');
        this._addStore();

        this._sidebar = new Sidebar(document.getElementById('sidebarWrapper'));
        this._search = new InputField(document.getElementById('searchField'), 'Поиск по файлам...', '', true);
        this._selector = new Selector(document.getElementById('selectorField'));
        this._cardArea = new CardArea(document.getElementById('cardAreaWrapper'));
        this._scansArea = new ScansArea(document.getElementById('scansAreaWrapper'));
        this._authModal = new AuthModal(document.getElementById('authModalWrapper'));
        this._profile = new ProfileArea(document.getElementById('profileWrapper'));

        this._addEventListeners();

        setTimeout(() => {
            actionUser.getUsername();
        }, url.has('code') ? 400 : 0);
    }

    render() {
        this._sidebar.render();
        this._search.render();
        this._selector.render();

        if (userStore.userData.isAuth) {
            actionFiles.getFiles(true);
            this._toggleBlur(false);
        } else {
            this._signOut();
        }
    }

    private _signOut() {
        this._toggleBlur(true);
        this._authModal.render();
    }

    private _toggleBlur(isBlur: boolean) {
        document.getElementById('cardAreaWrapper').style.filter = isBlur ? 'blur(50px)' : '';
        document.getElementById('authModalWrapper').classList.toggle('hide', !isBlur);
    }

    private _addStore() {
        userStore.registerCallback(this.render.bind(this));
        googleStore.registerCallback(this.render.bind(this));
    }

    private _addEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const drop = document.getElementById('root');
            const dropFilesWrapper = document.getElementById('dropFilesWrapper');

            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                drop.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }, false);
            });

            let dragCounter = 0;
            drop.addEventListener('dragenter', () => {
                if (!userStore.userData.isAuth) return;
                dragCounter++;
                dropFilesWrapper.classList.remove('hide');
            });

            drop.addEventListener('dragleave', () => {
                if (!userStore.userData.isAuth) return;
                dragCounter--;
                if (dragCounter === 0) {
                    dropFilesWrapper.classList.add('hide');
                }
            });

            drop.addEventListener('drop', (event) => {
                if (!userStore.userData.isAuth) return;
                dragCounter = 0;
                const files: any = event.dataTransfer.files;
                ([...files]).forEach(actionFiles.uploadsFiles);
            });

            /* dropFilesWrapper.addEventListener('click', (e) => {
                const clickedElem = e.target as HTMLElement;
                if (!clickedElem.closest('.drop-files')) {
                    dropFilesWrapper.classList.add('hide');
                    dropArea.classList.remove('drop-files_error');
                    dropArea.classList.remove('drop-files_active');
                }
            }); */
        });
    }
}
