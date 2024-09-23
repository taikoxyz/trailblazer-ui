<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  export let size: 'sm' | 'md' | 'lg' = 'md';
  const classes = classNames(
    size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : null,
    size === 'lg' ? 'w-12 h-12' : null,
    'loading loading-spinner',
    $$props.class,
  );
</script>

<span class={classes} />
