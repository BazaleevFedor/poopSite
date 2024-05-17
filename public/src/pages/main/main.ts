import mainHTML from './main.html';
import { Sidebar } from '../../components/sidebar/sidebar';
import { InputField } from '../../components/inputField/inputField';
import { CardArea } from '../../components/cardArea/cardArea';
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
        this._authModal = new AuthModal(document.getElementById('authModalWrapper'));
        this._profile = new ProfileArea(document.getElementById('profileWrapper'));

        setTimeout(() => {
            actionUser.getUsername();
        }, url.has('code') ? 400 : 0);

        document.addEventListener('DOMContentLoaded', () => {
            const dropArea = document.getElementById('root');

            // Предотвращаем действия по умолчанию для событий drag и drop
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, preventDefaults, false);
            });

            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }

            // Добавляем визуальную подсказку при перетаскивании файлов
            ['dragenter', 'dragover'].forEach(eventName => {
                dropArea.addEventListener(eventName, () => {
                    return dropArea.classList.add('highlight');
                }, false);
            });

            ['dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, () => {return dropArea.classList.remove('highlight');}, false);
            });

            // Обрабатываем событие drop
            dropArea.addEventListener('drop', handleDrop, false);

            function handleDrop(e) {
                const dt = e.dataTransfer;
                const files = dt.files;

                handleFiles(files);
            }

            function handleFiles(files) {
                ([...files]).forEach(uploadFile);
            }

            async function uploadFile(file) {
                actionFiles.uploadsFiles(file);
            }
        });
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
}
