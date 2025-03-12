<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const imageClasses = classNames(
    'bg-[url(/banner/s4startbanner/sm/s4startbanner.png)]',
    'md:bg-[url(/banner/s4startbanner/md/s4startbanner.png)]',
    'lg:bg-[url(/banner/s4startbanner/lg/s4startbanner.png)]',
    'xl:bg-[url(/banner/s4startbanner/xl/s4startbanner.png)]',
    'w-full',
    'h-[732px]',
    'md:h-[427px]',
    'lg:h-[300px]',
    'xl:h-[250px]',
    'bg-contain',
    'bg-no-repeat',
    'bg-center',
  );
</script>

<div class={imageClasses} />
