import { EntryDetailType } from "@/lib/types/entries";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

interface EntryDetailProps {
  entry: EntryDetailType;
  onClose: () => void;
  fetchEntries: () => void;
}

export function EntryDetail({
  entry,
  onClose,
  fetchEntries,
}: EntryDetailProps) {
  const onDelete = async (value: number) => {
    const id = value.toString();
    try {
      const response = await fetch(`/api/entrydetail/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234567890",
        },
      });
      if (response.ok) {
        alert("Entry detail eliminated");
        fetchEntries();
      } else {
        alert("Failed to delete entry detail");
        console.error("Failed to delete entry detail:", response.status);
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="space-y-6 shadow sm:rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-6">Entry Detail</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">User</p>
          <p className="mt-1 text-sm text-gray-900">{entry.user}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Country</p>
          <p className="mt-1 text-sm text-gray-900">{entry.country}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">IP</p>
          <p className="mt-1 text-sm text-gray-900">{entry.ip}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Device</p>
          <p className="mt-1 text-sm text-gray-900">{entry.device}</p>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">Tags</p>
        <div className="mt-1 flex flex-nowrap flex-col">
          {entry.tags.map((tag, index) => (
            <span
              key={index}
              style={{ backgroundColor: tag.color }}
              className="inline-flex items-center px-2.5 py-0.5 my-0.5 font-medium  mr-2"
            >
              {tag.title} - {tag.description}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">Is Dangerous</p>
        <p className="mt-1 text-sm text-gray-900">
          {entry.isDangerous ? "Yes" : "No"}
        </p>
      </div>
      <div className="text-right">
        <button
          className="text-red-600 hover:text-red-900"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(entry.id);
          }}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
