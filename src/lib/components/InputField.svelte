<script lang="ts">
	export let type = 'text';
	export let name: string;
	export let placeholder: string;
	export let customClass = '';
	export let pattern: string | undefined = undefined;
</script>

<input {type} {name} {placeholder} {pattern} required class=" {customClass}" />
