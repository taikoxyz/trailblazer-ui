<script lang="ts">
  import { ActionButton } from '$shared/components/Button';
  import StaticTime from '$shared/components/Countdown/StaticTime.svelte';
  import { classNames } from '$shared/utils/classNames';

  const wrapperClasses = classNames(
    'flex',
    'flex-col',
    'gap-4',
    'items-center',
    'justify-center',
    'px-[24px]',
    'md:px-[48px]',
  );
</script>

<div class={wrapperClasses}>
  <h1>Before preconfs</h1>

  <StaticTime seconds={230} />

  <ActionButton priority="primary">Track your time</ActionButton>
</div>
