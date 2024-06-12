<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';

  import { Button } from '$components/Button';
  import { classNames } from '$libs/util/classNames';

  const modalContentWrapperClasses = classNames('modal-box', 'p-0', 'bg-[#2B303B]', 'md:w-[40vw]');
  const modalTitleClasses = classNames('pt-6', 'w-full', 'm-0', 'text-[35px]/[42px]');
  const bodyWrapperClasses = classNames('text-content-primary', 'py-4');
  const footerWrapperClasses = classNames('w-full', 'flex', 'flex-row', 'items-center', 'justify-center', 'gap-4');
  const linkClasses = classNames('text-primary-link', 'cursor-pointer');
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

  const termsUrl = 'https://www.notion.so/taikoxyz/Legal-Disclaimer-89047a75cb0948f8833032f3467660c4';

  function acceptTerms() {
    localStorage.setItem('acceptedLegal', 'true');
    if (!modal) return;
    modal.close();
  }

  $: isTermsChecked = false;

  $: modal = undefined as HTMLDialogElement | undefined;

  onMount(() => {
    const accepted = localStorage.getItem('acceptedLegal') === 'true';
    if (!modal || accepted) return;
    modal.showModal();
  });
</script>

<dialog bind:this={modal} id="legal-disclaimer-modal" class="modal">
  <div class={modalContentWrapperClasses}>
    <div class={modalTitleClasses}>
      {$t('legal.title')}
    </div>

    <div
      class={classNames(
        // 'border-border-divider-default',
        'divider',
      )}>
    </div>
    <div>
      <div class={bodyWrapperClasses}>
        {$t('legal.textPre')}
        <a href={termsUrl} class={linkClasses} target="_blank">
          {$t('legal.link')}
        </a>
        {$t('legal.textPost')}
      </div>

      <label class={checkboxWrapperClasses}>
        <input type="checkbox" bind:checked={isTermsChecked} class="checkbox border bg-overlay-background" />
        <span class="label-text text-content-secondary">I agree to the terms and conditions mentioned above.</span>
      </label>
    </div>

    <div
      class={classNames(
        // 'border-border-divider-default',
        'divider',
      )}>
    </div>
    <div class={footerWrapperClasses}>
      <Button on:click={acceptTerms} disabled={!isTermsChecked} class="py-3" type="primary" wide block>
        {$t('legal.confirm')}
      </Button>
    </div>
  </div>
</dialog>
