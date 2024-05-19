<script>
  import { CoverImage } from '$components/CoverImage';
  import { Trailblazer } from '$components/Trailblazer';
</script>

<svelte:head>
  <title>Taiko Trailblazers: Call of Taiko</title>
  <meta property="og:image" content="https://trailblazers.taiko.xyz/call-of-taiko.webp" />
  <meta property="og:title" content="Taiko Trailblazers: Call of Taiko" />
  <meta property="og:description" content="Will you answer the call?" />
  <meta property="og:url" content="https://trailblazers.taiko.xyz/call-of-taiko.webp" />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Taiko Trailblazers: Call of Taiko" />
  <meta name="twitter:description" content="Will you answer the call?" />
  <meta property="twitter:domain" content="trailblazers.taiko.xyz" />
  <meta property="twitter:url" content="https://trailblazers.taiko.xyz" />
  <meta name="twitter:image" content="https://trailblazers.taiko.xyz/call-of-taiko.webp" />
</svelte:head>

<!-- spacer -->
<div class="h-24"></div>

<CoverImage src={''}></CoverImage>
<div class="f-center px-5">
  <Trailblazer />
</div>
