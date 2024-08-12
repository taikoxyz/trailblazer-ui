<script lang="ts">
  import { t } from 'svelte-i18n';

  import AbstractBannerDouble from './AbstractBannerDouble.template.svelte';
</script>

<AbstractBannerDouble
  trailNumber="7"
  title={$t('trailbanner.gaming.title')}
  description={$t('trailbanner.gaming.description')}
  href="https://taiko.mirror.xyz/8-8mdHJKlP0sZACfEb666CTctTHbhbV47U4b2-5DHpQ"
  buttonText={$t('common.learn_more')}
  images={{
    content: {
      xl: '/trailbanner/gaming/xl/icons.png',
      lg: '/trailbanner/gaming/lg/icons.png',
      md: '/trailbanner/gaming/md/icons.png',
      sm: '/trailbanner/gaming/sm/icons.png',
    },
    background: {
      xl: '/trailbanner/common/xl/bg.svg',
      lg: '/trailbanner/common/lg/bg.svg',
      md: '/trailbanner/common/md/bg.svg',
      sm: '/trailbanner/common/sm/bg.svg',
    },
  }} />
