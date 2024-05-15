<script lang="ts">
  import FactionStack from '$images/faction-stack.png';
</script>

<div class="flex flex-col xl:flex-row gap-3 w-full px-5">
  <!-- Image -->
  <img class="-mt-24 xl:m-0" src={FactionStack} alt="{FactionStack}/" />
  <!-- Details -->
  <div class="flex flex-col rounded-[30px] bg-purple w-full px-[24px] py-[30px] xl:px-[40px] xl:py-[32px]">
    <div class="text-secondary-content flex flex-col w-fit gap-3 pb-[20px] xl:pb-[55px]">
      <div class="body-bold tracking-[0.175px]">EXCLUSIVE REWARDS</div>
      <div class="border-b-2 border-primary-brand w-[40%]"></div>
    </div>
    <!-- Title text: Will you answer the call -->
    <div class="font-clash-grotesk tracking-[-1.5px] display-medium-medium pb-[30px]">
      Forge Your Legacy with<br />Taiko Factions
    </div>

    <!-- Sub text: Complete all 3 steps to mint Raver Faction on mainnet launch day to enter trailblazer campaign. -->
    <div class="text-[16px]/[24px] xl:title-body-regular text-secondary-content max-w-[658px]">
      These faction badges are vital to enhancing your influence within the Trailblazers points program. Secure these
      powerful multipliers to gain increased points, elevate your community status, and unlock access to special events
      and future opportunities.
    </div>
  </div>
</div>
