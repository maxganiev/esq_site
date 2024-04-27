<script>
	import { fade } from 'svelte/transition';

	/**@type {import('$lib/types/layoutTypes').BreadCrumb[]}*/
	export let menuItems = [],
		/**@type {String}*/
		title = '',
		textColor = 'white',
		/**@type {String[]}*/
		dropdownMenuClasses = [''];

	let collapsed = true;

	function toggleDropdown(/**@type {MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement; }}*/ e) {
		e.preventDefault();
		collapsed = !collapsed;
	}
</script>

<div class="dropdown fs-body-lg">
	<a href="#" on:click="{(e) => toggleDropdown(e)}"
		><span class="d-flex flex-nowrap"
			>{title}
			<img
				src="/assets/images/chevron-{!collapsed ? 'up' : 'down'}-solid-{textColor}.svg"
				alt="chevron"
			/></span
		></a
	>
	{#if !collapsed}
		<ul
			in:fade="{{ duration: 400 }}"
			out:fade="{{ duration: 400 }}"
			class="dropdown-menu d-flex flex-column-gap-2 flex-row-gap-1-5 {dropdownMenuClasses
				.map((c) => c)
				.join(' ')} flex-wrap rounded-bottom"
		>
			{#each menuItems as item}
				<li class="col-md-5 col-sm-12"><a href="{item.href}">{item.name}</a></li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss" scoped>
	.dropdown {
		background-color: inherit;

		a > span > img {
			width: 20px;
			object-fit: contain;
			margin-left: 5px;
		}
	}
</style>
