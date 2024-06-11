<script lang="ts">
  type CardProps = {
    color: string;
    actionText?: string;
    actionLink?: string;
  };

  export let props: CardProps = {
    color: 'bg-elevated-background',
    actionText: 'Action',
  };
</script>

<div class="flex flex-col w-full lg:max-w-[312px] mb-4 lg:mb-0">
  <div
    class="flex flex-col gap-8 rounded-[30px] {props.color} bg-opacity-20 px-5 pt-[28px] pb-[39px] h-[100%] justify-center">
    <slot></slot>
  </div>
</div>
