<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const imageClasses = classNames(
    'bg-[url(/banner/s3claimbanner/sm/s3claimbanner.png)]',
    'md:bg-[url(/banner/s3claimbanner/md/s3claimbanner.png)]',
    'lg:bg-[url(/banner/s3claimbanner/lg/s3claimbanner.png)]',
    'xl:bg-[url(/banner/s3claimbanner/xl/s3claimbanner.png)]',
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
