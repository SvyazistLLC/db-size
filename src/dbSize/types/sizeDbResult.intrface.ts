export interface SizeDbItem {
  DB_NAME: string;
  DB_TOTAL_MB: string;
  DB_FREE_MB: string;
  UTIL_PRC: string;
}

export type SizeDbResult = Array<SizeDbItem>;

export interface SizeResponse {
  [key: string]: number;
}
