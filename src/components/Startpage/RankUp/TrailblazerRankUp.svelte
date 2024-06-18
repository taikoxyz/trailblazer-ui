<script>
  import ActionButton from '$components/Button/ActionButton.svelte';
  import Card from '$components/Card/Card.svelte';
</script>

<div class="md:px-[56px] w-full">
  <Card class="" title="" text="">
    <div class="flex flex-col xl:flex-row">
      <img class="xl:w-1/2 w-full" src="/leaderboard.svg" alt="leaderboard" />
      <div class="flex flex-col xl:w-1/2 w-full">
        <div
          class="max-w-[434px] font-clash-grotesk text-secondary-brand tracking-[-1.5px] text-[75px]/[70px] text-center md:text-left">
          Rank up<br /><span class="text-base-content">on the leaderboard</span>
        </div>
        <div class="mt-[50px] mb-[40px]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam harum delectus accusantium ab alias modi
          nobis non a explicabo id, illo corporis perferendis facere, esse praesentium rem odit iure minus.
        </div>

        <div class="flex flex-row gap-[15px]">
          <ActionButton priority="primary">User leaderboard</ActionButton>
          <ActionButton priority="secondary">Dapps leaderboard</ActionButton>
        </div>
      </div>
    </div>
  </Card>
</div>
