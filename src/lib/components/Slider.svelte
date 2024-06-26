<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  /**@type {Object & {id: Number, eventDate: String | Date | Number, eventDesc: String, bgImage: String} []}*/
  export let timeline;

  /**@type {HTMLDivElement}*/ let sliderEl,
    currentSlideIdx = 0,
    isScrolling = false,
    events = {
      /**@type {Object & {eventDate: String | Date | Number, eventDesc: String, isActive: Boolean}[]}*/
      line: [],
      /**@desc {Max number of timeline dots per viewport}*/
      maxTimelineIdx: 2,

      setLine() {
        this.line = timeline
          .slice(0, this.maxTimelineIdx + 1)
          .map((o) =>
            Object.assign(
              { ...o },
              { isActive: timeline[currentSlideIdx].eventDate === o.eventDate },
            ),
          );
        events = events;
      },

      updateLine() {
        if (scrollLeftwards) {
          const next =
            timeline[
              timeline.findIndex(
                (o) =>
                  o.eventDate === this.line[this.line.length - 1].eventDate,
              ) + 1
            ];
          if (next) {
            this.line.shift();
            this.line.push(next);
          }
        } else {
          const prev =
            timeline[
              timeline.findIndex(
                (o) => o.eventDate === this.line[0].eventDate,
              ) - 1
            ];
          if (prev) {
            this.line.pop();
            this.line.unshift(prev);
          }
        }

        const current = timeline[currentSlideIdx];
        this.line.forEach(
          (o) => (o.isActive = o.eventDate === current.eventDate),
        );

        events = events;
      },
    },
    scrollLeftwards = true,
    scrollLeftVal = 0;

  function onScroll() {
    scrollLeftwards = scrollLeftVal < sliderEl.scrollLeft;

    scrollLeftVal = sliderEl.scrollLeft;
    let slideIdx = Array.from(sliderEl.children).findIndex(
      (child) => scrollLeftVal === child.offsetLeft,
    );

    isScrolling = slideIdx === -1;
    if (!isScrolling) {
      currentSlideIdx = slideIdx;
      events.updateLine();
    }
  }

  function scrollRight() {
    sliderEl.scrollBy(1, 0);
  }

  function scrollLeft() {
    sliderEl.scrollBy(-1, 0);
  }

  onMount(() => {
    events.setLine();
  });
</script>

<div
  class="w-100 d-flex flex-column justify-content-center pos-r slider-carousel">
  <div
    class="w-100 pos-r slider-body d-grid no-scrollbars"
    style="grid-template-columns: repeat({timeline.length}, 100%);"
    bind:this={sliderEl}
    on:scroll={onScroll}>
    {#each timeline as event (event.id)}
      <div
        class="w-100 slide"
        style="background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url({event.bgImage}) center center/cover;">
      </div>
    {/each}
  </div>

  <div
    class="w-30 pos-a d-flex flex-column justify-content-center align-items-center event-desc-holder">
    <div
      class="w-100 p-4 rounded-3 d-flex flex-column justify-content-center event-desc-body">
      <p class="mb-0 fs-display-sm fw-semi-bold">
        <span class="clr-seawave-soft">
          {timeline[currentSlideIdx].eventDate}
        </span>
      </p>
      <small class="clr-white fs-body-md fw-regular">
        {timeline[currentSlideIdx].eventDesc}
      </small>
    </div>
  </div>

  <div
    class="w-100 h-5-vh d-flex flex-column justify-content-center pos-a timeline-wrapper">
    <div
      class="w-100 d-grid align-items-end text-center timeline-axis"
      style="grid-template-columns: 6rem 1fr 1fr 1fr 6rem;">
      <div class="event-holder o-{currentSlideIdx < 1 ? '0' : '1'}"></div>
      {#each events.line as ev, index}
        <div
          class="d-flex flex-column align-items-{(function () {
            if (index === 0) return 'start';
            else if (index === 1) return 'center';
            else return 'end';
          })()} flex-row-gap-0-5 event-holder">
          <div
            class="d-flex align-items-end {index !== 2
              ? 'flex-row-reverse'
              : ''}"
            style="transform: translateY(-60%);">
            <span
              class="clr-white ev-date {isScrolling &&
              ev.eventDate === timeline[currentSlideIdx].eventDate
                ? 'is-scrolled'
                : ''} {index === events.maxTimelineIdx ? 'last-point' : ''}">
              {ev.eventDate}
            </span>

            <div
              class="{ev.isActive
                ? 'active'
                : ''} rounded-circle bg-clr-seawave-soft pos-r ev-marker">
            </div>
          </div>
        </div>
      {/each}
      <div
        class="event-holder o-{currentSlideIdx === timeline.length - 1
          ? '0'
          : '1'}">
      </div>
    </div>
  </div>

  <div
    class="w-100 h-10-vh bg-clr-white-beige d-flex align-items-center justify-content-center flex-column-gap-0-5">
    <button
      class="btn btn-sm outlined bg-clr-white rounded-circle d-flex justify-content-center align-items-center ratio-1x1 hover-bg-clr-green-dark-shaded shadow-none"
      disabled={currentSlideIdx === 0 || isScrolling}
      on:click={scrollLeft}>
      <Icon icon="lucide:arrow-right" style="color: black; rotate: -180deg;" />
    </button>
    <button
      class="btn btn-sm outlined bg-clr-white rounded-circle d-flex justify-content-center align-items-center ratio-1x1 hover-bg-clr-green-dark-shaded shadow-none"
      disabled={currentSlideIdx === timeline.length - 1 || isScrolling}
      on:click={scrollRight}>
      <Icon icon="lucide:arrow-right" style="color: black" />
    </button>
  </div>
</div>

<style lang="scss" scoped>
  %height-inherit {
    height: 70vh;
    //min-height: inherit;
  }

  .slider-carousel {
    @extend %height-inherit;

    .slider-body {
      @extend %height-inherit;
      overflow-x: hidden;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;

      .slide {
        @extend %height-inherit;
        scroll-snap-align: start;
      }
    }

    .event-desc-holder {
      left: 6rem;
      bottom: 22.5vh;

      .event-desc-body {
        backdrop-filter: blur(20px);
      }
    }

    .timeline-wrapper {
      bottom: 10vh;

      .timeline-axis {
        .event-holder {
          border-top: 2px #f9f8f7 solid;
          min-height: 50px;

          .ev-date {
            transform: translate(-75%, -100%);
            transition: all 0.4s ease-in;

            &.is-scrolled {
              transform: translate(-75%, -100%) scale(1.4);
            }

            &.last-point {
              transform: translate(75%, -100%);
            }

            &.is-scrolled.last-point {
              transform: translate(75%, -100%) scale(1.4);
            }
          }

          .ev-marker {
            width: 2.2vw;
            max-width: 20px;
            aspect-ratio: 1/1;

            &.active::after {
              content: '';
              width: 50%;
              height: 50%;
              border-radius: 100px;
              position: absolute;
              top: 25%;
              left: 25%;
              background-color: #3a3f40;
            }
          }
        }
      }
    }
  }
</style>
