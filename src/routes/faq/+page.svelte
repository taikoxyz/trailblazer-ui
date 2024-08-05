<script lang="ts">
  import { json } from 'svelte-i18n';

  import type { IFaqEntry } from '$components/FAQ/FaqBlock.svelte';
  import FaqBlock from '$components/FAQ/FaqBlock.svelte';
  import { classNames } from '$libs/util/classNames';

  $: faqEntries = $json('faq') as { section: string; items: IFaqEntry[] }[];

  const wrapperClasses = classNames(
    'overflow-x-hidden',
    'lg:pt-[158px]',
    'pt-[12px]',
    'pb-[135px]',
    'lg:px-[75px]',
    'md:px-[65px]',
    'px-[20px]',
    'w-full',
    'flex',
    'flex-col',
    'md:gap-24',
    'gap-[80px]',
  );

  const heroClasses = classNames(
    'rounded-[30px]',
    'relative',
    'w-full',
    'h-[216px]',
    'flex',
    'flex-col',
    'justify-center',
    'items-start',
    'pl-[75px]',
    'text-[500]',
    'font-clash-grotesk',
    'text-[45px]/[52px]',
  );
</script>

<svelte:head>
  <title>Taiko Trailblazer - FAQ</title>
</svelte:head>

<div class={wrapperClasses}>
  <div class={heroClasses} style="background-image: url('/faq-header.png')">FAQs</div>

  {#each faqEntries as { section, items }}
    <FaqBlock title={section} entries={items} />
  {/each}
</div>
