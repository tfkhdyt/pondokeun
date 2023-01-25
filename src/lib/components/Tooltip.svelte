<script lang="ts">
	export let label: string;

	let tooltip: HTMLSpanElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<span
	on:click={() => {
		tooltip.innerHTML = label;
		tooltip.style.display = 'block';
		setTimeout(() => {
			tooltip.style.display = 'none';
		}, 1500);
	}}
>
	<slot />
</span>
<span id="tooltip" bind:this={tooltip} class="bg-gray-800/95 text-gray-300 -ml-0.5" />

<style>
	#tooltip {
		display: none;
		position: absolute;
		/* background-color: #555; */
		/* color: #fff; */
		text-align: center;
		border-radius: 6px;
		padding: 5px;
	}
</style>
