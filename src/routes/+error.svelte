<script>
  import { page } from '$app/stores';
  import { Page } from '$components/Page';
</script>

<Page>
  <h1>{$page.status} {$page.error.message}</h1>
</Page>
