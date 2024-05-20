<script>
  import { CoverImage } from '$components/CoverImage';
  import { Trailblazer } from '$components/Trailblazer';
</script>

<svelte:head>
  <title>Taiko Trailblazers: Call of Taiko</title>
  <meta property="og:image" content="/call-of-taiko.webp" />
  <meta property="og:title" content="Taiko Trailblazers: Call of Taiko" />
  <meta property="og:description" content="Will you answer the call?" />
  <meta property="og:url" content="https://trailblazers.taiko.xyz" />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Taiko Trailblazers: Call of Taiko" />
  <meta name="twitter:description" content="Will you answer the call?" />
</svelte:head>

<!-- spacer -->
<div class="h-24"></div>

<CoverImage src={''}></CoverImage>
<div class="f-center px-4 xl:px-8">
  <Trailblazer />
</div>
