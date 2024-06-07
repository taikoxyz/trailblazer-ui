<script lang="ts">
  import { Icon, PlusIcon } from '$components/Icon';

  import TraiblazerDJ from '$images/trailblazer-dj.png';
  import TraiblazerDJFlare from '$images/trailblazer-dj-flare.png';

  import FullWidthVideo from '$components/Video/FullWidthVideo.svelte';
  import { TaikoTrailblazersLogo } from '$components/Logo';

  import { ResponsiveVideo } from '$components/Video';
  import TrailblazerFactionsInfo from '../About/AboutFactionsInfo.svelte';
  import TrailblazerGallery from './TrailblazerGallery.svelte';
  import TrailblazerGuide from './TrailblazerGuide.svelte';
  import TrailblazerPinkifyYourProfile from './TrailblazerPinkifyYourProfile.svelte';
  import { FAQ } from '$components/FAQ';
  import { ButtonWithArrow } from '$components/Button';
  import TrailblazerMain from './TrailblazerMain.svelte';
  import TrailblazerOngoingTrails from './TrailblazerOngoingTrails.svelte';
</script>

<div class="f-center container flex-col w-full overflow-visible gap-[100px]">
  <TrailblazerMain />
  <TrailblazerGuide />
  <TrailblazerOngoingTrails />
</div>
