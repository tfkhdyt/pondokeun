<script lang="ts">
  export let primaryColor: string;
  export let secondaryColor: string;
</script>

<button
	class="inline-block rounded bg-{primaryColor}-500 hover:bg-{secondaryColor}-500 py-3 text-sm font-medium text-white transition duration-500 ease-in-out focus:outline-none focus:ring active:bg-{secondaryColor}-700 w-2/6 active:ring-0"
>
  <slot />
</button>
