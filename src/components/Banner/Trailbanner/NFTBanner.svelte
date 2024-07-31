<script lang="ts">
  import { t } from 'svelte-i18n';

  import AbstractBannerDouble from './AbstractBannerDouble.template.svelte';
</script>

<AbstractBannerDouble
  trailNumber="6"
  title={$t('trailbanner.nft.title')}
  description={$t('trailbanner.nft.description')}
  href="https://taiko.mirror.xyz/BRPO4OzcnPanyhyfa80yzvpidt8etBS2QwNdP0TVk8o"
  buttonText={$t('common.learn_more')}
  images={{
    content: {
      xl: '/trailbanner/nft/xl/icons.png',
      lg: '/trailbanner/nft/lg/icons.png',
      md: '/trailbanner/nft/md/icons.png',
      sm: '/trailbanner/nft/sm/icons.png',
    },
    background: {
      xl: '/trailbanner/common/xl/bg.svg',
      lg: '/trailbanner/common/lg/bg.svg',
      md: '/trailbanner/common/md/bg.svg',
      sm: '/trailbanner/common/sm/bg.svg',
    },
  }} />
