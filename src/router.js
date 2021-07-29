import {writable, get} from 'svelte/store';
import {tick} from 'svelte';

export const currentRoute = writable(null);
export const currentPath = writable('');
export const routerState = writable('');

export const config = {};

// ROUTER INIT

export function initRouter (initialConfig) {

	// This may not be necessary...
	if (document.readyState !== 'complete') {
		document.addEventListener('readystatechange', () => {
			initRouter(initialConfig);
		});

		return;
	}

	// Base path
	config.basePath = initialConfig.basePath;

	// Scroll to top on route change
	config.scrollToTop = typeof initialConfig.scrollToTop === 'undefined' ? true : initialConfig.scrollToTop;

	// Active default class
	config.activeClass = typeof initialConfig.activeClass === 'undefined' ? 'active' : initialConfig.activeClass;

	// Let the browser manage scrolling
	config.manageScroll = typeof initialConfig.manageScroll === 'undefined' ? true : initialConfig.manageScroll;

	// Always remove trailing slash
	config.endWithSlash = typeof initialConfig.endWithSlash === 'undefined' ? false : initialConfig.endWithSlash;

	// Hooks
	config.onRouteMatch = initialConfig.onRouteMatch;

	if (config.manageScroll) history.scrollRestoration = 'manual';

	// Route that will be used if no route is matched
	config.errorRoute = {
		path: '',
		components: initialConfig.notFoundComponents || [initialConfig.notFoundComponent],
		meta: {}
	}

	window.addEventListener('popstate', onPopState);
	if (config.manageScroll) window.addEventListener('scroll', saveScrollDebounce, {passive: true});

	// Init routes
	config.routes = flattenRoutes(initialConfig.routes);

	if (config.basePath) {
		navigate({
			path: addBasePath(getFullBrowserPath()),
			replace: true
		});
	} else {
		navigate({
			path: getFullBrowserPath(),
			addToHistory: false
		});
	}
}

function flattenRoutes (routesTree, depth = 0) {
	const routes = [];

	routesTree.forEach((route) => {
		const flatRoute = {
			path: route.path || '',
			components: route.component ? [route.component] : route.components,
			blockPageScroll: typeof route.blockPageScroll === 'undefined' ? false : route.blockPageScroll,
			meta: route.meta || {}
		};

		// All paths should start with /
		if (flatRoute.path.charAt(0) !== '/') flatRoute.path = '/' + flatRoute.path;

		if (route.children) {
			const children = flattenRoutes(route.children, depth + 1);

			children.forEach((child, index) => {

				const blockPageScroll = child.blockPageScroll ? child.blockPageScroll : flatRoute.blockPageScroll;

				routes.push({
					path: child.path && child.path !== '/' ? flatRoute.path + child.path : flatRoute.path,
					components: [...flatRoute.components, ...child.components],
					blockPageScroll,
					meta: {...flatRoute.meta, ...child.meta}
				});
			});
		} else {
			routes.push(flatRoute);
		}
	});

	// Only do this once all routes have been flattened
	if (depth === 0) {
		routes.forEach((route) => {
			if (route.path.includes(':')) route.hasParams = true;

			// add the basepath to all routes
			if (config.basePath) {
				route.path = addBasePath(route.path);
			}

			// add or remove trailing slashes
			if (config.endWithSlash) route.path = addTrailingSlash(route.path);
			else route.path = removeTrailingSlash(route.path);
		});
	}


	return routes;
}

// UTILS

let timeoutId;

function saveScrollDebounce () {
	clearTimeout(timeoutId);
	timeoutId = setTimeout(() => {
		saveScrollPositionToCurrentHistoryItem();
	}, 250);
}

function setScroll ({x, y}) {
	window.scrollTo({
		top: y,
		left: x
	});
}

function getScrollPositionById (id) {
	const element = document.getElementById(id);

	if (element) {
		// Find the best scroll position to center the element on the viewport
		const rectangle = element.getBoundingClientRect();

		let scrollTop = rectangle.top - window.innerHeight / 2;
		let scrollLeft = rectangle.left - window.innerWidth / 2;

		const position = {
			x: scrollLeft < 0 ? 0 : scrollLeft,
			y: scrollTop < 0 ? 0 : scrollTop
		};

		return position;
	} else {
		throw `Element id "${id}" doesn't exist in the page`;
	}
}

function getRouteFromPath (path) {

	for (let i = 0; i < config.routes.length; i++) {
		const route = config.routes[i];
		if (pathsMatch(path, route.path)) return route;
	}

	// If we haven't matched a route we return the error route
	return config.errorRoute;
}

function blockPageScroll () {
	document.body.style.overflow = 'hidden';
}

function unblockPageScroll () {
	document.body.style.overflow = 'auto';
}

function saveScrollPositionToCurrentHistoryItem () {
	const state = window.history.state;

	if (!state) return;

	state.scrollPosition = {
		x: window.scrollX,
		y: window.scrollY
	};

	window.history.replaceState(state, '', getFullBrowserPath());
}

function getParamsFromPath (path, routePath) {
	const pathSegments = path.split('/');
	const routePathSegments = routePath.split('/');
	const params = {};

	for (let i = 1; i < pathSegments.length; i++) {
		if (routePathSegments[i].charAt(0) === ':') {
			const paramName = routePathSegments[i].slice(1);
			params[paramName] = pathSegments[i];
		}
	}

	return params;
}

function getPathWithoutHashOrQuery (fullPath) {
	let path = fullPath.split('#')[0];
	path = path.split('?')[0];
	return path;
}

function getFullBrowserPath () {
	return window.location.href.replace(window.location.origin, '');
}

function getQueryParamsFromPath (path) {
	if (!path.includes('?')) return {};

	if (path.includes('#')) path = path.split('#')[0];
	const queryString = path.split('?')[1];
	const searchParams = new URLSearchParams(queryString);
	const params = {};

	for (var pair of searchParams.entries()) {
		params[pair[0]] = pair[1];
	}

	return params;
}

export function addQueryParamsToUrl (params) {
	// Generate the query string
	const queryString = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
	const fullPath = get(currentPath) + '?' + queryString;

	// Replace the history
	const state = window.history.state;
	window.history.replaceState(state, '', fullPath);
}

// NAVIGATION

export async function navigate (options) {

	if (typeof options === 'string') {
		options = {
			path: options
		}
	}

	// add or remove trailing slash
	if (config.endWithSlash) options.path = addTrailingSlash(options.path);
	else options.path = removeTrailingSlash(options.path);

	// add base path
	if (config.basePath) options.path = addBasePath(options.path);

	const fullPath = options.path;

	// Find the route from a path
	const cleanPath = getPathWithoutHashOrQuery(fullPath);
	const route = getRouteFromPath(cleanPath);


	const params = route.hasParams ? getParamsFromPath(cleanPath, route.path) : {};
	const query = getQueryParamsFromPath(fullPath);

	const requestedRoute = {
		...route,
		params,
		query,
		fullRequestPath: fullPath
	};

	if (config.onRouteMatch) {
		const from = get(currentRoute);
		const to = requestedRoute;
		const allowNavigation = config.onRouteMatch(from, to);
		if (!allowNavigation) return;
	}

	// Wait until UI has updated
	await tick();

	if (config.manageScroll) {
		if (route.blockPageScroll) blockPageScroll();
		else unblockPageScroll();

		if (route.blockPageScroll !== true && config.scrollToTop && options.scrollToTop !== false) {
			const scrollPosition = options.scrollToId ? getScrollPositionById(options.scrollToId) : {x: 0, y: 0};
			if (scrollPosition) setScroll(scrollPosition);
		}
	}

	// Create a new history state
	const historyState = {
		blockPageScroll: route.blockPageScroll
	}

	if (options.scrollToId) historyState.scrollToId = options.scrollToId;

	if (options.addToHistory !== false) {
		if (options.replace) {
			window.history.replaceState({}, '', fullPath);
		} else {
			window.history.pushState({}, '', fullPath);
		}
	}

	// Trigger updates on the UI
	currentPath.set(route.path);
	currentRoute.set(requestedRoute);
}

async function onPopState (event) {

	// We don't want to do anything on a hash change
	if (event.state === null) {
		event.preventDefault();
		return;
	}

	const historyState = event.state;
	const fullPath = getFullBrowserPath();
	const cleanPath = getPathWithoutHashOrQuery(fullPath);
	const route = getRouteFromPath(cleanPath);
	const params = route.hasParams ? getParamsFromPath(cleanPath, route.path) : {};
	const query = getQueryParamsFromPath(fullPath);

	const requestedRoute = {
		...route,
		params,
		query,
		fullRequestPath: fullPath
	};

	// Trigger updates on the UI
	currentPath.set(route.path);
	currentRoute.set({...route, params, query});

	await tick();

	if (config.manageScroll) {
		if (route.blockPageScroll) blockPageScroll();
		else unblockPageScroll();

		if (historyState.scrollPosition || historyState.scrollToId) {
			const scrollPosition = historyState.scrollToId ? getScrollPositionById(historyState.scrollToId) : historyState.scrollPosition;
			if (scrollPosition) setScroll(scrollPosition);
		}
	}
}

export function joinPaths (paths) {
	// join
	let path = paths.join('/');

	// remove double slashes
	path = path.replace(/\/{2,}/g, '/');

	// Add first slash
	if (path.charAt(0) !== '/') path = '/' + path;

	// remove trailing slash
	path = removeTrailingSlash(path);

	return path;
}

export function addBasePath (path) {
	if (!config.basePath || startsWithBasePath(path)) return path;
	return joinPaths([config.basePath, path]);
}

export function startsWithBasePath (path) {

	if (!config.basePath) return;

	// remove slashes
	path = path.replace(/\//g, '');
	const basePath = config.basePath.replace(/\//g, '');
	return path.startsWith(basePath);
}

function addTrailingSlash (path) {
	if (path.charAt(path.length - 1) === '/') return path;
	return path + '/';
}

function removeTrailingSlash (path) {
	if (path.charAt(path.length - 1) !== '/') return path;
	return path.substr(0, path.length - 1);
}

function removeFirstSlash (path) {
	if (path.charAt(0) !== '/') return path;
	return path.substr(1, path.length - 1);
}

export function pathsMatch (path, routePath, matchStart) {

	const hasParams = routePath.includes(':');

	// If the path of the route doesn't have params
	// simply compare the strings without any slashes
	if (!hasParams) {
		path = path.replace(/\//g, '');
		routePath = routePath.replace(/\//g, '');

		if (!matchStart) {
			return path === routePath;
		} else {
			return routePath.startsWith(path);
		}

	}

	// If the routePath has params we need to compare the path segments

	// remove first and last slashes to prevent
	path = removeTrailingSlash(removeFirstSlash(path));
	routePath = removeTrailingSlash(removeFirstSlash(routePath));

	const pathSegments = path.split('/');
	const routePathSegments = routePath.split('/');

	// If the number of segments doesn't match the paths can't match
	if (!matchStart && pathSegments.length !== routePathSegments.length) return false;

	// Let's compare segment by segment...
	for (let i = 1; i < pathSegments.length; i++) {
		const isParam = routePathSegments[i].charAt(0) === ':';
		const segmentsMatch = pathSegments[i] === routePathSegments[i];
		const hasValue = pathSegments[i] !== '';

		// If the segment is not a param and they don't match...
		if (!isParam && !segmentsMatch) return false;

		// If the segment is a param
		if (isParam) {
			if (hasValue) continue
			else return false;
		}
	}

	return true;

}