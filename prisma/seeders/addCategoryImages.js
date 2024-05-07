async function addCategoryImages(
  /** @type {import('@prisma/client').PrismaClient}*/ prisma,
) {
  const images = [
    { id: 1, image: 'motors.png' },
    { id: 2, image: 'lw.png' },
    { id: 3, image: 'invertors.png' },
    { id: 4, image: 'soft.png' },
    { id: 5, image: 'pumps.png' },
    { id: 6, image: 'p_stat.png' },
    { id: 7, image: 'gears.png' },
    { id: 8, image: 'asutp.png' },
    { id: 9, image: 'stations.png' },
    { id: 10, image: 'cabinet.png' },
    { id: 11, image: 'vent.png' },
    { id: 12, image: 'des.png' },
  ];

  const query = `UPDATE category SET image = CASE ${images
    .map((item) => `WHEN id = ${item.id}  THEN '${item.image}'`)
    .join(' ')} ELSE image END`;
  await prisma.$executeRawUnsafe(query);

  return true;
}

export default addCategoryImages;
