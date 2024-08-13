async function insertCategoryLinks(
  /** @type {import('@prisma/client').PrismaClient}*/ prisma,
) {
  const updates = [
    { id: 2, link: 'https://www.elcomspb.ru/retail/invertors/ ' },
    { id: 2, link: 'https://www.elcomspb.ru/retail/invertors/' },
    { id: 3, link: 'https://www.elcomspb.ru/retail/invertors/' },
    { id: 4, link: 'https://www.elcomspb.ru/retail/invertors/' },
    {
      id: 5,
      link: 'https://www.elcomspb.ru/retail/nizkovoltnoe-0-4kv-i-vysokovoltnoe-6-35kv-oborudov/',
    },
    { id: 6, link: 'https://www.elcomspb.ru/retail/pumps/ ' },
    { id: 7, link: 'https://www.elcomspb.ru/retail/pumps/control_stations/ ' },
    { id: 8, link: 'https://www.elcomspb.ru/retail/gearbox/' },
    { id: 9, link: 'https://www.elcomspb.ru/retail/schild/' },
    { id: 10, link: 'https://www.elcomspb.ru/retail/electric_engines/' },
    { id: 11, link: 'https://www.elcomspb.ru/retail/electric_engines/' },
    { id: 12, link: 'https://www.elcomspb.ru/retail/electric_engines/' },
    { id: 13, link: 'https://www.elcomspb.ru/retail/schild/' },
    {
      id: 14,
      link: 'https://www.elcomspb.ru/retail/klimaticheskoe-oborudovanie/ventilyatsiya/',
    },
    { id: 15, link: 'https://www.elcomspb.ru/retail/electric_stations/' },
    { id: 16, link: 'https://www.elcomspb.ru/retail/bearings/' },
    { id: 17, link: 'https://www.elcomspb.ru/retail/' },
  ];

  const query = `UPDATE category SET link = CASE ${updates
    .map((item) => `WHEN id = ${item.id}  THEN '${item.link}'`)
    .join(' ')} ELSE link END`;
  await prisma.$executeRawUnsafe(query);

  return true;
}

export default insertCategoryLinks;
