<script lang="ts">
  import PinkifyYourProfile from '$images/pinkify-your-profile.svg';
</script>

<div
  class="relative flex flex-col xl:flex-row p-[40px] rounded-[30px] border-2 border-primary-border-hover bg-[#310E2F] min-h-[502px]">
  <div class="flex flex-col order-1 xl:order-0">
    <div class="pb-[73px]">
      <div class="rounded-full bg-secondary-brand f-center py-[10px] px-[35px] body-small-bold w-fit">
        JOIN THE REVOLUTION
      </div>
    </div>
    <div class="font-clash-grotesk tracking-[-1.5px] text-[75px]/[70px] pb-[46px]">
      <span class="text-secondary-brand">Pinkify</span><br /> Your Profile!
    </div>
    <div class="max-w-[513px] body-regular">
      Show your support for the Taiko community by pinkifying your profile. Change your profile picture to pink, add a
      drum emoji, or use the Taiko hand gesture. Share your support with #CallofTaiko and become part of the movement!
    </div>
  </div>
  <div class="xl:absolute f-center top-0 right-[52px]">
    <img src={PinkifyYourProfile} />
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
