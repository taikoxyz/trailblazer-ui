<script lang="ts">
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import NewsEntry from './NewsEntry.svelte';

  type NewsCardContent = {
    title: string;
    subtitle: string;
    featured?: boolean;
    cta: {
      disabled?: boolean;
      href: string;
      external?: boolean;
    };
    imgSrc?: string;
  };

  const profilePath = (slug: string) => {
    return getConnectedAddress() ? `${getConnectedAddress() + slug}` : '';
  };

  const newsEntries: NewsCardContent[] = [
    {
      featured: true,
      title: 'Season 2 Claim',
      subtitle: 'Now live!',
      cta: {
        href: profilePath('#claim'),
      },
      imgSrc: '/news/flame.svg',
    },
    {
      title: 'Get your Badges',
      subtitle: 'Recruit your members to your cause',
      cta: {
        href: profilePath('#badge-recruitment'),
      },
    },

    {
      title: 'Liquidity Royale',
      subtitle: 'Supercharge your liquidity and get rewarded for it',
      cta: {
        href: '/journeys/liquidity',
      },
    },
  ];

  const cardClasses = classNames(
    'card',
    'rounded-[20px]',
    'border',
    'border-divider-border',
    'glassy-gradient-card',
    'dark-glass-background-gradient',
    'h-full',
    'max-h-[366px]',
    'h-[366px]',
    'p-[24px]',
    'gap-[16px]',
    $$props.class,
  );

  const titleClasses = classNames('font-bold', 'leading-normal');

  const activitiesWrapper = classNames('f-col', 'gap-[12px]', 'overflow-scroll', 'h-[290px]');
  const featuredActivityWrapper = classNames('f-col', 'mb-[24px]', 'mb-0');
</script>

<div class={cardClasses}>
  <div class={titleClasses}>Latest news</div>
  <div class={featuredActivityWrapper}>
    {#each newsEntries as entry}
      {#if entry.featured}
        <NewsEntry {entry} />
      {/if}
    {/each}
  </div>
  <div class={activitiesWrapper}>
    {#each newsEntries as entry}
      {#if !entry.featured}
        <NewsEntry {entry} />
      {/if}
    {/each}
  </div>
</div>
