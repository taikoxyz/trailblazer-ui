<script lang="ts">
  let devCount = 0;
  let minnowCount = 0;
  let whaleCount = 0;
  let hasTaikoon = false;
  let hasSnaefell = false;

  // Helper to calculate multipliers
  const getMultiplier = (count: number): number => {
    const bonus = 0.05 * count;
    return Math.min(1 + Number(bonus.toFixed(2)), 1.4);
  };

  //   Devs Multiplier

  // Formula: 1 + 0.05* {Number of Unique Dev NFTs (max 1.4x)}
  // 1 + 0.05 * 8 = 1.4 (capped at 1.4x)

  // Minnows Multiplier

  // Formula: 1 + 0.05 * {Number of Unique Minnow NFTs (max 1.4x)}
  // 1 + 0.05 * 8 = 1.4

  // Whales Multiplier

  // Formula:   1 + 0.05 * {Number of Unique Whale NFTs (max 1.4x)}
  // 1 + 0.05 * 8 = 1.4

  // Global Multiplier

  // Formula: 1 + {Devs Multiplier} + {Snaefell Multiplier} + {Taikoon Multiplier (max 2.5x)}
  // Max global calc: 1 + 1.4 + 0.1 + 1 = 3.5 (capped at 2.5x)

  // TxValue: maxWhale * maxGlobal = 3.5 (1.4 * 2.5)
  // Tx: maxMinnow * maxGlobal = 3.5 (1.4 * 2.5)

  // Calculate individual multipliers
  $: devMultiplier = getMultiplier(devCount);
  $: minnowMultiplier = getMultiplier(minnowCount);
  $: whaleMultiplier = getMultiplier(whaleCount);

  // Taikoon and Snaefell bonuses
  $: taikoonBonus = hasTaikoon ? 1.0 : 0.0;
  $: snaefellBonus = hasSnaefell ? 0.1 : 0.0;

  // Correct global multiplier calculation
  $: globalMultiplier = Math.min(1 + (devMultiplier - 1 + taikoonBonus + snaefellBonus), 2.5);

  // Calculations for TxValue and Tx
  $: txValue = +(whaleMultiplier * globalMultiplier).toFixed(2);
  $: tx = +(minnowMultiplier * globalMultiplier).toFixed(2);

  // Increment and decrement handlers
  const increment = (type: 'dev' | 'minnow' | 'whale') => {
    if (type === 'dev' && devCount < 8) devCount++;
    if (type === 'minnow' && minnowCount < 8) minnowCount++;
    if (type === 'whale' && whaleCount < 8) whaleCount++;
  };

  const decrement = (type: 'dev' | 'minnow' | 'whale') => {
    if (type === 'dev' && devCount > 0) devCount--;
    if (type === 'minnow' && minnowCount > 0) minnowCount--;
    if (type === 'whale' && whaleCount > 0) whaleCount--;
  };
</script>

<div class="flex flex-col items-center justify-center min-h-screen">
  <h1 class="text-3xl font-bold mb-8">Badge Multiplier Calculator</h1>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div class="card bg-base-100 shadow-lg p-6">
      <h2 class="card-title text-lg font-semibold">Devs</h2>
      <p>Count: {devCount}</p>
      <div class="card-actions justify-between mt-4">
        <button class="btn btn-sm btn-primary" on:click={() => decrement('dev')}>-</button>
        <button class="btn btn-sm btn-primary" on:click={() => increment('dev')}>+</button>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg p-6">
      <h2 class="card-title text-lg font-semibold">Minnows</h2>
      <p>Count: {minnowCount}</p>
      <div class="card-actions justify-between mt-4">
        <button class="btn btn-sm btn-primary" on:click={() => decrement('minnow')}>-</button>
        <button class="btn btn-sm btn-primary" on:click={() => increment('minnow')}>+</button>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg p-6">
      <h2 class="card-title text-lg font-semibold">Whales</h2>
      <p>Count: {whaleCount}</p>
      <div class="card-actions justify-between mt-4">
        <button class="btn btn-sm btn-primary" on:click={() => decrement('whale')}>-</button>
        <button class="btn btn-sm btn-primary" on:click={() => increment('whale')}>+</button>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg p-6">
      <h2 class="card-title text-lg font-semibold">Taikoon</h2>
      <p>Bonus: {hasTaikoon ? '+1.0' : '+0.0'}</p>
      <div class="card-actions justify-center mt-4">
        <button class="btn btn-sm btn-secondary" on:click={() => (hasTaikoon = !hasTaikoon)}>
          {hasTaikoon ? 'Remove' : 'Add'}
        </button>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg p-6">
      <h2 class="card-title text-lg font-semibold">Snaefell</h2>
      <p>Bonus: {hasSnaefell ? '+0.1' : '+0.0'}</p>
      <div class="card-actions justify-center mt-4">
        <button class="btn btn-sm btn-secondary" on:click={() => (hasSnaefell = !hasSnaefell)}>
          {hasSnaefell ? 'Remove' : 'Add'}
        </button>
      </div>
    </div>
  </div>

  <div class="mt-8 p-6 bg-base-100 shadow-md rounded-md">
    <h2 class="text-xl font-semibold mb-4">Results</h2>
    <p>Dev Multiplier: <span class="font-bold">{devMultiplier}</span></p>
    <p>Minnow Multiplier: <span class="font-bold">{minnowMultiplier}</span></p>
    <p>Whale Multiplier: <span class="font-bold">{whaleMultiplier}</span></p>
    <p>Global Multiplier (capped at 2.5): <span class="font-bold">{globalMultiplier}</span></p>
    <p class="mt-4">TxValue: <span class="font-bold">{txValue}</span></p>
    <p>Tx: <span class="font-bold">{tx}</span></p>
  </div>
</div>
