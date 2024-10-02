<script>
  import { t } from 'svelte-i18n';

  import { Tooltip } from '$lib/shared/components/Tooltip';

  import { AbstractProfileCard } from './templates';

  const titleClass = 'font-size-[20px] font-weight-500 flex justify-center w-full';
</script>

<AbstractProfileCard class="bg-purple-900 relative">
  <div slot="title" class={titleClass}>{$t('booster.title')}</div>
  <Tooltip class="" slot="tooltip" position="bottom">
    <div class="bg-white text-black">
      <h2 class=" text-black">{$t('booster.tooltip.title')}</h2>
      <div class="body-regular text-black">
        {$t('booster.tooltip.description')}
      </div>
    </div>
  </Tooltip>
  <div slot="status" class="w-full">
    <h1>Coming soon!</h1>
  </div></AbstractProfileCard>
