import { useState, useEffect } from "react";
import { useEntries } from "../context/EntriesContext";

export default function MainContent() {
  const { selectedEntry, updateEntry, addEntry } = useEntries();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(selectedEntry || {});

  useEffect(() => {
    if (selectedEntry) {
      setFormData(selectedEntry);
      setIsEditing(false);
    } else {
      setFormData({});
      setIsEditing(true);
    }
  }, [selectedEntry]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEntry) {
      updateEntry(selectedEntry.id, formData);
    } else {
      addEntry(formData as any);
    }
    setIsEditing(false);
  };

  if (!selectedEntry && !isEditing) {
    return (
      <main className="w-2/4 p-8 bg-white shadow-md ml-4">
        <p className="text-center text-gray-500">
          Select an entry or create a new entry
        </p>
      </main>
    );
  }

  return (
    <main className="w-2/4 p-8 bg-white shadow-md ml-4">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing
          ? selectedEntry
            ? "Edit Entry"
            : "New Entry"
          : "Entry Details"}
      </h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="application_hostname"
              className="block text-sm font-medium text-gray-700"
            >
              Hostname
            </label>
            <input
              type="text"
              id="application_hostname"
              name="application_hostname"
              value={formData.application_hostname || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
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
              htmlFor="ip"
              className="block text-sm font-medium text-gray-700"
            >
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
              <span className="ml-2 block text-sm text-gray-900">
                Is Dangerous
              </span>
            </label>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
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
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">User</p>
            <p className="mt-1 text-sm text-gray-900">{selectedEntry?.user}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Country</p>
            <p className="mt-1 text-sm text-gray-900">
              {selectedEntry?.country}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">IP</p>
            <p className="mt-1 text-sm text-gray-900">{selectedEntry?.ip}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Device</p>
            <p className="mt-1 text-sm text-gray-900">
              {selectedEntry?.device}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tags</p>
            <div className="mt-1">
              {selectedEntry?.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Is Dangerous</p>
            <p className="mt-1 text-sm text-gray-900">
              {selectedEntry?.isDangerous ? "Yes" : "No"}
            </p>
          </div>
        </div>
      )}
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit
        </button>
      )}
    </main>
  );
}
