<script lang="ts">
  import { t } from 'svelte-i18n';

  import SearchIcon from '$components/Icon/SearchIcon.svelte';
  import InputBox from '$components/InputBox/InputBox.svelte';
  import { leaderboardConfig } from '$config';
  import { type DappLeaderboardItem, Leaderboard, type PaginationInfo } from '$libs/leaderboard';
  import { debounce } from '$libs/util/debounce';
  import { getLogger } from '$libs/util/logger';
  import { currentDappLeaderboard } from '$stores/leaderboard';

  import DappsHeader from './Header/DappsHeader.svelte';
  import LastUpdated from './LastUpdated.svelte';
  import AbstractLeaderboard from './Template/AbstractLeaderboard.template.svelte';
  import PointScore from './Template/PointScore.template.svelte';

  const log = getLogger('DappsLeaderboard');

  let headers = ['No.', 'Dapp', '', 'Volume'];

  export let loading = false;
  export let pageInfo: PaginationInfo<DappLeaderboardItem>;

  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || leaderboardConfig.pageSize;
  $: lastUpdated = new Date($currentDappLeaderboard.lastUpdated * 1000);

  let value = '';

  function handlePageChange(page: number) {
    log('handlePageChange', page);
    loadLeaderboardData(page, value);
  }

  async function loadLeaderboardData(page: number, name = '') {
    loading = true;
    // Fetch the leaderboard data for the given page
    const args: PaginationInfo<DappLeaderboardItem> = {
      page,
      size: pageSize,
      name,
    };
    const pageInfo = await Leaderboard.getDappLeaderboard(args);
    totalItems = pageInfo.total || $currentDappLeaderboard.items.length;
    loading = false;
  }

  async function validateInput(name: string) {
    await loadLeaderboardData(pageInfo.page, name);
  }

  const debouncedValidateInput = debounce(validateInput, 300);

  const handleInputChange = (value: string) => {
    debouncedValidateInput(value);
  };
</script>

<AbstractLeaderboard
  {headers}
  data={$currentDappLeaderboard.items}
  showTrophy={true}
  isLoading={loading}
  {handlePageChange}
  {totalItems}
  headerComponent={DappsHeader}
  scoreComponent={PointScore}>
  <div class="f-col lg:f-row lg:f-between-center items-center content-center mb-[30px] space-y-[30px] lg:space-y-0">
    <div class="relative f-items-center w-1/2">
      <InputBox
        placeholder={'search for dapps...'}
        bind:value
        on:input={() => handleInputChange(value)}
        class="min-h-[64px] pl-[15px] w-full border-0 h-full z-20 uppercase rounded-full" />
      <div class="max-button absolute right-6 text-tertiary-content z-20">
        <SearchIcon />
      </div>
    </div>
    <div class="text-md font-body-regular">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <div class="text-secondary-content mb-2">{@html $t('leaderboard.whitelist.cta')}</div>
      {#if lastUpdated}
        <LastUpdated class="w-fit" {lastUpdated} />
      {/if}
    </div>
  </div>
</AbstractLeaderboard>
