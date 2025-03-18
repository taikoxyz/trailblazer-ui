<script lang="ts">
  import UpdateStatusProvider from '$lib/domains/badges/components/UpdateStatusProvider.svelte';
  import { Profile } from '$lib/domains/profile/components';
  import { Page } from '$shared/components/Page';
</script>

<svelte:head>
  <title>Taiko Trailblazer - Profile</title>
</svelte:head>

<Page>
  <UpdateStatusProvider>
    <Profile />
  </UpdateStatusProvider>
</Page>
