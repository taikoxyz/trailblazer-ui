<script lang="ts">
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { classNames } from '$shared/utils/classNames';

  // CSS classes
  const wrapperClasses = classNames('');
  const innerWrapperClasses = classNames(
    'rounded-[30px]',
    'px-[16px]',
    'py-[30px]',
    'bg-primary-base-content',
    'space-y-[50px]',
  );

  const buttonClasses = classNames('w-[157px]', 'font-bold');

  const collectionInfoWrapper = classNames('f-col', 'space-y-[30px]');

  const titleClasses = classNames(
    'text-[35px]',
    'font-medium',
    'leading-[42px]',
    'font-clash-grotesk',
    'f-row',
    'items-center',
    'gap-[16px]',
  );
  const collectionDetailsRowClasses = classNames('f-row', 'justify-between', 'font-bold');

  const badgeWrapperClasses = classNames('');

  export let collectionName: string;
  export let multiplier: number;
  export let collected: number;
  export let image: string;
</script>

<div class={wrapperClasses}>
  <div class={innerWrapperClasses}>
    <div class={collectionInfoWrapper}>
      <div class={titleClasses}><img src={image} alt={collectionName} />{collectionName}</div>
      <div class="space-y-[10px]">
        <div class={collectionDetailsRowClasses}>
          <span class="text-secondary-content">Your multiplier</span>
          <span>+{multiplier}x</span>
        </div>
        <div class={collectionDetailsRowClasses}>
          <span class="text-secondary-content">Collected</span>
          <div>{collected}<span class="text-secondary-content">/8</span></div>
        </div>
      </div>
      <ActionButton class={buttonClasses} priority="primary">View collection</ActionButton>
    </div>
    <div class={badgeWrapperClasses}>badges here</div>
  </div>
</div>
