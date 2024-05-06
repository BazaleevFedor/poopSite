import profileHTML from './profile.html';
import { actionGoogle } from '../../actions/actionGoogle';

export class ProfileArea {
    private _view: HTMLElement;

    constructor(root: HTMLElement) {
        root.innerHTML = profileHTML;
        this._view = document.getElementById('profile');
    }

    clear() {
        this._view.innerHTML = '';
    }

    render() {
        this._view.addEventListener('click', () => {
            actionGoogle.getGoogleLink();
        });
    }
}
