<script>
	import { globals } from '$lib/globals';
	import { categories } from '$lib/stores/categories';
	import { isMobile } from '$lib/stores/ui';

	const path = globals.imagePath + 'categories/';
</script>

<div class="categories flex-column-gap-1 flex-row-gap-1 w-100 h-100-vh bg-clr-white-beige px-5 pt-20-vh pb-4">
	<h2 class="clr-green-dark fs-display-md fw-semi-bold" style="grid-column: 1/{$isMobile ? 3 : 5}"
		>Ключевой ассортимент</h2
	>
	{#each $categories as category (category.id)}
		<!--Движки-->
		{#if category.id === 1}
			<div class="category-col h-40-vh pos-r">
				<a
					href="category{category.href}"
					class="d-block w-100 h-100 rounded-3"
					style="background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url({path}{category.image}) center center/cover; grid-column: 1/{$isMobile
						? 1
						: 3}"
					><span class="clr-white fs-headline-md d-block pt-3 ps-3">{category.name}</span></a
				>
			</div>
			<!--Комплектные подстанции-->
		{:else if category.id === 9}
			<div class="category-col h-40-vh pos-r">
				<a
					href="category{category.href}"
					class="d-block w-100 h-100 rounded-3"
					style="background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url({path}{category.image}) center center/cover; grid-column: 2/{$isMobile
						? '1/1'
						: '2/4'}"
					><span class="clr-white fs-headline-md d-block pt-3 ps-3">{category.name}</span></a
				>
			</div>
			<!--Разное-->
		{:else if category.id === 13}
			<div class="category-col h-40-vh pos-r">
				<a class="d-block w-100 h-100 rounded-3 bg-clr-white" href="{category.href}"
					><span class="clr-green-dark fs-headline-md d-block pt-3 ps-3">{category.name}</span>
					<span class="clr-orange pos-a bottom-right me-5 mb-5">&#8594</span></a
				>
			</div>
		{:else}
			<div class="category-col h-40-vh pos-r">
				<a
					href="category{category.href}"
					class="d-block w-100 h-100 rounded-3"
					style="background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url({path}{category.image}) center center/cover;"
					><span class="clr-white fs-headline-md d-block pt-3 ps-3">{category.name}</span></a
				>
			</div>
		{/if}
	{/each}
</div>

<style lang="scss" scoped>
	.categories {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}

	@media (min-width: 150px) and (max-width: 750px) {
		.categories {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
