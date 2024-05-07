<script>
  import MaskInput from 'svelte-input-mask/MaskInput.svelte';
  import {
    cities,
    daysToCallback,
    timesToCallback,
    selectedDayToCallback,
  } from '$lib/stores/selectFormData';
  import { Debounce } from '$lib/utils/debounce';

  /**@type {Function}*/
  export let onSubmit,
    /**@type {Number}*/
    submitTimeout = 3000;

  const input = {
      name: '',
      phone: 0,
      city: '-',
      callbackDate: $selectedDayToCallback.value,
      callbackTime:
        $timesToCallback.find((time) => !time.disabled)?.value || '-',
      message: '',
    },
    debounce = new Debounce();

  function bindPhone({ detail }) {
    input.phone = detail.inputState.maskedValue;
    console.log(detail);
  }

  /**@type {String[] }*/
  let citiesFound = [];
  function searchCities(/**@type {Event & { target: HTMLInputElement; }}*/ e) {
    const query = e.target.value.toLowerCase();
    if (query.length < 1) return;

    citiesFound = $cities
      .filter((city) => city.name.toLowerCase().includes(query))
      .map((city) => city.name);
    input.city = citiesFound[0] || '-';
  }

  $: formIsNotValid = Object.values(input).some(
    (val) =>
      !val ||
      (typeof val === 'string' && val.length < 1) ||
      (typeof val === 'number' && val < 1),
  );

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
</script>

<form
  {...$$restProps}
  on:submit={(e) => {
    e.preventDefault();
    onSubmit.apply(null, [{ input, formIsNotValid }]);
    disableSubmit = true;
  }}>
  <div class="d-flex flex-column-gap-1">
    <div class="w-20">
      <label class="fs-headline-sm clr-white" for="name">Имя</label>
    </div>
    <div class="w-65">
      <input
        type="text"
        class="form-control form-control-sm fs-headline-sm w-65"
        placeholder="Представьтесь, пожалуйста"
        bind:value={input.name} />
    </div>
  </div>

  <div class="d-flex flex-column-gap-1">
    <div class="w-20">
      <label class="fs-headline-sm clr-white" for="phone">Телефон</label>
    </div>
    <div class="w-65">
      <MaskInput
        alwaysShowMask
        mask="+7 (900) 000 - 0000"
        size={20}
        showMask
        maskChar="_"
        class="form-control form-control-sm fs-headline-sm w-65"
        on:change={bindPhone} />
    </div>
  </div>

  <div class="d-flex flex-column-gap-1">
    <div class="w-20">
      <label class="fs-headline-sm clr-white" for="city">
        Город обслуживания
      </label>
    </div>
    <div class="w-65 d-flex flex-column flex-row-gap-0-5">
      <input
        type="text"
        class="form-control form-control-sm fs-headline-sm w-65"
        placeholder="Начните вводить название города"
        on:input={(e) => debounce.start(searchCities, [e])} />
      <select class="form-select form-select-sm w-65" bind:value={input.city}>
        {#if citiesFound.length === 0}
          <option value="-">-</option>
        {/if}
        {#each citiesFound as city}
          <option value={city}>{city}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="d-flex flex-column-gap-1">
    <div class="w-20">
      <label class="fs-headline-sm clr-white" for="callback-time">
        Когда перезвонить
      </label>
    </div>
    <div class="w-65">
      <div class="d-flex flex-column-gap-0-5">
        <select
          class="form-select form-select-sm w-30 fs-headline-sm"
          bind:value={input.callbackDate}
          on:change={setDayToCallBack}>
          {#each $daysToCallback as day}
            <option data-day={JSON.stringify(day)} value={day.value}>
              {day.value}
            </option>
          {/each}
        </select>

        <select
          class="form-select form-select-sm w-30 fs-headline-sm"
          bind:value={input.callbackTime}>
          {#if input.callbackTime === '-'}
            <option value="-">-</option>
          {/if}
          {#each $timesToCallback as time}
            <option value={time.value} disabled={time.disabled}>
              {time.value}
            </option>
          {/each}
        </select>

        {#if input.callbackTime === '-'}
          <strong class="fs-headline-sm clr-orange ps-1 text-center">
            Пожалуйста, выберите другой день
          </strong>
        {/if}
      </div>
    </div>
  </div>

  <div class="d-flex flex-column-gap-1">
    <div class="w-20">
      <label class="fs-headline-sm clr-white" for="name">Сообщение</label>
    </div>
    <div class="w-65">
      <textarea
        class="form-control w-100 h-15-vh fs-headline-sm"
        bind:value={input.message}
        placeholder="Оставьте свое сообщение и мы обязательно с Вами свяжемся" />
      <input
        type="submit"
        class="btn btn-sm bg-clr-orange clr-white w-50 fs-headline-sm mt-3 py-2 rounded-pill"
        value="Отправить"
        disabled={formIsNotValid} />
    </div>
  </div>
</form>
