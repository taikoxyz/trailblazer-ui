<script lang="ts">
  import Icon from '$components/Icon/Icon.svelte';
  import { DiscordLink, TwitterLink } from '$components/Links';
  import PrePinkify from '$images/pre-pinkify.svg';
  import { getSession, supabaseClient } from '$libs/supabase';
  import { parseTwitterAvatarId } from '$libs/util/parseTwitterAvatarId';
  import { twitterAvatarId, twitterAvatarUrl, twitterId, twitterUsername } from '$stores/supabase';
  import PinkifyModal from './PinkifyModal.svelte';
  import { getAccount, signMessage } from '@wagmi/core';
  import { config } from '$libs/wagmi';
  import { postSignature } from '$libs/pinkify/api';
  import { blobToBase64 } from '$libs/util/blobToBase64';
  import { get } from 'svelte/store';

  import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
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
      const address = getAccount(config).address;
      const message = 'Answer the call';
      if (!address) {
        throw new Error('No address found');
      }

      let signature = await signMessage(config, { message: message });
      await postSignature(address, signature, message);
      step = Step.COMPLETED;
      signed = true;
    } catch (e) {
      console.error(e);
    }
    signing = false;
  }

  async function handleGenerate() {
    // Handle pinkify logic
    step = Step.REGISTER;
    generating = true;
    await fetchPinkifiedAvatar();

    setTimeout(() => {
      modalOpen = true;
      generating = false;
      generated = true;
    }, 2000);
  }

  async function fetchPinkifiedAvatar() {
    // Fetch twitter avatar
    let avatarData = get(twitterAvatarId).split('/');

    // const data = {
    //   slug: avatarData[0],
    //   code: avatarData[1],
    //   ext: avatarData[2], // or 'png', etc.
    // };

    // let response = await fetch(`/api/generate`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });
    let response = await fetch(
      `${PUBLIC_TRAILBLAZER_API_URL}/api/generate/${avatarData[0]}/${avatarData[1]}/${avatarData[2]}`,
    );
    pinkifiedAvatar = await blobToBase64(await response.blob());
    pinkifiedAvatar = pinkifiedAvatar.replace('data:image/png;base64', 'data:image/svg+xml;base64');
  }

  const handleDialogSelection = () => {
    modalOpen = false;
  };

  $: if ($twitterId) {
    step = Step.PINKIFY;
  }

  let step: Step;
  step = Step.CONNECT;

  let base64data: string;
  let pinkifiedAvatar: string;

  let modalOpen = false;
  let generating = false;
  let generated = false;
  let signing = false;
  let signed = false;

  let svg: string;
</script>

<!-- {@html svg} -->
{#if modalOpen}
  <PinkifyModal bind:modalOpen on:selected={() => handleDialogSelection()} {pinkifiedAvatar} />
{/if}

<div class="f-center flex-col w-full xl:gap-[20px] container">
  <!-- Section Header -->
  <div class="f-center w-full flex-col xl:flex-row xl:justify-between gap-[40px] xl:pb-[60px]">
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
  <div
    class="f-center flex-col xl:flex-row rounded-[30px] w-full xl:bg-elevated-background px-[29px] py-[44px] xl:px-[55px] xl:py-[74px]">
    <div class="f-center flex-col w-full order-1 xl:order-0">
      <!-- Step 1 -->
      <div class="flex flex-col xl:flex-row items-center w-full justify-between">
        <div class="f-center flex-col xl:flex-row gap-4 max-w-[400px]">
          <div class="bg-neutral-background f-center rounded-full min-w-12 min-h-12">1</div>
          <div class="flex flex-col text-center xl:text-left pb-4 xl:pb-0">
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

      <div class="flex flex-col xl:flex-row items-center w-full justify-between">
        <div class="f-center flex-col xl:flex-row gap-4 max-w-[400px]">
          <div class="bg-neutral-background f-center rounded-full min-w-12 min-h-12">2</div>
          <div class="flex flex-col text-center xl:text-left pb-4 xl:pb-0">
            <div class="font-clash-grotesk text-[22px]">Pinkify & Share</div>
            <div>Pinkify your profile picture by generating a Taiko pink design and share it on X.</div>
          </div>
        </div>

        {#if generating}
          <button class="self-center btn btn-disabled w-[230px] body-bold">Generating...</button>
        {:else if generated}
          <div class="f-center bg-neutral-background rounded-full p-2 h-fit gap-2">
            <button class="f-center gap-2 min-w-[170px] px-[15px] py-[6px] bg-tertiary-content rounded-full">
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

      <div class="flex flex-col xl:flex-row items-center w-full justify-between">
        <div class="f-center flex-col xl:flex-row gap-4 max-w-[400px]">
          <div class="bg-neutral-background f-center rounded-full min-w-12 min-h-12">3</div>
          <div class="flex flex-col text-center xl:text-left pb-4 xl:pb-0">
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

    <div class="flex flex-col xl:pl-[90px] pb-10 xl:pb-0 order-0 xl:order-1">
      <div class="avatar w-full xl:w-[355px]">
        {#if step == Step.CONNECT}
          <div class="flex gap-4">
            <img src={PrePinkify} alt="unpinkified" />
          </div>
        {:else if step == Step.PINKIFY}
          <img class="size-64 rounded-full" src={$twitterAvatarUrl} alt="unpinkified" />
        {:else if step == Step.REGISTER && pinkifiedAvatar}
          <img class="size-64 rounded-full coin" src={pinkifiedAvatar} alt="avatar" />
        {:else if step == Step.COMPLETED && pinkifiedAvatar}
          <img class="size-64 rounded-full" src={pinkifiedAvatar} alt="avatar" />
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
