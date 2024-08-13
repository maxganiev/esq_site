async function updateCategories(
  /** @type {import('@prisma/client').PrismaClient}*/ prisma,
) {
  const updates = {
    secondaryImagesAndPromoDesc: [
      {
        id: 1,
        secondary_image: 'stations_2.png',
        promo_desc:
          'Исполнение: внутрицеховые, блочно-модульные здания из сэндвич-панелей, блочно-модульные здания бетонного исполнения',
      },

      {
        id: 2,
        secondary_image: 'invertors_2.png',
      },

      {
        id: 5,
        secondary_image: 'lw_nobg.png',
      },

      {
        id: 5,
        secondary_image: 'lw_nobg.png',
      },

      {
        id: 6,
        secondary_image: 'pumps_nobg.png',
      },

      {
        id: 7,
        secondary_image: 'p_stat_nobg.png',
        promo_desc: 'Исполнение: стандартное, в емкости, в блок-боксе',
      },

      {
        id: 8,
        secondary_image: 'gears_nobg.png',
      },

      {
        id: 9,
        secondary_image: 'asutp_nobg.png',
      },

      {
        id: 10,
        secondary_image: 'motors_nobg.png',
      },

      {
        id: 13,
        secondary_image: 'control_switchgears_nobg.png',
      },

      {
        id: 14,
        secondary_image: 'vent_nobg.png',
      },

      {
        id: 15,
        secondary_image: 'des_nobg.png',
        promo_desc: 'Напряжение выдачи электропитания: 400 В, 6300 В, 10 500 В',
      },

      {
        id: 16,
        secondary_image: 'bearings_nobg.png',
      },
    ],

    descriptions: [
      {
        id: 2,
        description:
          'Обеспечивают плавный запуск и остановку электродвигателя, эффективно снижают пусковые токи, уменьшают механическую нагрузку на элементы приводного механизма, позволяют адаптировать двигатель к любой нагрузке',
      },

      {
        id: 6,
        description:
          'Насосное оборудование производится с 2011 года. Современные решения позволяют повысить производительность и ускорить процессы благодаря оптимизации потоков жидкостей и газов, а также улучшить качество продукции путем контроля давления, температуры и других параметров',
      },

      {
        id: 8,
        description:
          'Уменьшают скорость вращения двигателя или электродвигателя, что позволяет использовать более крупные и прочные агрегаты',
      },
    ],
  };

  const queryUpdateSecondaryImage = `UPDATE Category SET secondary_image = CASE ${updates.secondaryImagesAndPromoDesc
      .map((item) => `WHEN id = ${item.id}  THEN '${item.secondary_image}'`)
      .join(' ')} ELSE secondary_image END`,
    queryUpdatePromoDesc = `UPDATE Category SET promo_desc = CASE ${updates.secondaryImagesAndPromoDesc
      .map((item) => `WHEN id = ${item.id}  THEN '${item.promo_desc}'`)
      .join(' ')} ELSE promo_desc END`,
    queryUpdateDescription = `UPDATE Category SET description = CASE ${updates.descriptions
      .map((item) => `WHEN id = ${item.id}  THEN '${item.description}'`)
      .join(' ')} ELSE description END`;

  await prisma.$transaction([
    prisma.$executeRawUnsafe(queryUpdateSecondaryImage),
    prisma.$executeRawUnsafe(queryUpdatePromoDesc),
    prisma.$executeRawUnsafe(queryUpdateDescription),
  ]);

  return true;
}

export default updateCategories;
