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
    'my-20',
  );
  const h1Classes = classNames('text-[60px]/[60px]', 'w-full', 'font-clash-grotesk');

  const pinkSpanClasses = classNames('text-secondary');

  const subHeadingClasses = classNames(
    'font-[400]',
    'text-secondary-content',
    'max-w-[60%]',
    'text-center',
    'text-[18px]/[24px]',
  );

  const buttonWrapperClasses = classNames('w-[300px]');
</script>

<div class={heroWrapperClasses}>
  <div class={heroContentClasses}>
    <div class={contentWrapperClasses}>
      <div class={h1Classes}>
        Embark on the <span class={pinkSpanClasses}>Trailblazers</span> journey — Unleash your potential in the Taiko universe!
      </div>

      <div class={subHeadingClasses}>
        Dive into the Trailblazers Program, a vibrant new adventure within the Taiko universe designed to deepen
        community ties and enhance your experience.
      </div>

      <div class={buttonWrapperClasses}>
        <ActionButton priority="primary">Start your trail</ActionButton>
      </div>
    </div>
  </div>
</div>
