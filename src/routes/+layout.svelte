<script lang="ts">
  import '../app.css';
  import '../i18n';

  import { onDestroy, onMount } from 'svelte';

  import { browser } from '$app/environment';
  import { startWatching, stopWatching } from '$lib/shared/wagmi';
  // import { AccountConnectionToast } from '$shared/components/AccountConnectionToast';
  import { Footer } from '$shared/components/Footer';
  import { Header } from '$shared/components/Header';
  import { BlacklistModal } from '$shared/components/Modals/BlacklistModal';
  import { SwitchChainModal } from '$shared/components/Modals/SwitchChainModal';
  import { NotificationToast } from '$shared/components/NotificationToast';
  import { Ribbon } from '$shared/components/Ribbon';
  import {
    desktopQuery,
    initializeMediaQueries,
    mediaQueryHandler,
    mobileQuery,
    tabletQuery,
  } from '$shared/utils/responsiveCheck';

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

  let showRibbon = true;
</script>

{#if showRibbon}
  <Ribbon />
{/if}

<!-- Main content with dynamic margin-top -->
<div class={`relative ${showRibbon ? 'mt-[60px]' : 'mt-0'}`}>
  <Header ribbonActive={showRibbon} />
  <slot />
  <Footer />
</div>

<!-- Global UI Components -->
<NotificationToast />
<SwitchChainModal />
<BlacklistModal />
