<script>
  import AlertBadge from '$lib/components/AlertBadge.svelte';
  import Form from '$lib/components/Form.svelte';
  import GutterMain from '$lib/components/gutters/GutterMain.svelte';
  import { globals } from '$lib/globals';
  import { alert } from '$lib/utils/alert';

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
  <AlertBadge type={_alert.type} content={_alert.msg} />
{/if}

<div class="w-100 pos-r" id="contact-form">
  <div class="w-100 bg-clr-black-gray">
    <GutterMain classList={['d-flex']}>
      <div class="d-flex flex-column w-50 justify-content-between">
        <div class="d-flex flex-column-gap-2">
          <h3 class="fs-headline-lg clr-white fw-semi-bold d-block w-60">
            Остались вопросы? <br />
            Перезвоним в удобное для Вас время
          </h3>
          <img
            src="{globals.imagePath}sea-arrow-right.png"
            alt="arrow"
            class="object-fit-contain w-20 align-self-start" />
        </div>

        <slot name="contact-details" />
      </div>
      <div
        class="pos-a w-50 h-100 pointer-none d-flex align-items-center elcom-logo-rotated">
        <img
          src="{globals.imagePath}e.png"
          alt="elcom logo"
          class="object-fit-contain" />
      </div>
      <div class="d-flex w-50 align-self-center">
        <Form
          class="d-flex flex-column w-100 flex-row-gap-1"
          {submitTimeout}
          {onSubmit} />
      </div>
    </GutterMain>
  </div>
</div>

<div style="height: 2rem;" class="w-100 bg-clr-white-beige"></div>

<style lang="scss" scoped>
  .elcom-logo-rotated {
    width: calc(50% - 6rem) !important;
    height: calc(100% - 6rem) !important;
    justify-content: flex-end;

    img {
      width: 50%;
      max-width: 450px;
    }
  }
</style>
