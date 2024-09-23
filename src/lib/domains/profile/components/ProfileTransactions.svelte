<script lang="ts">
  import { onMount } from 'svelte';

  import { userProfile } from '$lib/domains/profile/stores/profileStore';
  import { getLogger } from '$libs/util/logger';

  const log = getLogger('ProfileTransactions');

  $: pointsHistory = $userProfile.activityHistory?.pointsHistory;
  $: hasPointHistory = pointsHistory && pointsHistory.items && pointsHistory.items.length > 0;

  onMount(async () => {
    log('ProfileTransactions onMount', pointsHistory, hasPointHistory);
  });
</script>

ProfileTransactions
