<script lang="ts">
  import { json } from 'svelte-i18n';

  import { FAQDropdown } from '$components/Dropdown';
  import { classNames } from '$libs/util/classNames';

  interface IFaqOption {
    question: string;
    answer: string;
  }

  $: faqOptions = $json('faq') as IFaqOption[];

  const wrapperClasses = classNames('w-full', 'px-5', 'xl:p-0');
  const titleClasses = classNames('pb-[30px]', 'display-large-medium');
  const faqWrapperClasses = classNames('flex', 'flex-col', 'w-full', 'gap-4');
</script>

<div class={wrapperClasses}>
  <div class={titleClasses}>FAQs</div>
  <div class={faqWrapperClasses}>
    {#each faqOptions as { question, answer }}
      <FAQDropdown {question} {answer}></FAQDropdown>
    {/each}
  </div>
</div>
