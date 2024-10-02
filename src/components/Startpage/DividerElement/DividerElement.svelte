<script lang="ts">
  import { classNames } from '$lib/shared/utils/classNames';

  export let className = ''; // Allow passing additional classes
</script>

<div class={classNames('relative', className)}>
  <!-- Standard Size -->
  <svg
    class={classNames('xl:hidden', 'absolute', 'left-0', 'bottom-0', 'w-full', 'h-auto', 'translate-y-1/2', 'z-30')}
    viewBox="0 0 390 481"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M455.038 147.572C217.775 281.049 -0.513525 238.978 -80 201.257L-80 279.742C-0.513525 242.022 217.775 199.951 455.038 333.428C543.961 383.454 617.706 434.254 677 481L677 6.6179e-05C617.706 46.7465 543.961 97.546 455.038 147.572Z"
      fill="#E81899" />
  </svg>
  <!-- XL Size-->
  <svg
    class={classNames(
      'xl:block',
      'hidden',

      'absolute',
      'left-0',
      'bottom-0',
      'w-full',
      'h-auto',
      'translate-y-1/2',
      'z-30',
    )}
    width="1440"
    height="255"
    viewBox="0 0 1440 255"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1297.88 34.4144C722.334 168.118 192.816 125.975 -7.7099e-06 88.191L-1.45829e-05 166.809C192.816 129.025 722.334 86.882 1297.88 220.586C1347.17 232.036 1394.53 243.527 1440 255L1440 0.000125889C1394.53 11.4736 1347.17 22.9642 1297.88 34.4144Z"
      fill="#E81899" />
  </svg>
</div>
