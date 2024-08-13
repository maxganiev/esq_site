<script>
  import { globals } from '$lib/globals';
  import { onMount } from 'svelte';
  import { Counter } from '$lib/utils/counter';
  import Slider from '$lib/components/Slider.svelte';
  import GutterMain from '$lib/components/gutters/GutterMain.svelte';
  import GutterY from '$lib/components/gutters/GutterY.svelte';
  import GutterX from '$lib/components/gutters/GutterX.svelte';

  const elliplsis = [
      { id: 1, left: '15vw', width: '5vw', rotate: '180deg' },
      { id: 2, top: '25%', right: '-1.5vw', width: '8.5vw', rotate: '-90deg' },
      { id: 3, bottom: '0', left: '5vw', width: '12.5vw' },
    ],
    customContent = {
      0: {
        lgNum: 20,
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
        lgNum: 20,
        lgPhrase: 'филиалов',
        smPhrase: 'в России, Казахстане, Кыргызстане и Узбекистане',
      },
      3: {
        lgNum: 12,
        lgPhrase: 'направлений',
        smPhrase: 'продукции для любых задач предприятия',
      },
    };

  let counterVals = Object.keys(customContent).map((key) =>
    Object.assign({}, { counter: new Counter(2500) }),
  );
  function makeCounterAlive() {
    for (let i = 0; i < counterVals.length; i++) {
      let item = counterVals[i],
        maxValue = customContent[i].lgNum;

      item.counter.displayValue(maxValue);
      item = item;
    }

    counterVals = counterVals;
  }

  onMount(() => {
    setTimeout(() => {
      const int = setInterval(() => {
        if (
          counterVals.every(
            (item, i) => item.counter.startValue >= customContent[i].lgNum,
          )
        )
          clearInterval(int);
        makeCounterAlive();
      }, 10);
    }, 500);
  });

  const timeline = [
    {
      id: 1,
      eventDate: 2009,
      eventDesc:
        'Выпуск частотных преобразователей ESQ. Открытие нового направления по автоматизации систем управления технологическими процессами (АСУ ТП)',
      bgImage: globals.imagePath + 'carousel/about/1.png',
    },

    {
      id: 2,
      eventDate: 2010,
      eventDesc:
        'Выпуск частотных преобразователей ESQ. Открытие нового направления по автоматизации систем управления технологическими процессами (АСУ ТП)',
      bgImage: globals.imagePath + 'carousel/about/2.png',
    },

    {
      id: 3,
      eventDate: 2007,
      eventDesc:
        'Выпуск частотных преобразователей ESQ. Открытие нового направления по автоматизации систем управления технологическими процессами (АСУ ТП)',
      bgImage: globals.imagePath + 'carousel/about/3.png',
    },

    {
      id: 4,
      eventDate: 2009,
      eventDesc:
        'Выпуск частотных преобразователей ESQ. Открытие нового направления по автоматизации систем управления технологическими процессами (АСУ ТП)',
      bgImage: globals.imagePath + 'carousel/about/1.png',
    },

    {
      id: 5,
      eventDate: 2012,
      eventDesc:
        'Выпуск частотных преобразователей ESQ. Открытие нового направления по автоматизации систем управления технологическими процессами (АСУ ТП)',
      bgImage: globals.imagePath + 'carousel/about/2.png',
    },

    {
      id: 6,
      eventDate: 2016,
      eventDesc:
        'Выпуск частотных преобразователей ESQ. Открытие нового направления по автоматизации систем управления технологическими процессами (АСУ ТП)',
      bgImage: globals.imagePath + 'carousel/about/3.png',
    },
  ];
</script>

<svelte:head>
  <title>О бренде</title>
</svelte:head>

<div class="d-flex flex-column w-100">
  <div class="d-flex align-items-center w-100 bg-clr-white-beige h-40-vh">
    <div class="flex-0-6 px-6-rem">
      <h2 class="clr-green-dark fw-semi-bold fs-display-sm">
        ESQ — передовой производитель промышленной электроники с 2009 года
      </h2>
      <p class="clr-green-dark fs-body-lg">
        ESQ - это оригинальное качество, складское наличие и быстрая доставка
        огромного ряда электротехнического оборудования как для базовых нужд,
        так и в рамках премиальных линеек повышенной производительности.
      </p>
    </div>

    <div class="flex-0-4 pos-r h-40-vh">
      {#each elliplsis as e (e.id)}
        <img
          src="{globals.imagePath}ellipse_24.png"
          alt="ellipsis"
          class="object-fit-contain pos-a"
          style={Object.keys(e)
            .slice(1)
            .reduce((acc, curr) => (acc += `${curr}:${e[curr]};`), '')} />
      {/each}
    </div>
  </div>

  <div class="bg-clr-white-gray h-30-vh">
    <GutterMain classList={['row']}>
      {#each Object.keys(customContent) as key}
        <div class="col-sm-6 col-md-3">
          <span class="clr-cyan fw-semi-bold fs-display-sm text-nowrap">
            {new Intl.NumberFormat('ru-RU').format(
              counterVals[key].counter.startValue.toFixed(0),
            ) + (key !== '1' ? '' : '+')}
            {customContent[key].lgPhrase}
          </span>
          <p class="mt-2 fs-body-lg clr-green-dark">
            {customContent[key].smPhrase}
          </p>
        </div>
      {/each}
    </GutterMain>
  </div>

  <GutterY classList={['bg-clr-white-beige ']}>
    <div class="d-flex flex-column">
      <h3 class="fs-headline-lg clr-green-dark fw-semi-bold pb-2-rem ps-6-rem">
        История развития
      </h3>

      <Slider {timeline} />
    </div>
  </GutterY>
</div>
