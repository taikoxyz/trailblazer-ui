<script lang="ts">
  import { Icon } from '$shared/components/Icon';

  export let onClick: () => void;
</script>

<button class="absolute right-6 z-50" on:click={onClick}>
  <Icon type="x-close" fillClass="fill-primary-icon" size={24} />
</button>
