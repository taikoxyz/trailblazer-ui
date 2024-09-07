<script lang="ts">
  import { type Address, isAddressEqual } from 'viem';

  import { Icon } from '$components/Icon';
  import type { IBadgeChampionsParticipant } from '$libs/badge-champions/types';
  import { classNames } from '$libs/util/classNames';
  import { shortenAddress } from '$libs/util/shortenAddress';

  import Battler from '../Battler.svelte';

  export let participant: IBadgeChampionsParticipant;
  export let position: number;
  export let playerAddress = null as null | Address;

  let { id, points } = participant;

  let [owner] = id.split(':');

  const fillClass =
    position === 1 ? 'fill-[#EBB222]' : position === 2 ? 'fill-[#91969F]' : position === 3 ? 'fill-[#775602]' : '';

  const positionClasses = classNames(
    'flex',
    'w-full',
    'justify-center',
    'items-center',
    'gap-[10px]',
    'text-[24px]/[36px]',
  );

  const rowContentClasses = classNames('flex', 'w-full', 'justify-center', 'items-center');

  $: pointsClasses = classNames(rowContentClasses, 'text-[24px]/[36px]');

  $: trClasses = classNames(
    isAddressEqual(participant.id.split(':')[0] as Address, playerAddress as Address) ? '!bg-primary' : null,
  );
</script>

<tr class={trClasses}>
  <td>
    <div class={positionClasses}>
      {#if position <= 3}
        <Icon type="trophy" size={24} {fillClass} />
      {/if}
      {position}
    </div>
  </td>
  <td>
    <div class={rowContentClasses}>
      <Battler battler={participant} />
    </div>
  </td>
  <td>
    <div class={rowContentClasses}>
      {shortenAddress(owner, 8, 4)}
    </div></td>

  <td>
    <div class={pointsClasses}>
      {points}
    </div></td>
</tr>
