<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { web3modal } from '$lib/shared/utils/connect';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { account } from '$shared/stores/account';
  import { classNames } from '$shared/utils/classNames';

  // Base Container Classes
  const containerClasses = classNames('container', 'flex', 'justify-center', 'items-center', 'w-full');

  // Base Wrapper Classes
  const wrapperClasses = classNames(
    'flex',
    'flex-col',
    'w-full',
    'rounded-[30px]',
    'bg-elevated-background',
    'bg-cover',
    'relative',
    'overflow-hidden',
    'h-[732px]',
    'md:h-[427px]',
    'lg:h-[300px]',
    'xl:h-[250px]',
    'min-w-[342px]',
  );

  // Base Inner Wrapper Classes
  const innerWrapperClasses = classNames(
    'absolute',
    'w-full',
    'bottom-0',
    'h-[522px]',
    'md:h-[427px]',
    'lg:h-[300px]',
    'xl:h-[250px]',
    'flex',
    'flex-col',
    'md:flex-row',
    'items-center',
    'space-y-7.5',
    'lg:space-y-0',
    'px-5',
    'md:px-6',
    'lg:pr-[110px]',
    'xl:pl-0',
    'lg:py-0',
    'md:py-8.75',
    'xl:py-0',
  );

  // Base Title Wrapper Classes
  const titleWrapperClasses = classNames(
    'flex',
    'flex-col',
    'items-center',
    'md:items-start',
    'md:mt-0',
    'gap-[10px]',
    'xl:min-w-[402px]',
    'lg:mt-[35.5px]',
  );

  // Base Action Button Classes
  const actionButtonClasses = classNames('min-w-[140px]', 'max-h-[48px]', 'max-w-[140px]');

  // Base Inner Content Classes
  const innerContentClasses = classNames(
    'f-col',
    'md:h-[385px]',
    'lg:h-[300px]',
    'xl:h-[250px]',
    'justify-center',
    'items-center',
    'md:items-start',
    'xl:items-center',
    'space-y-5',
    'md:ml-12.5',
    'md:ml-[70px]',
    'lg:ml-[57px]',
    'xl:ml-0',
    'xl:my-[93px]',
    'md:min-w-[315px]',
    'lg:min-w-[367px]',
  );

  // Base Subtext Wrapper Classes
  const subtextWrapperClasses = classNames(
    'f-col',
    'lg:f-row',
    'xl:f-col',
    'items-center',
    'md:items-start',
    'mt-7.5',
    'xl:ml-[95px]',
    'md:mt-0',
    'text-center',
    'md:text-left',
    'justify-center',
    'gap-[34px]',
  );

  // Base Subtext Classes
  const subtextClasses = classNames('w-64', 'md:w-[292px]', 'xl:w-[247px]', 'text-center', 'md:text-left');

  // Base Separator Classes
  const separatorClasses = classNames('h-sep', 'lg:pt-0', 'lg:mb-0', 'mt-0', 'self-center', 'md:self-start');

  // Base Overlay Classes
  const overlayClasses = classNames('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'opacity-70');

  // Button Handler
  const handleClick = () => {
    $account.isConnected ? goto('/profile') : web3modal.open();
  };
</script>

<div class={containerClasses}>
  <div class={wrapperClasses}>
    <!-- Add images, background, or other content here as needed -->

    <!-- Optional Overlay -->
    <div class={overlayClasses} />

    <div class={innerWrapperClasses}>
      <div class={innerContentClasses}>
        <div class={titleWrapperClasses}>
          <h1 class="your-h1-classes">{$t('banner.yourbanner.title_1')}</h1>
          <h2 class="your-h2-classes">{$t('banner.yourbanner.title_2')}</h2>

          <div class={separatorClasses} />
          <div class="f-row justify-between xl:w-[500px]">
            <span class={subtextClasses}>Your Subtext Here</span>
          </div>
        </div>

        <div class={subtextWrapperClasses}>
          <ActionButton priority="primary" class={actionButtonClasses} on:click={handleClick}>
            Your Button Text
          </ActionButton>
        </div>
      </div>
    </div>
  </div>
</div>
