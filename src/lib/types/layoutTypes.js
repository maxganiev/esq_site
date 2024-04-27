export class BreadCrumb {
	constructor(
		/**@type {String} */ name,
		/**@type {BreadCrumb[] | null} */ subcategories,
		/**@type {String | null} */ href
	) {
		this.name = name;
		this.subcategories = subcategories;
		this.href = href;
	}
}
