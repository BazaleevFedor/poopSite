import profileHTML from './profile.html';
import { actionGoogle } from '../../actions/actionGoogle';
import {userStore} from '../../stores/userStore';
import {actionUser} from "../../actions/actionUser";

export class ProfileArea {
    private _view: HTMLElement;

    constructor(root: HTMLElement) {
        root.innerHTML = profileHTML;
        this._view = document.getElementById('profile');
        this._view.classList.add('hide');
    }

    clear() {
        this._view.classList.add('hide');
    }

    render() {
        this._view.classList.remove('hide');

        this._view.querySelector('[data-tag="avatar"]').textContent = userStore.userData.username[0].toUpperCase();
        this._view.querySelector('[data-tag="addGoogleAcc"]')?.addEventListener('click', () => {
            actionGoogle.getGoogleLink();
        });

        this._view?.addEventListener('click', () => {
            this._view.querySelector('[data-tag="menu"]').classList.toggle('hide');
        });
    }
}
