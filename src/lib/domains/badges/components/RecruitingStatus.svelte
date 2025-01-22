<script lang="ts">
  import { getContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { RecruitmentStatus } from '$shared/types/BadgeRecruitment';
  import type { TBBadge } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  export let badge: TBBadge;

  const determineStatus = (badge: TBBadge) => {
    if (badge.frozen) {
      return RecruitmentStatus.LOCKED;
    }
    return RecruitmentStatus.ELIGIBLE;
  };

  const collectionDetailsRowClasses = classNames('f-row', 'justify-between', 'font-bold', 'w-full');

  $: status = badge && determineStatus(badge);

  const handleButtonClick = () => {
    recruit(badge);
  };

  const recruit: (badge: TBBadge) => void = getContext('recruit');
</script>

<!-- {JSON.stringify(badge)} -->

<div class={collectionDetailsRowClasses}>
  <span class="text-secondary-content">{$t('common.status')}</span>
  <span>{status}</span>
</div>
<ActionButton priority="primary" on:click={handleButtonClick} disabled={status === RecruitmentStatus.LOCKED}
  >Recruit</ActionButton>
