<script>
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import { categories, branches } from '$lib/stores/categories.js';
  import {
    isMobile,
    navDropDownCategoriesShow,
    showNavMobileMenu,
  } from '$lib/stores/ui.js';
  import { onMount } from 'svelte';
  import ScrollTop from '$lib/components/ScrollTop.svelte';
  import { navigating } from '$app/stores';

  export let data;
  console.log(data);
  // @ts-ignore
  categories.set(data.rootCategories);
  branches.set(data.branchesByCountries);

  /**@type {Number}*/
  let innerWidth,
    breakPoint = 700,
    scrollY = 0;

  onMount(() => {
    isMobile.set(innerWidth < breakPoint);
  });

  $: if (innerWidth) {
    isMobile.update((v) => (v = innerWidth < 800));
  }

  function handleMainElClick(e) {
    if (
      e.target.classList.length === 0 ||
      !e.target.classList.contains('dropdown')
    )
      navDropDownCategoriesShow.update((val) => (val = false));
    showNavMobileMenu.update((val) => (val = false));
  }

  $: if ($navigating) showNavMobileMenu.update((val) => (val = false));
</script>

<svelte:window bind:innerWidth bind:scrollY />

<Header />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main class="w-100 h-100 flex-1" on:click={handleMainElClick}>
  <slot />
  {#if scrollY > 200}
    <ScrollTop />
  {/if}
</main>
<Footer />
