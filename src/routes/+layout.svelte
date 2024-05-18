<script lang="ts">
  import '../app.css';
  // import '../i18n';

  import { onDestroy, onMount } from 'svelte';

  // import { AccountConnectionToast } from '$components/AccountConnectionToast';
  import { Footer } from '$components/Footer';
  import { Header } from '$components/Header';
  import { NotificationToast } from '$components/NotificationToast';
  import { Ribbon } from '$components/Ribbon';
  // import { SwitchChainModal } from '$components/SwitchChainModal';
  import { startWatching as startWatchingX, stopWatching as stopWatchingX } from '$libs/supabase';
  import { startWatching, stopWatching } from '$libs/wagmi';

  onMount(() => {
    startWatching();
    startWatchingX();
  });

  onDestroy(() => {
    stopWatching();
    stopWatchingX();
  });
</script>

<!-- App components -->
<Ribbon></Ribbon>
<Header />
<main>
  <slot />
</main>

<Footer />

<!--
  The following UI is global and should be rendered 
  at the root of the app.
-->

<NotificationToast />

<!-- <AccountConnectionToast />

<SwitchChainModal /> -->
