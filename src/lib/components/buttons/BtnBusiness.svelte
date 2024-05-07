<script>
  import Icon from '@iconify/svelte';

  let hovered = false;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a
  href="https://b2b.elcomspb.ru/"
  target="_blank"
  class="d-flex align-items-center justify-content-center border border-white rounded-pill py-2 px-4 text-nowrap {hovered
    ? 'filled'
    : 'bg-clr-transparent'}"
  on:mouseover={() => (hovered = true)}
  on:mouseleave={() => (hovered = false)}>
  <span class="me-2">Для бизнеса</span>
  <Icon
    icon="ph:suitcase-bold"
    width="1.2rem"
    height="1.2rem"
    style="color: {hovered ? '#00d1f2' : '#fff'}" />
</a>

<style lang="scss" scoped>
  a {
    max-width: 200px;
    max-height: 40px;

    &.filled {
      color: #000 !important;
      background-color: #fafafa;
      transition: background-color 0.4s ease-out;
      opacity: 1 !important;
    }
  }
</style>
