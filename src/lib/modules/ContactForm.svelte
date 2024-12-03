<script>
  import AlertBadge from '$lib/components/AlertBadge.svelte';
  import Form from '$lib/components/Form.svelte';
  import GutterMain from '$lib/components/gutters/GutterMain.svelte';
  import { globals } from '$lib/globals';
  import { isMobile, showLoader } from '$lib/stores/ui';
  import { alert } from '$lib/utils/alert';

  let _alert = { ...alert },
    submitTimeout = _alert.timeout;

  /**
   * @param {{input:{name: String, phone: String, email: String, city: String, callbackDate: String, callbackTime: String, message: String}, formIsNotValid: Function; }} formData
   */
  async function onSubmit(formData) {
    if (formData.formIsNotValid()) return;

    const { input } = formData;

    const fd = new FormData(),
      payload = {
        name: input.name,
        phone: input.phone,
        mail: input.email,
        office: input.city,
        comment: `Перезвонить ${input.callbackDate} в ${input.callbackTime}`,
        requests: input.message,
      };

    fd.append('payload', JSON.stringify(payload));

    $showLoader = true;

    try {
      const origin = window.location.origin.includes('localhost')
        ? 'http://localhost'
        : 'https://portal.elcomspb.ru';
      const req = await fetch(origin + '/api/requests-site', {
        method: 'POST',
        body: fd,
        headers: {
          origin,
        },
      });

      const res = await req.json();

      if (res.success) {
        _alert.show = true;
        _alert.type = 'success';
        _alert.msg = 'Ваше обращение зарегистрировано, спасибо';
      } else {
        _alert.show = true;
        _alert.type = 'danger';
        _alert.msg = 'Сбой отправки, повторите попытку позже.';
      }
    } catch (error) {
      console.log(error);

      _alert.show = true;
      _alert.type = 'danger';
      _alert.msg = 'Сбой отправки, повторите попытку позже.';
    }

    $showLoader = false;

    setTimeout(() => {
      _alert.show = false;
    }, 6000);
  }
</script>

{#if _alert.show}
  <AlertBadge type={_alert.type} content={_alert.msg} />
{/if}

<div class="w-100 pos-r" id="contact-form">
  <div class="w-100 bg-clr-black-gray">
    <GutterMain
      classList={[
        'd-flex',
        $isMobile ? 'flex-column flex-row-gap-1-5' : 'flex-row',
      ]}>
      <div
        class="d-flex flex-column w-{$isMobile
          ? 100
          : 50} justify-content-between">
        <div
          class="d-flex flex-column-gap-2 {$isMobile
            ? 'justify-content-between'
            : ''}">
          <h3
            class="{$isMobile
              ? 'fs-label-lg'
              : 'fs-headline-lg'} clr-white fw-semi-bold d-block w-60">
            Остались вопросы? <br />
            Перезвоним в удобное для Вас время
          </h3>
          <img
            src="{globals.imagePath}sea-arrow-right.png"
            alt="arrow"
            class="object-fit-contain align-self-start image-arrow" />
        </div>

        <slot name="contact-details" />
      </div>
      <div
        class="pos-a pointer-none d-flex align-items-center elcom-logo-rotated">
        <img
          src="{globals.imagePath}e.png"
          alt="elcom logo"
          class="object-fit-contain" />
      </div>

      <div
        class="{$isMobile
          ? 'd-block w-100'
          : 'd-flex w-50'} align-self-center z-1">
        <Form
          class="d-flex {isMobile
            ? 'flex-column flex-row-gap-1-5'
            : 'flex-row flex-column-gap-1'} w-100"
          {submitTimeout}
          {onSubmit} />
      </div>
    </GutterMain>
  </div>
</div>

<div style="height: 2rem;" class="w-100 bg-clr-white-beige"></div>

<style lang="scss" scoped>
  .elcom-logo-rotated {
    width: calc(50% - 6rem);
    height: calc(100% - 6rem) !important;
    justify-content: flex-end;

    img {
      width: 50%;
      max-width: 450px;
    }

    @media (min-width: 150px) and (max-width: 750px) {
      grid-template-columns: repeat(1, 1fr);
      width: 100%;
      height: 100%;
      left: 0;

      img {
        width: 100%;
        rotate: -180deg;
        z-index: 0;
      }
    }
  }

  .image-arrow {
    width: 20%;

    @media (min-width: 150px) and (max-width: 750px) {
      width: 15%;
      rotate: 90deg;
      transform-origin: 0 0;
      transform: translateY(-12.5vw) translateX(-20%);
    }
  }
</style>
