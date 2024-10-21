<script lang="ts">
  import { classNames } from '$shared/utils/classNames';
  import { isDesktop, isMobile, isTablet } from '$shared/utils/responsiveCheck';

  const wrapperClasses = classNames('container', 'w-full', 'h-full', 'flex', 'justify-center', 'items-start');
  const urlClasses = classNames('w-full', 'h-max', 'flex', 'justify-center', 'items-start');
  const imageClasses = classNames('xl:w-full', 'h-full');

  const alt = 'Robinos Campaign';
  const target = '_blank';
  const href = 'https://predict.robinos.finance/';
</script>

<div class={wrapperClasses}>
  <a {href} class={urlClasses} {target}>
    {#if $isMobile}
      <img {alt} class={imageClasses} src="/competitionInfo/robinos/banner-sm.svg" />
    {:else if $isTablet}
      <img {alt} class={imageClasses} src="/competitionInfo/robinos/banner-md.svg" />
    {:else if $isDesktop}
      <img {alt} class={imageClasses} src="/competitionInfo/robinos/banner-lg.svg" />
    {:else}
      <img {alt} class={imageClasses} src="/competitionInfo/robinos/banner-xl.svg" />
    {/if}
  </a>
</div>
