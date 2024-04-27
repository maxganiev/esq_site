import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedRootCategories(/** @type {import('@prisma/client').PrismaClient}*/ prisma) {
	const rootCategories = [
		{ name: 'Электродвигатели', sort_order: 1, href: '', href: '/motors' },
		{ name: 'Низковольтное оборудование', sort_order: 2, href: '/low_voltage' },
		{ name: 'Частотные преобразователи', sort_order: 3, href: '/frequency_invertors' },
		{ name: 'Устройства плавного пуска', sort_order: 4, href: '/soft_starts' },
		{ name: 'Насосы', sort_order: 5, href: '/pumps' },
		{ name: 'Автоматизированные насосные станции', sort_order: 6, href: '/pump_stations' },
		{ name: 'Редукторы', sort_order: 7, href: '/gears' },
		{ name: 'АСУ ТП', sort_order: 8, href: '/asutp' },
		{ name: 'Комплектные трансформаторные подстанции', sort_order: 9, href: '/transformer substations' },
		{ name: 'Щитовое оборудование', sort_order: 10, href: '/control_cabinets' },
		{ name: 'Канальные вентиляторы', sort_order: 11, href: '/channel_vents' },
		{ name: 'ДЭC/ГПЭC', sort_order: 12, href: '/diesel_and_hydro_stations' },
		{ name: 'Смотреть все', sort_order: 13, href: 'https://b2b.elcomspb.ru/' },
	];

	await prisma.category.createMany({
		data: rootCategories.map((cat) =>
			Object.assign({}, { name: cat.name, sort_order: cat.sort_order, href: cat.href || null })
		),
	});

	return true;
}

async function addCategoryImages(/** @type {import('@prisma/client').PrismaClient}*/ prisma) {
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

async function seed() {
	//await seedRootCategories(prisma);
	await addCategoryImages(prisma);
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
