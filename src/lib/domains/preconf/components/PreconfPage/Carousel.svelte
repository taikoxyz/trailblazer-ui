<script lang="ts">
    import { classNames } from '$shared/utils/classNames';
    
    export let items: {image:string, label:string}[] = [];

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
  
     </script>
  
  
  <div class="f-space-between w-full f-col lg:f-row gap-[24px]">
    {#each items as {image, label}}
    <div class={commonCardClasses}>
        <div class={backgroundColorWrapperClasses}>
          <div 
          style="background-image: url({image})"
          class={classNames(backgroundImageClasses)}>
            <div class={overlayClasses}>
              {label}
            </div>
          </div>
        </div>
      </div>
      {/each}

  </div>
  