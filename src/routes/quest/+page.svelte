<script>
  import { Quest } from '$components/Quest';
  import { Page } from '$components/Page';
  import { CoverImage } from '$components/CoverImage';
</script>

<svelte:head>
  <title>Taiko Trailblazer - Quest</title>
</svelte:head>

<CoverImage src={'/bg/test-cover-bg.svg'}></CoverImage>
<Page>
  <Quest />
</Page>
