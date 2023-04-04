import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true,
			},
			includeAssets: ['./static/favicon.png', './static/pondokeun-192.png'],
			manifest: {
				name: 'Pondokeun - Link Shortener',
				short_name: 'Pondokeun',
				description: 'Modern, Lightweight, Free and Open Source Link Shortener',
				theme_color: '#ffffff',
				icons: [
					{
						src: './static/pondokeun-192.png',
						size: '192x192',
						type: 'image/png',
					},
					{
						src: './static/pondokeun-512.png',
						size: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
};

export default config;
