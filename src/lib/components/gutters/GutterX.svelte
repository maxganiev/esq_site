<script>
  import { isMobile } from '$lib/stores/ui';
  export let classList = [''];
</script>

<div
  {...$$restProps}
  class="w-100 h-100 mx-auto {$isMobile
    ? 'px-3-fluid overflow-x-scroll no-scrollbars'
    : 'px-6-rem'} {classList.map((c) => c).join(' ')}">
  <slot />
</div>
