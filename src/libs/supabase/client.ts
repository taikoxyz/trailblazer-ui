import { createClient } from '@supabase/supabase-js';
import { get } from 'svelte/store';

import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { parseTwitterAvatarId } from '$libs/util/parseTwitterAvatarId';
import { parseTwitterImage } from '$libs/util/parseTwitterImage';
import { session, twitterAvatarId, twitterAvatarUrl, twitterId, twitterUsername } from '$stores';

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseAnonKey = PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('SUPABASE_URL or SUPABASE_ANON_KEY is not set. Please set it in .env!');
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export function getSession() {
  return supabaseClient.auth.getSession();
}

let isWatching = false;
let unWatchAccount: () => void;

export function startWatching() {
  if (!isWatching) {
    const { data } = supabaseClient.auth.onAuthStateChange((_event, _session) => {
      session.set(_session);

      // if (_session && _session.provider_token) {
      //     window.localStorage.setItem('oauth_provider_token', session.provider_token)
      // }

      // if (_session && _session.provider_refresh_token) {
      //     window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token)
      // }

      if (_event === 'INITIAL_SESSION') {
        // handle initial session
        if (_session?.access_token) {
          twitterUsername.set(_session?.user?.user_metadata?.preferred_username);
          twitterId.set(_session?.user?.user_metadata?.provider_id);
          twitterAvatarUrl.set(parseTwitterImage(_session?.user?.user_metadata?.avatar_url));
          twitterAvatarId.set(parseTwitterAvatarId(_session?.user?.user_metadata?.avatar_url));
        }
      } else if (_event === 'SIGNED_IN') {
        // handle sign in event
        twitterUsername.set(_session?.user?.user_metadata?.preferred_username);
        twitterId.set(_session?.user?.user_metadata?.provider_id);
        twitterAvatarUrl.set(parseTwitterImage(_session?.user?.user_metadata?.avatar_url));
        twitterAvatarId.set(parseTwitterAvatarId(_session?.user?.user_metadata?.avatar_url));
      } else if (_event === 'SIGNED_OUT') {
        // handle sign out event

        twitterUsername.set('');
        twitterId.set('');
        window.localStorage.removeItem('oauth_provider_token');
        window.localStorage.removeItem('oauth_provider_refresh_token');
      } else if (_event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (_event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (_event === 'USER_UPDATED') {
        // handle user updated event
      }
    });
    isWatching = true;
    unWatchAccount = data.subscription.unsubscribe;
  }
}

export function stopWatching() {
  unWatchAccount && unWatchAccount();
  isWatching = false;
}

export function handleSupabaseLogout() {
  supabaseClient.auth.signOut({ scope: 'global' });
}
