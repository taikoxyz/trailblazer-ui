<script lang="ts">
  import { Tooltip } from '$components/Tooltip';
  import { classNames } from '$libs/util/classNames';

  $: classes = classNames(
    'flex flex-col items-center justify-start w-full lg:max-w-[312px] h-auto rounded-[30px] pt-[18px] pb-5',
    $$props.class,
  );
</script>

<div class={`${classes}`}>
  <div class="flex w-full pb-3 px-3 items-center">
    <slot name="title">
      <div class="title-subsection-bold">title</div>
    </slot>
    <slot name="tooltip">
      <Tooltip position="bottom">tooltip</Tooltip>
    </slot>
  </div>
  <div class="divider m-0"></div>
  <div class="flex items-center flex-col px-6 gap-4 py-2 w-full h-full">
    <div class="f-center h-full w-full">
      <slot name="status">
        <p class="text-ellipsis whitespace-nowrap overflow-hidden">status</p>
      </slot>
    </div>
    <slot name="cta"></slot>
  </div>
</div>
