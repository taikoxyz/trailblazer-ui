<script lang="ts">
  import ActionButton from '$components/Button/ActionButton.svelte';
  import { classNames } from '$lib/shared/utils/classNames';

  const wrapperClasses = classNames(
    'relative',
    'lg:h-[50vh]',
    'md:h-[70vh]',
    'h-[80vh]',
    //'top-[-160px]',
    // 'mb-[-160px]',
    'z-100',
    'flex',
    'flex-col',
    'items-center',
    'justify-end',
    'w-full',
  );

  const rowClasses = classNames(
    'relative',
    'flex',
    'justify-between',
    'items-center',
    'lg:flex-row',
    'flex-col',
    'gap-[20px]',
    'w-full',
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
  const aboutTitleClasses = classNames('text-[14px]/[16.8px]', 'text-primary', 'uppercase', 'font-[600]');

  const aboutContentClasses = classNames('text-divider-border');

  const dappsWrapperClasses = classNames(
    'text-secondary-content',
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
  const dappsCountClasses = classNames(
    'text-[26px]/[32px]',
    'text-primary-content',
    'font-clash-grotesk',
    'font-[500]',
  );

  const absoluteWrapperClasses = classNames(
    'w-[100vw]',
    'h-full',
    'absolute',
    'top-0',
    'flex',
    'flex-col',
    'items-center',
    'justify-end',
    'bg-cover',
    'bg-no-repeat',
    'bg-center',
    'lg:p-[20px]',
    'p-[50px]',
  );
</script>

<div class={wrapperClasses}>
  <div class={absoluteWrapperClasses} style="background-image:url('ecosystem/header-bg.png')"></div>
  <div class={rowClasses}>
    <div class={classNames(colClasses, 'lg:items-start')}>
      <div class={titleClasses}>
        Explore the <span class="text-secondary">Trailblazers</span> Ecosystem
      </div>
      <div class={dappsWrapperClasses}>
        <img src="/ecosystem/dapps.svg" class="h-full" alt="Dapps" />
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
          Join a supportive, collaborative ecosystem with a greater purpose – permissionless, flexible, and dedicated to
          defining the future of Ethereum.
        </div>

        <ActionButton
          href="https://github.com/taikoxyz/website-v2/issues/new?assignees=&labels=category.enhancement%2Cstatus.needs-triage&projects=&template=add_project.yml"
          class="w-max"
          withArrow
          priority="primary">Join our ecosystem</ActionButton>
      </div>
    </div>
  </div>
</div>
