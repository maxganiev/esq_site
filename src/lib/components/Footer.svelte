<script>
  import { BreadCrumb } from '$lib/types/layoutTypes.js';
  import { categories } from '$lib/stores/categories';
  import { globals } from '$lib/globals';
  import Icon from '@iconify/svelte';
  import BtnBusiness from './buttons/BtnBusiness.svelte';
  import GutterMain from './gutters/GutterMain.svelte';
  import { isMobile } from '$lib/stores/ui';
  import { contacts } from '$lib/stores/contacts';

  const crumbs = [
    new BreadCrumb('Главная', null, '/'),
    new BreadCrumb('О бренде', null, '/about_brand'),
    new BreadCrumb('Адреса и контакты', null, '/contacts'),
    new BreadCrumb('Оборудование', $categories, '/categories'),
  ];
</script>

<footer class="clr-white-soft bg-clr-green-dark h-40-vh">
  <GutterMain>
    <!--Desktop-->
    {#if !$isMobile}
      <div class="d-grid justify-content-between footer-content">
        <ul class="list fs-headline-sm clr-white">
          <li class="pb-3">
            <img
              src="{globals.imagePath}logo/esq.svg"
              alt="esq_logo"
              class="object-fit-contain w-50" />
          </li>
          {#each $contacts as contact (contact.id)}
            <li>
              <span class="d-inline-block text-nowrap align-middle">
                <Icon icon={contact.icon} style="color: #fafafa" />
                <a class="ps-2" href={contact.href} target="_blank">
                  {contact.text}
                </a>
              </span>
            </li>
          {/each}
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
      </div>
    {:else}
      <!--Mobile-->
      <div class="d-flex flex-column flex-row-gap-2-5">
        <div class="d-flex flex-column align-items-center flex-row-gap-1-5">
          <img
            src="{globals.imagePath}logo/esq.svg"
            alt="esq_logo"
            class="object-fit-contain w-{!$isMobile ? 50 : 30}" />
          <BtnBusiness />
        </div>

        <ul
          class="list fs-label-lg fw-semi-bold d-grid links flex-row-gap-1 p-0 text-center">
          {#each crumbs.slice(0, 3) as crumb}
            <li>
              <a class="clr-white" href={crumb.href}>{crumb.name}</a>
            </li>
          {/each}
        </ul>

        <div class="d-flex flex-column-gap-0-75 justify-content-center">
          {#each $contacts as contact (contact.id)}
            <div
              class="border border-1 rounded-circle border-white p-2 ratio-1x1 d-flex align-items-center justify-content-center">
              <span
                class="w-50 h-50 d-flex align-items-center justify-content-center">
                <a class="p-0" href={contact.href} target="_blank">
                  <Icon
                    icon={contact.icon}
                    style="color: #fafafa"
                    width="1em"
                    height="1em" />
                </a>
              </span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
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
