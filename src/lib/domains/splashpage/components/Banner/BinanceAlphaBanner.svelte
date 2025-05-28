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

<a href="/bla" target="_blank" class={imageClasses} />
