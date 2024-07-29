<script lang="ts">
  import { t } from 'svelte-i18n';

  import AbstractBanner from './AbstractBanner.template.svelte';
</script>

<AbstractBanner
  trailNumber="4"
  title={$t('trailbanner.defi.title')}
  description={$t('trailbanner.defi.description')}
  href="https://taiko.mirror.xyz/D7Z7y46WRHBoT2wb-dujgEtCz4YWCXvKXT8Gize_PeM"
  buttonText={$t('common.learn_more')}
  style="double"
  images={{
    content: {
      xl: 'trailbanner/defi/xl/defi-banner-icons-xl.png',
      lg: 'trailbanner/defi/lg/defi-banner-icons-lg.png',
      md: 'trailbanner/defi/md/defi-banner-icons-md.png',
      sm: 'trailbanner/defi/sm/defi-banner-icons-sm.png',
    },
    background: {
      xl: 'trailbanner/common/xl/bg.svg',
      lg: 'trailbanner/common/lg/bg.svg',
      md: 'trailbanner/common/md/bg.svg',
      sm: 'trailbanner/common/sm/bg.svg',
    },
  }} />
