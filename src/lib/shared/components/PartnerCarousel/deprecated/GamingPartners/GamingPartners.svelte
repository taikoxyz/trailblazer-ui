<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  import { PartnersTemplate } from '..';
  import { gamingCarouselItems } from './gamingCarouselItems';
</script>

<div class={classNames('w-full', 'relative')}>
  <PartnersTemplate title="Our gaming partners" carouselItems={gamingCarouselItems} />
</div>
