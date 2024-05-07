<script>
  import Form from '$lib/components/Form.svelte';
  import { globals } from '$lib/globals';
  import ContactForm from '$lib/modules/ContactForm.svelte';
  import { branches } from '$lib/stores/categories';
  import Icon from '@iconify/svelte';

  $: tabs = Object.keys($branches).reduce(
    (
      /**@type {Object & {country_id: Number, country_name: String}[]}*/ acc,
      key,
    ) =>
      acc.length > 0 &&
      acc.findIndex((br) => $branches[key].country_id === br.country_id) !== -1
        ? acc
        : [
            ...acc,
            Object.assign(
              {},
              {
                country_id: $branches[key].country_id,
                country_name: $branches[key].country_name,
              },
            ),
          ],
    [],
  );

  /**@type {Number}*/
  let selectedCountryId;
  $: if (tabs.length > 0) selectedCountryId = tabs[0].country_id;

  /**
   * @param {{ preventDefault: () => void; }} e
   * @param {Number} countryId
   */
  function selectTab(e, countryId) {
    e.preventDefault();
    selectedCountryId = countryId;
  }
</script>

<svelte:head>
  <title>Контакты</title>
</svelte:head>

<div class="w-100 h-100-vh bg-clr-white-beige">
  <div class="row p-5 flex-row-gap-1">
    <div
      class="col-md-4 col-sm-6 d-flex flex-column flex-row-gap-0-25 clr-green-dark">
      <h2 class="fs-display-md fw-semi-bold p-0 m-0">Контакты</h2>
      <ul class="m-0 p-0 mt-3 fs-body-lg lh-md w-75 list">
        <li>
          Г. Санкт-Петербург, ул. Витебская Сортировочная, д. 34, лит. И, оф. 38
        </li>
        <li><strong>Пн-Пт 9:00–17:00</strong></li>
        <li>
          <span class="d-flex flex-column-gap-0-5 align-items-center">
            <Icon icon="ic:baseline-mail" style="color: #051618" />
            <a href="mailto:esq@mail.com" target="_blank">esq@mail.com</a>
          </span>
        </li>
        <li>
          <span class="d-flex flex-column-gap-0-5 align-items-center">
            <Icon icon="ic:round-phone" style="color: #051618" />
            <p class="p-0 m-0">+7 812 240-05-13</p>
          </span>
        </li>
        <li>
          <span class="d-flex flex-column-gap-0-5 align-items-center">
            <Icon icon="basil:telegram-solid" style="color: #051618" />
            <a href="#" target="_blank">Telegram</a>
          </span>
        </li>
      </ul>
    </div>
    <div
      class="col-md-8 col-sm-6 d-flex justify-content-center h-10-vh bg-logistics">
    </div>
  </div>

  <div class="row p-5">
    <div class="col-md-12">
      <div class="d-flex">
        {#each tabs as tab}
          <a
            href="#"
            class="fs-title-md fw-semi-bold px-5 pb-2 {selectedCountryId ===
            tab.country_id
              ? 'active-tab'
              : ' border-bottom border-light'}"
            on:click={(e) => selectTab(e, tab.country_id)}>
            {tab.country_name}
          </a>
        {/each}
      </div>
    </div>
    <div class="col-md-12 row flex-row-gap-2 clr-green-dark mt-5">
      {#each $branches.filter((branch) => branch.country_id === selectedCountryId) as branch}
        <div class="col-lg-3 col-md-4 col-sm-6">
          <h4 class="fs-headline-md">{branch.config_name}</h4>
          <ul class="list m-0 p-0">
            <li><small class="fs-body-md">{branch.config_address}</small></li>
            <li><small class="fs-body-md">{branch.config_telephone}</small></li>
            <li>
              <a href="mailto:{branch.config_email}">
                <small class="fs-body-md">{branch.config_email}</small>
              </a>
            </li>
          </ul>
        </div>
      {/each}
    </div>
  </div>

  <ContactForm />
</div>

<style lang="scss" scoped>
  .bg-logistics {
    background: url('/assets/images/logistics.png') center center/cover;
  }

  .active-tab {
    border-bottom: 1px #00798c solid;
    transition: border-bottom 0.4s ease-out;
  }
</style>
