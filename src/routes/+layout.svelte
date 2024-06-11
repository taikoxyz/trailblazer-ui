<script lang="ts">
  import '../app.css';
  import '../i18n';

  import { onDestroy, onMount } from 'svelte';

  import { browser } from '$app/environment';
  import { AccountConnectionToast } from '$components/AccountConnectionToast';
  import { Footer } from '$components/Footer';
  import { Header } from '$components/Header';
  import { NotificationToast } from '$components/NotificationToast';
  import { stopWatching as stopWatchingX } from '$libs/supabase';
  import { startWatching, stopWatching } from '$libs/wagmi';

  const syncPointer = ({ x, y }: { x: number; y: number }) => {
    document.documentElement.style.setProperty('--x', x.toFixed(2));
    document.documentElement.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
    document.documentElement.style.setProperty('--y', y.toFixed(2));
    document.documentElement.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
  };

  onMount(() => {
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
