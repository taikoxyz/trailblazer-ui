<script lang="ts">
  import { t } from 'svelte-i18n';

  import AbstractBanner from './AbstractBanner.template.svelte';
</script>

<AbstractBanner
  trailNumber="6"
  title={$t('trailbanner.nft.title')}
  description={$t('trailbanner.nft.description')}
  href="https://taiko.mirror.xyz/D7Z7y46WRHBoT2wb-dujgEtCz4YWCXvKXT8Gize_PeM"
  buttonText={$t('common.learn_more')}
  style="double"
  images={{
    content: {
      xl: 'trailbanner/nft/xl/icons.png',
      lg: 'trailbanner/nft/xl/icons.png',
      md: 'trailbanner/nft/xl/icons.png',
      sm: 'trailbanner/nft/xl/icons.png',
    },
    background: {
      xl: 'trailbanner/nft/xl/bg.svg',
      lg: 'trailbanner/nft/xl/bg.svg',
      md: 'trailbanner/nft/xl/bg.svg',
      sm: 'trailbanner/nft/xl/bg.svg',
    },
  }} />
