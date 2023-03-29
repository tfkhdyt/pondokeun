<script>
	import { Button } from 'flowbite-svelte';

	import { page } from '$app/stores';
</script>

<div class="mb-4 space-y-6 text-center dark:text-gray-200">
	<h1 class="text-3xl font-bold md:text-4xl">
		Free and Open Source <span class="text-[#1a56db]">Link Shortener</span>
	</h1>
	<h2 class="text-lg font-medium md:text-xl">
		Link shortening made easy, secure, and free with the transparency of open source.
	</h2>
	{#if !$page.data.session?.user}
		<div class="flex justify-center pt-1 space-x-2 md:pt-2">
			<Button size="md" href="/signin" pill>Get Started for Free</Button>
			<Button
				size="md"
				href="https://github.com/tfkhdyt/pondokeun"
				target="_blank"
				pill
				color="light">Self Host from Source</Button>
		</div>
	{/if}
</div>
