import './index.scss';
import { MainPage } from './src/pages/main/main';
import {googleStore} from './src/stores/googleStore';

new MainPage(document.getElementById('root'));

googleStore._refreshStore();
