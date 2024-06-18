<script lang="ts">
  import { Icon } from '$components/Icon';

  export let icon: 'semi-circle-reversed' | 'quad-circles' | 'diamond' = 'semi-circle-reversed';
  export let title: string = 'Connect';
  export let description: string =
    'Begin by registering your wallet address. This initial step is crucial as it links your identity to your participation.';
</script>

<div class="flex flex-col w-full h-full px-[35px] py-[38px] bg-purple rounded-[30px] gap-[20px] min-h-[258px]">
  <div class="flex items-center gap-3 display-small-medium">
    <Icon type={icon} fillClass="fill-primary-brand" />{title}
  </div>
  <div class="text-secondary-content max-w-[340px]">
    {description}
  </div>
</div>
