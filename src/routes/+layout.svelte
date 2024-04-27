<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { categories } from '$lib/stores/categories.js';
	import { isMobile } from '$lib/stores/ui.js';
	import { onMount } from 'svelte';

	export let data;
	console.log(data);
	// @ts-ignore
	categories.set(data.rootCategories);

	/**@type {Number}*/
	let innerWidth,
		breakPoint = 700;

	onMount(() => {
		isMobile.set(innerWidth < breakPoint);
	});

	$: if (innerWidth) {
		isMobile.update((v) => (v = innerWidth < 700));
	}
</script>

<svelte:window bind:innerWidth />

<Header />
<main class="w-100 h-100 flex-1">
	<slot />
</main>
<Footer />
