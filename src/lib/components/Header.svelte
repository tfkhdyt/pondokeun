<script lang="ts">
	import { page } from '$app/stores';
	import { Button, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';

	$: currentPath = $page.url.pathname;
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<img
			src="https://flowbite.com/docs/images/logo.svg"
			class="mr-3 h-6 sm:h-9"
			alt="Flowbite Logo"
		/>
		<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
			Pondokeun
		</span>
	</NavBrand>
	<div class="flex md:order-2">
		<Button size="sm" pill href="/signin">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="mr-2 w-5 h-5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
				/>
			</svg>
			Sign In</Button
		>
		<NavHamburger on:click={toggle} />
	</div>
	<NavUl {hidden} class="order-1">
		<NavLi href="/" active={currentPath === '/'}>Home</NavLi>
		<NavLi href="https://www.tfkhdyt.my.id" target="_blank">About Me</NavLi>
		<NavLi href="https://github.com/tfkhdyt/pondokeun" target="_blank">Source Code</NavLi>
	</NavUl>
</Navbar>
