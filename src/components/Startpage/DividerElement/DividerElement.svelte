<script lang="ts">
  import { classNames } from '$libs/util/classNames';
</script>

<div
  class={classNames(
    'w-[100vw]',
    'relative',
    /*
'xl:top-[-200px]', 'lg:top-[-250px]', 'top-[-300px]'
*/
  )}>
  <div
    style="background-image:url('/pink-divider.svg');"
    class={classNames(
      'overflow-hidden',
      // 'absolute',
      'h-[500px]',
      'bg-cover',
      'bg-center',
      'z-0',
      'flex',
      'justify-center',
      'items-center',
      'left-0',
      'w-full',
    )}>
  </div>
</div>
