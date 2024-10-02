<script lang="ts">
  import { classNames } from '$lib/shared/utils/classNames';

  export let value: number;
  export let color: 'pink' | 'purple' = 'pink';
  const wrapperClasses = classNames('w-full', 'z-[-1]', 'h-full', 'absolute', 'flex', 'justify-center', 'items-center');

  const baseRingClasses = classNames('loading', 'loading-ring', 'origin-center');

  const widthsArray = ['w-[90vw]', 'w-[130vw]', 'w-[200vw]'];
</script>

<div class={wrapperClasses}>
  {#each Array.from({ length: value }, (_, i) => value - 1 - i) as i}
    <div
      class={classNames(
        baseRingClasses,
        //'w-[500px]',
        widthsArray[i],
        'absolute',
        'duration-1000',
        //'top-[0px]',
        //'right-[0px]',

        color === 'pink' ? 'text-secondary right-[-50%]' : null,
        color === 'purple' ? 'text-[#5D08C8] left-[-50%]' : null,
      )}>
      {i}
    </div>
  {/each}
</div>
