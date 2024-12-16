<script lang="ts">
  import { Icon } from '$shared/components/Icon';
  import type { NavigationItem } from '$shared/routes';

  export let navigation: NavigationItem;

  let arrowState: 'hidden' | 'in' | 'out' = 'hidden';

  function handleMouseEnter() {
    if (arrowState !== 'in') {
      arrowState = 'in';
    }
  }

  function handleMouseLeave() {
    if (arrowState !== 'out' && arrowState === 'in') {
      arrowState = 'out';
    }
  }

  function handleAnimationEnd() {
    if (arrowState === 'out') {
      arrowState = 'hidden';
    }
  }
</script>

<li
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  class="w-full rounded-full hover:bg-neutral-background">
  <a
    href={navigation.route}
    class="flex w-full h-full pl-[16px] pr-[6px] py-[12px] rounded-full max-h-[44px] leading-none items-center justify-between hover:cursor-pointer">
    <div class="flex items-center gap-4 whitespace-nowrap">
      {#if navigation.icon}
        <Icon size={20} type={navigation.icon} fillClass="fill-primary-interactive-accent" />
      {/if}
      {navigation.name}
    </div>
    <div class="f-center w-[32px] min-h-[32px] rounded-full overflow-hidden relative">
      <div
        class={`arrow-container ${arrowState === 'hidden' ? 'hidden' : 'block'} ${arrowState === 'in' ? 'arrow-in' : ''} ${arrowState === 'out' ? 'arrow-out' : ''}`}
        on:animationend={handleAnimationEnd}>
        <Icon type="arrow-right" width={14} />
      </div>
    </div>
  </a>
</li>

<style>
  @keyframes arrowIn {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes arrowOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .arrow-in {
    animation: arrowIn 0.3s forwards;
  }

  .arrow-out {
    animation: arrowOut 0.3s forwards;
  }
</style>
