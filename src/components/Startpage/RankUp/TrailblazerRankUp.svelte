<script>
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import ActionButton from '$components/Button/ActionButton.svelte';
</script>

<div class="md:px-[56px] w-full flex flex-col lg:flex-row">
  <div
    class="lg:w-full lg:h-[640px] flex mx-9 rounded-[30px] border-2 border-[#444A55] bg-gradient-to-br from-[rgba(93,99,111,0.1)] to-[rgba(25,30,40,0.2)] backdrop-blur-[10px]">
    <img class="mx-4 my-6" src="/leaderboard.svg" alt="leaderboard" />
  </div>
  <div class="w-full p-9 lg:p-0 lg:w-fit lg:z-10">
    <div
      class="lg:w-[432px] lg:h-[640px] inline-flex p-9 flex-col justify-center items-start gap-[89px] rounded-[30px] bg-[#F8F8F8] w-full">
      <div class="flex flex-col xl:flex-row w-full">
        <div class="flex flex-col w-[270px] md:w-[506px] lg:w-[368px]">
          <div class="w-full xl:text-left mb-[40px] md:pt-2 md:w-[189px] pt-8 w-[100px]">
            <span class="text-primary-base-content font-clash-grotesk text-[20px]">{$t('factions.subtitle')}</span>
            <!-- Underline -->
            <div class="w-[60px] h-[3px] bg-primary-brand mt-[10px]"></div>
          </div>
          <div
            class="max-w-[434px] font-clash-grotesk text-primary-base-content tracking-[-1.5px] text-[45px] lg:text-[57px] text-left leading-[64px]">
            Rank up <br class="hidden lg:block" />on the leaderboard!
          </div>
          <div class="mt-[16px] mb-[89px] md:mb-[65px] text-secondary-content">
            Earn Experience Points (XP) and climb from beginner to legend. Every action moves you to closer exclusive
            rewards and elite status.
          </div>

          <div class="m-auto flex flex-col md:flex-row lg:flex-col gap-[15px] w-full">
            <div class="w-[190px] lg:w-full">
              <ActionButton
                priority="primary"
                on:click={() => {
                  goto('./leaderboard/user');
                }}>User leaderboard</ActionButton>
            </div>
            <div class="w-[190px] lg:w-full">
              <ActionButton
                priority="secondary"
                on:click={() => {
                  goto('./leaderboard/dapp');
                }}><span class="text-primary-base-content">Dapps leaderboard</span></ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
