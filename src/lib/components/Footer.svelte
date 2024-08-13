<script>
  import { BreadCrumb } from '$lib/types/layoutTypes.js';
  import { categories } from '$lib/stores/categories';
  import { globals } from '$lib/globals';
  import Icon from '@iconify/svelte';
  import BtnBusiness from './buttons/BtnBusiness.svelte';
  import GutterMain from './gutters/GutterMain.svelte';

  const crumbs = [
    new BreadCrumb('Главная', null, '/'),
    new BreadCrumb('О бренде', null, '/about_brand'),
    new BreadCrumb('Адреса и контакты', null, '/contacts'),
    new BreadCrumb('Оборудование', $categories, '/categories'),
  ];
</script>

<footer class="clr-white-soft bg-clr-green-dark h-40-vh">
  <GutterMain
    classList={['d-grid', 'justify-content-between', 'footer-content']}>
    <ul class="list fs-headline-sm clr-white">
      <li class="pb-3">
        <img
          src="{globals.imagePath}logo/esq.svg"
          alt="esq_logo"
          class="object-fit-contain w-50" />
      </li>
      <li>
        <span class="d-inline-block text-nowrap align-middle">
          <Icon icon="lucide:mail" style="color: #fafafa" />
          <a class="ps-2" href="mailto:esq@mail.com" target="_blank">
            esq@mail.com
          </a>
        </span>
      </li>
      <li>
        <span class="d-inline-block text-nowrap align-middle">
          <Icon icon="lucide:phone" style="color: #fafafa" />
          <p class="d-inline ps-2">+7 (812) 320-88-81</p>
        </span>
      </li>
      <li>
        <span class="d-inline-block text-nowrap align-middle">
          <Icon icon="iconoir:telegram" style="color: #fafafa" />
          <a class="ps-2" href="#" target="_blank">Telegram</a>
        </span>
      </li>
    </ul>

    <ul class="list fs-body-lg fw-semi-bold d-grid links flex-row-gap-0-5">
      {#each crumbs.slice(0, 3) as crumb}
        <li>
          <a class="clr-white" href={crumb.href}>{crumb.name}</a>
        </li>
      {/each}

      <li>
        <BtnBusiness />
      </li>
    </ul>

    <div data-description="Empty DIV to add spaces between cols"></div>

    <ul class="list fs-headline-sm">
      <li class="fs-body-lg clr-gray-disabled">Оборудование</li>
      {#each $categories.slice(0, 7) as category}
        <li>
          <a class="clr-white" href={'/category' + category.href}>
            {category.name}
          </a>
        </li>
      {/each}
    </ul>

    <ul class="list fs-headline-sm">
      <li class="o-0">Оборудование</li>
      {#each $categories.slice(7, 12) as category}
        <li>
          <a class="clr-white" href={'/category' + category.href}>
            {category.name}
          </a>
        </li>
      {/each}
    </ul>
  </GutterMain>
</footer>

<style lang="scss" scoped>
  :global(.footer-content) {
    grid-template-columns: 15% 15% 15% 25% 25%;

    .list {
      padding-left: 0 !important;
      li {
        padding-bottom: 0.6rem;
      }
    }

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
