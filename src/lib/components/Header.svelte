<script>
  import { BreadCrumb } from '$lib/types/layoutTypes.js';
  import { categories } from '$lib/stores/categories';
  import Dropdown from './Dropdown.svelte';
  import { page } from '$app/stores';
  import { globals } from '$lib/globals';
  import BtnBusiness from './buttons/BtnBusiness.svelte';
  import GutterX from './gutters/GutterX.svelte';
  import { isMobile, showNavMobileMenu } from '$lib/stores/ui';
  import { scale, fly } from 'svelte/transition';
  import { bounceOut } from 'svelte/easing';

  $: crumbs = [
    new BreadCrumb('Главная', null, '/'),
    new BreadCrumb('Оборудование', $categories, '/categories'),
    new BreadCrumb('О бренде', null, '/about_brand'),
    new BreadCrumb('Адреса и контакты', null, '/contacts'),
    new BreadCrumb(
      'Оставить заявку',
      null,
      $page.route.id === '/' || $page.route.id === '/contacts'
        ? '#contact-form'
        : '/contacts#contact-form',
    ),
  ];
  // .slice(
  //   0,
  //   $page.route.id === '/' || $page.route.id === '/contacts' ? undefined : -1,
  // );

  $: activeCrumbIdx = crumbs.findIndex((cr) => cr.href === $page.route.id);
  $: listOffsetWidth = 0;
</script>

<header>
  <!--Desktop-->
  {#if !$isMobile}
    <nav
      class="navbar p-0 w-100 h-15-vh align-items-center fs-body-lg clr-white-soft bg-clr-green-dark fw-light">
      <GutterX classList={['d-flex', 'align-items-center', 'flex-wrap']}>
        <a href="/" style="margin-right:2.5%;">
          <img src="{globals.imagePath}logo/esq.svg" alt="esq_logo" />
        </a>
        <ul
          class="list w-65 h-100 mx-auto d-flex justify-content-between align-items-center ps-0"
          bind:offsetWidth={listOffsetWidth}>
          {#each crumbs as crumb, index}
            <li class="fw-semi-bold">
              {#if crumb.subcategories}
                <Dropdown
                  title={crumb.name}
                  menuItems={$categories.slice(0, -1)}
                  dropdownMenuClasses={[
                    'clr-white-soft',
                    'bg-clr-green-dark-shaded',
                    'mt-4',
                    'w-45-vw',
                    'justify-content-between',
                    'fs-body-lg',
                    'hover-item',
                    'fw-light',
                  ]} />
              {:else}
                <a
                  href={crumb.href}
                  class="fw-semi-bold {activeCrumbIdx === index
                    ? 'active-item'
                    : ''}">
                  {crumb.name}
                </a>
              {/if}
            </li>
          {/each}
        </ul>
        <div class="flex-grow-1 d-flex justify-content-end hover-item">
          <BtnBusiness />
        </div>
      </GutterX>
    </nav>
    <!--Mobile-->
  {:else}
    <nav
      class="navbar py-4 px-0 w-100 h-15-vh align-items-center fs-label-lg clr-white-soft bg-clr-green-dark fw-light">
      <GutterX classList={['d-flex', 'align-items-center', 'flex-wrap']}>
        <a href="/" style="margin-right:2.5%;" class="w-25">
          <img
            src="{globals.imagePath}logo/esq.svg"
            alt="esq_logo"
            class="w-100" />
        </a>
        <div class="flex-grow-1 d-flex justify-content-end">
          {#if !$showNavMobileMenu}
            <button
              in:scale={{
                duration: 400,
                opacity: 0.5,
                start: 0.5,
                easing: bounceOut,
              }}
              class="bg-clr-transparent border-0 ms-auto"
              on:click={() => showNavMobileMenu.update((val) => (val = true))}>
              <img
                src="{globals.imagePath}hamburger.png"
                alt="action icon"
                class="w-100 object-fit-contain" />
            </button>
          {:else}
            <button
              in:scale={{
                duration: 400,
                opacity: 0.5,
                start: 0.5,
                easing: bounceOut,
              }}
              class="bg-clr-transparent border-0 ms-auto"
              on:click={() => showNavMobileMenu.update((val) => (val = false))}>
              <img
                src="{globals.imagePath}close.png"
                alt="action icon"
                class="w-100 object-fit-contain" />
            </button>
          {/if}
        </div>

        {#if $showNavMobileMenu}
          <ul
            class="d-flex list flex-row-gap-1-75 flex-column w-100 pos-a list-mobile z-2 ps-0 ps-2-5-rem fs-label-lg bg-clr-green-dark"
            bind:offsetWidth={listOffsetWidth}
            in:fly={{
              duration: 400,
              x: 100,
            }}
            out:fly={{
              duration: 400,
              x: 100,
            }}>
            {#each crumbs as crumb, index}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
              <li
                class="fw-semi-bold w-100 fs-label-lg {index === 0
                  ? 'mt-3'
                  : ''}"
                on:click={() =>
                  !crumb.subcategories &&
                  showNavMobileMenu.update((val) => (val = false))}>
                {#if crumb.subcategories}
                  <Dropdown
                    title={crumb.name}
                    menuItems={$categories.slice(0, -1)}
                    dropdownMenuClasses={[
                      'clr-white-soft',
                      'bg-clr-green-dark-shaded',
                      'mt-2',
                      'w-100',
                      'justify-content-between',
                      'fs-label-lg',
                      'hover-item',
                      'fw-light',
                      'pos-r',
                    ]} />
                {:else}
                  <a
                    href={crumb.href}
                    class="fw-semi-bold {activeCrumbIdx === index
                      ? 'active-item'
                      : ''}">
                    {crumb.name}
                  </a>
                {/if}
              </li>
            {/each}

            <li class="flex-grow-1 d-flex align-items-end pb-2-5-rem">
              <BtnBusiness />
            </li>
          </ul>
        {/if}
      </GutterX>
    </nav>
  {/if}
</header>

<style lang="scss" scoped>
  $list-upper-gutter-mobile: calc(60px + 34%);

  .list-mobile {
    top: $list-upper-gutter-mobile;
    left: 0;
    //height: calc(100vh - $list-upper-gutter-mobile);
  }
</style>
