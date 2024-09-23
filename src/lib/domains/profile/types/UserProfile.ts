import type { ActivityHistory } from './ActivityHistory';
import type { DomainInfo } from './DomainInfo';
import type { Multipliers } from './Multipliers';
import type { PersonalInfo } from './PersonalInfo';
import type { UserStats } from './UserStats';

export type UserProfile = Partial<PersonalInfo> &
  Partial<UserStats> &
  Partial<ActivityHistory> &
  Partial<Multipliers> &
  Partial<DomainInfo>;
