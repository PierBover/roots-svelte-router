import {get} from 'svelte/store';
import {currentRoute, config} from '../router.js';

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

	let isActive = false;

	// If the currentRoute doesn't have params
	// simply compare the href with the current path

	if (!route.hasParams) {
		if (linkPath === route.path) {
			isActive = true;
		} else if (matchStart && linkPath !== '/' && route.path.startsWith(linkPath)) {
			isActive = true;
		}
	} else {

		// If the current route has params we need to determine
		// if the path of the link matches with the route path
		// ignoring the segments that are parameters

		const linkPathSegments = linkPath.split('/');
		const routePathSegments = route.path.split('/');

		const linkPathIsLonger = linkPathSegments.length > routePathSegments.length;
		const sameNumberOfSegments = linkPathSegments.length === routePathSegments.length;

		// If the link path has more segments in any case
		// or, we're not doing a partial match and the number of segments is different
		// the link can never be active

		if (linkPathIsLonger || (!matchStart && !sameNumberOfSegments)) {
			isActive = false;
		} else {
			isActive = true;

			// We need to traverse the segments of the link path because
			// if we're doing a partial match it's going to have less segments than the full path

			for (var i = 0; i < linkPathSegments.length; i++) {
				if (routePathSegments[i].charAt(0) !== ':' && linkPathSegments[i] !== routePathSegments[i]) {
					isActive = false;
					break;
				}
			}
		}

	}

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