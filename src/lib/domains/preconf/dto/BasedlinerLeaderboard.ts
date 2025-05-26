// DTO for BasedlinerLeaderboard, matching the Go backend type
export interface BasedlinerLeaderboard {
  phase1?: number | null;
  phase2?: number | null;
  diff?: number | null;
  address: string;
  rank: number;
}
