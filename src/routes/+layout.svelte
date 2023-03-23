<script>
	import '../app.css';
	import 'flowbite/dist/flowbite.css';

	import Header from '$lib/components/Header.svelte';
</script>

<Header />
<main class="container p-6 mx-auto md:p-8 md:max-w-screen-md">
	<slot />
</main>
