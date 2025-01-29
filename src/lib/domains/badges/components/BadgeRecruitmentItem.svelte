<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { t } from 'svelte-i18n';
  import { zeroAddress } from 'viem';

  import nftService from '$lib/domains/nfts/services/NFTServiceInstance';
  import { badgeStore } from '$lib/domains/nfts/stores/nft.store';
  import { FactionBadgeItem } from '$lib/domains/profile/components/ProfileNFTs';
  import type { FactionBadgeButton } from '$lib/domains/profile/types/FactionBadgeButton';
  import { Movements } from '$lib/domains/profile/types/types';
  import type { TBBadge } from '$shared/types/NFT';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';
  import { getLogger } from '$shared/utils/logger';
  import { RecruitmentStatus, type ActiveRecruitment } from '$shared/types/BadgeRecruitment';

  const log = getLogger('BadgeRecruitmentItem');

  export let badge: TBBadge;
  export let blurred: boolean = false;
  export let recruitment: ActiveRecruitment | null = null;

  const getButton = () => {
    const recruitmentStatus = recruitment?.status;
    if (!recruitmentStatus) {
      return buttons.StartRecruitment;
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
      handler: handleClaim,
    },
    StartRecruitment: {
      type: 'primary',
      label: $t('badge_recruitment.buttons.start_recruitment'),
      handler: handleStartRecruitment,
    },
  } as Record<string, FactionBadgeButton>;

  const dispatch = createEventDispatcher();

  const handleStartRecruitment = () => {
    log('Start recruitment');
  };

  const handleClaim = () => {
    log('Claim recruitment');
  };

  const handleBadgeClick = (event: { detail: { badge: TBBadge; badgeId: number } }) => {
    log('Badge clicked', badge);
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
</script>

<div class="f-col w-full">
  <FactionBadgeItem {blurred} hideBubbles token={badge} on:badgeClick={handleBadgeClick} button={getButton()} />
</div>
