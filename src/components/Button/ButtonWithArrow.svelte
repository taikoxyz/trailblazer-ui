<script lang="ts">
  import { Icon } from '$components/Icon';

  export let text: string = 'Learn more';
</script>

<button class="f-center pl-5 pr-2 py-2 rounded-full bg-secondary-brand gap-[12px]">
  <div class="text-white body-medium">{text}</div>
  <div class="f-center size-8 rounded-full bg-white overflow-hidden">
    <div class="flex gap-[14px] translate-x-[-14px] hover:animate-slide-right">
      <Icon type={'arrow-right'} fillClass="fill-secondary-brand" width={14} />
      <Icon type={'arrow-right'} fillClass="fill-secondary-brand" width={14} />
    </div>
  </div>
</button>
