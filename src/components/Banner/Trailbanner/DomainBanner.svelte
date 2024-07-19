<script lang="ts">
  import { t } from 'svelte-i18n';
  import AbstractBanner from './AbstractBanner.template.svelte';
</script>

<AbstractBanner
  trailNumber="5"
  title={$t('trailbanner.domain.title')}
  description={$t('trailbanner.domain.description')}
  href="https://taiko.mirror.xyz/7L-lnL1ab24Q9XmCgpQtVOmfxoNCTb_RGEbS7w4E3io"
  buttonText={$t('common.learn_more')}
  images={{
    content: {
      xl: 'trailbanner/domain/xl/domain-banner-icons-xl.png',
      lg: 'trailbanner/domain/lg/domain-banner-icons-lg.png',
      md: 'trailbanner/domain/md/domain-banner-icons-md.png',
      sm: 'trailbanner/domain/sm/domain-banner-icons-sm.png',
    },
    background: {
      xl: 'trailbanner/defi/xl/defi-banner-bg-xl.svg',
      lg: 'trailbanner/defi/lg/defi-banner-bg-lg.svg',
      md: 'trailbanner/defi/md/defi-banner-bg-md.svg',
      sm: 'trailbanner/defi/sm/defi-banner-bg-sm.svg',
    },
  }} />
