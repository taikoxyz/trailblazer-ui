import { getAccount } from "@wagmi/core";
import { MOCK_PROFILE_2 } from "src/tests/mocks/profile";
import { MOCK_USER_TRANSACTIONS } from "src/tests/mocks/userTransactions";

import { PUBLIC_TRAILBLAZER_API_URL } from "$env/static/public";
import { config } from "$libs/wagmi";
import { currentProfile } from "$stores/profile";
import { userTransactions } from "$stores/userTransactions";

import type { UserProfile } from "./types";

export class Profile {


  static async getProfile() {

    // Mock Data
    setInterval(() => {
      currentProfile.set(MOCK_PROFILE_2);
    }, 5000)

    const account = getAccount(config);
    if (account?.address) {
      // TOOO: Update this
      // const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/user?user=${account.address}`)
      const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/user?user=0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199`)
      const userProfile: UserProfile = await response.json() as UserProfile

      // Update currentProfile only with defined keys from userProfile
      currentProfile.update(current => {
        Object.keys(userProfile).forEach(key => {
          if (userProfile[key] !== undefined) {
            current[key] = userProfile[key];
          }
        });
        return current;
      });
    }

  }

  static async getUserTransactions() {

    // Mock Data
    setInterval(() => {
      userTransactions.set(MOCK_USER_TRANSACTIONS);
    }, 5000)

    // TODO: Link with backend
  }

  static async getStatistics() {

    // fetches statistics from backend

  }

}
