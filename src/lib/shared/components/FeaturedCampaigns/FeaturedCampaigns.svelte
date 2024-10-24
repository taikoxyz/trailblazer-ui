<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  import CampaingCards from './CampaingCards.svelte';

  const h1Classes = classNames(
    'text-[35px]',
    'font-medium',
    'leading-[42px]',
    'text-left',
    'mb-[50px]',
    'max-w-[210px]',
    'md:max-w-full',
  );
</script>

<div class="">
  <h1 class={h1Classes}>Featured Campaigns</h1>
  <CampaingCards />
</div>
