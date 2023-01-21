<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Pondokeun</title>
</svelte:head>

<h1>Pondokeun</h1>

<!-- svelte-ignore a11y-no-redundant-roles -->
<article>
	<form method="POST" use:enhance>
		<label for="link"
			>Insert your link
			{#if form?.missing}
				<b>Link is required</b>
			{/if}
		</label>
		<input type="url" id="link" name="link" placeholder="https://..." />

		<button>Submit</button>
	</form>
	{#if form?.status === 'success'}
		<div>
			Your shorten url: <a href="http://localhost:5173/{form?.addedLink?.slug}"
				>http://localhost:5173/{form?.addedLink?.slug}</a
			> 
		</div>
	{:else if form?.status === 'error'}
		<p>Error occured: {form?.message}</p>
	{/if}
</article>

<style>
	article {
		max-width: 768px;
		margin: 0 auto;
		--primary: #3949ab;
		--primary-hover: #323e84;
	}

	label {
		display: flex;
		justify-content: space-between;
	}

	label > b {
		color: red;
	}
</style>
