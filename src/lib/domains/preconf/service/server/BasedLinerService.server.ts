import type { Abi, Address, Hex } from 'viem';
import { encodePacked, keccak256 } from 'viem';
import { signMessage } from 'viem/accounts';

import { BasedLinerAdapter } from '../../adapter/server/BasedLinerAdapter.server';

// In-memory store for demonstration (replace with DB or GCP in production)
const registrationStore: Array<{
  wallet: string;
  stage: string;
  phase: string;
  timestamp: number;
  txHash: string;
  diff: number;
}> = [];

export class BasedLinerService {
  /**
   * Sends a transaction and tracks the time from sending to receipt (server-side).
   * @returns timings and receipt
   */
  static async sendAndTrackTx({
    contractAddress,
    abi,
    functionName,
    args = [],
    value,
    eventName,
    eventArgs,
  }: {
    contractAddress: Address;
    abi: Abi;
    functionName: string;
    args?: unknown[];
    value?: bigint;
    eventName?: string;
    eventArgs?: Record<string, unknown>;
  }) {
    return BasedLinerAdapter.sendAndTrackTx({
      contractAddress,
      abi,
      functionName,
      args,
      value,
      eventName,
      eventArgs,
    });
  }

  /**
   * Signs a registration message (user address + timestamp) with the backend's private key using viem.
   * @param user The user's address
   * @param timestamp The registration timestamp
   * @param privateKey The backend's private key (0x...)
   * @returns The signature as 0x string
   */
  static async getRegistrationSignature({
    user,
    timestamp,
  }: {
    user: Address;
    timestamp: bigint | number;
  }): Promise<Hex> {
    // The message must match the contract's expectation: keccak256(abi.encodePacked(user, timestamp))
    const privateKey = process.env.BACKEND_PRIVATE_KEY as Address;
    if (!privateKey) throw new Error('Private key not set in environment variables');

    const packed = encodePacked(['address', 'uint256'], [user, BigInt(timestamp)]);
    const hash = keccak256(packed);
    return signMessage({ privateKey, message: hash });
  }

  /**
   * Handles registration and timing, stores the result, and returns timing diff.
   */
  static async handleRegistration({
    stage,
    phase,
    timestamp,
    wallet,
    txHash,
  }: {
    stage: string;
    phase: string;
    timestamp: number;
    wallet: string;
    txHash: string;
  }) {
    // Simulate timing diff calculation (replace with real logic)
    const now = Date.now();
    const diff = now - timestamp;
    registrationStore.push({ wallet, stage, phase, timestamp, txHash, diff });
    return { wallet, stage, phase, timestamp, txHash, diff };
  }

  /**
   * Returns the timing diff for a specific address (wallet).
   */
  static async getTimingDiffForAddress(wallet: string) {
    // Return the latest diff for the wallet
    const entry = [...registrationStore].reverse().find((r) => r.wallet.toLowerCase() === wallet.toLowerCase());
    if (!entry) throw new Error('No registration found for this address');
    return entry.diff;
  }

  /**
   * Returns all timing diffs (leaderboard style).
   */
  static async getAllTimingDiffs() {
    // Return all entries, sorted by diff ascending (fastest first)
    return registrationStore.slice().sort((a, b) => a.diff - b.diff);
  }
}
