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
    'w-[100vw]',
    'gap-[20px]',
    'px-[40px]',
    'lg:px-[57px]',
    'md:px-[47px]',
  );
  const colClasses = classNames(
    'flex',
    'flex-col',
    'gap-[48px]',
    'justify-center',
    'items-center',
    'text-center',
    'lg:text-left',
    'xl:w-1/4',
    'lg:w-1/3',
  );
  const titleClasses = classNames('text-[60px]/[54px]', 'font-clash-grotesk', 'font-[500]');
  const aboutWrapperClasses = classNames(
    'bg-[white]',
    'w-full',
    'lg:max-w-[309px]',
    'p-[24px]',
    'flex',
    'flex-col',
    'gap-[20px]',
    'rounded-[27px]',
  );
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
  <div class={absoluteWrapperClasses} style="background-image:url('ecosystem/header-lg.png')">
    <div class={rowClasses}>
      <div class={classNames(colClasses, 'lg:items-start')}>
        <div class={titleClasses}>
          Explore the <span class="text-[#E81899]">Trailblazers</span> Ecosystem
        </div>
        <div class={dappsWrapperClasses}>
          <img src="ecosystem/dapps.svg" class="h-full" alt="Dapps" />
          <div>
            <div class={dappsCountClasses}>+100</div>
            Dapps
          </div>
        </div>
      </div>

      <div class={classNames(colClasses, 'lg:items-end')}>
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
