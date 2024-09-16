<script lang="ts">
  import { Icon } from '$components/Icon';
  import { classNames } from '$libs/util/classNames';

  export let icon: 'semi-circle-reversed' | 'quad-circles' | 'diamond' = 'semi-circle-reversed';
  export let title: string = 'Connect';
  export let description: string =
    'Begin by registering your wallet address. This initial step is crucial as it links your identity to your participation.';

  const wrapperClasses = classNames(
    'flex',
    'flex-col',
    'w-full',
    // 'h-full',
    'pl-4',
    // 'py-6',
    // 'lg:py-[38px]',
    // 'md:py-[38px]',
    'lg:pl-[20px]',
    'md:pl-[20px]',
    'gap-[20px]',

    'w-[359px]',
    'md:w-[293px]',
    'lg:w-[400px]',
    'lg:h-[158px]',

    'justify-center',
    'items-center',

    'md:justify-start',

    'border-l-2',
    'border-gray-500',
  );

  const titleClasses = classNames(
    'flex',
    'w-full',
    // 'justify-center',
    'items-center',
    'font-medium',
    'font-clash-grotesk',
    'text-[35px]/[42px]',
    'lg:justify-start',
    'flex-row',
    'md:flex-col',
    'lg:flex-row',
    'gap-3',
  );

  const contentClasses = classNames(
    'text-secondary-content',
    'font-public-sans',
    'text-[16px]/[24px]',
    'text-left',
    'md:text-left',
    'h-max',
    'lg:max-w-[340px]',
  );
</script>

<div class={wrapperClasses}>
  <div class={titleClasses}>
    <Icon type={icon} vWidth={20} vHeight={20} class="w-[20px]" fillClass="fill-primary-brand" />

    <div class="display-small-medium">
      {title}
    </div>
  </div>
  <div class={contentClasses}>
    {description}
  </div>
</div>
