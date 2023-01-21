<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: console.log(form);
</script>

<svelte:head>
	<title>Pondokeun</title>
</svelte:head>

<h1>Pondokeun</h1>

<article>
	<form method="POST" use:enhance>
		<label for="link"
			>Input your link
			{#if form?.missing}
				<b>Link is required</b>
			{/if}
		</label>
		<input type="url" id="link" name="link" placeholder="https://..." />

		<button>Submit</button>
	</form>
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
