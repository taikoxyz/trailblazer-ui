<script lang="ts">
  import Icon from '$components/Icon/Icon.svelte';
  import { DiscordLink, TwitterLink } from '$components/Links';
  import PrePinkify from '$images/pre-pinkify.svg';
  import { getSession, supabaseClient } from '$libs/supabase';
  import { parseTwitterAvatarId } from '$libs/util/parseTwitterAvatarId';
  import { twitterAvatarUrl, twitterId, twitterUsername } from '$stores/supabase';
  import PinkifyModal from './PinkifyModal.svelte';
  import { signMessage } from '@wagmi/core';
  import { config } from '$libs/wagmi';
  import { onMount } from 'svelte';
  import { generateTwitterCardSVG } from '$libs/pinkify/generateTwitterCard';

  enum Step {
    CONNECT,
    PINKIFY,
    REGISTER,
    COMPLETED,
  }

  async function signInWithTwitter() {
    // Handle sign in with oauth and redirect to the current page
    const currentPage = window.location.origin + window.location.pathname;
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'twitter',
      options: { redirectTo: currentPage },
    });
  }

  async function logout() {
    // Handle sign in with oauth and redirect to the current page
    const { error } = await supabaseClient.auth.signOut();
    step = Step.CONNECT;
  }

  async function handleSign() {
    signing = true;
    try {
      await signMessage(config, { message: 'Answer the call' });
      step = Step.COMPLETED;
      signed = true;
    } catch (e) {
      console.error(e);
    }
    signing = false;
  }

  function handleGenerate() {
    // Handle pinkify logic
    step = Step.REGISTER;
    generating = true;

    setTimeout(() => {
      modalOpen = true;
      generating = false;
      generated = true;
    }, 2000);
  }

  const handleDialogSelection = () => {
    modalOpen = false;
  };

  $: if ($twitterId) {
    step = Step.PINKIFY;

    generateTwitterCardSVG().then((res) => {
      svg = res;
      console.log('🚀 | generateTwitterCardSVG | svg:', svg);
    });
  }

  let step: Step;
  step = Step.CONNECT;

  let base64data: string;

  let modalOpen = false;
  let generating = false;
  let generated = false;
  let signing = false;
  let signed = false;

  let svg: string;
</script>

{@html svg}

<PinkifyModal bind:modalOpen on:selected={() => handleDialogSelection()} />
<img src={base64data} />

<div class="f-center flex-col w-full gap-[80px] xl:gap-[20px] container">
  <!-- Section Header -->
  <div class="f-center w-full flex-col xl:flex-row xl:justify-between gap-[40px] pb-[60px]">
    <!-- Title text: Taiko Factions -->
    <div class="font-clash-grotesk text-base-content tracking-[-1.5px] text-[75px]/[70px] text-center xl:text-left">
      Start your<br /><span class="text-secondary-brand">journey</span>
    </div>
    <!-- Sub text: In the vibrant world of Neo Nakuz, a groundbreaking cast of characters is emerging, centered around the electrifying ecosystem of Taiko Radio and its dynamic cast of characters: ravers, drummers, masters and more. -->
    <div class="title-body-regular text-secondary-content text-center xl:self-end max-w-[432px] xl:text-left">
      Begin your journey through a city where ancient rhythms meet the future of Ethereum. Let’s make history together.
      Start by pinkifying your profile to show your allegiance!
    </div>
  </div>

  <!-- Pinkify Interface -->
  <div class="flex rounded-[30px] w-full bg-elevated-background px-[55px] py-[74px]">
    <div class="f-center flex-col w-full">
      <!-- Step 1 -->
      <div class="flex items-center w-full justify-between">
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
            <button
              on:click={logout}
              class="f-center gap-2 min-w-[170px] px-[15px] py-[6px] bg-tertiary-content rounded-full">
              <Icon size={20} type="twitter" />
              <div>{$twitterUsername}</div>
            </button>
            <Icon size={36} type="check-circle" fillClass="fill-[#47E0A0]" />
          </div>
        {/if}
      </div>
      <div class="divider divider-neutral"></div>
      <!-- Step 2 -->

      <div class="flex items-center w-full justify-between">
        <div class="f-center gap-4 max-w-[400px]">
          <div class="bg-neutral-background f-center rounded-full min-w-12 min-h-12">2</div>
          <div class="flex flex-col">
            <div class="font-clash-grotesk text-[22px]">Pinkify & Share</div>
            <div>Pinkify your profile picture by generating a Taiko pink design and share it on X.</div>
          </div>
        </div>

        {#if generating}
          <button class="self-center btn btn-disabled w-[230px] body-bold">Generating...</button>
        {:else if generated}
          <div class="f-center bg-neutral-background rounded-full p-2 h-fit gap-2">
            <button
              on:click={logout}
              class="f-center gap-2 min-w-[170px] px-[15px] py-[6px] bg-tertiary-content rounded-full">
              <div>Completed</div>
            </button>
            <Icon size={36} type="check-circle" fillClass="fill-[#47E0A0]" />
          </div>
        {:else}
          <button on:click={handleGenerate} class="self-center btn btn-primary w-[230px] body-bold">Generate</button>
        {/if}
      </div>
      <div class="divider divider-neutral"></div>
      <!-- Step 3 -->

      <div class="flex items-center w-full justify-between">
        <div class="f-center max-w-[400px] gap-4">
          <div class="bg-neutral-background f-center rounded-full min-w-12 min-h-12">3</div>
          <div class="flex flex-col max-w-[400px]">
            <div class="font-clash-grotesk text-[22px]">Register your wallet</div>
            <div>Lastly, register your wallet address to unlock the gates of Neo Nakuza.</div>
          </div>
        </div>
        {#if signing}
          <button class="self-center btn btn-disabled w-[230px] body-bold">Answering...</button>
        {:else if signed}
          <div class="f-center bg-neutral-background rounded-full p-2 h-fit gap-2">
            <button
              on:click={logout}
              class="f-center gap-2 min-w-[170px] px-[15px] py-[6px] bg-tertiary-content rounded-full">
              <div>Completed</div>
            </button>
            <Icon size={36} type="check-circle" fillClass="fill-[#47E0A0]" />
          </div>
        {:else}
          <button on:click={handleSign} class="self-center btn btn-primary w-[230px] body-bold">Answer the call</button>
        {/if}
      </div>
    </div>

    <div class="flex flex-col pl-[90px]">
      <div class="avatar w-[355px]">
        {#if step == Step.CONNECT}
          <div class="flex gap-4">
            <img src={PrePinkify} alt="unpinkified" />
          </div>
        {:else if step == Step.PINKIFY}
          <div class="flex gap-4">
            <img class="size-64 rounded-full" src={$twitterAvatarUrl} alt="unpinkified" />
          </div>
        {:else if step == Step.REGISTER}
          <img
            class="size-64 rounded-full coin"
            src="/api/generate/{parseTwitterAvatarId($twitterAvatarUrl)}"
            alt="avatar" />
        {:else if step == Step.COMPLETED}
          <img
            class="size-64 rounded-full"
            src="/api/generate/{parseTwitterAvatarId($twitterAvatarUrl)}"
            alt="avatar" />
        {/if}
      </div>
    </div>
  </div>
  {#if step == Step.COMPLETED}
    <div class="w-full flex justify-between p-[40px] rounded-[30px] bg-secondary-brand">
      <div class="f-col gap-5 max-w-[740px]">
        <div class="display-small-medium">You’re all set. What’s next?</div>
        <div>
          You’ve successfully completed all three steps. Your efforts have qualified you to mint your Faction badge on
          the mainnet launch day, granting you entry into the Trailblazer campaign. Stay tuned for further updates by
          following us on our social media channels.
        </div>
      </div>

      <div class="f-center gap-[10px]">
        <TwitterLink />
        <DiscordLink />
      </div>
    </div>
  {/if}
</div>

<style>
  .coin {
    animation: spin 2s ease-in-out;
  }

  @keyframes spin {
    0% {
      transform: rotateY(0deg);
    }

    100% {
      transform: rotateY(1080deg);
    }
  }
</style>
