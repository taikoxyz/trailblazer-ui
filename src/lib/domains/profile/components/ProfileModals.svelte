<script lang="ts">
  import EndRecruitmentModal from '$lib/domains/badges/components/modal/EndRecruitmentModal.svelte';
  import InfluenceRecruitmentModal from '$lib/domains/badges/components/modal/InfluenceRecruitmentModal.svelte';
  import StartRecruitmentModal from '$lib/domains/badges/components/modal/StartRecruitmentModal.svelte';
  import TaikoStatusModal from '$lib/domains/taiko-status/components/TaikoStatusModal.svelte';
  import { MintDisclaimerModal } from '$lib/shared/components';

  import ProfilePictureModal from './ProfilePicture/ProfilePictureModal.svelte';
  import ClaimModal from './ProfileSeasonBonusCard/ClaimModal.svelte';
</script>

<ProfilePictureModal />
<MintDisclaimerModal />

<StartRecruitmentModal />
<EndRecruitmentModal />
<InfluenceRecruitmentModal />
<ClaimModal />
<TaikoStatusModal />
