import type { EntryDetailType } from "../../../state/types/entries";

interface EntryEditFormProps {
  entry: EntryDetailType;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (entry: EntryDetailType) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export default function EntryEditDetailForm({
  entry,
  onSubmit,
  onChange,
  onCancel,
  submitLabel = "Save",
}: EntryEditFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onChange({
      ...entry,
      [name]: type === "checkbox" ? checked : value,
    });
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
          value={entry.user || ""}
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
          value={entry.ip || ""}
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
          value={entry.country || ""}
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
          value={entry.device || ""}
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
            checked={entry.isDangerous || false}
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span className="ml-2 block text-sm text-gray-900">Is Dangerous</span>
        </label>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
