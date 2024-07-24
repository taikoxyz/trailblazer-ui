<script lang="ts">
  import { ActionButton } from '$components/Button';
  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames(
    'flex',

    'flex-col',
    'gap-8',
    'w-full',
    'justify-center',
    'items-center',
  );

  const contentClasses = classNames(
    'flex',
    'w-full',
    'md:w-[calc(100%*6/8)]',
    'flex-col',
    'lg:w-[80%]',
    'lg:w-1/2',
    'gap-8',
  );

  const titleWrapperClasses = classNames(
    'text-secondary-content',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'lg:items-start',
    'w-full',
    'gap-4',
  );

  const titleContentClasses = classNames(
    'font-public-sans',
    'text-[20px]/[25px]',
    'font-[500]',
    'text-primary-content',
    'text-center',
  );

  const barClasses = classNames('border-b-2 border-primary-brand w-[15%]');
  const sectionTitleClasses = classNames(
    'lg:text-left',
    'text-center',
    'font-clash-grotesk',
    'text-content',
    'lg:text-[75px]/[75px]',
    'text-[60px]/[60px]',
    'font-[500]',
  );

  const contentWrapperClasses = classNames(
    'text-[18px]/[24px]',
    'text-secondary-content',
    'font-[400]',
    'flex',
    'flex-col',
    'gap-4',
    'lg:w-[80%]',
    'w-full',
    'lg:text-left',
    'text-center',
    'font-public-sans',
  );

  const buttonWrapperClasses = classNames('w-[180px]', 'h-[48px]', 'relative', 'lg:left-0', 'left-[calc(50%-100px)]');
</script>

<div class={wrapperClasses}>
  <div class={contentClasses}>
    <div class={titleWrapperClasses}>
      <div class={titleContentClasses}>Collect exclusive Faction badges</div>
      <div class={barClasses}></div>
    </div>
    <!-- Title text: Will you answer the call -->
    <div class={sectionTitleClasses}>
      How to earn<br />these Factions?
    </div>

    <div class={contentWrapperClasses}>
      <p>
        Earn more than achievements; collect Faction Badges as you engage with the Taiko universe. These limited-edition
        NFTs are not just collectibles—they're a testament to your dedication and milestones achieved on your journey.
      </p>

      <p>Be swift, as these badges disappear once their trail window closes.</p>
    </div>

    <div class={buttonWrapperClasses}>
      <ActionButton priority="primary">Claim now</ActionButton>
    </div>
  </div>
</div>
