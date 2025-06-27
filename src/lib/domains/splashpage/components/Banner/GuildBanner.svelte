<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const imageClasses = classNames(
    'bg-[url(/banner/guild/sm.png)]',
    'md:bg-[url(/banner/guild/md.png)]',
    'lg:bg-[url(/banner/guild/lg.png)]',
    'xl:bg-[url(/banner/guild/xl.png)]',
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

<a href="https://guild.xyz/taiko" target="_blank" class={imageClasses}>&nbsp;</a>
