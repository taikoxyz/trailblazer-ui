<script lang="ts">
  import { classNames } from '$libs/util/classNames';

  export let className = ''; // Allow passing additional classes
</script>

<div class={classNames('relative', className)}>
  <svg
    class={classNames('absolute', 'left-0', 'bottom-0', 'w-full', 'h-auto', 'translate-y-1/2', 'z-30')}
    viewBox="0 0 390 481"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M455.038 147.572C217.775 281.049 -0.513525 238.978 -80 201.257L-80 279.742C-0.513525 242.022 217.775 199.951 455.038 333.428C543.961 383.454 617.706 434.254 677 481L677 6.6179e-05C617.706 46.7465 543.961 97.546 455.038 147.572Z"
      fill="#E81899" />
  </svg>
</div>
