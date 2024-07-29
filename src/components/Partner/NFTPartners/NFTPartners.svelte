<script lang="ts">
  import { t } from 'svelte-i18n';

  import { PartnersTemplate } from '$components/Partner';

  import { nftPartnersItems } from './nftPartnersItems.svelte';
</script>

<PartnersTemplate
  title={$t('partners.nft.title')}
  subtitle={$t('partners.nft.subtitle')}
  carouselItems={nftPartnersItems} />
