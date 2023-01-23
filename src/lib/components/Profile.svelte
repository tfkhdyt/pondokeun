<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';

  export let image: string | null | undefined;
  export let name: string | null | undefined;
  export let email: string | null | undefined;
</script>

<article class="rounded-xl border-2 border-gray-100 bg-white">
	<div class="flex items-start p-6">
		<img
			alt="Speaker"
			src={image}
			class="h-14 w-14 rounded-lg object-cover"
		/>

		<div class="ml-4">
			<h3 class="font-medium sm:text-lg">
				Welcome, {name}
			</h3>

			<p class="text-sm text-gray-700">
				{email}
			</p>
		</div>
	</div>

	<div class="flex justify-end -mt-6">
		<button
			class="flex items-center rounded-tl-xl rounded-br-xl bg-red-600 hover:bg-red-800 py-1.5 px-3 text-white transition duration-500 ease-in-out"
			on:click={() => signOut()}
		>
			<p class="font-medium">Log out</p>
		</button>
	</div>
</article>
