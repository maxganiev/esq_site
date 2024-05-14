async function seedAllCategories(
  /** @type {import('@prisma/client').PrismaClient}*/ prisma,
) {
  class Category {
    constructor(
      parent_id,
      name,
      href,
      image,
      sort_order,
      link = null,
      description = null,
    ) {
      this.parent_id = parent_id;
      this.name = name;
      this.href = href;
      this.image = image;
      this.sort_order = sort_order;
      this.link = link;
      this.description = description;
    }
  }

  const cats = [
    //1.Комплектные трансформаторные подстанции
    new Category(
      -1,
      'Комплектные трансформаторные подстанции',
      '/transformer_stations',
      'stations.png',
      1,
      null,
      'Служат для преобразования номинального напряжения 6, 10, 35 кВ в напряжение 0,4 и 0,69 кВ, а также для распределения электроэнергии. Состоят из трансформаторов, распределительных устройств, устройств управления и других вспомогательных сооружений',
      0,
    ),

    //2.Преобразователи частоты и УПП
    new Category(
      -1,
      'Преобразователи частоты и УПП',
      '/inverters_upp',
      'lw.png',
      2,
      null,
      'Надежность и эффективность - основные преимущества электродвигателей ESQ. Мы достигли ее благодаря оптимизации конструкции и использованию современных технологий',
      1,
    ),
    //2.1 УПП ESQ-HVS
    new Category(
      2,
      'Устройства плавного пуска ESQ-HVS',
      null,
      'lw.png',
      1,
      'https://b2b.elcomspb.ru/catalog/chastotnye-preobrazovateli-i-ustroystva-plavnogo-p/ustroystva-plavnogo-puska-0-4kv/',
    ),
    //2.2 УПП ESQ-GS7
    new Category(
      2,
      'Устройства плавного пуска ESQ-GS7',
      null,
      'lw.png',
      2,
      'https://b2b.elcomspb.ru/catalog/chastotnye-preobrazovateli-i-ustroystva-plavnogo-p/ustroystva-plavnogo-puska-6-10kv/',
    ),

    //3.Коммутационное оборудование
    new Category(
      -1,
      'Коммутационное оборудование',
      '/switching_gear',
      'invertors.png',
      3,
      'https://b2b.elcomspb.ru/catalog/nizkovoltnoe-0-4kv-i-vysokovoltnoe-6-35kv-oborudov/',
      'Улучшит эффективность процессов за счет автоматизации и оптимизации связи между различными узлами производства и упростит управление и мониторинга производственных систем.',
      0,
    ),

    //4.Насосы
    new Category(
      -1,
      'Насосы',
      '/pumps',
      'pumps.png',
      4,
      'https://b2b.elcomspb.ru/catalog/nasosy/',
      'Повышение производительности и ускорение процессов благодаря оптимизации потоков жидкостей и газов. Улучшение качества продукции путем контроля давления, температуры и других параметров',
      0,
    ),

    //5.Автоматические насосные станции
    new Category(
      -1,
      'Автоматические насосные станции',
      '/pump_stations',
      'p_stat.png',
      5,
      'https://b2b.elcomspb.ru/catalog/nasosy/avtomaticheskie-nasosnye-stantsii-i-komplektuyushc/',
      'Индивидуальный подход к подбору оборудования: поставки типовых и нестандартных автоматических насосных установок повышения давления для систем хозяйственно-питьевого, промышленного и противопожарного водоснабжения',
      0,
    ),

    //6.Редукторы
    new Category(
      -1,
      'Редукторы',
      '/gears',
      'gears.png',
      6,
      'https://b2b.elcomspb.ru/catalog/reduktory-i-motor-reduktory/',
      'Уменьшат скорость вращения двигателя или электродвигателя, что позволит использовать более крупные и прочные агрегаты',
      0,
    ),

    //7.АСУ ТП, электрощитовое оборудование
    new Category(
      -1,
      'АСУ ТП, электрощитовое оборудование',
      '/asutp',
      'asutp.png',
      7,
      null,
      'Под брендом ESQ производятся АСУ ТП на основе индивидуальных проектов и типовых решений',
      0,
    ),

    //8.Электродвигатели
    new Category(
      -1,
      'Электродвигатели',
      '/motors',
      'motors.png',
      8,
      null,
      'Надежность и эффективность — основные преимущества электродвигателей ESQ. Мы достигли ее благодаря оптимизации конструкции и использованию современных технологий',
      1,
    ),
    //8.1 DIN
    new Category(
      10,
      'Общепромышленные электродвигатели ESQ SDN стандарта DIN',
      null,
      'din.png',
      1,
      'https://b2b.elcomspb.ru/catalog/elektrodvigateli/obshchepromyshlennye-elektrodvigateli-/?ajaxFilter=Y&PAGEN_1=1&setPage=24&setSort=available&setView=table&set_filter=y&arrCatalogFilter_1139_2060174260=Y',
      null,
      0,
    ),
    //8.2 ESQ PR
    new Category(
      10,
      'Электродвигатели премиальной серии ESQ PR',
      null,
      'esq_pr.png',
      2,
      'https://b2b.elcomspb.ru/catalog/elektrodvigateli/obshchepromyshlennye-elektrodvigateli-/?ajaxFilter=Y&PAGEN_1=1&setPage=24&setSort=available&setView=table&set_filter=y&arrCatalogFilter_1139_2060174260=Y',
      null,
      0,
    ),

    //9.Комплектное распределительное устройство
    new Category(
      -1,
      'Комплектное распределительное устройство',
      '/control_switchgear',
      'stations.png',
      9,
      null,
      'Состоит из типовых унифицированных блоков и содержит набор коммутационных аппаратов, сборные и соединительные шины, вспомогательные устройства РЗиА и средства учета и измерения. Может устанавливаться внутри зданий (КРУ) и снаружи (КРУН)',
      0,
    ),

    //10.Промышленные вентиляторы
    new Category(
      -1,
      'Промышленные вентиляторы',
      '/vents',
      'vent.png',
      10,
      'https://b2b.elcomspb.ru/catalog/klimaticheskoe-oborudovanie/ventilyatsiya/',
      'Обеспечивает основную функцию вентиляции душевых и туалетных комнат, а также функцию подпора в системе общеобменной или вытяжной системы вентиляции',
      0,
    ),

    //11.ДЭC и ГПЭC
    new Category(
      -1,
      'ДЭC и ГПЭC',
      '/diesel_and_hydro_stations',
      'des.png',
      11,
      null,
      'Используются для аварийного резервного питания промышленных и общественных объектов, резервного питания ЦОД и дата-центров, потребителей 1 особой категории электроснабжения, непрерывного питания объектов, не имеющих надежного сетевого электроснабжения; а также применения в качестве передвижных ремонтных или аварийных источников электроснабжения.',
      0,
    ),

    //12.Подшипники
    new Category(
      -1,
      'Подшипники',
      '/bearings',
      'bearings.png',
      12,
      'https://b2b.elcomspb.ru/catalog/podshipniki/',
      'Подшипники  ESQ обеспечивают надежное и плавное движение между вращающимися и невращающимися частями оборудования, таких как валы, шкивы и ролики. Это увеличивает прочность и продолжительность службы оборудования.',
      0,
    ),

    //13.Смотреть все
    new Category(
      -1,
      'Смотреть все',
      null,
      null,
      13,
      'https://b2b.elcomspb.ru/',
      null,
      0,
    ),
  ];

  await prisma.$transaction([
    prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`,
    prisma.$executeRaw`TRUNCATE TABLE Category;`,
    prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`,

    prisma.category.createMany({
      data: cats.map((cat) => {
        const { parent_id, name, href, image, sort_order, link, description } =
          cat;

        return Object.assign(
          {},
          {
            parent_id,
            name,
            href,
            image,
            sort_order,
            link,
            description,
          },
        );
      }),
    }),
  ]);

  return true;
}

export default seedAllCategories;
