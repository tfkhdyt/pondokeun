<script lang="ts">
  export let type = 'text';
  export let name: string;
  export let placeholder: string;
  export let customClass = '';
  export let pattern: string | undefined = undefined;
</script>

<input
  {type}
  {name}
  {placeholder}	
  {pattern}
  required
	class="p-4 w-full rounded-md border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm focus:border-yellow-600 focus:ring-yellow-600 dark:text-gray-300 transition duration-500 ease-in-out {customClass}"
/>
