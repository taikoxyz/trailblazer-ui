<script lang="ts">
  import { Icon } from '$components/Icon';
  import Placeholder from '$images/placeholder.png';

  type ProfileCard = {
    avatar: string;
    name: string;
    address: string;
    ens?: string;
    points: number;
    rank: string;
    experience: number;
    nextLevelExperience: number;
    rankPercentile: string;
    position: string;
  };

  let profile: ProfileCard = {
    avatar: Placeholder,
    name: 'Jane',
    address: '0x1234...5678',
    ens: 'jane.eth',
    points: 10000,
    rank: 'Drummer Level 5',
    experience: 10000,
    nextLevelExperience: 12000,
    rankPercentile: '99',
    position: '1st',
  };
</script>

<div class="w-full flex bg-elevated-background p-5 gap-10 rounded-3xl min-w-[1130px]">
  <div class="flex flex-col gap-5">
    <div class="avatar">
      <div class="w-[364px] bg-orange-400 rounded-3xl">
        <img src={profile.avatar} alt="avatar" />
      </div>
    </div>
    <div class="bg-neutral rounded-full px-5 py-3">Multipliers</div>
  </div>
  <div class="flex flex-col w-full gap-5">
    <div class="flex w-full justify-between items-center gap-2">
      <div class="flex items-center gap-1">
        <Icon type="user-circle"></Icon>Welcome, <span class="body-bold">{profile.name}</span>
      </div>
      <div>{profile.address} / {profile.ens}</div>
    </div>
    <div class="flex items-center gap-2">
      <div class="title-screen-bold">{profile.points}</div>
      <div>points</div>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex justify-between">
        <div>{profile.rank}</div>
        <div>{profile.experience}/{profile.nextLevelExperience}</div>
      </div>
      <progress
        class="progress progress-secondary w-full h-9"
        value={profile.experience}
        max={profile.nextLevelExperience}>
      </progress>
      <div class="flex justify-between">
        <div>Top {profile.rankPercentile} %</div>
        <div>{profile.position}</div>
      </div>
    </div>
    <div class="flex gap-4">
      <button class="btn btn-primary min-w-[156px] body-bold"> Battle </button>
      <button class="btn btn-primary min-w-[156px] body-bold bg-transparent"> Explore </button>
    </div>
  </div>
</div>
