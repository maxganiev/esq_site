<script>
	import { BreadCrumb } from '$lib/types/layoutTypes.js';
	import { categories } from '$lib/stores/categories';
	import { page } from '$app/stores';
	import { globals } from '$lib/globals';

	const crumbs = [
		new BreadCrumb('Главная', null, '/'),
		new BreadCrumb('О бренде', null, '/about_brand'),
		new BreadCrumb('Адреса и контакты', null, '/contacts'),
		new BreadCrumb('Оборудование', $categories, '/categories'),
	];

	$: activeCrumbIdx = crumbs.findIndex((cr) => cr.href === $page.route.id);
</script>

<footer class="clr-white-soft bg-clr-green-dark d-grid h-40-vh flex-column-gap-2 p-5">
	<ul class="list lh-lg fs-body-md clr-white">
		<li class="pb-3"
			><img src="{globals.imagePath}logo/esq.svg" alt="esq_logo" class="object-fit-contain w-50" /></li
		>
		<li>
			<span class="d-flex flex-column-gap-0-5"
				><img src="{globals.imagePath}mail.png" alt="mailbox" class="logo" />
				<a class="clr-white" href="mailto:esq@mail.com" target="_blank">esq@mail.com</a>
			</span>
		</li>
		<li>
			<span class="d-flex flex-column-gap-0-5"
				><img src="{globals.imagePath}phone.png" alt="mailbox" class="logo" />
				<p class="clr-white">+7 812 240-05-13</p>
			</span>
		</li>
		<li>
			<span class="d-flex flex-column-gap-0-5"
				><img src="{globals.imagePath}telegram.png" alt="mailbox" class="logo" />
				<a class="clr-white" href="#" target="_blank">Telegram</a>
			</span>
		</li>
	</ul>

	<ul class="list lh-lg fs-body-lg d-grid links">
		{#each crumbs.slice(0, 3) as crumb, index}
			<li class="{activeCrumbIdx === index ? 'active-item' : ''}"
				><a class="clr-white" href="{crumb.href}">{crumb.name}</a></li
			>
		{/each}

		<li>
			<span
				class="d-flex flex-column-gap-0-5 rounded border border-white border-1 w-100 px-2 py-1 justify-content-center"
			>
				<a href="https://b2b.elcomspb.ru/" target="_blank" class="btn btn-sm outlined">Для бизнеса</a>
				<img src="{globals.imagePath}suitcase.png" alt="suitcase" class="logo" />
			</span>
		</li>
	</ul>

	<ul class="list lh-lg fs-body-md">
		<li class="fs-body-lg">Оборудование</li>
		{#each $categories.slice(0, 7) as category}
			<li><a class="clr-white" href="{category.href}">{category.name}</a></li>
		{/each}
	</ul>

	<ul class="list lh-lg fs-body-md">
		{#each $categories.slice(7, 12) as category}
			<li><a class="clr-white" href="{category.href}">{category.name}</a></li>
		{/each}
	</ul>
</footer>

<style lang="scss" scoped>
	footer {
		grid-template-columns: 25% 15% 25% 25%;

		.links {
			grid-template-rows: repeat(3, 30px);

			li:last-of-type {
				align-self: self-end;
			}
		}
	}

	@media (min-width: 150px) and (max-width: 750px) {
		footer {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
