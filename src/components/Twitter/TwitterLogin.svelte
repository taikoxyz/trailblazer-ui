<script lang="ts">
  import { ThemeSupa } from '@supabase/auth-ui-shared';
  import { Auth } from '@supabase/auth-ui-svelte';
  import { onMount } from 'svelte';

  import { supabaseClient } from '$libs/supabase';

  let url: string;
  $: url;

  onMount(() => {
    url = window.location.origin;
  });
</script>

<div class="flex">
  <Auth
    {supabaseClient}
    view="sign_in"
    onlyThirdPartyProviders={true}
    providers={['twitter']}
    redirectTo={url}
    showLinks={false}
    appearance={{
      theme: ThemeSupa,
      style: {
        button: 'color: #000; border-radius: 100px; max-width: 340px; width: 100%;  --svg-fill-color: #ff0000;',
      },
      extend: true,
    }} />
</div>

<style>
  .flex {
    display: flex;
    margin: auto;
  }
</style>
