<script>
	import {onMount} from 'svelte';
	import {RouterView} from 'pluma-svelte-router';

	import Menu from './Menu.svelte';
	import {isWorking} from '../store.js';

	// Simulate prefetching initial data
	onMount(async () => {
		setTimeout(() => {
			$isWorking = false;
		}, 1000);
	});
</script>

{#if $isWorking}
	<div class="spinner-wrap">
		<div class="spinner-border text-primary" style="width: 5rem; height: 5rem;" role="status"></div>
	</div>
{:else}
	<Menu/>
	<div style="padding-top: 4rem;">
		<RouterView/>
	</div>
{/if}

<style>
	.spinner-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		flex-direction: column;
	}

	.spinner-wrap .spinner-border {
		margin-bottom: 2rem;
	}
</style>