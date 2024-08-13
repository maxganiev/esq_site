<script>
  import SliderLoop from '$lib/components/SliderLoop.svelte';
  import GutterX from '$lib/components/gutters/GutterX.svelte';
  import GutterY from '$lib/components/gutters/GutterY.svelte';
  import { globals } from '$lib/globals';

  const imgPath = globals.imagePath + 'logo/',
    images = [
      { id: 1, path: imgPath + 'Evraz 1.svg' },
      { id: 2, path: imgPath + 'Gazprom-Logo-rus 1.svg' },
      { id: 3, path: imgPath + 'nornickel-logo 7.svg' },
      { id: 4, path: imgPath + 'Rosneft_Logo 1.svg' },
      { id: 5, path: imgPath + 'Sibur_Holding_Logo 1.svg' },
      { id: 6, path: imgPath + 'SUEK_Logo 1.svg' },
      { id: 7, path: imgPath + '1.svg' },
      { id: 8, path: imgPath + '2.png' },
      { id: 9, path: imgPath + '3.png' },
      { id: 10, path: imgPath + '4.png' },
      { id: 11, path: imgPath + '5.png' },
      { id: 12, path: imgPath + '6.png' },
      { id: 13, path: imgPath + '7.svg' },
      { id: 14, path: imgPath + '8.svg' },
    ];
</script>

<GutterY classList={['bg-clr-white-beige ']}>
  <div class="w-100 h-30-vh d-flex flex-column justify-content-center">
    <GutterX>
      <h4 class="fs-headline-lg mb-5">Нам доверяют</h4>
    </GutterX>

    <SliderLoop
      {images}
      slideClasses={[
        'bg-clr-white-light',
        'w-100',
        'h-100',
        'p-3',
        'rounded-3',
      ]}
      sliderWrapperClasses={['flex-0-3']} />
  </div>
</GutterY>
