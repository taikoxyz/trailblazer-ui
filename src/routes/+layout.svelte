<script lang="ts">
  import '../app.css';
  import '../i18n';

  import { onDestroy, onMount } from 'svelte';

  import { AccountConnectionToast } from '$components/AccountConnectionToast';
  import { Footer } from '$components/Footer';
  import { Header } from '$components/Header';
  import { NotificationToast } from '$components/NotificationToast';
  import { Ribbon } from '$components/Ribbon';
  import { startWatching as startWatchingX, stopWatching as stopWatchingX } from '$libs/supabase';
  import { startWatching, stopWatching, wagmiConfig } from '$libs/wagmi';
  import { browser } from '$app/environment';
  import { reconnect } from '@wagmi/core';

  const syncPointer = ({ x, y }: { x: number; y: number }) => {
    document.documentElement.style.setProperty('--x', x.toFixed(2));
    document.documentElement.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
    document.documentElement.style.setProperty('--y', y.toFixed(2));
    document.documentElement.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
  };

  onMount(() => {
    reconnect(wagmiConfig);
    startWatching();
  });

  onDestroy(() => {
    stopWatching();
    stopWatchingX();
    browser && document.body.removeEventListener('pointermove', syncPointer);
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
