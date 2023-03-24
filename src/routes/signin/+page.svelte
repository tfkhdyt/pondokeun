<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
	import { signIn } from '@auth/sveltekit/client';
</script>

<svelte:head>
	<title>Sign In | Pondokeun</title>
</svelte:head>

<Card class="mx-auto">
	<h3 class="p-0 mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign In</h3>
	<form class="flex flex-col space-y-3">
		<Button class="w-full" color="dark" outline on:click={() => signIn('github')}
			>Sign in with GitHub</Button
		>
		<Button class="w-full" outline>Sign in with Google</Button>
	</form>
</Card>
