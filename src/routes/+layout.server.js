import { prisma } from '$lib/prisma';

export const load = async ({}) => {
	const [rootCategories] = await prisma.$transaction([prisma.category.findMany({ where: { parent_id: -1 } })]);

	return {
		rootCategories,
	};
};
