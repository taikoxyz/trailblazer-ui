<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  import EcosystemGrid from './components/EcosystemGrid.svelte';
  import EcosystemHeader from './components/EcosystemHeader.svelte';

  const wrapperClasses = classNames(
    'xl:max-w-[1440px]',
    'justify-center',
    'items-center',
    'w-full',
    'flex',
    'flex-col',
    'gap-[20px]',
    'md:p-0',
    'p-[20px]',
  );
</script>

<div class={wrapperClasses}>
  <EcosystemHeader />

  <EcosystemGrid />
</div>
