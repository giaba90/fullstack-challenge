import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import type { EntriesContextType, Entry } from "../state/types/entries";

const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

export const EntriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSelectedEntry, setIsSelectedEntry] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('/api/entry', {
          headers: {
            'x-api-key': '1234567890'
          }
        });
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error('Failed to fetch entries:', error);
      }
    };

    fetchEntries();
  }, []);

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
        isSelectedEntry,
        setIsSelectedEntry,
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
