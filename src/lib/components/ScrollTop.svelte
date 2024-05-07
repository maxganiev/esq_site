<script>
  import Icon from '@iconify/svelte';

  function scrollToTop() {
    document.documentElement.scrollTo(0, 0);
  }
</script>

<button
  class="btn pos-f bg-clr-orange clr-white z-1 rounded-circle d-flex align-items-center justify-content-center"
  on:click={scrollToTop}>
  <Icon
    icon="mingcute:up-line"
    width="1.2rem"
    height="1.2rem"
    style="color: white" />
</button>

<style lang="scss" scoped>
  button {
    bottom: 16px;
    right: 16px;
    aspect-ratio: 1/1;
  }
</style>
