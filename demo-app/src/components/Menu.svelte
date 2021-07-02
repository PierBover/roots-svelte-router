<script>
	import {link, active} from 'pluma-svelte-router';
</script>

<nav class="navbar navbar-expand navbar-dark bg-primary fixed-top">
	<div class="container-fluid">
		<a class="navbar-brand" href="/" use:link>Router Demo App</a>
		<ul class="navbar-nav">
			<li class="nav-item">
				<a class="nav-link" href="/about" use:link use:active>About</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/nested" use:link use:active={{matchStart: true}}>Nested</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/hello/Pepito" use:link use:active>Hello <small>(path params)</small></a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/private" use:link use:active>Private route</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/something" use:link use:active>Error</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/login" use:link use:active>Login</a>
			</li>
		</ul>
	</div>
</nav>