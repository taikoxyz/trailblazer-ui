<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const imageClasses = classNames(
    'bg-[url(/banner/binance-alpha/sm.png)]',
    'md:bg-[url(/banner/binance-alpha/md.png)]',
    'lg:bg-[url(/banner/binance-alpha/lg.png)]',
    'xl:bg-[url(/banner/binance-alpha/xl.png)]',
    'w-full',
    'h-[732px]',
    'md:h-[427px]',
    'lg:h-[300px]',
    'xl:h-[250px]',
    'bg-contain',
    'bg-no-repeat',
    'bg-center',
    'cursor-pointer',
  );
</script>

<!-- svelte-ignore a11y-missing-content -->
<a
  href="https://www.binance.com/en/support/announcement/detail/3d90cc107e3f486d91981a3c8cbc5d76"
  target="_blank"
  class={imageClasses}></a>
