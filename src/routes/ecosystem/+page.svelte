<script lang="ts">
  import { Ecosystem } from '$lib/domains/ecosystem/components';
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames(
    'f-center',
    'flex-col',
    'w-full',
    'overflow-visible',
    'gap-[150px]',
    'md:mb-[130px]',
    'md:px-[48px]',
    'px-[24px]',
  );
</script>

<svelte:head>
  <title>Taiko Trailblazer - Ecosystem</title>
</svelte:head>
<div class={wrapperClasses}>
  <Ecosystem />
</div>
