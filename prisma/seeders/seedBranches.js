import branches from './upload/branches.json' assert { type: 'json' };

async function seedBranches(
  /** @type {import('@prisma/client').PrismaClient}*/ prisma,
) {
  await prisma.branch.createMany({
    data: branches.map((br) => {
      const { setting_id, store_id, key, value } = br;
      return Object.assign({}, { setting_id, store_id, key, value });
    }),
  });

  return true;
}

export default seedBranches;
