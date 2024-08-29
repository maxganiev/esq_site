<script>
  import { isMobile } from '$lib/stores/ui';
  import Icon from '@iconify/svelte';

  /**@type {String}*/
  export let href = 'https://b2b.elcomspb.ru/';
</script>

<a
  {...$$restProps}
  class="btn {!$isMobile
    ? 'radius-100 '
    : 'rounded-3'} bg-clr-orange clr-white {!$isMobile
    ? 'fs-headline-md mt-5'
    : 'fs-headline-lg mb-3'} fw-semi-bold align-self-start py-2 px-4"
  {href}
  target="_blank">
  <slot></slot>
  <Icon
    icon="lucide:arrow-right"
    width="1.2rem"
    height="1.2rem"
    class="ms-2"
    style="color: inherit" />
</a>
