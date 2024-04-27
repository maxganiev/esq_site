<script>
	import { BreadCrumb } from '$lib/types/layoutTypes.js';
	import { categories } from '$lib/stores/categories';
	import Dropdown from './Dropdown.svelte';
	import { page } from '$app/stores';
	import { globals } from '$lib/globals';

	const crumbs = [
		new BreadCrumb('Главная', null, '/'),
		new BreadCrumb('Оборудование', $categories, '/categories'),
		new BreadCrumb('О бренде', null, '/about_brand'),
		new BreadCrumb('Адреса и контакты', null, '/contacts'),
		new BreadCrumb('Оставить заявку', null, '#contact-form'),
	];

	$: activeCrumbIdx = crumbs.findIndex((cr) => cr.href === $page.route.id);
	$: listOffsetWidth = 0;
</script>

<header>
	<nav class="navbar w-100 h-15-vh align-items-center fs-body-lg clr-white-soft bg-clr-green-dark fw-light">
		<ul
			class="list w-95 h-100 mx-auto d-flex flex-column-gap-2 align-items-center"
			bind:offsetWidth="{listOffsetWidth}"
		>
			<li><img src="{globals.imagePath}logo/esq.svg" alt="esq_logo" /></li>

			{#each crumbs as crumb, index}
				<li class="{activeCrumbIdx === index ? 'active-item' : ''}">
					{#if crumb.subcategories}
						<Dropdown
							title="{crumb.name}"
							menuItems="{$categories.slice(0, -1)}"
							dropdownMenuClasses="{[
								'clr-white-soft',
								'bg-clr-green-dark',
								'p-3',
								'mt-4',
								'w-65-vw',
								'fs-body-lg',
								'hover-item',
							]}"
						/>
					{:else}
						<a href="{crumb.href}">{crumb.name}</a>
					{/if}
				</li>
			{/each}

			<li class="flex-grow-1 d-flex justify-content-end hover-item"
				><span class="d-flex align-items-center"
					><a href="https://b2b.elcomspb.ru/" target="_blank">Для бизнеса</a>
					<img src="/assets/images/suitcase.png" alt="suitcase" class="ms-2 icon-base" /></span
				>
			</li>
		</ul>
	</nav>
</header>
