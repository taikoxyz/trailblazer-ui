<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const loadingOverlayClass = classNames(
    'w-full',
    'h-full',
    'min-h-[400px]',
    'f-col',
    'gap-4',
    'justify-center',
    'items-center',
    'h-[70px]',
  );
</script>

<div class={loadingOverlayClass}>
  <img class="size-[120px]" src="/blobby/jumping_blobby.gif" alt="Loading" />
  <h1>Loading...</h1>
</div>
