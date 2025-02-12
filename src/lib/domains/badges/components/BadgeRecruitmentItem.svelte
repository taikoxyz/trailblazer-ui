<script lang="ts">
  import { createEventDispatcher, getContext } from 'svelte';
  import { t } from 'svelte-i18n';
  import { zeroAddress } from 'viem';

  import nftService from '$lib/domains/nfts/services/NFTServiceInstance';
  import { badgeStore } from '$lib/domains/nfts/stores/nft.store';
  import { FactionBadgeItem } from '$lib/domains/profile/components/ProfileNFTs';
  import type { FactionBadgeButton } from '$lib/domains/profile/types/FactionBadgeButton';
  import { Movements } from '$lib/domains/profile/types/types';
  import { type ActiveRecruitment, RecruitmentStatus } from '$shared/types/BadgeRecruitment';
  import type { TBBadge } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';
  import { getLogger } from '$shared/utils/logger';

  const log = getLogger('BadgeRecruitmentItem');

  export let badge: TBBadge;
  export let blurred: boolean = false;
  export let recruitment: ActiveRecruitment | null = null;
  export let hasHover: boolean = false;

  const hoverBorder = classNames(
    'border',
    'border-transparent',
    'border-[3px]',
    'hover:bg-pink-200',
    'hover:border-pink-200',
    'hover:shadow-[0_0_30px_0px_rgba(255,111,200,1)]',
  );

  const getButton = () => {
    const recruitmentStatus = recruitment?.status;
    if (!recruitmentStatus) {
      return buttons.StartRecruitment;
    }
    if (recruitmentStatus === RecruitmentStatus.UNFINISHED) {
      return buttons.Reset;
    }
    if (recruitmentStatus === RecruitmentStatus.NOT_STARTED) {
      return buttons.StartRecruitment;
    }
    if (recruitmentStatus === RecruitmentStatus.CAN_CLAIM) {
      return buttons.Claim;
    }
    return buttons.NotEligible;
  };

  $: buttons = {
    NotEligible: {
      disabled: true,
      type: 'primary',
      label: $t('badge_recruitment.buttons.not_eligible'),
    },
    Claim: {
      type: 'primary',
      label: $t('badge_recruitment.buttons.end_recruitment'),
    },
    StartRecruitment: {
      type: 'primary',
      label: $t('badge_recruitment.buttons.start_recruitment'),
    },
    Reset: {
      type: 'primary',
      label: $t('badge_recruitment.buttons.reset'),
    },
  } as Record<string, FactionBadgeButton>;

  const dispatch = createEventDispatcher();

  const handleBadgeClick = (event: { detail: { badge: TBBadge; badgeId: number } }) => {
    log('Badge clicked', badge);
    if (recruitment?.status === RecruitmentStatus.UNFINISHED) {
      reset(recruitment);
      return;
    }
    openRecruitment(event);
  };

  const openRecruitment = async (event: { detail: { badge: TBBadge; badgeId: number } }) => {
    const { badge: recruitBadge } = event.detail;
    log('Open recruitment', recruitBadge);

    const address = getConnectedAddress();
    if (!address || address === zeroAddress) {
      return;
    }

    let badges;
    if ($badgeStore?.[0]) {
      log('Using badge store');
      badges = $badgeStore;
    } else {
      badges = await nftService.fetchBadgesForUser(address);
      log('Fetched badges from service', badges);
    }

    // Flatten all `Movements.Devs` badges but only the one matching the badge faction
    const devBadges = Object.values(badges[Movements.Devs]).flatMap((factionBadges) => factionBadges.allBadges || []);

    const filtered = devBadges.filter((badge) => badge.faction === recruitBadge.faction);

    const badgesWithImage = await Promise.all(
      filtered.map(async (badge) => {
        const metadata = await nftService.getNFTMetadata(badge);
        if (metadata) {
          if ('badgeId' in badge) {
            const path = await nftService.getStataticPath(badge);
            badge.metadata = {
              ...badge.metadata,
              image: `${path}.png`,
              'video/mp4': `${path}.mp4`,
            };
          }
          badge = { ...badge };
        } else {
          badge = badge;
        }
        return badge;
      }),
    );

    log('Badges with image', badgesWithImage);

    log('Filtered badges', filtered);

    dispatch('open', { badges: filtered });
  };

  $: isHovered = false;

  const handleMouseEnter = () => {
    isHovered = true;
  };

  const handleMouseLeave = () => {
    isHovered = false;
  };

  const reset: (recruitment: ActiveRecruitment) => void = getContext('badgeRecruitReset');
</script>

{#if hasHover}
  <div
    role="button"
    tabindex="0"
    class="f-col w-full relative"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}>
    <FactionBadgeItem
      recruitingView
      {isHovered}
      {blurred}
      class={hoverBorder}
      token={badge}
      on:badgeClick={handleBadgeClick}
      button={getButton()} />
  </div>
{:else}
  <FactionBadgeItem recruitingView {blurred} token={badge} on:badgeClick={handleBadgeClick} button={getButton()} />
{/if}
