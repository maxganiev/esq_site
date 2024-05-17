<script>
  import Icon from '@iconify/svelte';
</script>

<a
  class="btn radius-100 bg-clr-orange clr-white fs-headline-sm fw-semi-bold mt-5 align-self-start py-2 px-4"
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
