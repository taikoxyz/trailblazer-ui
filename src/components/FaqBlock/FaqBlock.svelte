<script context="module" lang="ts">
  export interface IFaqEntry {
    question: string;
    answer: string;
  }
</script>

<script lang="ts">
  import ActionButton from '$components/Button/ActionButton.svelte';
  import { classNames } from '$libs/util/classNames';

  export let title: string | undefined = undefined;
  export let entries: IFaqEntry[] = [];

  const wrapperClasses = classNames(
    'flex',
    'md:flex-row',
    'flex-col',
    'gap-6',
    'w-full',
    'lg:w-[calc(100%*6/8)]',
    'h-max',
    'md:justify-between',
    'md:items-start',
    'max-w-[1512px]',
    'items-center',
    'px-6',
    'justify-center',
  );

  const slotClasses = classNames('w-[30%]', 'h-full');

  const blockWrapperClasses = classNames(
    'join join-vertical w-full',
    'rounded-[20px]',
    'bg-gradient-to-b from-[rgba(93,99,111,.1)] to-[rgba(25,30,40,.2)]',
  );
  const itemClasses = classNames(
    'collapse',
    'collapse-arrow',
    'join-item',
    'border-[#5D636F]',
    'p-0',
    'm-0',
    'py-[12px]',
    'px-[24px]',
    'text-[16px]/[24px]',
    'font-[400]',
    'border-[1px]',
    'border',
  );
  const questionClasses = classNames('collapse-title');
  const answerClasses = classNames('collapse-content');
  const linkClasses = classNames('text-[#FF6FC8]', 'hover:text-primary', 'underline');

  const defaultSlotWrapperClasses = classNames(
    'flex',
    'flex-col',
    'gap-4',
    'justify-center',
    'items-center',
    'h-full',
    'pr-[60px]',
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

  const readMoreButtonClasses = classNames(
    'w-full',
    'min-w-[200px]',

    'py-[8px]',
    'px-[20px]',
  );

  const titleClasses = classNames(
    'text-[#E81899]',
    'text-[16px]/[24px]',
    'uppercase',
    'md:w-min',
    'w-full',
    'text-center',
    'md:text-left',
    'font-[700]',
  );

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
      <div class={itemClasses}>
        <input type="radio" name="faq-accordion-{uuid}" />
        <div class={questionClasses}>{question}</div>
        <div class={answerClasses}>
          <p>{answer}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
