import authModalHTML from './authModal.html';
import {InputField} from '../inputField/inputField';

const CARD_ON_PAGE = 100;

export class AuthModal {
    private _view: HTMLElement;
    private _username: InputField;
    private _password: InputField;

    constructor(root: HTMLElement) {
        root.innerHTML = authModalHTML;
        this._view = document.getElementById('authModal');

        this._username = new InputField(this._view.querySelector('[data-tag="username"]'), 'username');
        this._password = new InputField(this._view.querySelector('[data-tag="password"]'), 'password');
    }

    clear() {
        this._view.innerHTML = '';
    }

    render() {
    }
}


