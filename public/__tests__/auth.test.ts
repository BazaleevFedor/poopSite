// Мокаем только Ajax для HTTP запросов
jest.mock('../src/modules/ajax');

// Mock HTML template
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

import { AuthModal } from '../src/components/authModal/authModal';
import { UserStore } from '../src/stores/userStore';
import Ajax from '../src/modules/ajax';

describe('Authentication', () => {
    let root: HTMLElement;
    let authModal: AuthModal;
    let store: UserStore;
    const mockAjax = Ajax as jest.Mocked<typeof Ajax>;

    beforeEach(() => {
        // Очищаем все моки
        jest.clearAllMocks();

        // Создаем новые экземпляры для каждого теста
        store = new UserStore();

        // Setup DOM
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

            // Ждем завершения асинхронных операций
            await new Promise(resolve => {
                return setTimeout(resolve, 0);
            });

            // Проверяем вызов Ajax
            expect(mockAjax.signIn).toHaveBeenCalled();
            expect(mockAjax.signIn).toHaveBeenCalledWith(credentials);

            // Проверяем состояние стора после успешного входа
            expect(store.userData.isAuth).toBe(true);

            // Проверяем, что был запрошен username
            expect(mockAjax.getUsername).toHaveBeenCalled();
            expect(store.userData.username).toBe('testUser');
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

            // Ждем завершения асинхронных операций
            await new Promise(resolve => {
                return setTimeout(resolve, 0);
            });

            // Проверяем вызов Ajax
            expect(mockAjax.signIn).toHaveBeenCalled();
            expect(mockAjax.signIn).toHaveBeenCalledWith(credentials);

            // Проверяем состояние стора после неудачного входа
            expect(store.userData.isAuth).toBe(false);
            expect(store.userData.username).toBeUndefined();
        });
    });

    describe('Sign Up', () => {
        it('should call Ajax.signUp with entered credentials', () => {
            // Настраиваем мок
            mockAjax.signUp.mockResolvedValue(true);

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
            expect(mockAjax.signUp).toHaveBeenCalledWith({
                username: 'newUser',
                password: 'newPass'
            });
        });
    });
});
