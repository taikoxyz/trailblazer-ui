<script lang="ts">
  import EndMigrationModal from '$lib/domains/badges/components/modal/EndMigrationModal.svelte';
  import TamperMigrationModal from '$lib/domains/badges/components/modal/RefineMigrationModal.svelte';
  import StartMigrationModal from '$lib/domains/badges/components/modal/StartMigrationModal.svelte';
  import { MintDisclaimerModal } from '$lib/shared/components';

  import ProfilePictureModal from './ProfilePicture/ProfilePictureModal.svelte';
</script>

<ProfilePictureModal />
<MintDisclaimerModal />
<StartMigrationModal />
<EndMigrationModal />
<TamperMigrationModal />
