<script lang="ts">
  import { goto } from '$app/navigation';
  import { ActionButton } from '$shared/components/Button';
  import { Icon } from '$shared/components/Icon';
  import { truncateString } from '$shared/utils/truncateString';

  import type { NewsCardContent } from '../../types/NewsCardContent';

  export let entry: NewsCardContent;
</script>

{#if entry.featured}
  <div class="f-col">
    <div class="f-row justify-between mb-[14px]">
      <img src={entry.imgSrc} alt={entry.title} class="w-[44px] h-[44px]" />
      <div class="f-col">
        <div class="font-bold">{entry.title}</div>
        <div class="text-primary-link text-sm">{truncateString(entry.subtitle, 70)}</div>
      </div>

      {#if entry.cta.external}
        <ActionButton priority="primary" disabled={entry.cta.disabled} href={entry.cta.href} class="max-w-[62px]"
          >Go</ActionButton>
      {:else}
        <ActionButton
          priority="primary"
          disabled={entry.cta.disabled}
          on:click={() => goto(entry.cta.href)}
          class="max-w-[62px]">Go</ActionButton>
      {/if}
    </div>
    {#if entry.text}
      <div class="f-row mb-[20px]">
        <div class="text-secondary-content text-sm">{entry.text}</div>
      </div>
    {/if}
  </div>
  <div class="h-sep my-2" />
{:else}
  <a href={entry.cta.href}>
    <div class="f-row f-between-center">
      <div class="f-col">
        <div class="font-bold">{entry.title}</div>
        <div class="text-secondary-content text-sm">{truncateString(entry.subtitle, 70)}</div>
      </div>
      <Icon type="chevron-right" size={16} class="min-w-[20px] self-start mt-[10px]" />
    </div>
  </a>
{/if}
