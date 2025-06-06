import { AuthModal } from '../src/components/authModal/authModal';
import { UserStore } from '../src/stores/userStore';
import Ajax from '../src/modules/ajax';

jest.mock('../src/modules/ajax');

jest.mock('../src/components/authModal/authModal.html', () => {
    return `
        <div id="authModal">
            <div data-tag="title"></div>
            <div data-tag="username"></div>
            <div data-tag="password"></div>
            <div data-tag="button"></div>
            <div data-tag="regBtn"></div>
            <div data-tag="regTitle"></div>
        </div>
    `;
});

describe('Authentication', () => {
    let root: HTMLElement;
    let authModal: AuthModal;
    let store: UserStore;
    const mockAjax = Ajax as jest.Mocked<typeof Ajax>;

    beforeEach(() => {
        jest.clearAllMocks();

        // стор создаем
        store = new UserStore();

        root = document.createElement('div');
        root.id = 'root';
        document.body.appendChild(root);

        authModal = new AuthModal(root);
        authModal.render();
    });

    afterEach(() => {
        document.body.removeChild(root);
    });

    describe('Sign In', () => {
        it('should process the full sign in flow', async () => {
            mockAjax.signIn.mockResolvedValue(true);
            mockAjax.getUsername.mockResolvedValue('testUser');

            const usernameInput = root.querySelector('[data-tag="username"] input') as HTMLInputElement;
            const passwordInput = root.querySelector('[data-tag="password"] input') as HTMLInputElement;
            const button = root.querySelector('[data-tag="button"] button') as HTMLInputElement;

            usernameInput.value = 'testUser';
            passwordInput.value = 'testPass';

            const credentials = {
                username: 'testUser',
                password: 'testPass'
            };

            // жмакаем по кнопке
            button.click();

            await new Promise(resolve => setTimeout(resolve, 0));

            // проверяем вызов ajax
            expect(mockAjax.signIn).toHaveBeenCalled();
            expect(mockAjax.signIn).toHaveBeenCalledWith(credentials);

            // проверяем состояние стора после успешного входа
            expect(store.userData.isAuth).toBe(true);

            // проверяем, что был запрошен username
            expect(mockAjax.getUsername).toHaveBeenCalled();
            expect(store.userData.username).toBe('testUser');
        });

        it('should handle failed sign in', async () => {
            mockAjax.signIn.mockResolvedValue(false);

            const usernameInput = root.querySelector('[data-tag="username"] input') as HTMLInputElement;
            const passwordInput = root.querySelector('[data-tag="password"] input') as HTMLInputElement;
            const button = root.querySelector('[data-tag="button"] button') as HTMLInputElement;

            usernameInput.value = 'wrongUser';
            passwordInput.value = 'wrongPass';

            const credentials = {
                username: 'wrongUser',
                password: 'wrongPass'
            };

            // жмак
            button.click();

            await new Promise(resolve => setTimeout(resolve, 0));

            expect(mockAjax.signIn).toHaveBeenCalled();
            expect(mockAjax.signIn).toHaveBeenCalledWith(credentials);

            expect(store.userData.isAuth).toBe(false);
            expect(store.userData.username).toBeUndefined();
        });
    });

    describe('Sign Up', () => {
        it('should call Ajax.signUp with entered credentials', () => {
            mockAjax.signUp.mockResolvedValue(true);

            const regButton = root.querySelector('[data-tag="regBtn"]') as HTMLElement;
            const usernameInput = root.querySelector('[data-tag="username"] input') as HTMLInputElement;
            const passwordInput = root.querySelector('[data-tag="password"] input') as HTMLInputElement;
            const button = root.querySelector('[data-tag="button"] button') as HTMLInputElement;

            // переключаем с авторизации на рег
            regButton.click();

            usernameInput.value = 'newUser';
            passwordInput.value = 'newPass';

            // рег
            button.click();

            // проверяем, что был вызван signUp с правильными параметрами
            expect(mockAjax.signUp).toHaveBeenCalledWith({
                username: 'newUser',
                password: 'newPass'
            });
        });
    });
});
