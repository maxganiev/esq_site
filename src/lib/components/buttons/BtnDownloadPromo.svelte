<script>
  import { isMobile } from '$lib/stores/ui';
  import Icon from '@iconify/svelte';

  /**@type {String}*/
  export let link;

  $: marginClass = $isMobile ? 'mt-3' : 'ms-2-rem';
</script>

<a
  href={link}
  target="_blank"
  class="btn btn-sm w-{!$isMobile
    ? 35
    : 100} bg-clr-transparent {marginClass} py-2 btn-download"
  style="max-width: {!$isMobile ? '200px;' : 'unset'};"
  download>
  <span class="d-flex align-items-center justify-content-center">
    Скачать презентацию
    <Icon
      icon="lucide:download"
      width="24px"
      height="24px"
      class="ms-2"
      style="color: inherit" />
  </span>
</a>

<style lang="scss" scoped>
  .btn-download {
    color: #ff661c !important;
    &:hover {
      color: #ff884f;
      transition: all 0.4s ease-out;
    }
  }
</style>
