<script>
  import { BreadCrumb } from '$lib/types/layoutTypes.js';
  import { categories } from '$lib/stores/categories';
  import { page } from '$app/stores';
  import { globals } from '$lib/globals';
  import Icon from '@iconify/svelte';
  import BtnBusiness from './buttons/BtnBusiness.svelte';

  const crumbs = [
    new BreadCrumb('Главная', null, '/'),
    new BreadCrumb('О бренде', null, '/about_brand'),
    new BreadCrumb('Адреса и контакты', null, '/contacts'),
    new BreadCrumb('Оборудование', $categories, '/categories'),
  ];

  $: activeCrumbIdx = crumbs.findIndex((cr) => cr.href === $page.route.id);
</script>

<footer
  class="clr-white-soft bg-clr-green-dark d-grid h-40-vh flex-column-gap-2 p-5">
  <ul class="list lh-lg fs-body-md clr-white">
    <li class="pb-3">
      <img
        src="{globals.imagePath}logo/esq.svg"
        alt="esq_logo"
        class="object-fit-contain w-50" />
    </li>
    <li>
      <span class="d-flex flex-column-gap-0-5 align-items-center">
        <Icon
          icon="ic:baseline-mail"
          style="color: white"
          width="1rem"
          height="1rem" />
        <a class="clr-white" href="mailto:esq@mail.com" target="_blank">
          esq@mail.com
        </a>
      </span>
    </li>
    <li>
      <span class="d-flex flex-column-gap-0-5 align-items-center">
        <Icon
          icon="ic:round-phone"
          style="color: white"
          width="1rem"
          height="1rem" />
        <p class="clr-white m-0">+7 812 240-05-13</p>
      </span>
    </li>
    <li>
      <span class="d-flex flex-column-gap-0-5 align-items-center">
        <Icon
          icon="basil:telegram-solid"
          style="color: white"
          width="1rem"
          height="1rem" />
        <a class="clr-white" href="#" target="_blank">Telegram</a>
      </span>
    </li>
  </ul>

  <ul class="list lh-lg fs-body-lg d-grid links">
    {#each crumbs.slice(0, 3) as crumb, index}
      <li class={activeCrumbIdx === index ? 'active-item' : ''}>
        <a class="clr-white" href={crumb.href}>{crumb.name}</a>
      </li>
    {/each}

    <li>
      <BtnBusiness />
    </li>
  </ul>

  <ul class="list lh-lg fs-body-md">
    <li class="fs-body-lg">Оборудование</li>
    {#each $categories.slice(0, 7) as category}
      <li><a class="clr-white" href={category.href}>{category.name}</a></li>
    {/each}
  </ul>

  <ul class="list lh-lg fs-body-md">
    {#each $categories.slice(7, 12) as category}
      <li><a class="clr-white" href={category.href}>{category.name}</a></li>
    {/each}
  </ul>
</footer>

<style lang="scss" scoped>
  footer {
    grid-template-columns: 25% 15% 25% 25%;

    .links {
      grid-template-rows: repeat(3, 30px);

      li:last-of-type {
        align-self: self-end;
      }
    }
  }

  @media (min-width: 150px) and (max-width: 750px) {
    footer {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
