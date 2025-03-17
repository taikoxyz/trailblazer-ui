<script lang="ts">
  import { classNames } from '$shared/utils/classNames';

  export let borderRadius: number = 35;
  export let borderWidth: number = 5;

  const snakeClasses = classNames('snake', $$props.class);
</script>

<div class={snakeClasses} style="--snake-radius: {borderRadius}px; --snake-border-width: {borderWidth}px;">
  <slot />
</div>

<style>
  .snake {
    isolation: isolate;
    position: relative;
    border-radius: var(--snake-radius);
    border: var(--snake-border-width) solid transparent;
  }

  .snake::before {
    content: '';
    position: absolute;
    inset: calc(var(--snake-border-width) * -1);
    z-index: -1;
    border: inherit;
    border-radius: inherit;
    background-image: conic-gradient(
      from var(--snake-angle),
      #ff008000 30%,
      rgba(247, 8, 175, 0.384) 50%,
      rgba(247, 8, 175, 0.759) 95%,
      #fffffffd 100%
    );
    background-origin: border-box;
    -webkit-mask:
      linear-gradient(black, black) content-box,
      linear-gradient(black, black);
    mask: linear-gradient(black, black), linear-gradient(black, black);
    -webkit-mask-clip: content-box, border-box;
    mask-clip: content-box, border-box;
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: snake-spin 5s linear infinite;
  }

  @supports not (background: paint(something)) {
    .snake::before {
      background-image: conic-gradient(#ff0080, #7928ca, #0070f3);
    }
  }

  .snake:hover::before {
    animation-play-state: paused;
  }

  /* Animate the custom property that drives the conic gradient angle */
  @property --snake-angle {
    syntax: '<angle>';
    inherits: true;
    initial-value: 0turn;
  }

  @keyframes snake-spin {
    to {
      --snake-angle: 1turn;
    }
  }
</style>
