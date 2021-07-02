<script>
	export let components;
</script>

{#if components.length > 1}
	<svelte:component this={components[0]}>
		<svelte:self components={components.slice(1)}/>
	</svelte:component>
{:else}
	<svelte:component this={components[0]}/>
{/if}
