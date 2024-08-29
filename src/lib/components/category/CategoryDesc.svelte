<script>
  import { isMobile } from '$lib/stores/ui';

  export let category;

  $: fontSizeLg = $isMobile ? 'fs-label-lg' : 'fs-body-md';
  $: fontSizeMd = $isMobile ? 'fs-title-lg' : 'fs-body-sm';
</script>

<div
  {...$$restProps}
  class="col-md-12 d-flex {!$isMobile
    ? 'flex-column-gap-3'
    : 'flex-column flex-row-gap-1'} bg-clr-white p-4 rounded-3">
  <div class="h-100 rounded-3 w-{!$isMobile ? 40 : 100} pos-r">
    <h3
      class="fs-{!$isMobile
        ? 'headline-md'
        : 'display-md'} fw-bold mb-{!$isMobile ? 2 : 4} mb-4">
      {category.name}
    </h3>
    <!-- {#if category.promo_desc && !$isMobile}
      <div
        class="promo-desc-wrapper pos-a px-2 py-1 w-100 bg-clr-green-dark-shaded rounded-3">
        <small class="clr-white {fontSizeLg} fw-regular lh-sm">
          {category.promo_desc}
        </small>
      </div>
    {/if} -->
    <img
      src={'/assets/images/categories/' + category.image}
      class="w-100 rounded-3"
      alt="asset" />
  </div>
  <div class="h-100 rounded-3 clr-green-dark w-fit-content">
    {#if category.key_features && category.key_features.length > 0}
      {@const secondaryKeyFeatures = category.key_features.filter(
        (/** @type {{ type_id: Number; }} */ keyFeat) => keyFeat.type_id === 2,
      )}
      {#each secondaryKeyFeatures as categoryFeat, index (categoryFeat.id)}
        <strong class={fontSizeMd}>{categoryFeat.label || ''}</strong>

        {#if categoryFeat.text && categoryFeat.text.length > 0}
          <ul
            class="list list-dashed {fontSizeMd} lh-{$isMobile
              ? 'unset'
              : 'sm'} text-wrap w-{$isMobile ? '100' : '40-vw'} ps-1 {$isMobile
              ? 'd-flex flex-column flex-row-gap-1 mt-2'
              : ''}">
            {#each categoryFeat.text.split('\n') as text}
              <li>
                {text}
              </li>
            {/each}
          </ul>
        {/if}

        {#if index === secondaryKeyFeatures.length - 1 && category.link}
          <a
            href={category.link}
            target="_blank"
            class="btn btn-sm w-{!$isMobile
              ? 35
              : 100} bg-clr-orange clr-white rounded-pill py-2"
            style="max-width: 200px;">
            Купить
          </a>
        {/if}
      {/each}
    {/if}
  </div>
</div>

<style lang="scss" scoped>
  .promo-desc-wrapper {
    left: 2.5%;
    top: 15.5%;
    max-width: 320px;
    backdrop-filter: blur(20px);
    box-shadow: -10px 0px 0px -5px #00d1f2;
  }
</style>
