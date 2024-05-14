import { PrismaClient } from '@prisma/client';
import seedAllCategories from './seedAllCategories.js';
import seedKeyFeatures from './seedKeyFeatures.js';

const prisma = new PrismaClient();

async function seed() {
  await seedAllCategories(prisma);
  await seedKeyFeatures(prisma);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
