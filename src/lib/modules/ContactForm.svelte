<script>
	import AlertBadge from '$lib/components/AlertBadge.svelte';
	import Form from '$lib/components/Form.svelte';
	import { globals } from '$lib/globals';
	import { alert } from '$lib/utils/alert';
	globals;

	let _alert = { ...alert },
		submitTimeout = _alert.timeout;

	/**
	 * @param {{ formIsNotValid: Boolean; }} formData
	 */
	async function onSubmit(formData) {
		if (formData.formIsNotValid) {
			_alert.set('Заполните форму', 2);
			_alert = _alert;

			setTimeout(() => {
				_alert = _alert;
			}, _alert.timeout);
		}
	}
</script>

{#if _alert.show}
	<AlertBadge type="{_alert.type}" content="{_alert.msg}" />
{/if}

<div class="bg-white-beige w-100 h-75-vh d-flex align-items-center bg-clr-white-beige pos-r" id="contact-form">
	<div class="d-flex w-100 bg-clr-black-gray p-5-rem">
		<div class="d-flex flex-column h-100 flex-0-4 flex-row-gap-6">
			<div class="d-flex w-80 mx-auto flex-column-gap-1">
				<h3 class="fs-display-sm clr-white fw-semi-bold d-block w-80"
					>Остались вопросы? Перезвоним в удобное для Вас время</h3
				>
				<img
					src="{globals.imagePath}sea-arrow-right.png"
					alt="arrow"
					class="object-fit-contain w-20 align-self-start"
				/>
			</div>

			<div class="d-flex flex-column w-80 mx-auto flex-row-gap-1">
				<div class="w-100">
					<span class="d-flex flex-column-gap-0-5"
						><img src="{globals.imagePath}mail.png" alt="mailbox" class="logo" />
						<p class="m-0 p-0 fs-headline-md fw-semi-bold clr-white">Электронная почта</p>
					</span>
					<a
						class="fs-headline-sm clr-white d-block mt-1"
						href="mailto:beebs@gmail.com"
						target="_blank">beebs@gmail.com</a
					>
				</div>

				<div class="w-100">
					<span class="d-flex flex-column-gap-0-5"
						><img src="{globals.imagePath}phone.png" alt="phone" class="logo" />
						<p class="m-0 p-0 fs-headline-md fw-semi-bold clr-white">Телефон</p>
					</span>
					<p class="fs-headline-sm clr-white d-block p-0 m-0 mt-1">+7 812 240-05-13</p>
				</div>
			</div>
		</div>
		<div class="pos-a elcom-logo-rotated w-25">
			<img src="{globals.imagePath}e.png" alt="elcom logo" class="object-fit-contain w-100" />
		</div>
		<div class="d-flex h-100 flex-0-6 align-self-center">
			<Form class="d-flex flex-column w-80 flex-row-gap-1" {submitTimeout} {onSubmit} />
		</div>
	</div>
</div>

<style lang="scss" scoped>
	.elcom-logo-rotated {
		pointer-events: none;
		bottom: 5%;
		left: 25%;
	}
</style>
