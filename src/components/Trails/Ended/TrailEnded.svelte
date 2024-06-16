<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { ActionButton } from '$components/Button';
</script>

<div
  class="f-center flex-col rounded-[30px] w-full xl:bg-elevated-background px-[29px] py-[44px] xl:px-[55px] xl:py-[74px] space-y-5">
  <div class="f-center flex-col w-full order-1 xl:order-0">
    {$t('trails.general.has_ended')}
  </div>
  <div class="f-center flex-col w-full order-1 xl:order-0">
    <ActionButton priority="primary" class="w-[200px]" on:click={() => goto('/')} withArrow
      >{$t('buttons.explore_more')}</ActionButton>
  </div>
</div>
