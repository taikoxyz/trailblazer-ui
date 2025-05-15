<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  export let title: string;
  export let alwaysColumn = false;

  export let titleOverrideClasses: string = '';
  export let contentOverrideClasses: string = '';

  const containerClass = classNames('f-col', 'w-full');
  const innerContainerClass = classNames(
    'f-col',
    alwaysColumn ? '' : 'lg:f-row',
    'text-center',
    'lg:text-left',
    'gap-[40px]',
    'lg:gap-[24px]',
  );
  const titleClass = classNames(
    'text-[35px]',
    'lg:text-[45px]',
    'font-medium',
    'leading-[42px]',
    'lg:leading-[52px]',
    'lg:min-w-[293px]',
    'lg:max-w-[293px]',
    titleOverrideClasses,
  );
  const contentClass = classNames('text-secondary-content', 'space-y-6', contentOverrideClasses);
</script>

<div class={containerClass}>
  <div class={innerContainerClass}>
    <h2 class={titleClass}>{title}</h2>
    <div class={contentClass}>
      <slot />
    </div>
  </div>
</div>
