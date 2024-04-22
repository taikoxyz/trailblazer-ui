<script lang="ts">
  import { redirect, type Load } from '@sveltejs/kit';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';
  import { base } from '$app/paths';

  export const load: Load = async ({ fetch }) => {
    console.log('🚀 | constload:Load= | fetch:', fetch);
    console.log('🚀 | base:', base);
    // const user = get(session).user;
    throw redirect(302, `/profile/asd`);
    if (user?.walletAddress) {
    } else {
      throw redirect(302, '/login');
    }
  };
</script>
