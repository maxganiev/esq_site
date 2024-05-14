<script>
  export let classList = [''];
</script>

<div
  {...$$restProps}
  class="w-95 h-100 mx-auto ps-2-rem {classList.map((c) => c).join(' ')}">
  <slot />
</div>
