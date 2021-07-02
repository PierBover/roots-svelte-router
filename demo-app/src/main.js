import {initRouter} from 'pluma-svelte-router';
import App from './components/App.svelte';
import routerConfig from './router.js';

initRouter(routerConfig);

const app = new App({
	target: document.getElementById('app')
});