<script lang="ts">
  import { fade } from 'svelte/transition';

  import { ActionButton } from '$shared/components/Button';
  import { Icon } from '$shared/components/Icon';
  import { classNames } from '$shared/utils/classNames';
  import formatTaikoStatusPoints from '$shared/utils/formatTaikoStatusPoints';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import BinanceAlphaBanner from '$lib/domains/splashpage/components/Banner/BinanceAlphaBanner.svelte';

  const modalClasses = classNames(
    'z-[9999]',
    'p-[24px]',
    'fixed',
    'w-[100vw]',
    'h-[100vh]',
    'bg-black/50',
    'flex',
    'justify-center',
    'items-stretch',
    'md:items-center',
    'top-0',
    'left-0',
    'overflow-y-scroll',
  );
  const modalContentWrapperClasses = classNames(
    'rounded-[40px]',
    'h-max',
    'font-clash-grotesk',
    'p-0',
    'bg-grey-700',
    'md:w-[748px]',
  );
  const modalTitleClasses = classNames(
    'pt-6',
    'px-[24px]',
    'flex',
    'justify-between',
    'items-center',
    'w-full',
    'm-0',
    'text-[24px]/[95%]',
  );
  const bodyWrapperClasses = classNames(
    'text-grey-200',
    'font-public-sans',
    'pt-[24px]',
    'px-[24px]',
    'flex',
    'flex-col',
  );
  /*
  TaikoStatusModalStore.subscribe(async (open) => {
    if (open) {
      await loadTaikoStatus();
    }
  });*/

  // let currentStatus: null | TaikoStatusInfo = null;
  // let nextStatus: null | TaikoStatusInfo = null;

  async function loadTaikoStatus() {
    /*
    const address = getConnectedAddress();
    const service = new TaikoStatusService();

    const { current, next } = await service.getTaikoStatus(address);

    currentStatus = current;
    nextStatus = next;*/
  }

  let TaikoStatusModalStore = writable(false);

  const buttonWrapperClasses = classNames(
    'w-full',
    'py-[20px]',
    // 'md:col-span-2',
    'h-max',
    // 'px-[24px]',
    'grid grid-cols-1 md:grid-cols-3 gap-[24px]',
    //  'flex',
    // 'justify-end','items-center',
  );

  const statusProgressWrapperClasses = classNames(
    'w-full',
    'flex',
    'flex-col',
    'bg-grey-800',
    'gap-[16px]',
    'rounded-[30px]',
  );

  const statusProgressLabelClasses = classNames(
    'font-[700]',
    'text-[16px]/[24px]',
    'w-full',
    'flex',
    'justify-between',
    'text-grey-200',
  );

  const taikoStatusProgressClasses = classNames('progress', 'w-full', 'progress-primary', 'h-[16px]');

  const closeButtonClasses = classNames(
    //'w-[50px]',
    'w-full',
    'h-[58px]',
    'bg-grey-600',
    'rounded-full',
    'text-grey-100',
    'flex',
    'relative',
    'items-center',
    'justify-center',
    'hover:bg-grey-900',
    'transition-all',
  );
  const closeButtonIconClasses = classNames('absolute', 'left-[11px]', 'top-[11px]');
  const contentTitleClasses = classNames('font-clash-grotesk', 'text-[25px]/[42px]', 'text-grey-10');

  const textWrapperClasses = classNames('flex', 'w-full', 'flex-col', 'gap-[24px]', 'pb-[40px]');

  function showModal() {
    TaikoStatusModalStore.set(true);
  }

  const infoPanelClasses = classNames(
    'bg-grey-800',
    'w-full',
    'flex',
    'gap-[20px]',
    'rounded-[30px]',
    'px-[24px]',
    'py-[30px]',
  );

  const dataWrapperClasses = classNames('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-[16px]');

  const wideInfoPanelClasses = classNames(infoPanelClasses, 'md:col-span-2');

  const infoPanelValuesClasses = classNames();

  const infoPanelValueClasses = classNames('font-clash-grotesk', 'text-[25px]/[42px]', 'text-grey-10');

  const infoPanelValueLabelClasses = classNames('font-[700]', 'text-grey-500', 'text-[16px]/[24px]');

  onMount(() => {
    const accepted = localStorage.getItem('acceptedLegal') === 'true';
    if (!TaikoStatusModalStore || accepted) return;

    loadTaikoStatus();
  });

  const termsKey = 'hideBinanceAlphaAlert';
  function closeModal() {
    if (isTermsChecked) {
      localStorage.setItem(termsKey, 'true');
    }
    TaikoStatusModalStore.set(false);
  }

  $: isTermsChecked = false;

  onMount(() => {
    const accepted = localStorage.getItem(termsKey) === 'true';
    if (accepted) return;
    showModal();
  });

  const checkboxWrapperClasses = classNames(
    'label',
    'cursor-pointer',
    'flex',
    'flex-row',
    'justify-start',
    'gap-4',
    'my-6',
    'w-full',

    'text-[16px]/[24px]',
    'items-center',
  );

  const textContentClasses = classNames('flex', 'flex-col', 'gap-[16px]');
</script>

{#if $TaikoStatusModalStore}
  <div transition:fade class={modalClasses}>
    <div class={modalContentWrapperClasses}>
      <div>
        <div class={bodyWrapperClasses}>
          <div class={textWrapperClasses}>
            <div class={contentTitleClasses}>TAIKO token is now listed on Binance Alpha!</div>

            <div class={textContentClasses}>
              <p>Trailblazers!</p>
              <p>
                The TAIKO token is now listed on Binance Alpha, and it comes with a massive trading contest where you
                can win your share of 3 million TAIKO tokens. But that’s not all!
              </p>
              <p>
                Your trading activity on Taiko Alpha could pave the way for even more listing opportunities. So go
                ahead, trade for the airdrop and trade for the entire TAIKO ecosystem.
              </p>
              <p>We know you love to explore, and you love opportunities. This is a huge one.</p>
              Trailblazers, let’s go!
            </div>
          </div>
          <div class={dataWrapperClasses}>
            <div class={wideInfoPanelClasses}>
              <img alt="Binance Alpha Banner" src="/banner/binance-alpha/panel.png" />
            </div>
          </div>

          <div class={buttonWrapperClasses}>
            <label class={checkboxWrapperClasses}>
              <input type="checkbox" bind:checked={isTermsChecked} class="checkbox border bg-overlay-background" />
              <span class="label-text text-content-secondary">Don't show this again</span>
            </label>
            <button class={closeButtonClasses} on:click={closeModal}> Close </button>

            <ActionButton priority="primary" href="BINANCE_URL">Let's Go</ActionButton>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
