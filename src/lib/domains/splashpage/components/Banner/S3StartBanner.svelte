<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const imageClasses = classNames(
    'bg-[url(/banner/s3startbanner/sm/s3startbanner.png)]',
    'md:bg-[url(/banner/s3startbanner/md/s3startbanner.png)]',
    'lg:bg-[url(/banner/s3startbanner/lg/s3startbanner.png)]',
    'xl:bg-[url(/banner/s3startbanner/xl/s3startbanner.png)]',
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
