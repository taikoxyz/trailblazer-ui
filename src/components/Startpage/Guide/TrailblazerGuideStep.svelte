<script lang="ts">
  import { Icon } from '$components/Icon';
  import { classNames } from '$libs/util/classNames';

  export let icon: 'semi-circle-reversed' | 'quad-circles' | 'diamond' = 'semi-circle-reversed';
  export let title: string = 'Connect';
  export let description: string =
    'Begin by registering your wallet address. This initial step is crucial as it links your identity to your participation.';

  const wrapperClasses = classNames(
    'flex',
    'flex-col',
    'w-full',
    'min-h-[100%]',
    'px-[35px]',
    'py-[38px]',
    'bg-purple',
    'rounded-[30px]',
    'gap-[20px]',
  );

  const titleClasses = classNames(
    'flex',
    'flex-row',
    'w-full',
    'justify-center',
    'lg:justify-start',
    'items-center',
    'gap-3',
    'display-small-medium',
  );

  const contentClasses = classNames('text-secondary-content', 'lg:max-w-[340px]');
</script>

<div class={wrapperClasses}>
  <div class={titleClasses}>
    <Icon type={icon} fillClass="fill-primary-brand" />
    <div>{title}</div>
  </div>
  <div class={contentClasses}>
    {description}
  </div>
</div>
