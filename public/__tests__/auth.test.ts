// Мокаем только необходимые зависимости
jest.mock('../src/dispatcher/dispatcher');
jest.mock('../src/modules/ajax');
jest.mock('../src/actions/actionUser');

// Mock HTML template
jest.mock('../src/components/authModal/authModal.html', () => `
    <div id="authModal">
        <div data-tag="title"></div>
        <div data-tag="username"></div>
        <div data-tag="password"></div>
        <div data-tag="button"></div>
        <div data-tag="regBtn"></div>
        <div data-tag="regTitle"></div>
    </div>
`);

import { AuthModal } from '../src/components/authModal/authModal';
import { actionUser } from '../src/actions/actionUser';
import Dispatcher from '../src/dispatcher/dispatcher';
import { userStore } from '../src/stores/userStore';
import Ajax from '../src/modules/ajax';

describe('Authentication', () => {
    let root: HTMLElement;
    let authModal: AuthModal;
    const mockAjax = Ajax as jest.Mocked<typeof Ajax>;
    const mockDispatcher = Dispatcher as jest.Mocked<typeof Dispatcher>;

    beforeEach(() => {
        // Очищаем все моки
        jest.clearAllMocks();

        // Настраиваем моки
        (mockDispatcher.dispatch as jest.Mock).mockImplementation((action) => {
            if (action.actionName === 'signIn') {
                userStore._signIn(action.options);
            } else if (action.actionName === 'signUp') {
                userStore._signUp(action.options);
            }
        });

        // Настраиваем actionUser
        (actionUser.signIn as jest.Mock).mockImplementation((options) => {
            Dispatcher.dispatch({
                actionName: 'signIn',
                options
            });
        });

        // Setup DOM
        root = document.createElement('div');
        root.id = 'root';

        document.body.appendChild(root);
        authModal = new AuthModal(root);
        authModal.render();

        // Reset store state
        userStore.userData = {
            isAuth: false,
            username: undefined
        };
    });

    afterEach(() => {
        document.body.removeChild(root);
    });

    describe('Sign In', () => {
        it('should process the full sign in flow', async () => {
            // Настраиваем моки
            mockAjax.signIn.mockResolvedValue(true);
            mockAjax.getUsername.mockResolvedValue('testUser');

            // Заполняем поля формы
            const usernameInput = root.querySelector('[data-tag="username"] input') as HTMLInputElement;
            const passwordInput = root.querySelector('[data-tag="password"] input') as HTMLInputElement;
            const button = root.querySelector('[data-tag="button"] button') as HTMLInputElement;

            usernameInput.value = 'testUser';
            passwordInput.value = 'testPass';

            const credentials = {
                username: 'testUser',
                password: 'testPass'
            };

            // Вызываем клик по кнопке
            button.click();

            // Проверяем цепочку вызовов
            expect(actionUser.signIn).toHaveBeenCalledWith(credentials);
            expect(mockDispatcher.dispatch).toHaveBeenCalledWith({
                actionName: 'signIn',
                options: credentials
            });

            // Ждем завершения асинхронных операций
            await new Promise(resolve => setTimeout(resolve, 0));

            // Проверяем вызов Ajax
            expect(mockAjax.signIn).toHaveBeenCalled();
            expect(mockAjax.signIn).toHaveBeenCalledWith(credentials);

            // Проверяем состояние стора после успешного входа
            expect(userStore.userData.isAuth).toBe(true);

            // Проверяем, что был запрошен username
            expect(actionUser.getUsername).toHaveBeenCalled();
            expect(mockAjax.getUsername).toHaveBeenCalled();
            expect(userStore.userData.username).toBe('testUser');
        });

        it('should handle failed sign in', async () => {
            // Настраиваем моки на неудачный вход
            mockAjax.signIn.mockResolvedValue(false);

            // Заполняем поля формы
            const usernameInput = root.querySelector('[data-tag="username"] input') as HTMLInputElement;
            const passwordInput = root.querySelector('[data-tag="password"] input') as HTMLInputElement;
            const button = root.querySelector('[data-tag="button"] button') as HTMLInputElement;

            usernameInput.value = 'wrongUser';
            passwordInput.value = 'wrongPass';

            const credentials = {
                username: 'wrongUser',
                password: 'wrongPass'
            };

            // Вызываем клик по кнопке
            button.click();

            // Проверяем цепочку вызовов
            expect(actionUser.signIn).toHaveBeenCalledWith(credentials);
            expect(mockDispatcher.dispatch).toHaveBeenCalledWith({
                actionName: 'signIn',
                options: credentials
            });

            // Ждем завершения асинхронных операций
            await new Promise(resolve => setTimeout(resolve, 0));

            // Проверяем вызов Ajax
            expect(mockAjax.signIn).toHaveBeenCalled();
            expect(mockAjax.signIn).toHaveBeenCalledWith(credentials);

            // Проверяем состояние стора после неудачного входа
            expect(userStore.userData.isAuth).toBe(false);
            expect(userStore.userData.username).toBeUndefined();
        });
    });

    describe('Sign Up', () => {
        it('should call actionUser.signUp with entered credentials', () => {
            // Переключаемся в режим регистрации
            const regButton = root.querySelector('[data-tag="regBtn"]') as HTMLElement;
            regButton.click();

            // Заполняем поля формы
            const usernameInput = root.querySelector('[data-tag="username"] input') as HTMLInputElement;
            const passwordInput = root.querySelector('[data-tag="password"] input') as HTMLInputElement;
            const button = root.querySelector('[data-tag="button"] button') as HTMLInputElement;

            usernameInput.value = 'newUser';
            passwordInput.value = 'newPass';

            // Вызываем клик по кнопке
            button.click();

            // Проверяем, что был вызван signUp с правильными параметрами
            expect(actionUser.signUp).toHaveBeenCalledWith({
                username: 'newUser',
                password: 'newPass'
            });
        });
    });
});
