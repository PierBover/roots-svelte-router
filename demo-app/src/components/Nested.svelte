<script>
	import {link, active} from 'pluma-svelte-router';

	const linkOptions = {scrollToTop: false};
</script>

<h1>Nested</h1>
<p class="mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, atque, itaque. Minima nulla nostrum, voluptates temporibus reprehenderit ullam eaque voluptas maxime beatae, ratione nisi qui amet, in voluptatem aspernatur. Voluptatum.</p>

<p class="mb-4">These tab links will not trigger a scroll change:</p>

<ul id="tab-menu" class="nav nav-tabs mb-4">
	<li class="nav-item">
		<a class="nav-link" href="/nested" use:link={linkOptions} use:active>Default child</a>
	</li>
	<li class="nav-item">
		<a class="nav-link" href="/nested/child-a" use:link={linkOptions} use:active>Child A</a>
	</li>
	<li class="nav-item">
		<a class="nav-link" href="/nested/child-b" use:link={linkOptions} use:active>Child B</a>
	</li>
</ul>


<slot></slot>