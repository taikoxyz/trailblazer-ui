<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  $: classes = classNames(
    'flex flex-col items-center justify-start w-full xl:max-w-[312px] h-auto rounded-[30px]',
    'min-h-[290px]',
    $$props.class,
  );
</script>

<div class={`${classes}`}>
  <div class="flex w-full px-3 items-center">
    <slot name="title" />
    <slot name="tooltip" />
  </div>
  <div class="divider m-0"></div>
  <div class="flex items-center flex-col px-6 gap-4 py-2 w-full h-full">
    <div class="f-center h-full w-full">
      <slot name="status" />
    </div>
    <slot class="self-end" name="cta" />
  </div>
</div>
