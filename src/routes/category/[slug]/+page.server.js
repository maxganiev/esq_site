import { prisma } from '$lib/prisma';

export async function load({ params }) {
  const category = await prisma.category.findFirst({
    where: { href: '/' + params.slug },
    include: {
      key_features: true,
    },
  });

  /**
   * @type {{ id: Number; parent_id: Number; name: String; href: String | null; image: String | null; product_id: Number | null; sort_order: Number; active: Number; created_at: Date; updated_at: Date | null; link: String | null; description: String | null;  }[]}
   */
  let subCategories = [];

  if (category)
    subCategories = await prisma.category.findMany({
      where: { parent_id: category.id },
      include: {
        key_features: true,
      },
    });

  return { category, subCategories };
}
