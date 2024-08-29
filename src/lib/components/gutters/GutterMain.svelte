<script>
  import { isMobile } from '$lib/stores/ui';
  export let classList = [''];
</script>

<div
  {...$$restProps}
  class="w-100 h-100 mx-auto {$isMobile
    ? 'px-3-fluid py-5 overflow-x-scroll no-scrollbars'
    : 'p-6-rem'} {classList.map((c) => c).join(' ')}">
  <slot />
</div>
