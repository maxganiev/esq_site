<script>
  import { BreadCrumb } from '$lib/types/layoutTypes.js';
  import { categories } from '$lib/stores/categories';
  import Dropdown from './Dropdown.svelte';
  import { page } from '$app/stores';
  import { globals } from '$lib/globals';
  import BtnBusiness from './buttons/BtnBusiness.svelte';
  import GutterX from './gutters/GutterX.svelte';

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
  <nav
    class="navbar w-100 h-15-vh align-items-center fs-body-lg clr-white-soft bg-clr-green-dark fw-light">
    <GutterX classList={['d-flex', 'align-items-center']}>
      <ul
        class="list w-100 h-100 mx-auto d-flex justify-content-between w-65 align-items-center ps-0 flex-wrap"
        bind:offsetWidth={listOffsetWidth}>
        <li><img src="{globals.imagePath}logo/esq.svg" alt="esq_logo" /></li>

        {#each crumbs as crumb, index}
          <li
            class="fw-semi-bold {activeCrumbIdx === index
              ? 'active-item'
              : ''}">
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
              <a href={crumb.href} class="fw-semi-bold">{crumb.name}</a>
            {/if}
          </li>
        {/each}
      </ul>

      <div class="flex-grow-1 d-flex justify-content-end hover-item">
        <BtnBusiness />
      </div>
    </GutterX>
  </nav>
</header>
