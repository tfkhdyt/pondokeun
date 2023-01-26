<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let image: string;
	export let name: string | null | undefined;
	export let email: string | null | undefined;
</script>

<article class="card variant-ghost-surface rounded-xl">
	<div class="flex items-start p-6 ">
		<Avatar alt="Speaker" src={image} class="h-14 w-14 rounded-lg object-cover" />

		<div class="ml-4">
			<h4 class="font-medium sm:text-md dark:text-gray-300">
				{name}
			</h4>

			<p class="text-sm text-gray-700 dark:text-gray-400">
				{email}
			</p>
		</div>
	</div>

	<div class="flex justify-end -mt-6">
		<button
			class="flex items-center rounded-tl-xl rounded-br-xl bg-red-500 hover:bg-red-600 py-1.5 px-3 text-white transition duration-500 ease-in-out"
			on:click={() => signOut()}
		>
			<p class="font-medium">Log out</p>
		</button>
	</div>
</article>
