<script>
	import '../app.css';

	import { Toaster } from 'svelte-french-toast';

	import Header from '$lib/components/Header.svelte';
</script>

<Toaster />
<Header />
<main class="container p-6 mx-auto md:p-8 md:max-w-screen-md">
	<slot />
</main>
