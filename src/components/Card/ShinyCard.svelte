<script lang="ts">
  type CardType = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'rainbow' | 'pink' | 'glass';

  export let type: CardType = 'pink';
</script>

{#if type === 'bronze'}
  <div
    class="relative w-72 h-48 overflow-hidden bg-gradient-to-br from-yellow-800 via-yellow-700 to-yellow-800 rounded-lg shadow-lg text-white text-center">
    <div
      class="shine absolute top-0 left-[-150%] w-[200%] h-full bg-gradient-to-l from-transparent via-white/10 to-transparent animate-shine">
    </div>
    <h1 class="mt-4 z-10">Bronze Card</h1>
    <p class="z-10">This is a bronze card.</p>
  </div>
{:else if type === 'silver'}
  <div
    class="relative w-72 h-48 overflow-hidden bg-gradient-to-br from-gray-400 via-gray-600 to-gray-400 rounded-lg shadow-lg text-white text-center">
    <div
      class="shine absolute top-0 left-[-150%] w-[200%] h-full bg-gradient-to-l from-transparent via-white/30 to-transparent animate-shine">
    </div>
    <h1 class="mt-4 z-10">Silver Card</h1>
    <p class="z-10">This is a silver metallic card.</p>
  </div>
{:else if type === 'gold'}
  <div
    class="relative w-72 h-48 overflow-hidden bg-gradient-to-br from-yellow-500 via-yellow-100 to-yellow-500 rounded-lg shadow-lg text-white text-center">
    <div
      class="shine absolute top-0 left-[-150%] w-[200%] h-full bg-gradient-to-l from-transparent via-white/30 to-transparent animate-shine">
    </div>
    <h1 class="mt-4 z-10">Gold Card</h1>
    <p class="z-10">This is a gold card.</p>
  </div>
{:else if type === 'platinum'}
  <div
    class="relative w-72 h-48 overflow-hidden bg-gradient-to-br from-gray-200 via-gray-400 to-gray-200 rounded-lg shadow-lg text-white text-center">
    <div
      class="shine absolute top-0 left-[-150%] w-[200%] h-full bg-gradient-to-l from-transparent via-white/30 to-transparent animate-shine">
    </div>
    <h1 class="mt-4 z-10">Platinum Card</h1>
    <p class="z-10">This is a platinum card.</p>
  </div>
{:else if type === 'diamond'}
  <div
    class="relative w-72 h-48 overflow-hidden bg-gradient-to-br from-blue-200 via-blue-300 to-blue-200 rounded-lg shadow-lg text-white text-center">
    <div
      class="shine absolute top-0 left-[-150%] w-[200%] h-full bg-gradient-to-l from-transparent via-white/30 to-transparent animate-shine">
    </div>
    <h1 class="mt-4 z-10">Diamond Card</h1>
    <p class="z-10">This is a diamond card.</p>
  </div>
{:else if type === 'rainbow'}
  <div
    class="relative w-72 h-48 overflow-hidden bg-gradient-to-br from-pink-500 via-purple-500 to-green-500 rounded-lg shadow-lg text-white text-center">
    <div
      class="shine absolute top-0 left-[-150%] w-[200%] h-full bg-gradient-to-l from-transparent via-white/30 to-transparent animate-shine">
    </div>
    <h1 class="mt-4 z-10">Rainbow Card</h1>
    <p class="z-10">This is a rainbow card, featuring vibrant colors.</p>
  </div>
{:else if type === 'pink'}
  <div
    class="relative w-72 h-48 overflow-hidden bg-gradient-to-br from-pink-400 via-pink-600 to-pink-400 rounded-lg shadow-lg text-white text-center">
    <div
      class="shine absolute top-0 left-[-150%] w-[200%] h-full bg-gradient-to-l from-transparent via-white/30 to-transparent animate-shine">
    </div>
    <h1 class="mt-4 z-10">Pink Card</h1>
    <p class="z-10">This is a pink card.</p>
  </div>
{:else if type === 'glass'}
  <div class="relative w-72 h-48 overflow-hidden rounded-lg shadow-lg text-white text-center">
    <div
      class="shine absolute top-0 left-[-150%] w-[200%] h-full bg-gradient-to-l from-transparent via-white/50 to-transparent animate-shine">
    </div>
    <h1 class="mt-4 z-10">Glass Card</h1>
    <p class="z-10">This is a glass card, featuring a subtle and elegant look.</p>
  </div>
{/if}
