<script>
  import BgVideo from '$lib/components/BgVideo.svelte';
  import { onMount } from 'svelte';
  import { Counter } from '$lib/utils/counter';
  import { isMobile } from '$lib/stores/ui';
  import GutterMain from '$lib/components/gutters/GutterMain.svelte';

  const videoPath = '/assets/videos/',
    srcs = [
      { id: 1, path: videoPath + '1.mp4' },
      { id: 2, path: videoPath + '2.mp4' },
      { id: 3, path: videoPath + '3.mp4' },
    ],
    thumbnails = [
      { id: 1, path: videoPath + '1.png' },
      { id: 2, path: videoPath + '1.png' },
      { id: 3, path: videoPath + '1.png' },
    ],
    customContent = {
      0: {
        lgNum: 25,
        lgPhrase: 'лет',
        smPhrase:
          'разрабатываем, производим и поставляем энерогоэффективное оборудование',
      },
      1: {
        lgNum: 250000,
        lgPhrase: '',
        smPhrase: 'клиентов используют оборудование ESQ',
      },
      2: {
        lgNum: 25,
        lgPhrase: 'филиалов',
        smPhrase: 'в России, Казахстане, Кыргызстане и Узбекистане',
      },
    };

  /**@type {HTMLDivElement[]}*/
  let contentEls = [],
    /**@type {Object & {elem: HTMLDivElement, inView: Boolean, counter: Counter}[]}*/
    contentElsViewStatus = [];

  function makeCounterAlive() {
    if (contentEls.length === 0) return;

    for (let i = 0; i < contentElsViewStatus.length; i++) {
      let item = contentElsViewStatus[i],
        maxValue = customContent[i].lgNum;

      item.inView =
        item.elem.getBoundingClientRect().bottom <
        document.documentElement.clientHeight;
      item = item;

      if (!item.inView) continue;
      item.counter.displayValue(maxValue);
      item = item;
    }

    contentElsViewStatus = contentElsViewStatus;
  }

  onMount(() => {
    contentElsViewStatus = contentEls.map((el) =>
      Object.assign(
        {},
        {
          elem: el,
          inView:
            el.getBoundingClientRect().bottom <
            document.documentElement.clientHeight,
          counter: new Counter(2500),
        },
      ),
    );

    const int = setInterval(() => {
      if (
        contentElsViewStatus.every(
          (item, i) =>
            item.inView && item.counter.startValue >= customContent[i].lgNum,
        )
      )
        clearInterval(int);
      makeCounterAlive();
    }, 20);

    return () => clearInterval(int);
  });
</script>

<div
  class="d-flex flex-column flex-row-gap-2 w-100 bg-clr-{!$isMobile
    ? 'white-beige'
    : 'green-dark pb-5'}">
  {#each srcs as src, index}
    <BgVideo {src} thumbnail={thumbnails[index]}>
      <div
        slot="custom-content"
        class="bg-video-content d-flex flex-column justify-content-center rounded-3 bg-clr-green-dark-shaded w-30 {!$isMobile
          ? 'p-4'
          : 'py-5 px-3'}"
        bind:this={contentEls[index]}>
        <p
          class="mb-0 fs-{!$isMobile
            ? 'display-md'
            : 'label-lg'} fw-semi-bold clr-white">
          {#if contentElsViewStatus.length > 0}
            <span class="clr-seawave-soft">
              {new Intl.NumberFormat('ru-RU').format(
                contentElsViewStatus[index].counter.startValue.toFixed(0),
              )}
            </span>
          {/if}
          {customContent[index].lgPhrase}
        </p>
        <small
          class="clr-white fs-{!$isMobile ? 'body-lg' : 'label-md'} fw-regular">
          {customContent[index].smPhrase}
        </small>
      </div>
    </BgVideo>
  {/each}
</div>

<style lang="scss" scoped>
  .bg-video-content {
    position: absolute;
    bottom: 5%;
    left: 5%;
    min-width: 300px;
    max-width: fit-content;
    backdrop-filter: blur(20px);

    @media (min-width: 150px) and (max-width: 750px) {
      position: relative;
      bottom: unset;
      left: 0;
      width: 100% !important;
      max-width: unset;
      height: 40%;
      border-radius: unset !important;
      backdrop-filter: unset;
      background-color: #051618 !important;
    }
  }
</style>
