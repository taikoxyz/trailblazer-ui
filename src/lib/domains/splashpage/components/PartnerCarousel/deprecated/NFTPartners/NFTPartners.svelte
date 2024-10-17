<script lang="ts">
  import { t } from 'svelte-i18n';

  import { PartnersTemplate } from '..';
  import { nftPartnersItems } from './nftPartnersItems.svelte';
</script>

<PartnersTemplate title={$t('partners.nft.title')} carouselItems={nftPartnersItems} />
