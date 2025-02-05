type Tag = {
  title: string;
  description: string;
  color: string;
};

type EntryDetailType = {
  id: number;
  user: string;
  country: string;
  ip: string;
  device: string;
  tags: Tag[];
  isDangerous: boolean;
};

type Entry = {
  id: number;
  applicationHostname: string;
  timestamp: string;
  type: string;
};

export const ENTRY_TYPES = ["WEB", "MOBILE"] as const;

type ValidationError = {
  [key: string]: string[] | undefined;
};

export type { Entry, ValidationError, EntryDetailType };
