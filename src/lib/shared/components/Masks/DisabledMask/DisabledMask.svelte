<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  export let title = 'Finished.';
  export let description = '';
  export let textClass = '';

  let classes = classNames(
    'gap-2 z-10',
    'f-center',
    'absolute',
    'top-0 bottom-0',
    'left-0 right-0',
    'overflow-hidden',
    'bg-primary-brand',
    'text-white',
    'opacity-20',
    'mask',
    'rounded-[30px]',
    $$props.class,
  );

  let headline = classNames('body-bold', 'font-clash-grotesk', 'text-[55px]', textClass);

  let textClasses = classNames('body-regular text-base text-center text-[20px] max-w-[610px]', textClass);
</script>

<div class={classes} style="mask-image=url(favicon.svg)"></div>
<div class="hidden lg:block">
  <div class="f-center w-full f-col space-y-[35px] z-10 absolute top-[10%] left-0 text-white">
    <span class={headline}>{title}</span>
    <span class={textClasses}>{description}</span>
  </div>
</div>
