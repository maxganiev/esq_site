import { PrismaClient } from '@prisma/client';
import updateCategoryImages from './updateCategoryImages.js';
import updateCategories from './updateCategories.js';
import updateKeyFeatures from './updateKeyFeatures.js';
import insertCategoryLinks from './insertCategoryLinks.js';

const prisma = new PrismaClient();

async function seed() {
  // await updateCategoryImages(prisma);
  // await updateCategories(prisma);
  // await updateKeyFeatures(prisma);
  await insertCategoryLinks(prisma);
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
