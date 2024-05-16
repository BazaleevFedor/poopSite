import profileHTML from './profile.html';
import { actionGoogle } from '../../actions/actionGoogle';
import { userStore } from '../../stores/userStore';
import { actionUser } from '../../actions/actionUser';

export class ProfileArea {
    private _view: HTMLElement;

    constructor(root: HTMLElement) {
        root.innerHTML = profileHTML;
        this._view = document.getElementById('profile');
        this._view.classList.add('hide');

        this._view.querySelector('[data-tag="addGoogleAcc"]')?.addEventListener('click', () => {
            actionGoogle.getGoogleLink();
        });

        this._view.querySelector('[data-tag="signOut"]')?.addEventListener('click', () => {
            actionUser.signOut();
        });

        this._view?.addEventListener('click', () => {
            this._view.querySelector('[data-tag="menu"]').classList.toggle('hide');
        });

        this._addStore();
    }

    clear() {
        this._view.classList.add('hide');
    }

    render() {
        if (!userStore.userData.isAuth || !userStore.userData.username) {
            this.clear();
            return;
        }

        this._view.classList.remove('hide');
        this._view.querySelector('[data-tag="avatar"]').textContent = userStore.userData.username[0].toUpperCase();
    }

    private _addStore() {
        userStore.registerCallback(this.render.bind(this));
    }
}
