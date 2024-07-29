<script lang="ts">
  import { t } from 'svelte-i18n';

  import AbstractBannerDouble from './AbstractBannerDouble.template.svelte';
</script>

<AbstractBannerDouble
  trailNumber="6"
  title={$t('trailbanner.nft.title')}
  description={$t('trailbanner.nft.description')}
  href="https://taiko.mirror.xyz/D7Z7y46WRHBoT2wb-dujgEtCz4YWCXvKXT8Gize_PeM"
  buttonText={$t('common.learn_more')}
  images={{
    content: {
      xl: '/trailbanner/nft/xl/icons.png',
      lg: '/trailbanner/nft/lg/icons.png',
      md: '/trailbanner/nft/md/icons.png',
      sm: '/trailbanner/nft/sm/icons.png',
    },
    background: {
      xl: '/trailbanner/nft/xl/bg.svg',
      lg: '/trailbanner/nft/lg/bg.svg',
      md: '/trailbanner/nft/md/bg.svg',
      sm: '/trailbanner/nft/sm/bg.svg',
    },
  }} />
