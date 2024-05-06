import mainHTML from './main.html';
import { Sidebar } from '../../components/sidebar/sidebar';
import { InputField } from '../../components/inputField/inputField';
import { CardArea } from '../../components/cardArea/cardArea';
import { userStore } from '../../stores/userStore';
import { AuthModal } from '../../components/authModal/authModal';
import { actionUser } from '../../actions/actionUser';
import {actionFiles} from "../../actions/actionFiles";

export class MainPage {
    private _view: HTMLElement;
    private _sidebar: Sidebar;
    private _search: InputField;
    private _cardArea: CardArea;
    private _authModal: AuthModal;

    constructor(root: HTMLElement) {
        root.innerHTML = mainHTML;
        this._view = document.getElementById('main');
        this._addStore();

        this._sidebar = new Sidebar(document.getElementById('sidebarWrapper'));
        this._search = new InputField(document.getElementById('searchField'), 'Поиск по файлам...', '');
        this._cardArea = new CardArea(document.getElementById('cardAreaWrapper'));
        this._authModal = new AuthModal(document.getElementById('authModalWrapper'));

        actionUser.getUsername();
    }

    render() {
        this._sidebar.render();
        this._search.render();

        if (userStore.userData.isAuth) {
            actionFiles.getFiles();
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
    }
}
