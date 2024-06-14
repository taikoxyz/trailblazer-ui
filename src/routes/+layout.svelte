<script lang="ts">
  import '../app.css';
  import '../i18n';

  import { onDestroy, onMount } from 'svelte';

  // import { browser } from '$app/environment';
  import { AccountConnectionToast } from '$components/AccountConnectionToast';
  import { Footer } from '$components/Footer';
  import { Header } from '$components/Header';
  import { NotificationToast } from '$components/NotificationToast';
  import { SwitchChainModal } from '$components/SwitchChainModal';
  import { stopWatching as stopWatchingSupabase } from '$libs/supabase';
  import {
    desktopQuery,
    mediaQueryHandler,
    mobileQuery,
    tabletQuery,
    updateMediaQueries,
  } from '$libs/util/responsiveCheck';
  import { startWatching, stopWatching } from '$libs/wagmi';

  // const syncPointer = ({ x, y }: { x: number; y: number }) => {
  //   document.documentElement.style.setProperty('--x', x.toFixed(2));
  //   document.documentElement.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
  //   document.documentElement.style.setProperty('--y', y.toFixed(2));
  //   document.documentElement.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
  // };

  onMount(() => {
    startWatching();
    updateMediaQueries();
    desktopQuery.addEventListener('change', mediaQueryHandler);
    tabletQuery.addEventListener('change', mediaQueryHandler);
    mobileQuery.addEventListener('change', mediaQueryHandler);
  });

  onDestroy(() => {
    stopWatching();
    stopWatchingSupabase();
    // browser && document.body.removeEventListener('pointermove', syncPointer);
    desktopQuery.removeEventListener('change', mediaQueryHandler);
    tabletQuery.removeEventListener('change', mediaQueryHandler);
    mobileQuery.removeEventListener('change', mediaQueryHandler);
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
