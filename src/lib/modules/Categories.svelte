<script>
  import GutterMain from '$lib/components/gutters/GutterMain.svelte';
  import { globals } from '$lib/globals';
  import { categories } from '$lib/stores/categories';
  import { isMobile } from '$lib/stores/ui';
  import Icon from '@iconify/svelte';

  const path = globals.imagePath + 'categories/';
  $: minHeightCellClass = $isMobile ? 'h-20-vh' : 'h-40-vh';
  $: catNameSpanClass = $isMobile
    ? 'fs-title-lg lh-lg'
    : 'fs-headline-md lh-md';
</script>

<div class="w-100 h-100-vh bg-clr-white-beige">
  <GutterMain classList={['categories', 'flex-column-gap-1', 'flex-row-gap-1']}>
    <h2
      class="clr-green-dark fs-display-md fw-semi-bold"
      style="grid-column: 1/{$isMobile ? 3 : 5}">
      Ключевой ассортимент
    </h2>
    {#each $categories as category (category.id)}
      <!--Комплектные трансформаторные подстанции-->
      {#if category.id === 1}
        <div
          class="category-col {minHeightCellClass} pos-r"
          style="grid-column: 1/3">
          <a
            href="category{category.href}"
            class="d-block w-100 h-100 rounded-3 category-link-hover"
            style="background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url({path}{category.image}) center center/cover;">
            <span
              class="clr-white {catNameSpanClass} w-90 text-wrap d-block pt-3 px-3">
              {category.name}
            </span>
            <button
              class="btn btn-sm rounded-circle ratio-1x1 bg-clr-white pos-a me-2 mb-2 o-0 d-flex justify-content-center align-items-center btn-arrow-hover">
              <Icon
                icon="lucide:arrow-right"
                width="1.2rem"
                height="1.2rem"
                class="clr-orange" />
            </button>
          </a>
        </div>
        <!--Комплектное распределительное устройство-->
      {:else if category.id === 13}
        <div
          class="category-col {minHeightCellClass} pos-r center center/cover;"
          style="grid-column: {$isMobile ? '2/3' : '2/4'}">
          <a
            href="category{category.href}"
            class="d-block w-100 h-100 rounded-3 category-link-hover"
            style="background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url({path}{category.image})">
            <span
              class="clr-white {catNameSpanClass} w-90 text-wrap d-block pt-3 px-3">
              {category.name}
            </span>
            <button
              class="btn btn-sm rounded-circle ratio-1x1 bg-clr-white pos-a me-2 mb-2 o-0 d-flex justify-content-center align-items-center btn-arrow-hover">
              <Icon
                icon="lucide:arrow-right"
                width="1.2rem"
                height="1.2rem"
                class="clr-orange" />
            </button>
          </a>
        </div>
        <!--Разное-->
      {:else if category.id === 17}
        <div class="category-col {minHeightCellClass} pos-r">
          <a
            class="d-block w-100 h-100 rounded-3 bg-clr-white"
            href={category.href}>
            <span
              class="clr-green-dark {catNameSpanClass} w-90 text-wrap d-block pt-3 px-3">
              {category.name}
            </span>

            <Icon
              icon="lucide:arrow-right"
              width="1.2rem"
              height="1.2rem"
              class="clr-orange pos-a  me-3 mb-3  btn-arrow-hover" />
          </a>
        </div>
      {:else}
        <div class="category-col {minHeightCellClass} pos-r">
          <a
            href="category{category.href}"
            class="d-block w-100 h-100 rounded-3 category-link-hover"
            style="background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url({path}{category.image}) center center/cover;">
            <span
              class="clr-white {catNameSpanClass} w-90 text-wrap d-block pt-3 px-3">
              {category.name}
            </span>
            <button
              class="btn btn-sm rounded-circle ratio-1x1 bg-clr-white pos-a me-2 mb-2 o-0 d-flex justify-content-center align-items-center btn-arrow-hover">
              <Icon
                icon="lucide:arrow-right"
                width="1.2rem"
                height="1.2rem"
                class="clr-orange" />
            </button>
          </a>
        </div>
      {/if}
    {/each}
  </GutterMain>
</div>

<style lang="scss" scoped>
  :global(.btn-arrow-hover) {
    bottom: 1rem;
    right: 1rem;
  }

  :global(.categories) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 150px) and (max-width: 750px) {
    :global(.categories) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .category-link-hover:hover > button {
    opacity: 1 !important;
    transition: opacity 0.4s ease-in;
  }
</style>
