import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { EntryTable } from "./entries/EntryTable";
import { Entry } from "@/state/types/entries";
import { EntryNewForm } from "./entries/form/EntryNewForm";

export default function MainContent() {

  const [entries, setEntries] = useState<Entry[]>([]);
  const [showNewForm, setShowNewForm] = useState<boolean>(false);

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

  return (
    <main className="p-8 bg-white shadow-md w-full">
      <section className="flex items-center mb-4 justify-end">
        <button
          onClick={() => setShowNewForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Entry
        </button>
        {showNewForm && (
          <EntryNewForm
            isOpen={showNewForm}
            onClose={() => setShowNewForm(false)}
          />
        )}
      </section>
      <h2 className="text-lg font-semibold">List Entries</h2>
      {entries.length > 0 ? (
        <EntryTable entries={entries} />
      ) : (
        <p className="text-gray-500 text-center py-4">No entries</p>
      )}
    </main>
  );
};

