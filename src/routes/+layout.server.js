import { prisma } from '$lib/prisma';

export const load = async ({}) => {
  const [rootCategories, branches] = await prisma.$transaction([
    prisma.category.findMany({ where: { parent_id: -1 } }),
    prisma.branch.findMany({
      orderBy: { store_id: 'asc' },
    }),
  ]);

  /**@type {Object.<number | string, Object & {country_id: Number, config_address: String, config_country_id: String, config_email: String, config_name: String, config_telephone: String, country_name: String}>} */
  const branchesByCountriesObj = branches.reduce((acc, curr, idx, arr) => {
      let country_name = '',
        /**@type {Number | undefined}*/
        country_id = undefined;

      if (curr.store_id === 13 || curr.store_id === 14) {
        country_id = 1;
        country_name = 'Казахстан';
      } else if (curr.store_id === 24) {
        country_id = 2;
        country_name = 'Кыргызстан';
      } else if (curr.store_id === 26) {
        country_id = 3;
        country_name = 'Узбекистан';
      } else {
        country_id = 4;
        country_name = 'Россия';
      }

      return Object.assign(acc, {
        [curr.store_id]: arr.reduce(
          (acc2, curr2) =>
            curr.store_id !== curr2.store_id
              ? acc2
              : Object.assign(acc2, {
                  [curr2.key]: curr2.value,
                  country_id,
                  country_name,
                }),
          {},
        ),
      });
    }, {}),
    branchesByCountries = Object.keys(branchesByCountriesObj).reduce(
      (
        /**@type {Object & {country_id: Number, config_address: String, config_country_id: String, config_email: String, config_name: String, config_telephone: String, country_name: String}[]}*/ acc,
        key,
      ) => [...acc, branchesByCountriesObj[key]],
      [],
    );

  return {
    rootCategories,
    branchesByCountries,
  };
};
