<script lang="ts">
  import { Tooltip } from '$lib/shared/components/Tooltip';
  import { classNames } from '$lib/shared/utils/classNames';

  $: wrapperClasses = classNames(
    'flex flex-col items-center justify-start w-full lg:max-w-[309px] h-auto rounded-[30px] pt-[18px] pb-5 max-h-[290px]',
    $$props.class,
  );

  $: titleContainerClasses = classNames('flex gap-[5px] pb-3 px-3 items-center h-[65.5px]');

  $: dividerClasses = classNames('divider m-0');

  $: contentContainerClasses = classNames('flex items-center flex-col px-6 gap-4 py-2 w-full h-full');

  $: statusContainerClasses = classNames('f-center h-full w-full');
</script>

<div class={`${wrapperClasses}`}>
  <div class={`${titleContainerClasses}`}>
    <slot name="title">
      <div class="title-subsection-bold">title</div>
    </slot>
    <slot name="tooltip">
      <Tooltip position="bottom">tooltip</Tooltip>
    </slot>
  </div>
  <div class={`${dividerClasses}`}></div>
  <div class={`${contentContainerClasses}`}>
    <div class={`${statusContainerClasses}`}>
      <slot name="status">
        <p class="text-ellipsis whitespace-nowrap overflow-hidden">status</p>
      </slot>
    </div>
    <slot name="cta"></slot>
  </div>
</div>
