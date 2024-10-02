<script>
  import { About } from '$components/About';
  import { classNames } from '$lib/shared/utils/classNames';

  const wrapperClasses = classNames('overflow-hidden', 'f-center', 'w-full', 'h-full', 'pb-[100px]');
</script>

<svelte:head>
  <title>Taiko Trailblazer - About</title>
</svelte:head>

<div class={wrapperClasses}>
  <About />
</div>
