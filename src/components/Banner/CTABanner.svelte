<script lang="ts">

  </script>

<div class="border-gradient-pink">
  <div class="flex items-center justify-between gap-8">
    <div class="border-gradient-pink p-[5px] before:opacity-50 before:border-[1px] z-10">
      <div class="f-center p-4 rounded-[14px] bg-gradient-to-r from-[#EA36A4] to-[#F997D0]">
        <Icon type={'star'} fillClass="none" vWidth={24} vHeight={24} />
      </div>
    </div>
    <div class="relative w-full flex font-clash-grotesk text-[40px]/[32px] gap-2">
      <div class="w-full break-keep whitespace-nowrap">Taiko needs you. Will you</div>
      <button
        class=" hover:text-pink-500 z-10 w-full break-keep whitespace-nowrap"
        on:click={() => {
          handleAnswerTheCall();
        }}>answer the call?</button>
    </div>
    <div class="w-full flex justify-end z-10">
      <ButtonWithArrow />
    </div>
  </div>
</div>
