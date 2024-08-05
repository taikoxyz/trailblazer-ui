<script lang="ts">
  import { Button } from '$components/Button';
  import { Tooltip } from '$components/Tooltip';
  import { classNames } from '$libs/util/classNames';

  export let tooltip: typeof Tooltip = Tooltip;

  $: classes = classNames(
    'flex flex-col items-center justify-start  w-full h-auto rounded-[30px] pt-[18px] pb-5 h-[100%]',
    $$props.class,
  );
</script>

<div class={`${classes}`}>
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
  <div class="flex items-center flex-col px-6 gap-4 py-2 w-full h-full">
    <div class="f-center h-full">
      <slot name="status">
        <p class="text-ellipsis whitespace-nowrap overflow-hidden">status</p>
      </slot>
    </div>
    <slot name="cta">
      <Button type="primary" block class="px-4 py-2 truncate">cta</Button>
    </slot>
  </div>
</div>
