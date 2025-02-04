<script lang="ts">
  import { inject } from '@vercel/analytics';

  import { dev } from '$app/environment';
  import { Startpage } from '$lib/domains/splashpage/components/index';

  inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
  <title>Taiko Trailblazers: Call of Taiko</title>
  <meta property="og:title" content="Taiko Trailblazers: Call of Taiko" />
  <meta property="og:description" content="Will you answer the call?" />
  <meta property="og:url" content="https://trailblazers.taiko.xyz" />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Taiko Trailblazers: Call of Taiko" />
  <meta name="twitter:description" content="Will you answer the call?" />
</svelte:head>

<div class="f-center overflow-hidden no-scrollbar">
  <Startpage />
</div>
