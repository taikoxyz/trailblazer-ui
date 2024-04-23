import { MOCK_PROFILE_2 } from "src/tests/mocks/profile";
import { MOCK_USER_TRANSACTIONS } from "src/tests/mocks/userTransactions";

import { currentProfile } from "$stores/profile";
import { userTransactions } from "$stores/userTransactions";

export class Profile {


  static getProfile() {

    // Mock Data
    setInterval(() => {
      currentProfile.set(MOCK_PROFILE_2);
    }, 5000)

    // TODO: Link with backend

  }

  static getUserTransactions() {

    // Mock Data
    setInterval(() => {
      userTransactions.set(MOCK_USER_TRANSACTIONS);
    }, 5000)

    // TODO: Link with backend


  }

  public getStatistics() {

    // fetches statistics from backend

  }

}
