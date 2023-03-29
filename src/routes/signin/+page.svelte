<script lang="ts">
	import { Card } from 'flowbite-svelte';

	import GitHubSignInButton from '$lib/components/SignInButtons/GitHubSignInButton.svelte';
	import GoogleSignInButton from '$lib/components/SignInButtons/GoogleSignInButton.svelte';
</script>

<svelte:head>
	<title>Sign In | Pondokeun</title>
</svelte:head>

<main>
	<Card class="mx-auto">
		<h3 class="p-0 mb-4 text-xl font-bold text-gray-900 dark:text-white">Sign In</h3>
		<form class="flex flex-col space-y-3">
			<div class="my-4 space-y-3">
				<GitHubSignInButton />
				<GoogleSignInButton />
			</div>
		</form>
	</Card>
</main>
