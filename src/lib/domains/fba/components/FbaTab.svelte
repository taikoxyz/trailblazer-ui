<script lang="ts">
  import { onMount } from 'svelte';

  import { userProfile } from '$lib/domains/profile/stores';
  import type { NFT } from '$shared/types/NFT';

  import FactionBattleArenaService from '../services/FactionBattleArena.service';
  import type { LeagueParticipant } from '../types';
  import FbaBadge from './FbaBadge.svelte';
  import FbaTableView from './FbaTableView.svelte';

  const service = new FactionBattleArenaService();

  $: nfts = $userProfile.nfts || ([] as NFT[]);

  $: currentLeagueId = -1;

  onMount(async () => {
    if (!nfts || !nfts.length) return;
    currentLeagueId = await service.getCurrentLeagueId();
    await service.getLeagueParticipants(currentLeagueId);
    await service.getMockLeague(nfts[0]);
  });

  $: badgeSeason = 0;
  $: badgeId = 0;
  $: tokenId = 0;

  function handleRegisterParticipant() {
    service.registerParticipant(badgeSeason, badgeId, tokenId);
  }

  function preloadParticipant(nft: NFT) {
    badgeSeason = nft.metadata.season as number;
    badgeId = nft.metadata.badgeId as number;
    tokenId = nft.tokenId as number;
    selectedBadge = nft;
  }

  $: leagueResult = [] as LeagueParticipant[];
  async function handleMockLeague() {
    if (!selectedBadge) return;
    leagueResult = await service.getMockLeague(selectedBadge);
  }

  $: selectedBadge = null as null | NFT;
</script>

<div class="">
  <div class="grid grid-cols-2 gap-4">
    <h1 class="col-span-2">FBA #{currentLeagueId}</h1>
    <div class="grid grid-cols-3 gap-2">
      <h2 class="col-span-3 text-center">Your Badges</h2>
      {#each nfts as badge}
        <button
          class={selectedBadge && selectedBadge.tokenId === badge.tokenId ? 'border border-primary' : null}
          on:click={() => preloadParticipant(badge)}>
          <FbaBadge token={badge} /></button>
      {/each}
    </div>

    <div class="flex flex-col gap-2">
      <h2>Register Participant</h2>
      <p>Registers the connected account as a participant</p>
      <input
        disabled
        bind:value={badgeSeason}
        class="w-full py-2 rounded-full text-center"
        placeholder="badge season" />
      <input disabled bind:value={badgeId} class="w-full py-2 rounded-full text-center" placeholder="badge id" />
      <input disabled bind:value={tokenId} class="w-full py-2 rounded-full text-center" placeholder="token id" />
      <button disabled on:click={handleRegisterParticipant} class="btn btn-primary btn-sm">Register</button>

      <button disabled={!selectedBadge} on:click={handleMockLeague} class="btn btn-primary btn-sm">Mock League</button>
    </div>
    <!--
    <div class="flex flex-col gap-2">
      <h2>Execute league and start next</h2>
      <button
      on:click={() => {
        const seed = Date.now()
        service._executeLeagueAndStartNext(seed)
      }}
      class="btn btn-primary btn-sm">Execute & Start</button>
    </div>-->
  </div>

  <h1 class="col-span-2">FBA League View</h1>
  <FbaTableView />

  <div class="col-span-2">
    <table class="table">
      <thead>
        <tr>
          <th>Badge</th>
          <th>Points</th>
        </tr></thead>
      <tbody>
        {#each leagueResult as participant}
          <tr class={participant.tokenId < 1000 ? 'bg-primary' : null}>
            <td><img alt="Token" class="w-[64px]" src={participant.tokenUri} /></td>
            <td>{participant.points}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
