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
      xl: 'trailbanner/defi/xl/defi-banner-bg-xl.svg',
      lg: 'trailbanner/defi/lg/defi-banner-bg-lg.svg',
      md: 'trailbanner/defi/md/defi-banner-bg-lg.svg',
      sm: 'trailbanner/defi/sm/defi-banner-bg-sm.svg',
    },
  }} />
