async function insertCategoryPromoLinks(
  /** @type {import('@prisma/client').PrismaClient}*/ prisma,
) {
  const basePath = 'https://storage.elcomspb.ru/static/esq_site/promos/';
  const updates = [
    { id: 3, promo_link: basePath + 'invertors.pdf' },
    { id: 5, promo_link: basePath + 'automatics.pdf' },
    { id: 6, promo_link: basePath + 'pumps.pdf' },
    { id: 7, promo_link: basePath + 'pump_stations.pdf' },
    { id: 8, promo_link: basePath + 'gears.pdf' },
    { id: 9, promo_link: basePath + 'asutp.pdf' },
    { id: 11, promo_link: basePath + 'motors.pdf' },
    { id: 14, promo_link: basePath + 'vent.pdf' },
    { id: 15, promo_link: basePath + 'des_gpes.pdf' },
  ];

  const query = `UPDATE Category SET promo_link = CASE ${updates
    .map((item) => `WHEN id = ${item.id}  THEN '${item.promo_link}'`)
    .join(' ')} ELSE promo_link END WHERE id IN (${updates
    .map((item) => item.id)
    .join(',')})`;
  await prisma.$executeRawUnsafe(query);

  return true;
}

export default insertCategoryPromoLinks;
