<script>
  import LinkOrangePill from '$lib/components/buttons/LinkOrangePill.svelte';
  import CategoryDesc from '$lib/components/category/CategoryDesc.svelte';
  import GutterMain from '$lib/components/gutters/GutterMain.svelte';
  import Icon from '@iconify/svelte';

  export let data;

  // $: {
  //   console.log(data);
  // }
</script>

<svelte:head>
  <title>{data.category.name}</title>
</svelte:head>

<div class="d-flex flex-column w-100 h-100-vh">
  <div class="w-100 clr-white pos-r overflow-hidden py-3">
    <div class="w-100 h-100 pos-a top-left bg-clr-green-dark z-n-1">
      <div class="ellipse"></div>
    </div>
    <GutterMain classList={['d-flex']}>
      <div class="d-flex flex-column w-45 h-100">
        <h2 class="fs-display-sm">{data.category.name}</h2>
        {#if data.category.description}
          <p class="fs-body-md w-75 pt-1">
            {data.category.description}
          </p>
        {/if}
        <LinkOrangePill>
          <span>Перейти в каталог</span>
        </LinkOrangePill>
      </div>

      <div class="w-45 h-100 d-flex">
        <img
          class="object-fit-contain w-50 h-100"
          src="/assets/images/esq_motor.png"
          alt="esq motor" />
      </div>
    </GutterMain>
  </div>

  <div class="w-100 bg-clr-white-beige py-5">
    <GutterMain>
      <div class="row">
        {#each data.category.key_features.filter((/** @type {{ type_id: Number, label: String | null, text: String | null }} */ feat) => feat.type_id === 1) as feat (feat.id)}
          <div class="col-md-4 col-sm-6 d-flex flex-column clr-green-dark">
            <Icon
              icon="el:check"
              width="1.6rem"
              height="1.6rem"
              style="color: #1A747E" />

            <h3 class="fs-body-md fw-semi-bold mt-2">{feat.label || ''}</h3>
            <p class="fs-body-sm">{feat.text || ''}</p>
          </div>
        {/each}
      </div>

      <div class="row flex-row-gap-1 my-5 py-5">
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
</div>

<style lang="scss" scoped>
  .ellipse {
    width: 50%;
    height: 90%;
    background: linear-gradient(
      235deg,
      hsl(186deg 66% 6%) 0%,
      hsl(188deg 49% 8%) 23%,
      hsl(188deg 51% 11%) 32%,
      hsl(187deg 53% 13%) 36%,
      hsl(187deg 55% 15%) 39%,
      hsl(187deg 56% 17%) 42%,
      hsl(187deg 58% 19%) 44%,
      hsl(187deg 59% 21%) 46%,
      hsl(186deg 61% 23%) 50%,
      hsl(186deg 63% 26%) 57%,
      hsl(186deg 64% 28%) 68%,
      hsl(186deg 66% 30%) 100%
    );
    border-radius: 200%;
    opacity: 0.7;
    position: absolute;
    bottom: -5vh;
    right: 5vw;
    transform: rotate(-5deg);
  }
</style>
