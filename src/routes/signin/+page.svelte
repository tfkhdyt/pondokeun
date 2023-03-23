<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
</script>

<Card class="mx-auto">
	<h3 class="p-0 mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign In</h3>
	<form class="flex flex-col space-y-3">
		<Button class="w-full" color="dark">Sign in with GitHub</Button>
		<Button class="w-full" color="light">Sign in with Google</Button>
	</form>
</Card>
