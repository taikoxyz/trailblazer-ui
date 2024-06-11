import type { IToDo } from './types/types';

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: IToDo;
};
