<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  const commonCardClasses = classNames(
    'h-[160px]',
    'w-full',
    'rounded-[20px]',
    'items-center',
    'justify-center',
    'flex',
    'relative',
    'overflow-hidden',
  );

  const backgroundColorWrapperClasses = classNames(
    'h-full',
    'w-full',
    'flex',
    'items-center',
    'justify-center',
    'rounded-[20px]',
  );

  const backgroundImageClasses = classNames(
    'h-full',
    'max-w-[325px]',
    'w-full',
    'bg-cover',
    'bg-center',
    'rounded-[20px]',
    'mx-auto',
  );

  const overlayClasses = classNames(
    'absolute inset-0 bg-gray-900/80 opacity-0 hover:opacity-100',
    'transition-opacity duration-300 rounded-[20px] items-center justify-center flex',
    'border-transparent border-[3px] hover:border-secondary-brand',
  );

  const devClasses = classNames(commonCardClasses, 'bg-grey-600');
  const whaleClasses = classNames(commonCardClasses, 'bg-purple-600');
  const minnowClasses = classNames(commonCardClasses, 'bg-secondary-brand');

  const devBackgroundImage = 'bg-[url("/factions/cards/devs.png")]';
  const whaleBackgroundImage = 'bg-[url("/factions/cards/whales.png")]';
  const minnowBackgroundImage = 'bg-[url("/factions/cards/minnows.png")]';
</script>

<div class="f-space-between w-full f-col lg:f-row gap-[24px]">
  <!-- Devs -->
  <div class={devClasses}>
    <div class={backgroundColorWrapperClasses}>
      <div class={classNames(backgroundImageClasses, devBackgroundImage)}>
        <div class={overlayClasses}>
          <img src="/factions/cards/devs_overlay.svg" alt="Devs" class="h-[29px]" />
        </div>
      </div>
    </div>
  </div>

  <!-- Whales -->
  <div class={whaleClasses}>
    <div class={backgroundColorWrapperClasses}>
      <div class={classNames(backgroundImageClasses, whaleBackgroundImage)}>
        <div class={overlayClasses}>
          <img src="/factions/cards/whales_overlay.svg" alt="Whales" class="h-[29px]" />
        </div>
      </div>
    </div>
  </div>

  <!-- Minnows -->
  <div class={minnowClasses}>
    <div class={backgroundColorWrapperClasses}>
      <div class={classNames(backgroundImageClasses, minnowBackgroundImage)}>
        <div class={overlayClasses}>
          <img src="/factions/cards/minnows_overlay.svg" alt="Minnows" class="h-[29px]" />
        </div>
      </div>
    </div>
  </div>
</div>
