<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const imageClasses = classNames(
    'bg-[url(/banner/s4claimbanner/sm/s4claimbanner.png)]',
    'md:bg-[url(/banner/s4claimbanner/md/s4claimbanner.png)]',
    'lg:bg-[url(/banner/s4claimbanner/lg/s4claimbanner.png)]',
    'xl:bg-[url(/banner/s4claimbanner/xl/s4claimbanner.png)]',
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
