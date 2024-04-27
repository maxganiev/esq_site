<script>
	import SliderLogos from '$lib/modules/SliderLogos.svelte';
	import BgVideos from '$lib/modules/BgVideos.svelte';
	import Categories from '$lib/modules/Categories.svelte';
	import ContactForm from '$lib/modules/ContactForm.svelte';
</script>

<svelte:head>
	<title>ESQ - Главная</title>
</svelte:head>

<div class="w-100 h-85-vh d-flex pos-r overflow-hidden">
	<div class="w-100 h-100 pos-a top-left z-n-1 bg-clr-green-dark">
		<div class="ellipse"></div>
	</div>

	<div class="d-flex justify-content-end">
		<div class="d-flex flex-column w-60">
			<h1 class="fs-display-lg fw-semi-bold clr-white mt-5"
				>ESQ — передовой производитель промышленной электроники</h1
			>

			<a
				class="btn radius-100 bg-clr-orange clr-white fs-label-md fw-semi-bold mt-5 align-self-start"
				href="https://b2b.elcomspb.ru/"
				target="_blank">Перейти в каталог &#8594;</a
			>
		</div>
	</div>

	<div class="d-flex align-items-center justify-content-end">
		<img src="assets/images/esq_motor.png" alt="esq motor" class="w-95 object-fit-contain" />
	</div>
</div>

<SliderLogos />
<BgVideos />
<Categories />
<ContactForm />

<style lang="scss" scoped>
	.ellipse {
		width: 75%;
		min-height: 100vh;
		aspect-ratio: 1 / 1;
		background: linear-gradient(#051618, #1a747e);
		border-radius: 1000px;
		opacity: 0.7;
		position: absolute;
		left: 50%;
		top: 0%;
	}
</style>
