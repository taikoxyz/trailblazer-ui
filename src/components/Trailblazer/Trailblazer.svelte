<script lang="ts">
  import { ButtonWithArrow } from '$components/Button';
  import { FAQ } from '$components/FAQ';
  import { FactionsGallery } from '$components/Gallery';
  import { Icon, PlusIcon } from '$components/Icon';
  import { TaikoTrailblazersLogo } from '$components/Logo';
  import { ResponsiveVideo } from '$components/Video';
  import FullWidthVideo from '$components/Video/FullWidthVideo.svelte';
  import TraiblazerDJ from '$images/trailblazer-dj.png';
  import TraiblazerDJFlare from '$images/trailblazer-dj-flare.png';

  import TrailblazerFactionsInfo from '../About/AboutFactionsInfo.svelte';
  import AboutFactionsInfo from '../About/AboutFactionsInfo.svelte';
  import TrailblazerGallery from './TrailblazerGallery.svelte';
  import TrailblazerGuide from './TrailblazerGuide.svelte';
  import TrailblazerMain from './TrailblazerMain.svelte';
  import TrailblazerOngoingTrails from './TrailblazerOngoingTrails.svelte';
  import TrailblazerPinkifyYourProfile from './TrailblazerPinkifyYourProfile.svelte';
</script>

<div class="f-center container flex-col w-full overflow-visible gap-[100px]">
  <TrailblazerMain />
  <TrailblazerGuide />
  <!-- <TrailblazerOngoingTrails /> -->
  <FactionsGallery />
</div>
