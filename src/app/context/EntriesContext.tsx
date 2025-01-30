import type React from "react";
import { createContext, useState, useContext } from "react";

type Tag = {
  title: string,
  description: string,
  color: string
}

export type Entry = {
  id: number;
  application_hostname: string;
  timestamp: string;
  type: string;
  user: string;
  country: string;
  ip: string;
  device: string;
  tags: Tag[];
  isDangerous: boolean;
};

type EntriesContextType = {
  entries: Entry[];
  selectedEntry: Entry | null;
  setSelectedEntry: (entry: Entry | null) => void;
  addEntry: (entry: Omit<Entry, "id">) => void;
  updateEntry: (id: number, updatedEntry: Partial<Entry>) => void;
  deleteEntry: (id: number) => void;
  setIsEditing: (isEditing: boolean) => void;
  isEditing: boolean;
};

const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

export const EntriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: 1,
      application_hostname: "app1.example.com",
      timestamp: "2023-05-01 10:00:00",
      type: "access",
      user: "john.doe@example.com",
      country: "Italy",
      ip: "192.168.1.1",
      device: "iPhone",
      tags: [{
        title: "OK",
        description: "This is a description for OK tag",
        color: "#6EB72F"
      },
      {
        title: "NEW",
        description: "This is a NEW tag and it appears because loren ipsum dolor sit amet",
        color: "#026FBC"
      }],
      isDangerous: false,
    },
    // Aggiungi altri entries come necessario
  ]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const addEntry = (newEntry: Omit<Entry, "id">) => {
    const id = Math.max(...entries.map((e) => e.id), 0) + 1;
    setEntries([...entries, { ...newEntry, id }]);
  };

  const updateEntry = (id: number, updatedEntry: Partial<Entry>) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      )
    );
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
    }
  };

  return (
    <EntriesContext.Provider
      value={{
        entries,
        selectedEntry,
        setSelectedEntry,
        addEntry,
        updateEntry,
        deleteEntry,
        setIsEditing,
        isEditing,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};

export const useEntries = () => {
  const context = useContext(EntriesContext);
  if (context === undefined) {
    throw new Error("useEntries must be used within an EntriesProvider");
  }
  return context;
};
