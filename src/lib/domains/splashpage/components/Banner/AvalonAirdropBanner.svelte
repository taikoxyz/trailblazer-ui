<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const imageClasses = classNames(
    'bg-[url(/banner/avalon/sm/avalon_airdrop.svg)]',
    'md:bg-[url(/banner/avalon/md/avalon_airdrop.svg)]',
    'lg:bg-[url(/banner/avalon/lg/avalon_airdrop.svg)]',
    'xl:bg-[url(/banner/avalon/xl/avalon_airdrop.svg)]',
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
