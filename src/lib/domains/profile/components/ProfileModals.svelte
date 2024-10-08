<script lang="ts">
  import MigrationApprovalModal from '$lib/domains/nfts/components/modal/MigrationApprovalModal.svelte';
  import StartMigrationModal from '$lib/domains/nfts/components/modal/StartMigrationModal.svelte';
  import TamperMigrationModal from '$lib/domains/nfts/components/modal/TamperMigrationModal.svelte';
  import { MintDisclaimerModal } from '$lib/shared/components';

  import ProfilePictureModal from './ProfilePicture/ProfilePictureModal.svelte';
</script>

<ProfilePictureModal />
<MintDisclaimerModal />
<MigrationApprovalModal />
<StartMigrationModal />
<TamperMigrationModal />
