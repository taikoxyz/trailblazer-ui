<script lang="ts">
  import { PartnersTemplate } from '$components/Partner/';

  import { gamingCarouselItems } from './gamingCarouselItems';
</script>

<PartnersTemplate
  title="Our gaming partners"
  subtitle="Play a game, <span class='text-base-content'>earn points, and climb the ranks</span>"
  carouselItems={gamingCarouselItems} />
