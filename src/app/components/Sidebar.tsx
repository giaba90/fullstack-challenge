import { useState } from "react";
import { useEntries } from "../context/EntriesContext";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import type { Entry } from "../context/EntriesContext";

const ENTRY_TYPES = ['WEB', 'MOBILE'] as const;

export default function Sidebar() {
  const { entries, setSelectedEntry, deleteEntry, setIsEditing, addEntry } = useEntries();
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

  const handleDelete = (id: number) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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

      {showNewForm ? (
        <form onSubmit={handleSubmitNew} className="mb-4 p-4 border rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Hostname</label>
              <input
                type="text"
                name="application_hostname"
                value={newEntry.application_hostname}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                name="type"
                value={newEntry.type}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select type</option>
                {ENTRY_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowNewForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      ) : null}

      {showEditForm && editingEntry ? (
        <form onSubmit={handleEditSubmit} className="mb-4 p-4 border rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Hostname</label>
              <input
                type="text"
                name="application_hostname"
                value={editingEntry.application_hostname}
                onChange={(e) => setEditingEntry({ ...editingEntry, application_hostname: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                name="type"
                value={editingEntry.type}
                onChange={(e) => setEditingEntry({ ...editingEntry, type: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select type</option>
                {ENTRY_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowEditForm(false);
                  setEditingEntry(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      ) : null}

      {entries.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hostname
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries.map((entry) => (
              <tr
                key={entry.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedEntry(entry)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {entry.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.application_hostname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                    onClick={(e) => handleEditClick(entry, e)}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(entry.id);
                    }}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center py-4">No entries</p>
      )}
    </aside>
  );
}
