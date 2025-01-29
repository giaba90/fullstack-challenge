"use client";
import React, { useState } from "react";
import EntriesList from "./components/EntriesList";
import EntryDetail from "./components/EntryDetail";
import EntryForm from "./components/EntryForm";

function App() {
  const [selectedEntryId, setSelectedEntryId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  interface Entry {
    id: number;
    // Add other entry properties here
  }

  const handleSelectEntry = (id: number) => {
    setSelectedEntryId(id);
    setIsCreating(false);
  };

  const handleCreateNewEntry = () => {
    setSelectedEntryId(null);
    setIsCreating(true);
  };

  return (
    <div className="font-sans antialiased h-screen flex flex-col">
      <nav className="bg-gray-800 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Cleafy CRUD App</h1>
          <button
            onClick={handleCreateNewEntry}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New Entry
          </button>
        </div>
      </nav>

      <main className="container mx-auto flex flex-1 p-4">
        <aside className="w-1/4 mr-4">
          <EntriesList onSelectEntry={handleSelectEntry} />
        </aside>
        <div className="flex-1">
          {isCreating ? (
            <EntryForm />
          ) : selectedEntryId ? (
            <EntryDetail entryId={selectedEntryId} />
          ) : (
            <p className="text-gray-500">
              Seleziona un'entry dalla lista o creane una nuova.
            </p>
          )}
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© {new Date().getFullYear()} Cleafy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
