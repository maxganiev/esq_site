<script>
  import { navDropDownCategoriesShow } from '$lib/stores/ui';
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
    e.preventDefault();
    collapsed = !collapsed;
    navDropDownCategoriesShow.update((val) => (val = !collapsed));
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="dropdown fs-body-lg" on:click|self={(e) => toggleDropdown(e)}>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="#">
    <span class="d-flex flex-nowrap">
      {title}
      <img
        src="/assets/images/chevron-{$navDropDownCategoriesShow
          ? 'up'
          : 'down'}-solid-{textColor}.svg"
        alt="chevron" />
    </span>
  </a>
  {#if $navDropDownCategoriesShow}
    <ul
      in:fade={{ duration: 400 }}
      out:fade={{ duration: 400 }}
      class="dropdown-menu d-flex flex-column-gap-3 flex-row-gap-1-5 {dropdownMenuClasses
        .map((c) => c)
        .join(' ')} flex-wrap rounded-bottom">
      {#each menuItems as item}
        <li class="col-md-5 col-sm-12">
          <a href={item.href}>{item.name}</a>
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
      pointer-events: none;
      span > img {
        width: 20px;
        object-fit: contain;
        margin-left: 5px;
      }
    }
  }
</style>
