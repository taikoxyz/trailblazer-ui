export abstract class IRepository<T> {
  abstract save(leaderboardPage: T): Promise<void>;
  abstract update(leaderboardPage: T): Promise<void>;
}
