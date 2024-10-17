import gamingDetailsMappingRaw from '$lib/domains/leaderboard/data/gamingDetailsMapping.json';

interface GamingDetails {
  handle: string;
  icon: string;
}

const gamingDetailsMapping: Record<string, GamingDetails> = gamingDetailsMappingRaw as Record<string, GamingDetails>;

/**
 * Maps a protocol name to its corresponding gaming details.
 *
 * @param {string} protocolName - The name of the protocol.
 * @return {GamingDetails | undefined} - The mapped gaming details or undefined if not found.
 */
export function mapGamingDetails(protocolName: string): GamingDetails | undefined {
  if (!protocolName) return undefined;

  const key = protocolName;
  return gamingDetailsMapping[key];
}
