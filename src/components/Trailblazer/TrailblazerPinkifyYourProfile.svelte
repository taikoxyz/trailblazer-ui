<script lang="ts">
  import PinkifyYourProfile from '$images/pinkify-your-profile.svg';
</script>

<div
  class="relative flex flex-col xl:flex-row xl:p-[40px] rounded-[30px] border-2 border-primary-border-hover bg-[#310E2F] min-h-[502px]">
  <div class="f-center flex-col order-1 xl:order-0 p-[40px]">
    <div class="pb-[40px] xl:pb-[73px]">
      <div class="rounded-full bg-secondary-brand f-center py-[10px] px-[35px] body-small-bold w-fit">
        JOIN THE REVOLUTION
      </div>
    </div>
    <div
      class="font-clash-grotesk tracking-[-1.5px] text-[45px]/[52px] xl:text-[75px]/[70px] pb-[25px] xl:pb-[46px] text-center xl:text-left">
      <span class="text-secondary-brand">Pinkify</span><br /> Your Profile!
    </div>
    <div class="max-w-[513px] body-regular text-center xl:text-left">
      Show your support for the Taiko community by pinkifying your profile. Change your profile picture to pink, and
      share it on X with #CallofTaiko to become part of the movement!
    </div>
  </div>
  <div class="overflow-visible xl:top-0 xl:right-[52px]">
    <img class="w-full" src={PinkifyYourProfile} alt="pinkify" />
  </div>
</div>

<!-- Twitter -->
<!-- {#if !$twitterId}
  <TwitterLogin />
  <button on:click={getSession}>asd</button>
{:else}
  <div class="flex gap-4">
    original
    <img class="size-64" src={$twitterAvatarUrl} alt="asd" />

    style 1
    <div class="relative">
      <img class="block size-[250px]" src={$twitterAvatarUrl} />
      <svg class="absolute top-0 size-[250px]" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#ff69b4" fill-opacity="0.5" />
      </svg>
    </div>
    style 2
    <img class="size-64" src="/api/generate/{parseTwitterAvatarId($twitterAvatarUrl)}" alt="asd" />
  </div>
{/if} -->
