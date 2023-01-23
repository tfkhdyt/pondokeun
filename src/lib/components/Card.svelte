<script lang="ts">
  export let customClass = '';
</script>

<div
	class="rounded-2xl bg-gradient-to-br from-yellow-400 to-red-600 p-1 shadow-xl dark:shadow-gray-700/50 dark:from-yellow-600 dark:to-red-800 m-4 {customClass}"
>
	<div class="block rounded-xl bg-white dark:bg-gray-800 p-6 sm:p-8"><slot /></div>
</div>
