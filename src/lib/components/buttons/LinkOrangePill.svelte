<script>
  import { isMobile } from '$lib/stores/ui';
  import Icon from '@iconify/svelte';
</script>

<a
  {...$$restProps}
  class="btn radius-100 bg-clr-orange clr-white {!$isMobile
    ? 'fs-headline-md mt-5'
    : 'fs-headline-lg mb-3'} fw-semi-bold align-self-start py-2 px-4"
  href="https://b2b.elcomspb.ru/"
  target="_blank">
  <slot></slot>
  <Icon
    icon="lucide:arrow-right"
    width="1.2rem"
    height="1.2rem"
    class="ms-2"
    style="color: inherit" />
</a>
