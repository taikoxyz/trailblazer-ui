<script lang="ts">
  import { Button } from '$components/Button';
  import { Tooltip } from '$components/Tooltip';
  import { classNames } from '$libs/util/classNames';

  export let title: string = 'Booster';
  export let status: string = 'Coming Soon';
  export let showInfoIcon: boolean = true;
  export let background: string = 'bg-gray-800';

  export let tooltip: typeof Tooltip = Tooltip;

  $: classes = classNames(
    'f-center flex-col justify-start w-full h-full rounded-[30px] pt-[18px] pb-5 h-[100%]',
    background,
    $$props.class,
  );
</script>

<div class={classes}>
  <div class="flex gap-2 pb-3">
    <slot name="title">
      <div class="title-subsection-bold">title</div>
    </slot>
    {#if tooltip}
      <slot name="tooltip">
        <Tooltip position="bottom">tooltip</Tooltip>
      </slot>
    {/if}
  </div>
  <div class="divider m-0"></div>
  <div class="f-center flex-col px-6 gap-4 pt-2 w-full justify-between">
    <slot name="status">
      <p class="text-ellipsis whitespace-nowrap overflow-hidden">status</p>
    </slot>
    <slot name="cta">
      <Button type="primary" block class="px-4 py-2 truncate">cta</Button>
    </slot>
  </div>
</div>
