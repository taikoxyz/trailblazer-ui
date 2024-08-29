<script lang="ts">
  import { PartnersTemplate } from '$components/Partner/';
  import { classNames } from '$libs/util/classNames';

  import { gamingCarouselItems } from './gamingCarouselItems';
</script>

<div class={classNames('w-full', 'relative')}>
  <PartnersTemplate title="Our gaming partners" carouselItems={gamingCarouselItems} />
</div>
