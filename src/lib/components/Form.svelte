<script>
  import MaskInput from 'svelte-input-mask/MaskInput.svelte';
  import {
    daysToCallback,
    timesToCallback,
    selectedDayToCallback,
    phoneMasks,
  } from '$lib/stores/selectFormData';

  import Autocomplete from './Autocomplete.svelte';
  import { isMobile } from '$lib/stores/ui';
  import { branches } from '$lib/stores/categories';

  /**@type {Function}*/
  export let onSubmit,
    /**@type {Number}*/
    submitTimeout = 3000;

  const input = {
      name: '',
      email: '',
      city: '',
      callbackDate: $selectedDayToCallback.value,
      callbackTime: $timesToCallback[0].value,
      message: '',
    },
    phoneMaskedInput = {
      visibleValue: null,
      maskedValue: null,
    };

  function bindPhone({ detail }) {
    phoneMaskedInput.visibleValue = detail.inputState.visibleValue;
    phoneMaskedInput.maskedValue = detail.inputState.maskedValue;
  }

  $: countryIdx = 'RU';
  $: currentCountry = $phoneMasks[countryIdx];

  $: formIsNotValid = () => {
    const passedByLength =
      input.name.length &&
      input.city.length &&
      input.callbackDate.length &&
      input.callbackTime.length &&
      input.message.length;

    const passedByCompare =
      phoneMaskedInput.maskedValue &&
      phoneMaskedInput.visibleValue &&
      phoneMaskedInput.maskedValue.length ===
        phoneMaskedInput.visibleValue.length;

    const passedByRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
      input.email,
    );

    return !passedByLength || !passedByCompare || !passedByRegex;
  };

  let disableSubmit = false;

  $: if (disableSubmit)
    setTimeout(() => {
      disableSubmit = false;
    }, submitTimeout);

  /**
   * @param {{ target: { children: ArrayLike<any> | Iterable<any>; }; }} e
   */
  function setDayToCallBack(e) {
    const daySelected = Array.from(e.target.children)
      .find((option) => option.selected)
      .getAttribute('data-day');

    if (daySelected)
      selectedDayToCallback.update((val) => (val = JSON.parse(daySelected)));
  }

  function selectCity(e) {
    input.city = e.detail;
  }

  function resetInput() {
    input.message = '';
  }

  $: rowWrapperClass = $isMobile ? 'd-block' : 'd-flex flex-column-gap-1';
  $: labelWidthClass = $isMobile ? 'w-100 pb-2' : 'w-20';
  $: inputWidthClass = $isMobile ? 'w-100' : 'w-80';
  $: fontSizeClass = $isMobile ? 'fs-title-lg' : 'fs-headline-sm';

  let conditionsAccepted = false;
</script>

<form
  autocomplete="off"
  {...$$restProps}
  on:submit={(e) => {
    e.preventDefault();
    onSubmit.apply(null, [
      {
        input: { ...input, phone: phoneMaskedInput.visibleValue },
        formIsNotValid,
      },
    ]);
    disableSubmit = true;
    resetInput();
  }}>
  <div class={rowWrapperClass}>
    <div class={labelWidthClass}>
      <label class="{fontSizeClass} clr-white" for="name">Имя</label>
    </div>
    <div class={inputWidthClass}>
      <input
        type="text"
        class="form-control {fontSizeClass} w-100"
        bind:value={input.name} />
    </div>
  </div>

  <div class={rowWrapperClass}>
    <div class={labelWidthClass}>
      <label class="{fontSizeClass} clr-white" for="phone">Телефон</label>
    </div>
    <div class={inputWidthClass}>
      <div class="d-flex flex-column-gap-0-5 w-100">
        <select
          class="form-select w-30 {fontSizeClass}"
          bind:value={countryIdx}>
          {#each Object.keys($phoneMasks) as key}
            <option value={key}>
              {$phoneMasks[key].emoji}
              {$phoneMasks[key].iso2}
            </option>
          {/each}
        </select>
        <MaskInput
          alwaysShowMask
          mask={currentCountry.mask}
          showMask
          maskChar="_"
          class="form-control {fontSizeClass} w-70"
          on:change={bindPhone} />
      </div>
    </div>
  </div>

  <div class={rowWrapperClass}>
    <div class={labelWidthClass}>
      <label class="{fontSizeClass} clr-white" for="name">
        Электронная почта
      </label>
    </div>
    <div class={inputWidthClass}>
      <input
        type="text"
        class="form-control {fontSizeClass} w-100"
        autocomplete="-"
        bind:value={input.email} />
    </div>
  </div>

  <div class={rowWrapperClass}>
    <div class={labelWidthClass}>
      <label class="{fontSizeClass} clr-white" for="city">
        Город обслуживания
      </label>
    </div>
    <div class="{inputWidthClass} d-flex flex-column flex-row-gap-0-5">
      <Autocomplete
        items={[
          { config_name: 'Санкт-Петербург' },
          ...$branches.map((branch) => branch),
        ].sort((a, b) => (a.config_name < b.config_name ? -1 : 1))}
        itemKey={'config_name'}
        class="{fontSizeClass} w-100 form-control no-scrollbars"
        on:select={selectCity} />
    </div>
  </div>

  <div class={rowWrapperClass}>
    <div class={labelWidthClass}>
      <label class="{fontSizeClass} clr-white" for="callback-time">
        Когда перезвонить
      </label>
    </div>
    <div class={inputWidthClass}>
      <div class="d-flex flex-column-gap-0-5">
        <select
          class="form-select {fontSizeClass} w-50}"
          bind:value={input.callbackDate}
          on:change={setDayToCallBack}>
          {#each $daysToCallback as day}
            <option data-day={JSON.stringify(day)} value={day.value}>
              {day.value}
            </option>
          {/each}
        </select>

        <select
          class="form-select {fontSizeClass} w-50}"
          bind:value={input.callbackTime}>
          {#if input.callbackTime === '-'}
            <option value="-">-</option>
          {/if}
          {#each $timesToCallback as time}
            <option value={time.value}>
              {time.value}
            </option>
          {/each}
        </select>

        {#if input.callbackTime === '-'}
          <strong class="{fontSizeClass} clr-orange ps-1 text-center">
            Пожалуйста, выберите другой день
          </strong>
        {/if}
      </div>
    </div>
  </div>

  <div class={rowWrapperClass}>
    <div class={labelWidthClass}>
      <label class="{fontSizeClass} clr-white" for="name">Сообщение</label>
    </div>
    <div class="w-{$isMobile ? 100 : 80}">
      <textarea
        class="form-control w-100 h-15-vh {fontSizeClass}"
        bind:value={input.message} />

      <div class="form-check form-switch my-4">
        <input
          class="form-check-input"
          type="checkbox"
          bind:checked={conditionsAccepted} />
        <label class="form-check-label" for="">
          <span class="clr-white {fontSizeClass}">
            Согласен с <a
              href="https://www.elcomspb.ru/agrements/?type=agree"
              target="_blank"
              style="text-decoration: underline !important;">
              условиями передачи данных
            </a>
          </span>
        </label>
      </div>

      <input
        type="submit"
        class="btn btn-sm bg-clr-orange clr-white {$isMobile
          ? 'w-100 fs-label-lg'
          : 'w-50 fs-body-lg'} fw-semi-bold py-2 rounded-pill"
        value="Отправить"
        disabled={formIsNotValid() || !conditionsAccepted} />
    </div>
  </div>
</form>
