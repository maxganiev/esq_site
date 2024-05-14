<script>
  import { BreadCrumb } from '$lib/types/layoutTypes.js';
  import { categories } from '$lib/stores/categories';
  import Dropdown from './Dropdown.svelte';
  import { page } from '$app/stores';
  import { globals } from '$lib/globals';
  import BtnBusiness from './buttons/BtnBusiness.svelte';
  import GutterMain from './gutters/GutterMain.svelte';

  $: crumbs = [
    new BreadCrumb('Главная', null, '/'),
    new BreadCrumb('Оборудование', $categories, '/categories'),
    new BreadCrumb('О бренде', null, '/about_brand'),
    new BreadCrumb('Адреса и контакты', null, '/contacts'),
    new BreadCrumb('Оставить заявку', null, '#contact-form'),
  ].slice(
    0,
    $page.route.id === '/' || $page.route.id === '/contacts' ? undefined : -1,
  );

  $: activeCrumbIdx = crumbs.findIndex((cr) => cr.href === $page.route.id);
  $: listOffsetWidth = 0;
</script>

<header>
  <nav
    class="navbar w-100 h-15-vh align-items-center fs-body-lg clr-white-soft bg-clr-green-dark fw-light">
    <GutterMain>
      <ul
        class="list w-100 h-100 mx-auto d-flex flex-column-gap-2 align-items-center ps-0 pe-4"
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
                  'bg-clr-seawave-dark',
                  'mt-4',
                  'w-65-vw',
                  'fs-body-lg',
                  'hover-item',
                  'fw-light',
                ]} />
            {:else}
              <a href={crumb.href} class="fw-semi-bold">{crumb.name}</a>
            {/if}
          </li>
        {/each}

        <li class="flex-grow-1 d-flex justify-content-end hover-item">
          <BtnBusiness />
        </li>
      </ul>
    </GutterMain>
  </nav>
</header>
