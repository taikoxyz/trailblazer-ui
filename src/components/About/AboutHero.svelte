<script lang="ts">
  import { ActionButton } from '$components/Button';
  import { classNames } from '$libs/util/classNames';

  const heroWrapperClasses = classNames('hero', 'h-max');

  const heroContentClasses = classNames('hero-content', 'text-center');

  const contentWrapperClasses = classNames(
    'max-w-5xl',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'gap-16',
    'md:mb-20',
  );
  const h1Classes = classNames(
    'md:text-[60px]/[60px]',
    'text-[40px]/[40px]',
    'w-full',
    'max-w-[90%]',
    'font-clash-grotesk',
    'text-medium',
    'tracking-[-2%]',
  );

  const pinkSpanClasses = classNames('text-secondary');

  const subHeadingClasses = classNames(
    'font-[400]',
    'text-secondary-content',
    'md:max-w-[60%]',
    'max-w-[85%]',
    'text-center',
    'text-[18px]/[24px]',
    'tracking-0',
    'font-public-sans',
  );

  const buttonWrapperClasses = classNames('w-[180px]', 'h-[48px]');
</script>

<div class={heroWrapperClasses}>
  <div class={heroContentClasses}>
    <div class={contentWrapperClasses}>
      <div class={h1Classes}>
        Embark on the <span class={pinkSpanClasses}>Trailblazers</span> journey — Unleash your potential in the Taiko universe!
      </div>

      <h2 class={subHeadingClasses}>
        Dive into the Trailblazers Program, a vibrant new adventure within the Taiko universe designed to deepen
        community ties and enhance your experience.
      </h2>

      <div class={buttonWrapperClasses}>
        <ActionButton href="/profile" priority="primary">Become a Legend</ActionButton>
      </div>
    </div>
  </div>
</div>
