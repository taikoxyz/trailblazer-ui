<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  import type { IEcosystemPartner } from '../partners';

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

  function getButtonText() {
    if (category === 'DeFi') {
      return 'Learn more';
    }

    if (category === 'Gaming') {
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
    'border',
    'border-[2px]',
    'rounded-full',
    'font-[700]',
    style === 'dark' ? 'text-primary-content' : 'text-grey-800',
    'text-[16px]/[24px]',
    'w-fit',
    'border-primary',
    'px-[20px]',
    'py-[8px]',
    'hover:bg-primary',
    'transition-colors',
    'absolute',
    'bottom-[35px]',
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
  <img class={logoClasses} src={logo} alt={name} />
  <div class={nameClasses}>{name}</div>
  <div class={descriptionClasses}>{description}</div>
  <div class={urlRowClasses}>
    <a class={urlClasses} target="_blank" href={url}>{getButtonText()}</a>
  </div>
  <div class={categoryClasses}>{category}</div>
</div>
