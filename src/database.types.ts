export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public: any;
};
