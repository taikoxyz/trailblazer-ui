<script lang="ts">
    import { onMount } from 'svelte';
    import dayjs from 'dayjs';
    import duration from 'dayjs/plugin/duration';

    dayjs.extend(duration);

    export let target: Date;

    export let labels: { days: string; hours: string; minutes: string; seconds: string } = {
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
    };

    export let itemClasses = '';

    // Countdown object to store remaining time
    let countdown = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    let showCountdown = true;  // Control visibility of the entire countdown

    // Correct typing for the interval (NodeJS.Timeout or null for browser setInterval)
    let interval: NodeJS.Timeout | null = null;

    // Function to calculate the countdown
    const calculateCountdown = () => {
        const now = dayjs();
        const targetDate = dayjs(target); // Convert Date to dayjs object
        const diff = targetDate.diff(now);

        if (diff <= 0) {
            // Hide the entire component if the target date is in the past
            showCountdown = false;
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
        interval = setInterval(calculateCountdown, 1000); // Update every second

        return () => {
            if (interval) clearInterval(interval); // Clear interval on component destroy
        };
    });

</script>

<!-- Hide the countdown if the time is in the past -->
    <div class={$$props.class}>
        <!-- Hide days if it's 0 -->
        {#if countdown.days > 0}
            <div class={itemClasses}>{countdown.days}{labels.days}</div>
        {/if}

        <!-- Hide hours if days and hours are both 0 -->
        {#if countdown.days > 0 || countdown.hours > 0}
            <div class={itemClasses}>{countdown.hours}{labels.hours}</div>
        {/if}
        <!-- Always show seconds if countdown is visible -->

            <div class={itemClasses}>{countdown.minutes}{labels.minutes}</div>

        <!-- Always show seconds if countdown is visible -->
        <div class={itemClasses}>{countdown.seconds}{labels.seconds}</div>
    </div>
