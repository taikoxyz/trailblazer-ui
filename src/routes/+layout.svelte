<script lang="ts">
  import '../app.css';
  import '../i18n';

  import { onDestroy, onMount } from 'svelte';

  import { browser } from '$app/environment';
  import { AccountConnectionToast } from '$components/AccountConnectionToast';
  import { Footer } from '$components/Footer';
  import { Header } from '$components/Header';
  import { NotificationToast } from '$components/NotificationToast';
  import { SwitchChainModal } from '$components/SwitchChainModal';
  import { startWatching, stopWatching } from '$lib/shared/wagmi';
  import {
    desktopQuery,
    initializeMediaQueries,
    mediaQueryHandler,
    mobileQuery,
    tabletQuery,
  } from '$libs/util/responsiveCheck';

  const syncPointer = ({ x, y }: { x: number; y: number }) => {
    if (browser) {
      document.documentElement.style.setProperty('--x', x.toFixed(2));
      document.documentElement.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
      document.documentElement.style.setProperty('--y', y.toFixed(2));
      document.documentElement.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
    }
  };

  onMount(() => {
    startWatching();
    initializeMediaQueries();

    if (desktopQuery) {
      desktopQuery.addEventListener('change', mediaQueryHandler);
      document.body.addEventListener('pointermove', syncPointer);
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
    if (browser) {
      document.body.removeEventListener('pointermove', syncPointer);
    }
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

<div class="relative z-10">
  <!-- <Ribbon /> -->

  <Header />

  <slot />

  <Footer />
</div>
<!--
  The following UI is global and should be rendered
  at the root of the app.
-->

<NotificationToast />
<AccountConnectionToast />
<SwitchChainModal />
