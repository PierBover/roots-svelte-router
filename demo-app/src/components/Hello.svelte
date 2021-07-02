<script>
	import {currentRoute} from 'pluma-svelte-router';
</script>

<h1>Path params</h1>
<pre>{JSON.stringify($currentRoute.params)}</pre>