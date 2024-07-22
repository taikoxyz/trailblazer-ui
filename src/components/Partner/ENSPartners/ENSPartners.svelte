<script lang="ts">
  import { PartnersTemplate } from '$components/Partner';

  import { ensCarouselItems } from './ensCarouselItems';
  import { t } from 'svelte-i18n';
</script>

<PartnersTemplate
  title={$t('partners.ens.title')}
  subtitle={$t('partners.ens.subtitle')}
  carouselItems={ensCarouselItems} />
