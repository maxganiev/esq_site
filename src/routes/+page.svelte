<script>
  import SliderLogos from '$lib/modules/SliderLogos.svelte';
  import BgVideos from '$lib/modules/BgVideos.svelte';
  import Categories from '$lib/modules/Categories.svelte';
  import ContactForm from '$lib/modules/ContactForm.svelte';
  import Icon from '@iconify/svelte';
  import GutterMain from '$lib/components/gutters/GutterMain.svelte';
  import LinkOrangePill from '$lib/components/buttons/LinkOrangePill.svelte';
</script>

<svelte:head>
  <title>ESQ - Главная</title>
</svelte:head>

<div class="w-100 h-85-vh pos-r overflow-hidden d-flex align-items-center">
  <div class="w-100 h-100 pos-a top-left z-n-1 bg-clr-green-dark">
    <div class="ellipse"></div>
  </div>

  <GutterMain classList={['d-flex']}>
    <div class="d-flex flex-column flex-0-4">
      <h1 class="fs-display-lg fw-semi-bold clr-white mt-5">
        ESQ — передовой производитель промышленной электроники
      </h1>

      <LinkOrangePill>
        <span>Перейти в каталог</span>
      </LinkOrangePill>
    </div>

    <div class="d-flex align-items-center justify-content-end flex-0-5">
      <img
        src="assets/images/esq_motor.png"
        alt="esq motor"
        class="w-100 object-fit-contain" />
    </div>
  </GutterMain>
</div>

<SliderLogos />
<BgVideos />
<Categories />
<ContactForm>
  <div
    slot="contact-details"
    class="d-flex flex-column w-80 mx-auto flex-row-gap-1">
    <div class="w-100">
      <span class="d-flex flex-column-gap-0-5 align-items-center">
        <Icon icon="ic:baseline-mail" style="color: white" />
        <p class="m-0 p-0 fs-headline-md fw-semi-bold clr-white">
          Электронная почта
        </p>
      </span>
      <a
        class="fs-headline-sm clr-white d-block mt-1"
        href="mailto:beebs@gmail.com"
        target="_blank">
        beebs@gmail.com
      </a>
    </div>

    <div class="w-100">
      <span class="d-flex flex-column-gap-0-5 align-items-center">
        <Icon icon="ic:round-phone" style="color: white" />
        <p class="m-0 p-0 fs-headline-md fw-semi-bold clr-white">Телефон</p>
      </span>
      <p class="fs-headline-sm clr-white d-block p-0 m-0 mt-1">
        +7 812 240-05-13
      </p>
    </div>
  </div>
</ContactForm>

<style lang="scss" scoped>
  .ellipse {
    width: 95%;
    min-height: 100vh;
    aspect-ratio: 1 / 1;
    background: linear-gradient(#051618, #1a747e);
    border-radius: 1000px;
    opacity: 0.7;
    position: absolute;
    left: 30%;
    top: -2.5%;
  }
</style>
