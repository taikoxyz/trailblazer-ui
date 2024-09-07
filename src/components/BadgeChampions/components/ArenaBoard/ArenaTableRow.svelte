<script lang="ts">
  import { type Address, isAddressEqual } from 'viem';

  import { FactionBadgeItem } from '$components/Profile/UserNFTs';
  import { FactionNames, FACTIONS } from '$configs/badges';
  import type { IBadgeChampionsMatch } from '$libs/badge-champions/types';
  import { Movements } from '$libs/badges/const';
  import { classNames } from '$libs/util/classNames';

  export let match: IBadgeChampionsMatch;
  export let position: number;
  export let playerAddress = null as null | Address;

  let { participants } = match;

  const positionClasses = classNames(
    'flex',
    'w-full',
    'justify-center',
    'items-center',
    'gap-[10px]',
    'text-[24px]/[36px]',
  );

  const statWrapperClasses = classNames('h-[100%]', 'gap-[5px]', 'px-[20px]', 'flex', 'w-[100px]', 'flex-col');

  const statRowClasses = classNames(
    'w-full',
    'h-full',
    'justify-center',
    'items-center',
    'text-[18px]/[18px]',
    'lg:text-[24px]/[24px]',
    'font-clash-grotesk',
    'font-[700]',
    'gap-[3px]',
    'flex',
    'flex-col',
    'border-[#444A55]',
    'border-b',
    'last:border-0',
  );

  const rowContentClasses = classNames('flex', 'w-full', 'justify-center', 'items-center', 'h-[200px]', 'lg:h-[300px]');

  $: trClasses = classNames(
    'center',
    isAddressEqual(participants[0].owner as Address, playerAddress as Address) ||
      isAddressEqual(participants[1].owner as Address, playerAddress as Address)
      ? '!bg-primary'
      : null,
  );
  const colorsToMovements: Record<string, Movements> = {
    neutral: Movements.Neutral,
    pink: Movements.Based,
    purple: Movements.Boosted,
  };

  $: factionNames = [
    FACTIONS[participants[0].battler.badgeId],
    FACTIONS[participants[1].battler.badgeId],
  ] as FactionNames[];

  const badgeWrapperClasses = classNames('h-full', 'aspect-square');
</script>

<tr class={trClasses}>
  <td>
    <div class={rowContentClasses}>
      <div class={statWrapperClasses}>
        <div class={statRowClasses}>
          <div>⚡</div>
          <div>{participants[0].energy}</div>
        </div>
        <div class={statRowClasses}>
          <div>🥊</div>
          <div>{participants[0].power}</div>
        </div>
        <div class={statRowClasses}>
          <div>⚔️</div>
          <div>{participants[0].totalPower}</div>
        </div>
        <div class={statRowClasses}>
          <div>
            {#if participants[0].isWinner}
              ⬆️
            {:else}
              🟰{/if}
          </div>
          <div>
            {participants[0].points}
          </div>
        </div>
      </div>
      <div class={badgeWrapperClasses}>
        <FactionBadgeItem
          disabled={!participants[0].isWinner}
          showWeek={false}
          name={factionNames[0]}
          movement={colorsToMovements[participants[0].battler.color]} />
      </div>
    </div>
  </td>
  <td>
    <div class={positionClasses}>
      {position}
    </div>
  </td>
  <td>
    <div class={rowContentClasses}>
      <div class={badgeWrapperClasses}>
        <FactionBadgeItem
          disabled={!participants[1].isWinner}
          showWeek={false}
          name={factionNames[1]}
          movement={colorsToMovements[participants[1].battler.color]} />
      </div>
      <div class={statWrapperClasses}>
        <div class={statRowClasses}>
          <div>⚡</div>
          <div>{participants[1].energy}</div>
        </div>
        <div class={statRowClasses}>
          <div>🥊</div>
          <div>{participants[1].power}</div>
        </div>
        <div class={statRowClasses}>
          <div>⚔️</div>
          <div>{participants[1].totalPower}</div>
        </div>
        <div class={statRowClasses}>
          <div>
            {#if participants[1].isWinner}
              ⬆️
            {:else}
              🟰{/if}
          </div>
          <div>
            {participants[1].points}
          </div>
        </div>
      </div>
    </div>
  </td>
</tr>
