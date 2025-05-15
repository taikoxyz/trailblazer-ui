<script lang="ts">
  import { onMount } from 'svelte';
  export let seconds: number = 0;
  export let duration: number = 700; // ms, total animation duration
  export let slowDownMs: number = 200; // ms, slow-down period at the end

  // Calculate target minutes and seconds
  $: targetM = Math.floor(seconds / 60);
  $: targetS = seconds - targetM * 60;

  let displayM = 0;
  let displayS = 0;
  let animating = true;
  let startTime: number = 0;
  let timer: number;
  let animationFrameId: number;

  // Track if each digit is locked (stopped animating)
  let lockedM: boolean[] = [false, false];
  let lockedS: boolean[] = [false, false];

  function pad(n: number) {
    return n.toString().padStart(2, '0');
  }

  function randomDigit(max: number) {
    return Math.floor(Math.random() * (max + 1));
  }

  function animateFlip(now: number) {
    const elapsed = now - startTime;
    const timeLeft = duration - elapsed;
    let nextDelay = 0;
    let mStr = pad(targetM);
    let sStr = pad(targetS);
    let dM = pad(displayM).split('');
    let dS = pad(displayS).split('');

    // Animate each digit unless it's locked
    let newM = dM.slice();
    let newS = dS.slice();
    for (let i = 0; i < 2; i++) {
      if (!lockedM[i]) {
        // If the digit is zero and the final digit is zero, lock it
        if (dM[i] === '0' && mStr[i] === '0') {
          newM[i] = '0';
          lockedM[i] = true;
        } else {
          newM[i] = String(randomDigit(9));
        }
      }
      if (!lockedS[i]) {
        if (dS[i] === '0' && sStr[i] === '0') {
          newS[i] = '0';
          lockedS[i] = true;
        } else {
          newS[i] = String(randomDigit(i === 0 ? 5 : 9)); // first digit max 5 for seconds
        }
      }
    }
    displayM = parseInt(newM.join(''), 10);
    displayS = parseInt(newS.join(''), 10);

    // Slow down in the last slowDownMs
    if (elapsed < duration) {
      if (timeLeft < slowDownMs) {
        const t = 1 - timeLeft / slowDownMs;
        nextDelay = 30 + t * 90;
      } else {
        nextDelay = 30;
      }
      timer = Number(setTimeout(() => requestAnimationFrame(animateFlip), nextDelay));
    } else {
      // End animation, show target
      displayM = targetM;
      displayS = targetS;
      animating = false;
      lockedM = [true, true];
      lockedS = [true, true];
    }
  }

  onMount(() => {
    lockedM = [false, false];
    lockedS = [false, false];
    animationFrameId = requestAnimationFrame(animateFlip);
    timer = requestAnimationFrame(animateFlip);
    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(timer);
    };
  });
</script>

<div class="flipclock-wrapper">
  <div class="flipclock w-[150px] f-row f-between-center">
    <div class="f-row">
      {#each pad(displayM).split('') as m, i}
        <div class="digit">
          <div class="digit-inner {animating && !lockedM[i] ? 'flip' : ''}">{m}</div>
        </div>
      {/each}
    </div>
    <span class="text-xl font-bold text-primary-brand">:</span>
    <div class="f-row">
      {#each pad(displayS).split('') as s, i}
        <div class="digit">
          <div class="digit-inner {animating && !lockedS[i] ? 'flip' : ''}">{s}</div>
        </div>
      {/each}
    </div>
  </div>
  <div class="f-between-center w-[150px]"><span>minutes</span><span>seconds</span></div>
</div>

<style>
  .flipclock-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .flipclock {
    display: flex;
    align-items: center;
    font-family: 'Clash Grotesk', sans-serif;
  }

  .digit {
    width: 2em;
    height: 3.5em;
    border-radius: 0.3em;
    box-shadow: 0 0.1em 0.3em #0002;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .digit-inner {
    font-size: 2.5em;
    color: #ffffff;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      transform 0.2s cubic-bezier(0.4, 2, 0.6, 1),
      color 0.2s;
  }
  .digit-inner.flip {
    animation: flip 0.3s cubic-bezier(0.4, 2, 0.6, 1);
  }
  @keyframes flip {
    0% {
      transform: rotateX(0deg);
    }
    50% {
      transform: rotateX(-90deg);
      color: #e81899;
    }
    100% {
      transform: rotateX(0deg);
    }
  }
</style>
