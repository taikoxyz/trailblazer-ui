<script context="module" lang="ts">
  export interface IFaqEntry {
    question: string;
    answer: string;
  }
</script>

<script lang="ts">
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { classNames } from '$shared/utils/classNames';

  export let title: string | null = null;
  export let entries: IFaqEntry[] = [];
  export let titleSize: 'md' | 'lg' = 'md';

  const wrapperClasses = classNames(
    'gap-6',
    'w-full',
    'h-max',
    'xl:max-w-[1440px]',
    'md:justify-between',
    'md:items-start',
    'justify-center',
    'grid',
    'lg:grid-cols-6',
    'md:grid-cols-4',
  );

  const slotClasses = classNames('h-full', 'w-full', 'flex', 'lg:justify-start');

  const blockWrapperClasses = classNames(
    'join',
    'join-vertical ',
    // 'md:w-4/6',
    'w-full',
    'rounded-[20px]',
    'bg-gradient-to-b from-[rgba(93,99,111,.1)] to-[rgba(25,30,40,.2)]',

    'lg:col-span-5',
    'md:col-span-3',
  );
  const itemClasses = classNames(
    'collapse',
    'collapse-arrow',
    'join-item',
    'border-tertiary-content',
    'p-0',
    'm-0',
    'py-[12px]',
    'px-[24px]',
    'text-[16px]/[24px]',
    'font-[400]',
    'border-[1px]',
    'border',
    'text-left',
  );
  const questionClasses = classNames('collapse-title');
  const answerClasses = classNames('collapse-content');
  const linkClasses = classNames('text-primary-link', 'hover:text-primary', 'underline');

  const defaultSlotWrapperClasses = classNames(
    'f-col',
    'gap-4',
    'justify-center',
    'items-center',
    'h-full',
    'mb-[50px]',
    'md:mb-0',
  );

  const defaultSlotTitleClasses = classNames(
    'font-clash-grotesk',
    'text-[60px]/[60px]',
    'md:text-left',
    'text-center',
    'w-full',
    'font-[500]',
    'mb-[30px]',
  );

  const defaultSlotContentClasses = classNames(
    'text-secondary-content',
    'text-[16px]/[24px]',
    'lg:text-[18px]/[24px]',
    'md:text-left',
    'text-center',
  );

  const readMoreWrapperClasses = classNames('w-full', 'pt-[30px]');

  const readMoreButtonClasses = classNames('w-full', 'min-w-[200px]', 'py-[8px]', 'px-[20px]');

  $: titleClasses =
    titleSize === 'md'
      ? classNames(
          'text-secondary',
          'min-w-[146px]',
          'lg:mr-[24px]',
          'text-[16px]/[24px]',
          'uppercase',
          'md:w-min',
          'w-full',
          'text-center',
          'md:text-left',
          'font-[700]',
        )
      : classNames('font-clash-grotesk', 'text-[35px]/[42px]', 'font-[500]');

  $: checkedItem = '';

  $: uuid = Math.random().toString(36).substring(7);
</script>

<div class={wrapperClasses}>
  <div class={slotClasses}>
    {#if title}
      <div class={titleClasses}>
        {title}
      </div>
    {:else}
      <div class={defaultSlotWrapperClasses}>
        <div class={defaultSlotTitleClasses}>FAQs</div>
        <div class={defaultSlotContentClasses}>
          Have more questions? Browse through our FAQs for detailed information. For additional support, join our
          <a class={linkClasses} target="_blank" href="https://discord.gg/taikoxyz"> Discord channel </a> where our community
          is ready to help you!
        </div>

        <div class={readMoreWrapperClasses}>
          <ActionButton class={readMoreButtonClasses} priority="primary" href="/faq">Read More</ActionButton>
        </div>
      </div>
    {/if}
  </div>

  <div class={blockWrapperClasses}>
    {#each entries as { question, answer }}
      <button
        class={itemClasses}
        on:click={() => (checkedItem === question ? (checkedItem = '') : (checkedItem = question))}>
        <input type="radio" name="faq-accordion-{uuid}" checked={checkedItem === question} />
        <div class={questionClasses}>{question}</div>
        <div class={answerClasses}>
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          <p>{@html answer}</p>
        </div>
      </button>
    {/each}
  </div>
</div>
