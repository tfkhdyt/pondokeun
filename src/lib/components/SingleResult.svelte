<script lang="ts">
	import autoAnimate from '@formkit/auto-animate';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { A, Button, Tooltip } from 'flowbite-svelte';

	import { page } from '$app/stores';
	import { PUBLIC_APP_URL } from '$env/static/public';

	import DeleteModal from './DeleteModal.svelte';

	export let link: string;
	export let slug: string;
	export let createdDate: Date;
	export let updatedDate: Date;
	export let visitorsNumber = 0;

	$: completeUrl = `${PUBLIC_APP_URL}/${slug}`;
	let isHovered = false;
	let popupModal = false;

	dayjs.extend(relativeTime);
</script>

<div
	class="flex flex-col gap-4 p-4 text-sm text-blue-800 bg-blue-50 rounded-lg md:gap-2 dark:text-blue-400 dark:bg-gray-800"
	role="alert"
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
	use:autoAnimate={{ duration: 100 }}>
	<div class="flex flex-col gap-4 justify-between items-center w-full md:flex-row">
		<div class="flex justify-between items-start w-full md:items-center md:w-4/6">
			<div class="w-5/6 font-medium break-all line-clamp-2" title={link}>
				{link}
			</div>
			<A class="font-bold" href={completeUrl} target="_blank" aClass="text-right">/{slug}</A>
		</div>
		<div class="flex gap-1 items-center w-full md:w-auto justify-stretch">
			<Button
				on:click={() => navigator.clipboard.writeText(completeUrl)}
				id={`copy-button-${slug}`}
				color="light"
				class="w-full md:w-auto"
				type="button">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
				</svg>
			</Button>
			<Tooltip trigger="click" triggeredBy={`#copy-button-${slug}`}>Copied</Tooltip>
			<Button
				disabled={!$page.data.session?.user}
				href={`/${slug}/edit`}
				color="light"
				class="w-full md:w-auto">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
				</svg>
			</Button>
			<Button
				color="red"
				on:click={() => (popupModal = true)}
				disabled={!$page.data.session?.user}
				class="w-full md:w-auto">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
				</svg>
			</Button>
		</div>
	</div>
	{#if isHovered}
		<div class="flex flex-wrap gap-2">
			<div class="flex">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="mr-1 w-5 h-5">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<p
					title={createdDate.toLocaleString('en-GB', {
						dateStyle: 'full',
						timeStyle: 'medium',
					})}>
					{dayjs().to(createdDate)}
				</p>
			</div>
			{#if createdDate.toISOString() !== updatedDate.toISOString()}
				<p
					class="underline"
					title={updatedDate.toLocaleString('en-GB', {
						dateStyle: 'full',
						timeStyle: 'medium',
					})}>
					(Updated {dayjs().to(updatedDate)})
				</p>
			{/if}
			<div class="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="mr-1 w-5 h-5">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				{visitorsNumber}
				{visitorsNumber > 1 ? 'visitors' : 'visitor'}
			</div>
		</div>
	{/if}
</div>
<DeleteModal bind:popupModal {slug} />
