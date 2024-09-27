<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  import { Icon, type IconType } from '.';
  export let type: IconType = 'double-coin';
  const classes = classNames(
    'f-center',
    'min-w-[24px]',
    'min-h-[24px]',
    'bg-primary-brand',
    'rounded-full',
    $$props.class,
  );
</script>

<div class={classes}>
  <Icon {type} vWidth={16} vHeight={16} class="size-[16px]" fillClass="fill-primary-content" />
</div>
