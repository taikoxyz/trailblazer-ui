<script lang="ts">
  import { Icon } from '$components/Icon';

  export let text: string = 'Learn more';
</script>

<button
  class="flex items-center justify-center pl-5 pr-2 py-2 rounded-full bg-secondary-brand gap-[12px] {$$props.class}">
  <div class="flex-grow text-white body-medium text-center">{text}</div>
  <div class="flex items-center justify-end">
    <div class="f-center w-[32px] min-h-[32px] rounded-full bg-white overflow-hidden">
      <div class="flex gap-[14px] translate-x-[-14px] hover:animate-slide-right">
        <Icon type={'arrow-right'} fillClass="fill-secondary-brand" width={14} />
        <Icon type={'arrow-right'} fillClass="fill-secondary-brand" width={14} />
      </div>
    </div>
  </div>
</button>
