<script>
  import { navDropDownCategoriesShow } from '$lib/stores/ui';
  import Icon from '@iconify/svelte';
  import { fade } from 'svelte/transition';

  /**@type {import('$lib/types/layoutTypes').BreadCrumb[]}*/
  export let menuItems = [],
    /**@type {String}*/
    title = '',
    textColor = 'white',
    /**@type {String[]}*/
    dropdownMenuClasses = [''];

  $: collapsed = !$navDropDownCategoriesShow;

  function toggleDropdown(
    /**@type {MouseEvent & { currentTarget: EventTarget & HTMLDivElement; }}*/ e,
  ) {
    collapsed = !collapsed;
    navDropDownCategoriesShow.update((val) => (val = !collapsed));
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="dropdown fs-body-lg" on:click={(e) => toggleDropdown(e)}>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="#">
    <span class="d-flex flex-nowrap align-items-center">
      {title}
      <Icon
        icon="mingcute:{$navDropDownCategoriesShow ? 'up' : 'down'}-line"
        width="24px"
        height="24px"
        style="color: white" />
    </span>
  </a>
  {#if $navDropDownCategoriesShow}
    <ul
      in:fade={{ duration: 400 }}
      out:fade={{ duration: 400 }}
      class="dropdown-menu d-grid flex-column-gap-1 flex-row-gap-1 bg-clr-green-dark-mid-opacity flex-row-gap-0-5 {dropdownMenuClasses
        .map((c) => c)
        .join(' ')} flex-wrap">
      {#each menuItems as item}
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li
          class="p-2"
          on:click|self={(e) => {
            e.target.firstElementChild.click();
            toggleDropdown();
          }}>
          <a class="w-100 h-100" href="/category{item.href}">{item.name}</a>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss" scoped>
  .dropdown {
    background-color: inherit;
    cursor: pointer;
    user-select: none;

    a {
      span > img {
        width: 20px;
        object-fit: contain;
        margin-left: 5px;
      }
    }

    .dropdown-menu {
      backdrop-filter: blur(20px);
      grid-template-columns: repeat(2, 1fr);
      border-radius: 0 0 1rem 1rem;
    }
  }
</style>
