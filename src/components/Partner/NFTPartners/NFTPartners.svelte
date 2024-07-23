<script lang="ts">
  import { t } from 'svelte-i18n';

  import { PartnersTemplate } from '$components/Partner';

  import { nftCarouselItems } from './nftPartnersItems.svelte';
</script>

<PartnersTemplate
  title={$t('partners.nft.omnihub.title')}
  subtitle={$t('partners.nft.subtitle')}
  carouselItems={nftCarouselItems} />
