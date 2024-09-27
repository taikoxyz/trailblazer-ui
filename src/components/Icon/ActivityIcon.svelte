<script lang="ts">
  import { Icon, type IconType } from '.';
  export let type: IconType = 'double-coin';
</script>

<div class="f-center size-6 bg-primary-brand rounded-full">
  <Icon {type} vWidth={16} vHeight={16} class="size-[16px]" fillClass="fill-primary-content" />
</div>
