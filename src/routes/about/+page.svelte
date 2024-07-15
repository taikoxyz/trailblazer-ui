<script>
  import { About } from '$components/About';
  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames(
    'overflow-x-hidden',
    'f-center',
    'w-full',
    'px-[20px]',
    'md:px-[65px]',
    'lg:px-[75px]',
    'lg:pt-[158px]',
    'pt-[12px]',
    'pb-[135px]',
  );
</script>

<svelte:head>
  <title>Taiko Trailblazer - About</title>
</svelte:head>

<div class={wrapperClasses}>
  <div class="container w-full">
    <About />
  </div>
</div>
