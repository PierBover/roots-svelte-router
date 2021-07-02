import {navigate} from '../router.js';

function onClick (options) {

	const scrollToTop = typeof options.scrollToTop === 'undefined' ? true : options.scrollToTop;
	const scrollToId = options.scrollToId;

	return function (event) {
		// We ignore the click event if it has a modifier
		if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;

		event.preventDefault();

		let path;

		// If the click lands on a child find a parent link
		if (!event.target.href) {
			 const closestLink = event.target.closest('a');
			 path = closestLink.href.replace(window.location.origin, '');
		} else {
			// Get the full path without the domain and protocol
			path = event.target.href.replace(window.location.origin, '');
		}

		navigate({
			path,
			scrollToTop,
			scrollToId
		});
	}
}

export default function (node, options = {}) {
	node.addEventListener('click', onClick(options));
}