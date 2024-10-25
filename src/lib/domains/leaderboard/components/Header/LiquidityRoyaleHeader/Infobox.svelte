<script lang="ts">
  import type { InfoBoxType } from '$lib/domains/leaderboard/types/liquidity/types';
  import { classNames } from '$shared/utils/classNames';

  export let content: InfoBoxType;

  const wrapperClasses = classNames('space-y-[20px]', 'max-w-[600px]');
  const titleClasses = classNames('text-left', 'font-medium', 'text-[35px]', 'leading-[42px]');
  const textClasses = classNames('text-secondary-content');
  const iconClasses = classNames('size-[20px]');
  const headlineClasses = classNames('f-row', 'gap-[12px]', 'items-center');
</script>

<div class={wrapperClasses}>
  <div class={headlineClasses}>
    <img src={content.icon} alt="icon" class={iconClasses} />
    <h1 class={titleClasses}>{content.title}</h1>
  </div>
  <div class="mt-[20px]">
    <p class={textClasses}>{content.text}</p>
  </div>
</div>
