<script lang="ts">
  import { t } from 'svelte-i18n';

  import { PartnersTemplate } from '$shared/components/PartnerCarousels';

  import { ensCarouselItems } from './ensCarouselItems';
</script>

<PartnersTemplate title={$t('partners.ens.title')} carouselItems={ensCarouselItems} />
