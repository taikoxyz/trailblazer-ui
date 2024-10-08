<script lang="ts">
  import dayjs from 'dayjs';
  import duration from 'dayjs/plugin/duration';
  import { onMount } from 'svelte';

  dayjs.extend(duration);

  export let target: Date;

  export let labels: { days: string; hours: string; minutes: string; seconds: string } = {
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
  };

  export let itemClasses = '';

  let countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  let interval: NodeJS.Timeout | null = null;

  const calculateCountdown = () => {
    const now = dayjs();
    const targetDate = dayjs(target);
    const diff = targetDate.diff(now);

    if (diff <= 0) {
      if (interval) clearInterval(interval);
    } else {
      // Calculate the remaining time
      const duration = dayjs.duration(diff);

      countdown = {
        days: Math.floor(duration.asDays()),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      };
    }
  };

  // Start the countdown timer when the component is mounted
  onMount(() => {
    calculateCountdown();
    interval = setInterval(calculateCountdown, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  });
</script>

<div class={$$props.class}>
  <!-- Hide days if it's 0 -->
  {#if countdown.days > 0}
    <div class={itemClasses}>{countdown.days}{labels.days}</div>
  {/if}

  <!-- Hide hours if days and hours are both 0 -->
  {#if countdown.days > 0 || countdown.hours > 0}
    <div class={itemClasses}>{countdown.hours}{labels.hours}</div>
  {/if}
  <!-- Always show minutes and seconds -->
  <div class={itemClasses}>{countdown.minutes}{labels.minutes}</div>

  <div class={itemClasses}>{countdown.seconds}{labels.seconds}</div>
</div>
