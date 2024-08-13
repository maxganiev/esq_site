async function updateCategoryImages(
  /** @type {import('@prisma/client').PrismaClient}*/ prisma,
) {
  const images = [
    { id: 13, image: 'control_switchgears.png' },
    { id: 2, image: 'invertors.png' },
    { id: 3, image: 'invertors.png' },
    { id: 4, image: 'invertors_3.png' },
    { id: 5, image: 'lw.png' },
    { id: 11, image: 'motors_esq.png' },
    { id: 12, image: 'motors_esq_pr.png' },
  ];

  const query = `UPDATE category SET image = CASE ${images
    .map((item) => `WHEN id = ${item.id}  THEN '${item.image}'`)
    .join(' ')} ELSE image END`;
  await prisma.$executeRawUnsafe(query);

  return true;
}

export default updateCategoryImages;
