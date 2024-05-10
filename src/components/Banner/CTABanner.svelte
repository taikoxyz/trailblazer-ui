<script lang="ts">
  import { ButtonWithArrow } from '$components/Button';
  import { Icon } from '$components/Icon';
</script>

<div class="border-gradient-pink">
  <div class="flex items-center justify-between gap-8">
    <div class="border-gradient-pink p-[5px] before:opacity-50 before:border-[1px] z-10">
      <div class="f-center p-4 rounded-[14px] bg-gradient-to-r from-[#EA36A4] to-[#F997D0]">
        <Icon type={'star'} fillClass="none" vWidth={24} vHeight={24} />
      </div>
    </div>
    <slot />

    <div class="w-full flex justify-end z-10">
      <ButtonWithArrow />
    </div>
  </div>
</div>
