<script lang="ts">
  import ActionButton from '$components/Button/ActionButton.svelte';
  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames(
    'relative',
    'lg:h-[50vh]',
    'md:h-[70vh]',
    'h-[100vh]',
    'top-[-160px]',
    'mb-[-160px]',
    'flex',
    'flex-col',
    'items-center',
    'justify-end',
  );

  const rowClasses = classNames(
    'relative',
    'flex',
    'justify-between',
    'items-center',
    'lg:flex-row',
    'flex-col',
    'w-full',
    'gap-[20px]',
  );
  const colClasses = classNames(
    'flex',
    'flex-col',
    'gap-[48px]',
    'justify-center',
    'items-center',
    'lg:items-start',
    'text-center',
    'lg:text-left',
    'lg:w-1/4',
  );
  const titleClasses = classNames('text-[60px]/[54px]', 'font-clash-grotesk', 'font-[500]');
  const aboutWrapperClasses = classNames('bg-[white]', 'p-[24px]', 'flex', 'flex-col', 'gap-[20px]', 'rounded-[27px]');
  const aboutTitleClasses = classNames('text-[14px]/[16.8px]', 'text-[#C8047D]', 'uppercase', 'font-[600]');

  const aboutContentClasses = classNames('text-[#444A55]');

  const dappsWrapperClasses = classNames(
    'text-[#ADB1B8]',
    'text-[12px]/[15px]',
    'font-[600]',
    'uppercase',
    'flex',
    'flex-row',
    'text-center',
    'items-center',
    'justify-start',
    'gap-[11px]',
  );
  const dappsCountClasses = classNames('text-[26px]/[32px]', 'text-[#F3F3F3]', 'font-clash-grotesk', 'font-[500]');

  const absoluteWrapperClasses = classNames(
    'w-[100vw]',
    'h-full',
    'absolute',
    'flex',
    'flex-col',
    'items-center',
    'justify-end',
    'bg-cover',
    'bg-center',
    'lg:p-[20px]',
    'p-[50px]',
  );
</script>

<div class={wrapperClasses}>
  <div class={absoluteWrapperClasses} style="background-image:url('ecosystem/header-lg.svg')">
    <div class={rowClasses}>
      <div class={colClasses}>
        <div class={titleClasses}>
          Explore the <span class="text-[#E81899]">Taiko</span> Ecosystem
        </div>
        <div class={dappsWrapperClasses}>
          <img src="ecosystem/dapps.svg" class="h-full" alt="Dapps" />
          <div>
            <div class={dappsCountClasses}>+100</div>
            Dapps
          </div>
        </div>
      </div>

      <div class={colClasses}>
        <div class={aboutWrapperClasses}>
          <div class={aboutTitleClasses}>about ecosystem</div>

          <div class={aboutContentClasses}>
            Join a supportive, collaborative ecosystem with a greater purpose – permissionless, flexible, and dedicated
            to defining the future of Ethereum.
          </div>

          <ActionButton class="w-max" withArrow priority="primary">Join our ecosystem</ActionButton>
        </div>
      </div>
    </div>
  </div>
</div>
