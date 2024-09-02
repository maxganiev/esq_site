<script>
  import LinkOrangePill from '$lib/components/buttons/LinkOrangePill.svelte';
  import CategoryDesc from '$lib/components/category/CategoryDesc.svelte';
  import GutterMain from '$lib/components/gutters/GutterMain.svelte';
  import GutterX from '$lib/components/gutters/GutterX.svelte';
  import { isMobile } from '$lib/stores/ui';
  import Icon from '@iconify/svelte';

  export let data;

  $: widthClass = $isMobile ? 'w-100' : 'w-45';
  $: fontSizeVlg = !$isMobile ? 'fs-headline-lg' : 'fs-label-lg';
  $: fontSizeLg = !$isMobile ? 'fs-headline-md' : 'fs-label-lg';
  $: fontSizeSm = !$isMobile ? 'fs-body-md' : 'fs-title-lg';
</script>

<svelte:head>
  <title>{data.category.name}</title>
</svelte:head>

<div class="d-flex flex-column w-100 h-100-vh">
  <div class="w-100 clr-white pos-r overflow-hidden py-3">
    <div class="w-100 h-100 pos-a top-left bg-clr-green-dark z-n-1">
      <div class="ellipse"></div>
    </div>
    <GutterX
      classList={[
        'd-flex',
        'align-items-end',
        $isMobile
          ? 'pb-2-5-rem flex-column-reverse flex-row-gap-2'
          : 'pb-6-rem',
      ]}>
      <div class="d-flex flex-column {widthClass} h-100">
        <h2 class={fontSizeVlg}>{data.category.name}</h2>
        {#if data.category.description}
          <p class="{fontSizeSm} {$isMobile ? 'w-100 pb-2' : 'w-75'} pt-1">
            {data.category.description}
          </p>
        {/if}
        <LinkOrangePill href={data.category.link || 'https://b2b.elcomspb.ru/'}>
          <span>Перейти в каталог</span>
        </LinkOrangePill>
      </div>

      <div class="{widthClass} h-100 d-flex pos-r bg-img-wrapper">
        <img
          class="object-fit-contain bg-img w-100"
          src={'/assets/images/categories/' +
            (data.category.secondary_image || data.category.image)}
          alt="asset" />
      </div>
    </GutterX>
  </div>

  <GutterMain classList={['bg-clr-white-beige']}>
    <div class="row mx-0">
      {#each data.category.key_features.filter((/** @type {{ type_id: Number, label: String | null, text: String | null }} */ feat) => feat.type_id === 1) as feat (feat.id)}
        <div class="col-md-4 col-sm-6 d-flex flex-column clr-green-dark">
          <Icon
            icon="lucide:square-check-big"
            width="1.6rem"
            height="1.6rem"
            style="color: #1A747E" />

          <h3 class="{fontSizeLg} fw-semi-bold mt-2">
            {feat.label || ''}
          </h3>
          <p class="{fontSizeSm} {$isMobile ? 'mb-2-rem' : ''}">
            {feat.text || ''}
          </p>
        </div>
      {/each}
    </div>

    <div class="row flex-row-gap-1 py-{!$isMobile ? 5 : '2-5-rem'} mx-0">
      {#if data.subCategories && data.subCategories.length > 0}
        {#each data.subCategories as subCat (subCat.id)}
          <CategoryDesc category={subCat} />
        {/each}
      {:else}
        <CategoryDesc category={data.category} />
      {/if}
    </div>
  </GutterMain>
</div>

<style lang="scss" scoped>
  .ellipse {
    width: 50%;
    aspect-ratio: 1/1;

    background-image: linear-gradient(
      25deg,
      hsl(188deg 100% 27%) 0%,
      hsl(188deg 96% 26%) 1%,
      hsl(188deg 93% 24%) 3%,
      hsl(188deg 89% 22%) 4%,
      hsl(187deg 86% 21%) 7%,
      hsl(187deg 83% 19%) 10%,
      hsl(187deg 80% 17%) 14%,
      hsl(187deg 77% 15%) 19%,
      hsl(187deg 74% 13%) 27%,
      hsl(187deg 71% 10%) 37%,
      hsl(186deg 68% 8%) 54%,
      hsl(186deg 66% 6%) 100%
    );
    border-radius: 200%;
    opacity: 0.7;
    position: absolute;

    transform: rotate(245deg);

    //top: -10%;
    left: 40vw;

    @media (min-width: 150px) and (max-width: 750px) {
      width: 130%;
      left: 0;
    }
  }

  .bg-img-wrapper {
    transform: translateY(15%);
    transform-origin: 0 0;

    .bg-img {
      max-height: 350px;
    }

    @media (min-width: 150px) and (max-width: 750px) {
      transform: translateY(-5%);
    }
  }
</style>
