<script>
  import { t } from 'svelte-i18n';

  import { Tooltip } from '$shared/components/Tooltip';

  import { AbstractProfileCard } from './templates';
</script>

<AbstractProfileCard class="bg-purple-900 relative">
  <div slot="title" class="booster-card-title flex justify-center w-full">{$t('booster.title')}</div>

  <Tooltip class="absolute right-4" slot="tooltip" position="bottom">
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
