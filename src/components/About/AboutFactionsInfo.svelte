<script lang="ts">
  import { ActionButton } from '$components/Button';
  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames('flex', 'flex-col', 'gap-8', 'px-5', 'w-full', 'justify-center', 'items-center');

  const contentClasses = classNames('flex', 'flex-col', 'w-1/2', 'gap-8');

  const titleWrapperClasses = classNames('text-secondary-content', 'flex', 'flex-col', 'w-fit', 'gap-4');

  const titleContentClasses = classNames(
    'font-clash-grotesk',
    'text-[20px]/[24px]',
    'font-[500]',
    'text-primary-content',
  );

  const contentWrapperClasses = classNames(
    'text-[18px]/[24px]',
    'text-secondary-content',
    'font-[400]',
    'flex',
    'flex-col',
    'gap-4',
    'w-[60%]',
  );

  const sectionTitleClasses = classNames('font-clash-grotesk', 'text-content', 'text-[75px]/[75px]', 'font-[500]');

  const buttonWrapperClasses = classNames('w-[200px]');
</script>

<div class={wrapperClasses}>
  <div class={contentClasses}>
    <div class={titleWrapperClasses}>
      <div class={titleContentClasses}>Collect exclusive Faction badges</div>
      <div class="border-b-2 border-primary-brand w-[40%]"></div>
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
