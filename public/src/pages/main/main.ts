import mainHTML from './main.html';
import { Sidebar } from "../../components/sidebar/sidebar";

export class MainPage {
    private _root: HTMLElement;
    private _sidebar: Sidebar;

    constructor(root: HTMLElement) {
        this._root = root;
        this._root.innerHTML = mainHTML;

        this._sidebar = new Sidebar(document.getElementById('sidebarWrapper'));
    }

    update() {

    }
}
