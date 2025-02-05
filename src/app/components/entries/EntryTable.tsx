import { useState } from "react";
import type { Entry, EntryDetailType } from "../../lib/types/entries";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { EntryEditForm } from "./form/EntryEditForm";
import { EntryDetail } from "@/components/entries/EntryDetail";
import { useMainContent } from "@/context/MainContentContext";

export function EntryTable() {
  const { fetchEntries, entries } = useMainContent();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showEntryDetail, setShowEntryDetail] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<EntryDetailType | null>(
    null
  );

  const onSelect = async (value: Number) => {
    const val = await fetch(`/api/entrydetail/${value}`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "1234567890",
      },
    });
    const data = await val.json();
    if (data.status == 404) {
      alert("Entry detail not found");
    } else {
      setSelectedEntry(data);
      setShowEntryDetail(true);
    }
  };

  const onEdit = (value: Entry) => {
    setShowEditForm(true);
    setEditingEntry(value);
  };

  const onDelete = async (value: number) => {
    const id = value.toString();
    try {
      const response = await fetch(`/api/entry/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234567890",
        },
      });
      if (response.ok) {
        alert("Entry eliminated");
        fetchEntries();
      } else {
        alert("Failed to delete entry");
        console.error("Failed to delete entry:", response.status);
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  if (showEditForm && editingEntry) {
    return (
      <EntryEditForm
        entry={editingEntry}
        onClose={() => setShowEditForm(false)}
        fetchEntries={fetchEntries}
      />
    );
  }

  return (
    <>
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
              onClick={() => onSelect(entry.id)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {entry.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {entry.applicationHostname}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(entry);
                  }}
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(entry.id);
                  }}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEntryDetail && selectedEntry && (
        <EntryDetail
          entry={selectedEntry}
          onClose={() => setShowEntryDetail(false)}
          setShowEntryDetail={() => setShowEntryDetail(false)}
          fetchEntries={fetchEntries}
        />
      )}
    </>
  );
}
