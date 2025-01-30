import { useState } from "react";
import { useEntries } from "../context/EntriesContext";
import { PlusIcon } from "@heroicons/react/24/solid";
import { EntryTable } from "./entries/EntryTable";
import { EntryForm } from "./entries/EntryForm";
import type { Entry } from "../context/EntriesContext";

export default function Sidebar() {
  const { entries, setSelectedEntry, deleteEntry, setIsEditing, addEntry, updateEntry } = useEntries();
  const [showNewForm, setShowNewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [newEntry, setNewEntry] = useState<Entry>({
    id: 0,
    application_hostname: '',
    timestamp: '',
    type: '',
    user: '',
    country: '',
    ip: '',
    device: '',
    tags: [],
    isDangerous: false
  });

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this entry?")) {
      deleteEntry(id);
    }
  };

  const handleNewEntry = () => {
    setShowNewForm(true);
    setSelectedEntry(null);
  };

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    addEntry(newEntry);
    setShowNewForm(false);
  };

  const handleEditClick = (entry: Entry, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingEntry(entry);
    setShowEditForm(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEntry) {
      updateEntry(editingEntry.id, editingEntry);
    }
    setShowEditForm(false);
    setEditingEntry(null);
  };

  return (
    <aside className="w-2/4 bg-white shadow-md p-4 overflow-y-auto">
      <section className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">List Entries</h2>
        <button
          onClick={handleNewEntry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Entry
        </button>
      </section>

      {showNewForm && (
        <EntryForm
          entry={newEntry}
          onSubmit={handleSubmitNew}
          onChange={setNewEntry}
          onCancel={() => setShowNewForm(false)}
          submitLabel="Create"
        />
      )}

      {showEditForm && editingEntry && (
        <EntryForm
          entry={editingEntry}
          onSubmit={handleEditSubmit}
          onChange={setEditingEntry}
          onCancel={() => {
            setShowEditForm(false);
            setEditingEntry(null);
          }}
        />
      )}

      {entries.length > 0 ? (
        <EntryTable
          entries={entries}
          onSelect={setSelectedEntry}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      ) : (
        <p className="text-gray-500 text-center py-4">No entries</p>
      )}
    </aside>
  );
}
