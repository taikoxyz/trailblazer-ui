<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { fade } from 'svelte/transition';

  import { ActionButton } from '$shared/components/Button';
  import { classNames } from '$shared/utils/classNames';

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

  const bodyWrapperClasses = classNames(
    'text-grey-200',
    'font-public-sans',
    'pt-[24px]',
    'px-[24px]',
    'flex',
    'flex-col',
  );

  let TaikoStatusModalStore = writable(false);

  const buttonWrapperClasses = classNames('w-full', 'py-[20px]', 'h-max', 'grid grid-cols-1 md:grid-cols-3 gap-[24px]');
  const closeButtonClasses = classNames(
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

  const contentTitleClasses = classNames('font-clash-grotesk', 'text-[25px]/[42px]', 'text-grey-10');

  const textWrapperClasses = classNames('flex', 'w-full', 'flex-col', 'gap-[24px]', 'pb-[40px]');

  function showModal() {
    TaikoStatusModalStore.set(true);
  }

  onMount(() => {
    const accepted = localStorage.getItem('acceptedLegal') === 'true';
    if (!TaikoStatusModalStore || accepted) return;
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

  const textContentClasses = classNames('flex', 'flex-col', 'gap-[16px]');
</script>

{#if $TaikoStatusModalStore}
  <div transition:fade class={modalClasses}>
    <div class={modalContentWrapperClasses}>
      <div>
        <div class={bodyWrapperClasses}>
          <div class={textWrapperClasses}>
            <div class={contentTitleClasses}>Trailblazers Guild Role is Live!</div>

            <div class={textContentClasses}>
              <p>Trailblazers, Get Your Guild Role and Take Trailblazers to the Next Level! 🔥</p>
              <ul class="list-disc pl-5">
                <li>
                  Those who hold the Trailblazers role will receive 100 percent of the rewards they have earned for
                  their level. (Along with a few extra surprises that will arrive later on 👀)
                </li>
                <li>Those without the role will receive only 50 percent of their rewards for the season.</li>
              </ul>
              <p>
                This applies to Season 4 rewards. The Trailblazers role was made available on June 16, and you have
                until July 10, 2025, to claim it. After that, the role will be closed until Season 4 rewards are ready
                to be claimed.
              </p>

              <p>
                To keep things balanced, we’re also increasing the daily point limits for Tx Value and Transaction
                Points. New limit will 100k base points (before multipliers) for each
              </p>
            </div>
          </div>
          <div class={buttonWrapperClasses}>
            <div></div>
            <button class={closeButtonClasses} on:click={closeModal}> Close </button>

            <ActionButton priority="primary" href="https://guild.xyz/taiko">Get it now</ActionButton>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
