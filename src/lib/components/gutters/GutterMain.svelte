<script>
  export let classList = [''];
</script>

<div
  {...$$restProps}
  class="w-100 h-100 mx-auto p-6-rem {classList.map((c) => c).join(' ')}">
  <slot />
</div>
