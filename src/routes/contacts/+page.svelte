<script>
  import GutterMain from '$lib/components/gutters/GutterMain.svelte';
  import GutterX from '$lib/components/gutters/GutterX.svelte';
  import { globals } from '$lib/globals';
  import ContactForm from '$lib/modules/ContactForm.svelte';
  import { branches } from '$lib/stores/categories';
  import { contacts } from '$lib/stores/contacts';
  import { isMobile } from '$lib/stores/ui';
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
  $: if (tabs.length > 0 && !selectedCountryId)
    selectedCountryId = tabs[0].country_id;

  /**
   * @param {{ preventDefault: () => void; }} e
   * @param {Number} countryId
   */
  function selectTab(e, countryId) {
    e.preventDefault();
    selectedCountryId = countryId;
  }

  $: listClass = !$isMobile
    ? 'fs-body-lg lh-md w-75'
    : 'fs-label-lg lh-lg w-100';
  $: fontSizeLg = !$isMobile ? 'fs-display-sm' : 'fs-label-lg';
  $: fontSizeSm = !$isMobile ? 'fs-body-md' : 'fs-title-lg';
</script>

<svelte:head>
  <title>Контакты</title>
</svelte:head>

<div class="w-100 h-100-vh bg-clr-white-beige">
  <GutterMain>
    <div class="row flex-row-gap-1">
      <div
        class="col-md-4 col-sm-6 d-flex flex-column flex-row-gap-0-25 clr-green-dark">
        <h2
          class="{!$isMobile ? 'fs-display-md' : 'fs-display-lg'} fw-semi-bold">
          Контакты
        </h2>
        <ul class="m-0 p-0 mt-3 {listClass} list">
          <li>
            Г. Санкт-Петербург, ул. Витебская Сортировочная, д. 34, лит. И, оф.
            38
          </li>
          <li><strong>Пн-Пт 9:00–17:00</strong></li>
          {#each $contacts as contact (contact.id)}
            <li>
              <span class="d-inline-block text-nowrap align-middle">
                <Icon icon={contact.icon} style="color: #051618" />
                <a class="ps-2" href={contact.href} target="_blank">
                  {contact.text}
                </a>
              </span>
            </li>
          {/each}
        </ul>
      </div>

      <img
        class="col-md-8 col-sm-6 {$isMobile ? 'mt-2-rem' : ''}"
        alt="logistics"
        src="{globals.imagePath}logistics{$isMobile ? '_lg' : ''}.png" />
    </div>
  </GutterMain>

  <GutterX classList={[$isMobile ? 'pb-3' : 'pb-6-rem']}>
    <div class="row">
      <div class="col-md-12">
        <!--Desktop-->
        {#if !$isMobile}
          <div class="d-flex">
            {#each tabs as tab}
              <a
                href="#"
                class="fs-title-md fw-semi-bold px-5 pb-2 {selectedCountryId ===
                tab.country_id
                  ? 'active-tab'
                  : 'border-inactive'} clr-dark-light"
                on:click={(e) => selectTab(e, tab.country_id)}>
                {tab.country_name}
              </a>
            {/each}
          </div>
        {:else}
          <!--Mobile-->
          <select class="form-select" bind:value={selectedCountryId}>
            {#each tabs as tab (tab.country_id)}
              <option value={tab.country_id}>{tab.country_name}</option>
            {/each}
          </select>
        {/if}
      </div>
      <div
        class="col-md-12 row flex-row-gap-{$isMobile
          ? 2
          : 3} clr-green-dark mt-5">
        {#each $branches.filter((branch) => branch.country_id === selectedCountryId) as branch}
          <div class="col-lg-3 col-md-4 col-sm-6">
            <h4 class={fontSizeLg}>
              {branch.config_name}
            </h4>
            <ul class="list m-0 p-0">
              <li>
                <small class={fontSizeSm}>
                  {branch.config_address}
                </small>
              </li>
              <li>
                <small class={fontSizeSm}>
                  {branch.config_telephone}
                </small>
              </li>
              <li>
                <a href="mailto:{branch.config_email}">
                  <small class={fontSizeSm}>
                    {branch.config_email}
                  </small>
                </a>
              </li>
            </ul>
          </div>
        {/each}
      </div>
    </div>
  </GutterX>

  <ContactForm />
</div>

<style lang="scss" scoped>
  .active-tab {
    border-bottom: 1px #00798c solid;
    transition: border-bottom 0.4s ease-out;
    color: #051618 !important;
  }

  .border-inactive {
    border-bottom: 1px #eeeeee solid;
  }
</style>
