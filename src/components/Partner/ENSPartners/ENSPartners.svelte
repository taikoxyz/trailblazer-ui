<script lang="ts">
  import { t } from 'svelte-i18n';

  import { PartnersTemplate } from '$components/Partner';

  import { ensCarouselItems } from './ensCarouselItems';
</script>

<PartnersTemplate
  title={$t('partners.ens.title')}
  subtitle={$t('partners.ens.subtitle')}
  carouselItems={ensCarouselItems} />
