<script lang="ts">
  import { ActionButton } from '$components/Button';
  import { classNames } from '$libs/util/classNames';
  import { t } from 'svelte-i18n';

  // CSS classes
  $: wrapperClasses = classNames(
    'relative',
    'overflow-hidden',
    'flex',
    'w-full',
    'min-h-[306px]',
    'max-w-[306px]',
    'rounded-[30px]',
    'bg-[#310E2F]',
    'border-2',
    'transition-all',
  );

  const contentWrapperClasses = classNames(
    'w-full',
    'relative',
    'flex',
    'flex-col',
    'justify-between',
    'overflow-hidden',
  );

  $: imageWrapperClasses = classNames('w-full', 'f-col', 'items-center');

  const badgeClasses = classNames(
    'absolute',

    'badge',
    'py-[15px]',
    'px-[12px]',
    'text-[16px]/[24px]',
    'font-[700]',
    'border-transparent',
    'bg-[rgba(0,0,0,.4)]',
  );
  const weekBadgeClasses = classNames(badgeClasses, 'top-[20px]', 'right-[20px]');

  const lockedBadgeNameClasses = classNames(badgeClasses, 'top-[20px]', 'left-[20px]');

  const buttonWrapperClasses = classNames('absolute', 'bottom-[20px]', 'place-self-center', 'w-full', 'px-[20px]');

  const tooltipClasses = classNames(
    'absolute',
    'w-full',
    'h-full',
    'top-0',
    'left-0',
    'flex',
    'justify-center',
    'items-center',
  );

  $: hoveredDescriptionClasses = classNames(
    'w-full',
    'h-full',
    'flex',
    'justify-center',
    'items-center',
    'text-center',
    'flex-col',
    'px-4',
    'text-white',
    'absolute',
    'opacity-0',
    'transition-all',
  );

  export let imageUrl: string;
  export let explorerLink: string;
</script>

<div class={wrapperClasses} role="button">
  <div class={contentWrapperClasses}>
    <div class={imageWrapperClasses}>
      <!-- NFT Image -->
    </div>
    <div class={tooltipClasses}>
      <div class={classNames('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-secondary', 'opacity-10')}></div>

      <div class={hoveredDescriptionClasses}>
        <div class={lockedBadgeNameClasses}>
          {name}
        </div>
      </div>
    </div>
  </div>
</div>
