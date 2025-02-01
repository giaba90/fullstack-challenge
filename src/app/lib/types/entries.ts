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

type EntryState = {
  entries: Entry[];
  selectedEntry: Entry | null;
  isEditing: boolean;
  showNewForm: boolean;
  showEditForm: boolean;
  editingEntry: Entry | null;
  newEntry: Entry;
};

type ValidationError = {
  [key: string]: string[] | undefined;
};

type EntriesContextType = {
  entries: Entry[];
  selectedEntry: Entry | null;
  setSelectedEntry: (entry: Entry | null) => void;
  updateEntry: (id: number, updatedEntry: Partial<Entry>) => void;
  deleteEntry: (id: number) => void;
  setIsEditing: (isEditing: boolean) => void;
  isEditing: boolean;
};

type EntryAction =
  | { type: "SET_SELECTED_ENTRY"; payload: Entry | null }
  | { type: "SET_IS_EDITING"; payload: boolean }
  | { type: "SET_SHOW_NEW_FORM"; payload: boolean }
  | { type: "SET_SHOW_EDIT_FORM"; payload: boolean }
  | { type: "SET_EDITING_ENTRY"; payload: Entry | null }
  | { type: "UPDATE_NEW_ENTRY"; payload: Entry }
  | { type: "ADD_ENTRY"; payload: Entry }
  | { type: "UPDATE_ENTRY"; payload: { id: number; entry: Partial<Entry> } }
  | { type: "DELETE_ENTRY"; payload: number };

export type {
  Entry,
  ValidationError,
  EntryDetailType,
  EntryAction,
  EntriesContextType,
  EntryState,
};
