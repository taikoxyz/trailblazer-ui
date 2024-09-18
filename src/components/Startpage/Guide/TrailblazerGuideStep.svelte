<script lang="ts">
  import { Icon } from '$components/Icon';
  import { classNames } from '$libs/util/classNames';

  export let icon: 'semi-circle-reversed' | 'quad-circles' | 'diamond' = 'semi-circle-reversed';
  export let title: string = 'Unlock your potential';
  export let description: string =
    'We believe that everyone, from web wizards to coding novices, should have a stake in our future. Trailblazer rewards steps both big and small, ensuring every participant gains from their involvement.';

  const sectionClasses = classNames(
    'w-[100vw]',
    'px-[48px]',
    'relative',
    'grid',
    'md:grid-cols-6',
    'grid-cols-4',
    'lg:block',
    'mb-8',
  );

  const wrapperClasses = classNames(
    'flex',
    'flex-col',
    'w-full',
    'pl-4',
    'lg:pl-[20px]',
    'md:pl-[20px]',
    'gap-[20px]',
    'justify-center',
    'items-center',
    'md:justify-start',
    'border-l-2',
    'border-gray-600',
    'lg:col-span-4',
    'lg:col-start-2',
    'md:col-start-2',
    'col-span-4',
    'pl-6',
    'lg:h-[204px]', // Fixed height for lg screens
    'xl:h-[158px]', // Fixed height for xl screens
  );

  const titleClasses = classNames(
    'flex',
    'w-full',
    'items-center',
    'font-medium',
    'font-clash-grotesk',
    'text-[35px]/[42px]',
    'lg:justify-start',
    'flex-row',
    'gap-3',
  );

  const contentClasses = classNames(
    'text-secondary-content',
    'font-public-sans',
    'text-[16px]/[24px]',
    'text-left',
    'md:text-left',
    'h-max',
  );

  const iconClasses = classNames('w-[20px]');

  const iconFillClasses = classNames('fill-primary-brand');
</script>

<div class={sectionClasses}>
  <div class={wrapperClasses}>
    <div class={titleClasses}>
      <Icon type={icon} vWidth={20} vHeight={20} class={iconClasses} fillClass={iconFillClasses} />
      <div class="display-small-medium">
        {title}
      </div>
    </div>
    <div class={contentClasses}>
      {description}
    </div>
  </div>
</div>
