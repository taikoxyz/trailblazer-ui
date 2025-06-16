<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const imageClasses = classNames(
    'bg-[url(/banner/s5startbanner/sm.png)]',
    'md:bg-[url(/banner/s5startbanner/md.png)]',
    'lg:bg-[url(/banner/s5startbanner/lg.png)]',
    'xl:bg-[url(/banner/s5startbanner/xl.png)]',
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

<div class={imageClasses} />
