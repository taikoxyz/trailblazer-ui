<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  export let text = 'Finished.';
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
    'mask',
    'opacity-60',
    'rounded-[30px]',
    $$props.class,
  );

  let headline = classNames('body-bold', 'font-clash-grotesk', 'text-[55px]', 'uppercase', textClass);

  let textClasses = classNames('body-regular text-center text-[20px] max-w-[400px]', textClass);
</script>

<div class={classes} style="mask-image=url(favicon.svg)"></div>
<div class="f-center f-col space-y-[35px] z-10 absolute top-0 bottom-0 left-0 right-0 text-white">
  <span class={headline}>{text}</span>
  <span class={textClasses}>{description}</span>
</div>
