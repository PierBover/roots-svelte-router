import {get} from 'svelte/store';
import {currentRoute, config, pathsMatch} from '../router.js';

const currentLinks = [];

export default function (node, options = {}) {
	options.activeClass = options.activeClass || config.activeClass;
	options.matchStart = typeof options.matchStart === 'undefined' ? false : options.matchStart;
	options.ariaCurrent = typeof options.ariaCurrent === 'undefined' ? 'page' : options.ariaCurrent;

	const link = {node, options};
	currentLinks.push(link);

	const route = get(currentRoute);
	if (route) setActiveClass(link, route);

	return {
		destroy () {
			// Delete the link when removed from the DOM
			const index = currentLinks.findIndex((link) => link.node === node);
			currentLinks.splice(index, 1);
		}
	}
}

function setActiveClass (link, route) {
	const linkPath = link.node.pathname;
	const {matchStart, activeClass, ariaCurrent} = link.options;

	let isActive = pathsMatch(linkPath, route.path, matchStart);

	if (isActive) {
		link.node.classList.add(activeClass);
		link.node.setAttribute('aria-current', ariaCurrent);
	} else {
		link.node.classList.remove(activeClass);
		link.node.removeAttribute('aria-current');
	}
}

currentRoute.subscribe((route) => {
	currentLinks.forEach((item) => {
		setActiveClass(item, route);
	});
});