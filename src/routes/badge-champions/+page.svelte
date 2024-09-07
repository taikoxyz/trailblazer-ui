<script>
  import { BadgeChampions } from '$components/BadgeChampions';
  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames(
    'overflow-x-hidden',
    'f-center',
    'w-full',
    'lg:pt-[158px]',
    'pt-[12px]',
    'pb-[135px]',
  );
</script>

<svelte:head>
  <title>Taiko Trailblazer - Badge Champions</title>
</svelte:head>

<div class={wrapperClasses}>
  <BadgeChampions />
</div>
