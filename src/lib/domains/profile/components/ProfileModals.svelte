<script lang="ts">
  import EndRecruitmentModal from '$lib/domains/badges/components/modal/EndRecruitmentModal.svelte';
  import InfluenceRecruitmentModal from '$lib/domains/badges/components/modal/InfluenceRecruitmentModal.svelte';
  import StartRecruitmentModal from '$lib/domains/badges/components/modal/StartRecruitmentModal.svelte';
  import { MintDisclaimerModal } from '$lib/shared/components';

  import ProfilePictureModal from './ProfilePicture/ProfilePictureModal.svelte';
</script>

<ProfilePictureModal />
<MintDisclaimerModal />
<StartRecruitmentModal />
<EndRecruitmentModal />
<InfluenceRecruitmentModal />
