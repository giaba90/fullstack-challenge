// src/context/MainContentContext.tsx
import { Entry } from "@/lib/types/entries";
import { createContext, useContext, useState, ReactNode } from "react";

interface MainContentContextProps {
  isOpen: boolean;
  entries: Entry[];
  onClick: () => void;
  onClose: () => void;
  fetchEntries: () => void;
}

const MainContentContext = createContext<MainContentContextProps | undefined>(
  undefined
);

export const MainContentProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);

  const onClick = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/entry", {
        headers: {
          "x-api-key": "1234567890",
        },
      });
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    }
  };

  return (
    <MainContentContext.Provider
      value={{
        isOpen,
        onClick,
        onClose,
        fetchEntries,
        entries: entries as Entry[],
      }}
    >
      {children}
    </MainContentContext.Provider>
  );
};

export const useMainContent = () => {
  const context = useContext(MainContentContext);
  if (!context) {
    throw new Error("useMainContent must be used inside MainContentProvider");
  }
  return context;
};
