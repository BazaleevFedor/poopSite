import mainHTML from './main.html';
import { Sidebar } from '../../components/sidebar/sidebar';
import { InputField } from '../../components/inputField/inputField';
import { CardArea } from '../../components/cardArea/cardArea';
import { userStore } from '../../stores/userStore';
import {AuthModal} from '../../components/authModal/authModal';

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
        this._search = new InputField(document.getElementById('searchField'), 'Поиск по файлам...');
        this._cardArea = new CardArea(document.getElementById('cardAreaWrapper'));
        this._authModal = new AuthModal(document.getElementById('authModalWrapper'));
    }

    _addStore() {
        userStore.registerCallback(this.update.bind(this));
    }

    update() {
        if (userStore.userData.isAuth) {
            this._sidebar.render();
            this._search.render();
            this._cardArea.render([{name: 'awd', id: 1}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
        } else {
            console.log()
            this._view.style.filter = 'blur(50px)';
            this._authModal.render();
        }
    }
}
