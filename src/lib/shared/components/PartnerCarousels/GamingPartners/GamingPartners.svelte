<script lang="ts">
  import { PartnersTemplate } from '$shared/components/PartnerCarousels/';
  import { classNames } from '$shared/utils/classNames';

  import { gamingCarouselItems } from './gamingCarouselItems';
</script>

<div class={classNames('w-full', 'relative')}>
  <PartnersTemplate title="Our gaming partners" carouselItems={gamingCarouselItems} />
</div>
