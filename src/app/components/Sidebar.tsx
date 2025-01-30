import { useReducer } from "react";
import { useEntries } from "../context/EntriesContext";
import { PlusIcon } from "@heroicons/react/24/solid";
import { EntryTable } from "./entries/EntryTable";
import { entriesReducer, initialState } from "../state/reducers/entriesReducer";
import { Entry } from "@/state/types/entries";
import { useEffect, useState } from "react";
import { EntryNewForm } from "./entries/EntryNewForm";


export default function Sidebar() {/*
  const { entries: contextEntries, setSelectedEntry } = useEntries();
  const [state, dispatch] = useReducer(entriesReducer, {
    ...initialState,
    entries: contextEntries
  });

  const { entries, showNewForm, showEditForm, editingEntry, newEntry } = state;

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this entry?")) {
      dispatch({ type: 'DELETE_ENTRY', payload: id });
    }
  };

  const handleNewEntry = () => {
    dispatch({ type: 'SET_SHOW_NEW_FORM', payload: true });
    dispatch({ type: 'SET_SELECTED_ENTRY', payload: null });
  };

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.max(...entries.map(e => e.id), 0) + 1;
    dispatch({ type: 'ADD_ENTRY', payload: { ...newEntry, id } });
  };

  const handleEditClick = (entry: Entry, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'SET_EDITING_ENTRY', payload: entry });
    dispatch({ type: 'SET_SHOW_EDIT_FORM', payload: true });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEntry) {
      dispatch({
        type: 'UPDATE_ENTRY',
        payload: { id: editingEntry.id, entry: editingEntry }
      });
    }
  };

  const handleSelectEntry = (entry: Entry) => {
    setSelectedEntry(entry);
    dispatch({ type: 'SET_SELECTED_ENTRY', payload: entry });
  };*/
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
    <aside className="w-2/4 bg-white shadow-md p-4 overflow-y-auto">
      <section className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">List Entries</h2>
        <button
          onClick={() => setShowNewForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Entry
        </button>
      </section>

      {showNewForm && (
        <EntryNewForm
          isOpen={showNewForm}
          onClose={() => setShowNewForm(false)}
        />
      )}

      {entries.length > 0 ? (
        <EntryTable entries={entries} />
      ) : (
        <p className="text-gray-500 text-center py-4">No entries</p>
      )}
    </aside>
  );
}
