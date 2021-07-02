<script>
	import Route from './Route.svelte';
	import {currentRoute} from './router.js';
</script>

{#if $currentRoute !== null}
	<Route components={$currentRoute.components}></Route>
{/if}