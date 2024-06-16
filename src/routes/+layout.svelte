<script lang="ts">
  import '../app.css';
  import '../i18n';

  import { onDestroy, onMount } from 'svelte';

  import { AccountConnectionToast } from '$components/AccountConnectionToast';
  import { Footer } from '$components/Footer';
  import { Header } from '$components/Header';
  import { NotificationToast } from '$components/NotificationToast';
  import { SwitchChainModal } from '$components/SwitchChainModal';
  import { stopWatching as stopWatchingSupabase } from '$libs/supabase';
  import {
    desktopQuery,
    initializeMediaQueries,
    mediaQueryHandler,
    mobileQuery,
    tabletQuery,
  } from '$libs/util/responsiveCheck';
  import { startWatching, stopWatching } from '$libs/wagmi';

  onMount(() => {
    startWatching();
    initializeMediaQueries();

    if (desktopQuery) {
      desktopQuery.addEventListener('change', mediaQueryHandler);
    }
    if (tabletQuery) {
      tabletQuery.addEventListener('change', mediaQueryHandler);
    }
    if (mobileQuery) {
      mobileQuery.addEventListener('change', mediaQueryHandler);
    }
  });

  onDestroy(() => {
    stopWatching();
    stopWatchingSupabase();

    if (desktopQuery) {
      desktopQuery.removeEventListener('change', mediaQueryHandler);
    }
    if (tabletQuery) {
      tabletQuery.removeEventListener('change', mediaQueryHandler);
    }
    if (mobileQuery) {
      mobileQuery.removeEventListener('change', mediaQueryHandler);
    }
  });
</script>

<!-- App components -->
<Header />

<slot />

<Footer />

<!--
  The following UI is global and should be rendered
  at the root of the app.
-->

<NotificationToast />
<AccountConnectionToast />
<SwitchChainModal />
