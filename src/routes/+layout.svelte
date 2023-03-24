<script>
	import '../app.css';
	import autoAnimate from '@formkit/auto-animate';
	import { Toaster } from 'svelte-french-toast';

	import Header from '$lib/components/Header.svelte';
</script>

<Toaster />
<Header />
<main class="container p-6 mx-auto md:p-8 md:max-w-screen-md" use:autoAnimate>
	<slot />
</main>
