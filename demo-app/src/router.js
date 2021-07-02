import {get} from 'svelte/store';
import {navigate} from 'pluma-svelte-router';

import Home from './components/Home.svelte';
import Login from './components/Login.svelte';
import About from './components/About.svelte';
import Modal from './components/Modal.svelte';
import Hello from './components/Hello.svelte';
import Error from './components/Error.svelte';
import Private from './components/Private.svelte';
import Nested from './components/Nested.svelte';
import DefaultChild from './components/DefaultChild.svelte';
import ChildA from './components/ChildA.svelte';
import ChildB from './components/ChildB.svelte';
import GrandchildA from './components/GrandchildA.svelte';

import {isAuthenticated} from './store.js';

export default {
	notFoundComponent: Error,
	onRouteMatch: (from, to) => {
		// console.log('onRouteMatch:');
		// console.log('From', from);
		// console.log('To', to);

		// If the route is not private, just return true and let the router continue
		if (!to.meta.isPrivate) return true;

		if (get(isAuthenticated)){
			return true;
		} else {
			navigate({
				path: '/login',
				replace: true
			});
		}
	},
	routes: [
		{ path: '/', component: Home },
		{ path: '/login', component: Login },
		{ path: '/about', component: About },
		{ path: '/about/some-modal', components: [About, Modal], blockPageScroll: true },
		{ path: '/hello/:name', component: Hello },
		{
			path: '/nested',
			component: Nested,
			children: [
				{ component: DefaultChild },
				{
					path: 'child-a',
					component: ChildA,
					children: [
						{component: GrandchildA }
					]
				},
				{ path: 'child-b', component: ChildB }
			]
		},
		{
			path: '/private',
			component: Private,
			meta: {
				isPrivate: true
			}
		},
	]
};