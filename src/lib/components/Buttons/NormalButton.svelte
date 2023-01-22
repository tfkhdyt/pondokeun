<script lang="ts">
  export let customClass: string;
</script>

<button
	class="inline-block rounded py-3 text-sm font-medium text-white transition duration-500 ease-in-out focus:outline-none focus:ring w-2/6 active:ring-0 {customClass}"
>
  <slot />
</button>
