<script lang="ts">
  export let customClass = '';
</script>

<button
	class="inline-block rounded py-3 text-sm font-medium transition duration-500 ease-in-out focus:outline-none focus:ring active:ring-0 {customClass}"
>
  <slot />
</button>
