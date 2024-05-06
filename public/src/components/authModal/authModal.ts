import authModalHTML from './authModal.html';
import { InputField } from '../inputField/inputField';
import { actionUser } from '../../actions/actionUser';
import { Button } from '../button/button';

export class AuthModal {
    private _view: HTMLElement;
    private _username: InputField;
    private _password: InputField;
    private _button: Button;
    private _isAuth: boolean;

    constructor(root: HTMLElement) {
        root.innerHTML = authModalHTML;
        this._view = document.getElementById('authModal');
        this._isAuth = true;

        this._username = new InputField(this._view.querySelector('[data-tag="username"]'), 'username', '');
        this._password = new InputField(this._view.querySelector('[data-tag="password"]'), 'password', 'password');
        this._button = new Button(this._view.querySelector('[data-tag="button"]'), this._onButtonClick.bind(this), 'жмак');
    }

    clear() {
        this._view.innerHTML = '';
    }

    render() {
        this._username.render();
        this._password.render();
        this._button.render();

        this._toggle();
        this._view.querySelector('[data-tag="regBtn"]').addEventListener('click', () => {
            this._isAuth = !this._isAuth;
            this._toggle();
        });
    }

    private _toggle() {
        this._view.querySelector('[data-tag="title"]').innerHTML = this._isAuth ? 'Авторизация' : 'Регистрация';
        this._view.querySelector('[data-tag="regTitle"]').innerHTML = this._isAuth ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?';
        this._view.querySelector('[data-tag="regBtn"]').innerHTML = this._isAuth ? 'Регистрация' : 'Авторизация';
    }

    private _onButtonClick() {
        const username = this._username.getValue();
        const password = this._password.getValue();

        if (this._isAuth) {
            actionUser.signIn({ username, password });
            return;
        }

        actionUser.signUp({ username, password });
    }
}


