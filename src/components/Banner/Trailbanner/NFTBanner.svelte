<script lang="ts">
  import { t } from 'svelte-i18n';

  import AbstractBanner from './AbstractBanner.template.svelte';
</script>

<AbstractBanner
  trailNumber="5"
  title={$t('trailbanner.defi.title')}
  description={$t('trailbanner.defi.description')}
  href="https://taiko.mirror.xyz/"
  buttonText={$t('common.learn_more')}
  style="double"
  images={{
    content: {
      xl: 'trailbanner/defi/xl/defi-banner-icons-xl.png', //TODO
      lg: 'trailbanner/defi/lg/defi-banner-icons-lg.png', //TODO
      md: 'trailbanner/defi/md/defi-banner-icons-md.png', //TODO
      sm: 'trailbanner/defi/sm/defi-banner-icons-sm.png', //TODO
    },
    background: {
      xl: 'trailbanner/defi/xl/defi-banner-bg-xl.svg', //TODO
      lg: 'trailbanner/defi/lg/defi-banner-bg-lg.svg', //TODO
      md: 'trailbanner/defi/md/defi-banner-bg-lg.svg', //TODO
      sm: 'trailbanner/defi/sm/defi-banner-bg-sm.svg', //TODO
    },
  }} />
