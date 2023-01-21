<script>
	import '@picocss/pico';
</script>

<main class="container">
	<slot />
</main>

<style>
	:root {
		--font-size: 0.98rem;
	}

	main {
		padding: 2rem 0;
	}
</style>
