<script>
  import { CoverImage } from '$components/CoverImage';
  import { Page } from '$components/Page';
  import { Quest } from '$components/Quest';
</script>

<svelte:head>
  <title>Taiko Trailblazer - Quest</title>
</svelte:head>

<CoverImage src={'/bg/test-cover-bg.svg'}></CoverImage>
<Page>
  <Quest />
</Page>
