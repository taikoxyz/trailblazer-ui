<script lang="ts">
  import type { IEcosystemPartner } from '$lib/domains/ecosystem/components/partners';
  import { Skeleton } from '$shared/components/Mock';
  import { classNames } from '$shared/utils/classNames';

  export let data: IEcosystemPartner;
  export let style: 'dark' | 'light' = 'dark';

  const wrapperClasses = classNames(
    'w-full',
    style === 'dark' ? 'bg-partner-dark' : null,
    style === 'light' ? 'bg-partner-light text-grey-800' : null,
    'rounded-[35px]',
    'relative',
    'p-[35px]',
    'flex',
    'flex-col',
    'md:justify-start',
    'md:items-start',
    'justify-center',
    'items-center',
  );

  $: name = data.name;
  $: logo = data.logo;
  $: description = data.description;
  $: url = data.url;
  $: category = data.category;
  $: disabled = url ? false : true;

  function getButtonText(cat: string) {
    if (!cat) {
      return 'coming soon...';
    }
    if (cat === 'DeFi') {
      return 'Learn more';
    }

    if (cat === 'Gaming') {
      return 'Play now';
    }

    return 'Use now';
  }

  const nameClasses = classNames(
    style === 'dark' ? 'text-primary-content' : 'text-grey-800',
    'text-[32px]/[39.36px]',
    'font-clash-grotesk',
    'font-[500]',
    'mt-[30px]',
  );
  const logoClasses = classNames('w-[100px]', 'h-[100px]', 'rounded-[20px]');
  const descriptionClasses = classNames(
    style === 'dark' ? 'text-secondary-content' : 'text-grey-600',

    'text-[14px]/[20px]',
  );
  const urlClasses = classNames(
    'rounded-full',
    'font-[700]',
    style === 'dark' ? 'text-primary-content' : 'text-grey-800',
    'text-[16px]/[24px]',
    'w-fit',
    'px-[20px]',
    'py-[8px]',
    'btn',
    'btn-ghost',
    'hover:bg-primary',
    'absolute',
    'bottom-[35px]',
    disabled ? 'cursor-not-allowed border-none' : 'cursor-pointer border border-[2px] border-primary',
    disabled ? 'border-none' : 'border border-[2px] border-primary',
  );
  const categoryClasses = classNames(
    style === 'dark' ? 'text-elevated-background' : 'text-grey-800',
    style === 'dark' ? 'bg-primary-content' : 'bg-pink-50',
    'absolute',
    'rounded-full',
    'px-[10px]',
    'py-[5px]',
    'font-[700]',
    'text-[14px]/[20px]',
    'top-[35px]',
    'right-[35px]',
  );

  const urlRowClasses = classNames('w-full', 'flex', 'md:justify-start', 'justify-center', 'h-[45px]', 'mt-[20px]');
</script>

<div class={wrapperClasses}>
  {#if logo}
    <img class={logoClasses} src={logo} alt={name} />
  {:else}
    <Skeleton class={logoClasses} bgColor="bg-pink-200" shineColor="bg-pink-100" />
  {/if}
  <div class={nameClasses}>{name}</div>
  <div class={descriptionClasses}>{description || 'n/a'}</div>
  <div class={urlRowClasses}>
    <button class={urlClasses} disabled={url ? false : true} on:click={() => window.open(url, '_blank')}>
      {#if data.button}
        {data.button}
      {:else}
        {getButtonText(category)}
      {/if}</button>
  </div>
  <div class={categoryClasses}>{category || 'n/a'}</div>
</div>
