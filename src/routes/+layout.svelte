<script lang="ts">
  import '../app.css';
  import '../i18n';

  import { onDestroy, onMount } from 'svelte';

  import { AccountConnectionToast } from '$components/AccountConnectionToast';
  import { Header } from '$components/Header';
  import { NotificationToast } from '$components/NotificationToast';
  import { SwitchChainModal } from '$components/SwitchChainModal';
  import { WelcomeModal } from '$components/WelcomeModal';
  import { startWatching, stopWatching } from '$libs/wagmi';
  import { startWatching as startWatchingX, stopWatching as stopWatchingX } from '$libs/supabase';
  import { Footer } from '$components/Footer';
  import { Ribbon } from '$components/Ribbon';

  const syncPointer = ({ x, y }: { x: number; y: number }) => {
    document.documentElement.style.setProperty('--x', x.toFixed(2));
    document.documentElement.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
    document.documentElement.style.setProperty('--y', y.toFixed(2));
    document.documentElement.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
  };

  onMount(async () => {
    await startWatching();
    startWatchingX();
    document.body.addEventListener('pointermove', syncPointer);
  });

  onDestroy(() => {
    stopWatching();
    stopWatchingX();
    document.body.removeEventListener('pointermove', syncPointer);
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

<AccountConnectionToast />

<SwitchChainModal />

<WelcomeModal />
