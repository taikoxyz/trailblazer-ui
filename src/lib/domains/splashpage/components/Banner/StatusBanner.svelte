<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const imageClasses = classNames(
    'bg-[url(/banner/statusbanner/sm.png)]',
    'md:bg-[url(/banner/statusbanner/md.png)]',
    'lg:bg-[url(/banner/statusbanner/lg.png)]',
    'xl:bg-[url(/banner/statusbanner/xl.png)]',
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
