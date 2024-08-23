<script>
  import { isMobile } from '$lib/stores/ui';
  import { onMount } from 'svelte';

  /**@type {Object & {id: Number, path: String}[]}*/
  export let images,
    /**@type {String[]}*/
    sliderWrapperClasses = [''],
    /**@type {String[]}*/
    slideClasses = [''];

  let innerWidth = 0,
    /**@type {HTMLDivElement}*/
    sliderBodyEl;

  /**
   * @type {number | undefined}
   */
  let tStart = undefined,
    /**
     * @type {number | undefined}
     */
    prevT,
    translateX = 0,
    iterate = 1.2,
    outOfViewIdx = 0,
    shiftSlide = false,
    pushSlide = false;

  let rolledImages = [...images],
    /**@type {Number}*/
    rAf;

  /**
   * @param {Number} timeStamp
   */
  function makeSliderAlive(timeStamp) {
    if (tStart === undefined) {
      tStart = timeStamp;
    }

    if (prevT !== tStart) {
      sliderBodyEl.style.transform = `translateX(${(translateX -= iterate)}px)`;
      const firstSlideElRect = sliderBodyEl.children[0].getBoundingClientRect();
      shiftSlide = firstSlideElRect.right < 0;
      pushSlide = (firstSlideElRect.left / firstSlideElRect.width) * 100 <= 10;

      if (shiftSlide) {
        rolledImages.push(images[outOfViewIdx]);
        rolledImages.shift();
        sliderBodyEl.style.transform = `translateX(${(translateX += sliderBodyEl.children[outOfViewIdx].getBoundingClientRect().width + 15)}px)`;
      }

      if (shiftSlide) {
        if (outOfViewIdx < images.length - 1) outOfViewIdx++;
        else outOfViewIdx = 0;

        rolledImages = rolledImages;
      }
    }

    prevT = timeStamp;
    rAf = window.requestAnimationFrame(makeSliderAlive);
  }

  onMount(() => {
    setTimeout(() => {
      rAf = window.requestAnimationFrame(makeSliderAlive);
    }, 500);

    return () => {
      window.cancelAnimationFrame(rAf);
    };
  });
</script>

<svelte:window bind:innerWidth />

<div
  class="slider-wrapper w-100 overflow-hidden no-scrollbars d-flex align-items-center {sliderWrapperClasses
    .map((c) => c)
    .join(' ')}">
  <div
    class="slider-body d-grid align-items-center flex-column-gap-1"
    style="grid-template-columns: repeat({rolledImages.length}, {$isMobile
      ? 2
      : 1}5%);"
    bind:this={sliderBodyEl}>
    {#each rolledImages as image (image.id)}
      <div
        class="slide d-flex align-items-center justify-content-center {slideClasses
          .map((c) => c)
          .join(' ')}">
        <img
          src={image.path}
          alt="slider"
          class="object-fit-contain w-50"
          style="max-height: 10vh;" />
      </div>
    {/each}
  </div>
</div>

<style lang="scss" scoped>
  .slider-wrapper {
    white-space: nowrap;
  }
</style>
