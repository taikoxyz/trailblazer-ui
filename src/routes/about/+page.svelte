<script>
  import { About } from '$components/About';
  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames('overflow-x-hidden', 'f-center', 'w-full', 'mt-[110px]', 'pb-[135px]');
</script>

<svelte:head>
  <title>Taiko Trailblazer - About</title>
</svelte:head>

<div class={wrapperClasses}>
  <About />
</div>
