<script>
	import '../app.css';

	import autoAnimate from '@formkit/auto-animate';
	import { Toaster } from 'svelte-french-toast';
	import SvelteSeo from 'svelte-seo';

	import { PUBLIC_APP_URL } from '$env/static/public';
	import Header from '$lib/components/Header.svelte';
</script>

<SvelteSeo
	title="Pondokeun | Lightweight, Modern, Free and Open Source Link Shortener"
	description="Lightweight, Modern, Free and Open Source Link Shortener"
	canonical={PUBLIC_APP_URL}
	keywords="pondokeun, link shortener, link, bit.ly, t.ly"
	openGraph={{
		title: 'Pondokeun | Lightweight, Modern, Free and Open Source Link Shortener',
		description: 'Lightweight, Modern, Free and Open Source Link Shortener',
		url: PUBLIC_APP_URL,
		type: 'website',
		site_name: 'Pondokeun',
		images: [
			{
				url: '/thumbnail.png',
				width: 1920,
				height: 1080,
				alt: 'Pondokeun thumbnail',
			},
			{
				url: '/thumbnail-600p.png',
				width: 1067,
				height: 600,
				alt: 'Pondokeun thumbnail',
			},
			{
				url: '/thumbnail-800p.png',
				width: 1422,
				height: 800,
				alt: 'Pondokeun thumbnail',
			},
		],
	}}
	twitter={{
		card: 'summary_large_image',
		title: 'Pondokeun | Lightweight, Modern, Free and Open Source Link Shortener',
		description: 'Lightweight, Modern, Free and Open Source Link Shortener',
		image: '/thumbnail.png',
	}} />
<Toaster />
<Header />
<main class="container p-6 mx-auto md:p-8 md:max-w-screen-md" use:autoAnimate>
	<slot />
</main>
