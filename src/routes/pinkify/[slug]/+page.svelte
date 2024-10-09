<script>
  import { page } from '$app/stores';
  import { Page } from '$shared/components/Page';
  import TrailEnded from '$shared/components/Trails/Ended/TrailEnded.svelte';
</script>

<svelte:head>
  <title>Taiko Trailblazer - Pinkify</title>
  <meta name="description" content="My size is size." />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://trailblazer.taiko.xyz/pinkify" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Taiko | Trailblazers" />
  <meta property="og:description" content="Answer the call of Taiko!" />
  <meta property="og:image" content="https://trailblazer.taiko.xyz/pinkify/render/{$page.params.slug}" />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="trailblazer.taiko.xyz" />
  <meta property="twitter:url" content="https://trailblazer.taiko.xyz/pinkify" />
  <meta name="twitter:title" content="Taiko | Trailblazers" />
  <meta name="twitter:description" content="Answer the call of Taiko!" />
  <meta name="twitter:image" content="https://trailblazer.taiko.xyz/pinkify/render/{$page.params.slug}" />
</svelte:head>

<Page>
  <!-- <Pinkify /> -->
  <TrailEnded />
</Page>
