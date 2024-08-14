export type DomainResponse = {
  zns: string;
  dotTaiko: string;
  address: string;
};

export type DomainNames = {
  selected?: DomainType;
  dotTaiko?: string;
  zns?: string;
};

export enum DomainType {
  ADDRESS = 'ADDRESS',
  DOTTAIKO = 'DOTTAIKO',
  ZNS = 'ZNS',
}
