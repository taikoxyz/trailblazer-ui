<script lang="ts">
  import { classNames } from '$shared/utils/classNames';
  import { isDesktop, isMobile, isTablet } from '$shared/utils/responsiveCheck';

  const wrapperClasses = classNames('w-full', 'h-full', 'flex', 'justify-center', 'items-center');

  const imageClasses = classNames('w-full', 'object-contain', 'object-center');

  const alt = 'Robinos Campaign';
  const target = '_blank';
  const href = 'https://predict.robinos.finance/';
</script>

<div class={wrapperClasses}>
  <a {href} {target}>
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
