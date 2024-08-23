<script>
  import { globals } from '$lib/globals';
  import { onMount } from 'svelte';
  import { Counter } from '$lib/utils/counter';
  import Slider from '$lib/components/Slider.svelte';
  import GutterMain from '$lib/components/gutters/GutterMain.svelte';
  import GutterY from '$lib/components/gutters/GutterY.svelte';
  import { isMobile } from '$lib/stores/ui';

  $: elliplsis = [
    {
      id: 1,
      right: !$isMobile ? '15vw' : '10vw',
      width: '5vw',
      rotate: '180deg',
      top: !$isMobile ? '-1.5rem' : 0,
    },
    {
      id: 2,
      top: '25%',
      right: '-1.5vw',
      width: '8.5vw',
      rotate: '-90deg',
    },
    {
      id: 3,
      bottom: !$isMobile ? '-1.25rem' : 0,
      right: '25vw',
      width: '12.5vw',
    },
  ];

  const customContent = {
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
      eventDesc: 'Вывод на рынок новой марки редукторов ESQа',
      bgImage: globals.imagePath + 'carousel/about/2.png',
    },

    {
      id: 3,
      eventDate: 2012,
      eventDesc: 'Выпуск консольных насосов ESQ типа К и КМ',
      bgImage: globals.imagePath + 'carousel/about/3.png',
    },

    {
      id: 4,
      eventDate: 2013,
      eventDesc: 'Начало продаж панелей оператора под маркой ESQ',
      bgImage: globals.imagePath + 'carousel/about/4.png',
    },

    {
      id: 5,
      eventDate: 2014,
      eventDesc:
        'Выпуск масляных шестеренных насосов ESQ типа NMSh-GP. Начало производства станций управления и защиты ESQ-CS',
      bgImage: globals.imagePath + 'carousel/about/5.png',
    },

    {
      id: 6,
      eventDate: 2015,
      eventDesc: 'Начало производства шкафов управления ESQ-CS',
      bgImage: globals.imagePath + 'carousel/about/6.png',
    },

    {
      id: 7,
      eventDate: 2016,
      eventDesc: 'Начало производства автоматической насосной станции ESQ В',
      bgImage: globals.imagePath + 'carousel/about/7.png',
    },

    {
      id: 8,
      eventDate: 2018,
      eventDesc: 'Выпуск насосов ESQ двустороннего входа типа Д',
      bgImage: globals.imagePath + 'carousel/about/8.png',
    },

    {
      id: 9,
      eventDate: 2022,
      eventDesc:
        'Выпуск электродвигателей для систем аварийного дымоудаления серии ESQ FR и FR/V',
      bgImage: globals.imagePath + 'carousel/about/9.png',
    },
  ];

  $: fontSizeLg = !$isMobile ? 'fs-display-sm' : 'fs-label-lg';
  $: fontSizeSm = !$isMobile ? 'fs-body-lg' : 'fs-headline-lg';
</script>

<svelte:head>
  <title>О бренде</title>
</svelte:head>

<div class="d-flex flex-column w-100">
  <div
    class="d-flex align-items-center w-100 bg-clr-white-beige {!$isMobile
      ? 'h-40-vh'
      : ''}">
    <GutterMain classList={['pos-r', 'w-100']}>
      <h2
        class="clr-green-dark fw-semi-bold {fontSizeLg} m-0 pb-3 {$isMobile
          ? 'pt-2-rem'
          : ''}">
        ESQ — передовой производитель промышленной электроники с 2009 года
      </h2>
      <p class="clr-green-dark {fontSizeSm} w-{!$isMobile ? 75 : 100}">
        ESQ - это оригинальное качество, складское наличие и быстрая доставка
        огромного ряда электротехнического оборудования как для базовых нужд,
        так и в рамках премиальных линеек повышенной производительности.
      </p>

      {#each elliplsis as e (e.id)}
        <img
          src="{globals.imagePath}ellipse_24.png"
          alt="ellipsis"
          class="object-fit-contain pos-a"
          style={Object.keys(e)
            .slice(1)
            .reduce((acc, curr) => (acc += `${curr}:${e[curr]};`), '')} />
      {/each}
    </GutterMain>
  </div>

  <div class="bg-clr-white-gray h-30-vh">
    <GutterMain classList={['row']}>
      {#each Object.keys(customContent) as key}
        <div class="col-sm-6 col-md-3">
          <span class="clr-cyan fw-semi-bold {fontSizeLg} text-nowrap">
            {new Intl.NumberFormat('ru-RU').format(
              counterVals[key].counter.startValue.toFixed(0),
            ) + (key !== '1' ? '' : '+')}
            {customContent[key].lgPhrase}
          </span>
          <p class="mt-2 {fontSizeSm} clr-green-dark">
            {customContent[key].smPhrase}
          </p>
        </div>
      {/each}
    </GutterMain>
  </div>

  <GutterY classList={['bg-clr-white-beige ']}>
    <div class="d-flex flex-column">
      <h3
        class="{fontSizeLg} clr-green-dark fw-semi-bold {!$isMobile
          ? 'pb-6-rem ps-6-rem'
          : 'py-3 ps-2-rem'} m-0">
        История развития
      </h3>

      <Slider {timeline} />
    </div>
  </GutterY>
</div>
