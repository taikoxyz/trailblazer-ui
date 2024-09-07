<script lang="ts">
  import { zeroAddress } from 'viem';

  import { ActionButton } from '$components/Button';
  import { type FactionNames, FACTIONS } from '$configs/badges';
  import { getUserBadges } from '$libs/badges/badgesSubGraph';
  import { type IUserBadges } from '$libs/badges/badgesSubGraph';
  import { Movements } from '$libs/badges/const';
  import { getTokenId } from '$libs/badges/getTokenId';
  import { classNames } from '$libs/util/classNames';
  import { account } from '$stores/account';

  import Battler from './Battler.svelte';

  $: badgeNames = [] as FactionNames[];
  $: balances = {} as IUserBadges;
  $: tokenIds = {} as Record<FactionNames, number>;

  async function load() {
    if (!$account || !$account.address || badgeNames.length) return;
    balances = await getUserBadges($account.address);
    badgeNames = Object.keys(balances).filter((b) => balances[b as FactionNames]) as FactionNames[];

    for (const badge of badgeNames) {
      const badgeId = FACTIONS[badge];
      const tokenId = await getTokenId($account.address, badgeId);
      tokenIds[badge] = tokenId;
    }
  }

  $: $account, load();

  function getBadgePower(badgeName: FactionNames): number {
    const badgeId = FACTIONS[badgeName];
    return Math.floor((1 + badgeId) * 12.5);
  }

  function setActiveIdx(idx: number) {
    activeIdx = idx;
    window.location.hash = `champion-selector-${idx}`;
  }

  function decreaseActiveIdx() {
    if (activeIdx === 0) {
      setActiveIdx(badgeNames.length - 1);
    } else {
      setActiveIdx(activeIdx - 1);
    }
  }

  function increaseActiveIdx() {
    if (activeIdx === badgeNames.length - 1) {
      setActiveIdx(0);
    } else {
      setActiveIdx(activeIdx + 1);
    }
  }

  $: activeIdx = 0;

  const wrapperClasses = classNames(
    'flex',
    'flex-col',
    'w-full',
    'relative',
    'gap-[30px]',
    'py-[30px]',
    'justify-center',
    'items-center',
  );
  const selectorWrapperClasses = classNames('relative', 'pt-[100px]', 'w-[500px]', 'carousel');

  const rowClasses = classNames('flex', 'flex-row', 'w-full', 'justify-center', 'items-center', 'gap-[30px]');

  const labelClasses = classNames('badge', 'badge-lg', 'badge-outline', 'text-[16px]/[24px]');

  const statClasses = classNames(
    'text-[24px]/[32px]',
    'font-[700]',
    'text-white',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'gap-[10px]',
    'bg-base-200',
    'p-[20px]',
    'rounded-[10px]',
    'shadow-lg',
  );

  const valueClasses = classNames('flex', 'flex-col', 'justify-center', 'items-center');

  const registerButtonWrapperClasses = classNames(
    'px-[30px]',
    'w-full',
    'absolute',
    'h-[64px]',
    'w-[300px]',
    'lg:w-[500px]',
    'top-[50px]',
  );

  function getColor(): 'neutral' | 'pink' | 'purple' {
    return 'neutral';
  }
</script>

<div class={wrapperClasses}>
  <div class={selectorWrapperClasses}>
    {#each badgeNames as badge, i}
      {@const battler = {
        id: 'id',
        contract: zeroAddress,
        owner: zeroAddress,
        tokenId: tokenIds[badge],
        leagueId: 0,
        color: getColor(),
        power: getBadgePower(badge),
        badgeId: FACTIONS[badge],
        movement: Movements.Neutral,
        points: 0,
      }}
      <div id="champion-selector-{i}" class="carousel-item relative w-full">
        <Battler framed size="lg" {battler} />
      </div>
    {/each}
  </div>

  <div class={registerButtonWrapperClasses}>
    <ActionButton priority="primary">Register</ActionButton>
  </div>

  <div class="z-100 w-full px-[30px] absolute left-0 top-1/2 flex -translate-y-1/2 transform justify-between">
    <button on:click={decreaseActiveIdx} class="btn-lg btn btn-circle">❮</button>
    <button on:click={increaseActiveIdx} class="btn-lg btn btn-circle">❯</button>
  </div>

  <div class={rowClasses}>
    <div class={statClasses}>
      <div class={labelClasses}>Power</div>
      <div class={valueClasses}>
        {getBadgePower(badgeNames[activeIdx])}
      </div>
    </div>
    <div class={statClasses}>
      <div class={labelClasses}>Token ID</div>
      <div class={valueClasses}>
        {tokenIds[badgeNames[activeIdx]]}
      </div>
    </div>
    <div class={statClasses}>
      <div class={labelClasses}>Faction</div>
      <div class={valueClasses}>{badgeNames[activeIdx]}</div>
    </div>
    <div class={statClasses}>
      <div class={labelClasses}>Color</div>
      <div class={valueClasses}>Neutral</div>
    </div>
  </div>
</div>
