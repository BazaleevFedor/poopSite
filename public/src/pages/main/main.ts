import mainHTML from './main.html';
import { Sidebar } from '../../components/sidebar/sidebar';
import { InputField } from '../../components/inputField/inputField';
import { CardArea } from '../../components/cardArea/cardArea';
import { userStore } from '../../stores/userStore';
import {actionUser} from "../../actions/actionUser";

export class MainPage {
    private _view: HTMLElement;
    private _sidebar: Sidebar;
    private _search: InputField;
    private _cardArea: CardArea;

    constructor(root: HTMLElement) {
        root.innerHTML = mainHTML;
        this._view = document.getElementById('sidebar');
        this._addStore();
        actionUser.signIn({ username: 'test', password: 'test'});

        this._sidebar = new Sidebar(document.getElementById('sidebarWrapper'));
        this._search = new InputField(document.getElementById('searchField'), 'Поиск по файлам...');
        this._cardArea = new CardArea(document.getElementById('cardAreaWrapper'));
    }

    _addStore() {
        userStore.registerCallback(this.update.bind(this));
    }

    update() {
        if (userStore.userData.isAuth) {
            this._search.setError('');
            this._cardArea.update([{name: 'awd', id: 1}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
        } else {
            alert('авторизуйся сука');
        }
    }
}
