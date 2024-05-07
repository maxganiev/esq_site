import { PrismaClient } from '@prisma/client';
import seedBranches from './seedBranches.js';
const prisma = new PrismaClient();

async function seed() {
  await seedBranches(prisma);
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
