<script lang="ts">
  import { ProfileTabs } from '$components/Tabs';
  import type { TabContent } from '$components/Tabs/types';
  import { classNames } from '$libs/util/classNames';

  import Arena from './components/Arena.svelte';
  import ChampionRegistry from './components/ChampionRegistry.svelte';
  import GameBoard from './components/GameBoard/GameBoard.svelte';

  const wrapperClasses = classNames('relative', 'lg:w-full', 'px-5', 'mt-[18%]', 'lg:mt-0', 'space-y-[60px]');

  const tabs: TabContent[] = [
    {
      name: '[Champion Sign Up]',
      content: ChampionRegistry,
      checked: true,
    },
    {
      name: '[Live Arena View]',
      content: Arena,
    },
    {
      name: '[Finished Tournament View]',
      content: GameBoard,
    },
  ];
</script>

<div class={wrapperClasses}>
  <ProfileTabs noPadding {tabs} />
</div>
