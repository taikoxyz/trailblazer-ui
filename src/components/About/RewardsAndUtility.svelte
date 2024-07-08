<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames('flex', 'flex-row', 'gap-4', 'w-[100vw]');

  const itemClasses = classNames('w-1/4');

  const titleClasses = classNames('font-clash-grotesk', 'text-[60px]/[60px]', 'font-[500]');
  const textClasses = classNames('text-secondary-content');

  const frameCount = 4;
</script>

<div class={wrapperClasses}>
  <div class={classNames(itemClasses, 'mr-6')}>
    <div class={titleClasses}>
      Rewards<br />
      & Utility
    </div>
    <div class={textClasses}>
      Harness specific XP multipliers that elevate your performance across various activities
    </div>
  </div>
  <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
  {#each Array(frameCount) as _, i}
    {@const src = i === 0 ? '/reward-unlocked.png' : '/reward-locked.png'}
    <a class={itemClasses} href="/profile">
      <img alt="Item" {src} />
    </a>
  {/each}
</div>
