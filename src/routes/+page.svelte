<script>
  import SliderLogos from '$lib/modules/SliderLogos.svelte';
  import BgVideos from '$lib/modules/BgVideos.svelte';
  import Categories from '$lib/modules/Categories.svelte';
  import ContactForm from '$lib/modules/ContactForm.svelte';
  import Icon from '@iconify/svelte';
  import GutterMain from '$lib/components/gutters/GutterMain.svelte';
  import LinkOrangePill from '$lib/components/buttons/LinkOrangePill.svelte';
  import { isMobile } from '$lib/stores/ui';
</script>

<svelte:head>
  <title>ESQ - Главная</title>
</svelte:head>

<div class="w-100 pos-r overflow-hidden d-flex align-items-center">
  <div class="w-100 h-100 pos-a top-left z-n-1 bg-clr-green-dark">
    <div class="ellipse"></div>
  </div>

  <GutterMain classList={['d-flex', $isMobile ? 'flex-column' : '']}>
    <div class="d-flex flex-column w-{$isMobile ? '100' : '45'}">
      <h1 class="fs-display-lg fw-semi-bold clr-white">
        ESQ — ведущий производитель промышленной электроники
      </h1>

      {#if !$isMobile}
        <LinkOrangePill>
          <span>Перейти в каталог</span>
        </LinkOrangePill>
      {/if}
    </div>

    <div
      class="w-{!$isMobile
        ? 60
        : 85} d-flex align-items-center justify-content-end pos-r">
      <img
        src="assets/images/esq_motor.png"
        alt="esq motor"
        class="w-100 ratio-1x1 object-fit-contain z-n-1 transform-img" />
    </div>

    {#if $isMobile}
      <LinkOrangePill>
        <span>Перейти в каталог</span>
      </LinkOrangePill>
    {/if}
  </GutterMain>
</div>

<SliderLogos />
<BgVideos />
<Categories />
<ContactForm>
  <div
    slot="contact-details"
    class="d-flex flex-column w-100 flex-row-gap-2 {$isMobile ? 'd-none' : ''}">
    <div class="w-100">
      <span class="d-flex flex-column-gap-0-5 align-items-center">
        <Icon icon="ic:baseline-mail" style="color: white" />
        <p class="m-0 p-0 fs-title-md fw-semi-bold clr-white">
          Электронная почта
        </p>
      </span>
      <a
        class="fs-body-lg clr-white d-block mt-1"
        href="mailto:beebs@gmail.com"
        target="_blank">
        beebs@gmail.com
      </a>
    </div>

    <div class="w-100">
      <span class="d-flex flex-column-gap-0-5 align-items-center">
        <Icon icon="ic:round-phone" style="color: white" />
        <p class="m-0 p-0 fs-title-md fw-semi-bold clr-white">Телефон</p>
      </span>
      <p class="fs-body-lg clr-white d-block p-0 m-0 mt-1">
        +7 (812) 320-88-81
      </p>
    </div>
  </div>
</ContactForm>

<style lang="scss" scoped>
  .ellipse {
    width: 95%;
    //min-height: 100vh;
    aspect-ratio: 1 / 1;
    background: linear-gradient(#051618, #1a747e);
    border-radius: 1000px;
    opacity: 0.7;
    position: absolute;
    left: 30%;
    top: -2.5%;

    @media (min-width: 150px) and (max-width: 750px) {
      width: 130%;
      left: 0%;
      top: 25%;
    }
  }

  .transform-img {
    transform: translateY(-19.5%);
    transform-origin: 0 0;
  }
</style>
