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
  <div class="flex flex-col rounded-[30px] {props.color} pt-[18px] pb-[39px] h-[100%]">
    <slot></slot>
  </div>
</div>
