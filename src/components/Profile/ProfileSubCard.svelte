<script lang="ts">
  type CardProps = {
    color: string;
    actionText?: string;
    actionLink?: string;
  };

  export let props: CardProps = {
    color: 'bg-pink-600',
    actionText: 'Action',
  };

  export let handleClick = () => {
    console.log('Clicked');
  };
</script>

<div class="flex flex-col w-full max-w-[312px] h-full">
  <div class="flex flex-col gap-8 rounded-t-[30px] {props.color} bg-opacity-20 px-5 pt-[28px] pb-[39px] h-full">
    <slot></slot>
  </div>
  <button class="{props.color} rounded-b-[30px] py-4 body-bold" on:click={handleClick}>Action</button>
</div>
