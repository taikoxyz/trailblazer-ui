declare module 'ethereum-address' {
  export function isAddress(address: string): boolean;
  export function isChecksumAddress(address: string): boolean;
}
declare module '$env/static/private' {
  export const API_KEY: string;
}
