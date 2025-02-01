import type { EntryDetailType } from "../../../lib/types/entries";
import { useState } from "react";
interface EntryEditFormProps {
  entry: EntryDetailType;
  onClose: () => void;
}

export default function EntryEditDetailForm({
  entry,
  onClose,
}: EntryEditFormProps) {
  const [formData, setFormData] = useState(entry);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement; // Cast esplicito per HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // Gestione della checkbox e del testo
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logica di invio del modulo
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label
          htmlFor="user"
          className="block text-sm font-medium text-gray-700"
        >
          User
        </label>
        <input
          type="text"
          id="user"
          name="user"
          value={formData.user || ""}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="ip" className="block text-sm font-medium text-gray-700">
          IP
        </label>
        <input
          type="text"
          id="ip"
          name="ip"
          value={formData.ip || ""}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700"
        >
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country || ""}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="device"
          className="block text-sm font-medium text-gray-700"
        >
          Device
        </label>
        <input
          type="text"
          id="device"
          name="device"
          value={formData.device || ""}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="isDangerous" className="flex items-center">
          <input
            type="checkbox"
            id="isDangerous"
            name="isDangerous"
            checked={formData.isDangerous || false}
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span className="ml-2 block text-sm text-gray-900">Is Dangerous</span>
        </label>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
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
    </form>
  );
}
