import type { AuthSession, SupabaseClient } from "@supabase/supabase-js";
import { writable } from "svelte/store";

import type { Database } from "../database.types";

export const input = writable<string>("");
export const supabaseClient = writable<SupabaseClient<Database>>();
export const session = writable<AuthSession | null>();
export const twitterUsername = writable<string>("");
export const twitterId = writable<string>("");
export const twitterAvatarUrl = writable<string>("");
export const twitterAvatarId = writable<string>("");
