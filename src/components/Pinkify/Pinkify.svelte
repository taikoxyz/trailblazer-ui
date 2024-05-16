<script lang="ts">
  import Icon from '$components/Icon/Icon.svelte';
  import { TwitterLogin } from '$components/Twitter';
  import { getSession, supabaseClient } from '$libs/supabase';
  import { parseTwitterAvatarId } from '$libs/util/parseTwitterAvatarId';
  import { twitterAvatarUrl, twitterId } from '$stores/supabase';

  enum Step {
    CONNECT,
    PINKIFY,
    REGISTER,
  }

  async function signInWithTwitter() {
    // Handle sign in with oauth and redirect to the current page
    const currentPage = window.location.origin + window.location.pathname;
    console.log('🚀 | signInWithTwitter | currentPage:', currentPage);

    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'twitter',
      options: { redirectTo: currentPage },
    });
  }

  let step: Step;
  step = Step.CONNECT;
</script>

<div class="f-center flex-col w-full gap-[80px] xl:gap-[120px] container">
  <!-- Section Header -->
  <div class="f-center w-full flex-col xl:flex-row xl:justify-between gap-[40px]">
    <!-- Title text: Taiko Factions -->
    <div class="font-clash-grotesk text-base-content tracking-[-1.5px] text-[75px]/[70px] text-center xl:text-left">
      Start your<br /><span class="text-secondary-brand">journey</span>
    </div>
    <!-- Sub text: In the vibrant world of Neo Nakuz, a groundbreaking cast of characters is emerging, centered around the electrifying ecosystem of Taiko Radio and its dynamic cast of characters: ravers, drummers, masters and more. -->
    <div class="title-body-regular text-secondary-content text-center xl:self-end max-w-[365px] xl:text-left">
      Begin your journey through a city where ancient rhythms meet the future of Ethereum. Let’s make history together.
      Start by pinkifying your profile to show your allegiance!
    </div>
  </div>

  <!-- Pinkify Interface -->
  <div class="flex rounded-[30px] w-full bg-elevated-background px-[55px] py-[74px]">
    <div class="f-center flex-col w-full">
      <!-- Step 1 -->
      <div class="flex w-full justify-between">
        <div class="f-center gap-4 max-w-[400px]">
          <div class="bg-neutral-background f-center rounded-full min-w-12 min-h-12">1</div>
          <div class="flex flex-col">
            <div class="font-clash-grotesk text-[22px]">Connect to X</div>
            <div>Activity from this linked X account will be associated with your wallet in the next step.</div>
          </div>
        </div>

        {#if !$twitterId}
          <button on:click={signInWithTwitter} class=" self-center btn btn-primary w-[230px]">Log in</button>
        {:else}
          <div class="f-center bg-neutral-background rounded-full p-2 h-fit gap-2">
            <div class="f-center gap-2 px-[15px] py-[6px] bg-tertiary-content rounded-full">
              <Icon size={20} type="twitter" />
              <div>twitterUsername</div>
            </div>
            <Icon size={36} type="check-circle" fillClass="fill-[#47E0A0]" />
          </div>
        {/if}
      </div>
      <div class="divider divider-neutral"></div>
      <!-- Step 2 -->

      <div class="flex w-full justify-between">
        <div class="f-center gap-4 max-w-[400px]">
          <div class="bg-neutral-background f-center rounded-full min-w-12 min-h-12">1</div>
          <div class="flex flex-col">
            <div class="font-clash-grotesk text-[22px]">Pinkify & Share</div>
            <div>Pinkify your profile picture by generating a Taiko pink design and share it on X.</div>
          </div>
        </div>
        <div class="self-center btn btn-primary w-[230px]">Generate & share</div>
      </div>
      <div class="divider divider-neutral"></div>
      <!-- Step 3 -->

      <div class="flex w-full justify-between">
        <div class="f-center max-w-[400px] gap-4">
          <div class="bg-neutral-background f-center rounded-full min-w-12 min-h-12">1</div>
          <div class="flex flex-col max-w-[400px]">
            <div class="font-clash-grotesk text-[22px]">Register your wallet</div>
            <div>Lastly, register your wallet address to unlock the gates of Neo Nakuza.</div>
          </div>
        </div>
        <div class="self-center btn btn-primary w-[230px]">Sign</div>
      </div>
    </div>

    <div class="flex flex-col pl-[90px]">
      <div class="avatar w-[355px]">
        {#if step == Step.REGISTER}
          <img
            class="w-[355px] rounded-full"
            src="/api/generate/{parseTwitterAvatarId($twitterAvatarUrl)}"
            alt="avatar" />
        {:else}
          <div class="flex gap-4">
            <img class="size-64" src={$twitterAvatarUrl} alt="unpinkified" />]
          </div>
        {/if}

        <img
          class="w-[355px] rounded-full"
          src="/api/generate/{parseTwitterAvatarId($twitterAvatarUrl)}"
          alt="avatar" />
      </div>
    </div>
  </div>
</div>

<div class="w-full">
  <div class="avatar"></div>
  <!-- Twitter -->
  {#if !$twitterId}
    <TwitterLogin />
    <button on:click={getSession}>asd</button>
  {:else}
    <div class="flex gap-4">
      <img class="size-64" src={$twitterAvatarUrl} alt="unpinkified" />]
    </div>
  {/if}
</div>
