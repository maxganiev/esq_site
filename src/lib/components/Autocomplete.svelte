<script>
  import { Debounce } from '$lib/utils/debounce';
  import Icon from '@iconify/svelte';
  import { createEventDispatcher, onMount } from 'svelte';

  const debounce = new Debounce();

  /**@type {any[]}*/
  export let items = [],
    /**@type {String | undefined}*/
    itemKey = undefined,
    /**@type {String }*/
    placeholder = '';

  let query = '';

  /**
   * @param {any} item
   * @param {String} query
   */
  function match(item, query) {
    const filterTerm = itemKey ? item[itemKey] : item;

    return filterTerm.toLowerCase().includes(query.toLowerCase());
  }

  /**
   * @param {{ target: { value: any; }; }} e
   */
  function search() {
    itemsFound =
      query.length > 0
        ? items.filter((item) => match(item, query))
        : [...items];
  }

  /**
   * @param {any} item
   */
  function itemText(item) {
    return itemKey ? item[itemKey] : item;
  }

  function focus() {
    showItems = true;
  }

  function blur() {
    setTimeout(() => {
      showItems = false;
    }, 500);
  }

  /**
   * @type {String | undefined}
   */
  let selectedItemValue = undefined;

  const dispatch = createEventDispatcher();

  /**
   * @param {any} item
   */
  function selectItem(item) {
    query = itemText(item);
    selectedItemValue = itemText(item);
    showItems = false;

    dispatch('select', selectedItemValue);
  }

  /** @type {any[]}*/
  let itemsFound = [],
    showItems = false;

  onMount(() => {
    search();
  });
</script>

<div {...$$restProps}>
  <input
    class="pos-sticky top-left w-100 h-100"
    type="text"
    autocomplete="-"
    {placeholder}
    bind:value={query}
    on:focus={focus}
    on:blur={blur}
    on:input={() => debounce.start(search, [])} />
  <Icon
    icon="lucide:chevron-{!showItems ? 'down' : 'up'}"
    width="1.2rem"
    height="1.2rem"
    class="clr-green-dark pos-a chevron-autocomplete pointer-none" />
  {#if itemsFound.length > 0}
    <ul
      class="pos-a p-2 mt-4 w-100 {!showItems
        ? 'd-none'
        : ''} z-1 rounded-2 list-items">
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      {#each itemsFound as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
          on:click={() => selectItem(item)}
          class={selectedItemValue === itemText(item) ? 'active-item' : ''}>
          {itemText(item)}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss" scoped>
  div {
    position: relative;

    input {
      border: none;
      box-shadow: none;
      outline: none;
    }
    ul {
      min-height: 5vh;
      max-height: 30vh;
      overflow-y: scroll;
      overscroll-behavior: contain;
      background: inherit;

      li:hover {
        cursor: pointer;
        opacity: 0.3;
      }
    }
  }

  :global(.chevron-autocomplete) {
    top: 25%;
    right: 5%;
  }

  .list-items {
    border: 1px #eee solid;
    border-top: none;
    top: 25%;
    left: 0;
  }
</style>
