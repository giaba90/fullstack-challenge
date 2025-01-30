import { useState, useEffect } from "react";
import { useEntries } from "../context/EntriesContext";
import type { Entry } from '../state/types/entries';

export default function MainContent() {
  const {
    selectedEntry,
    updateEntry,
    setSelectedEntry,
    setIsEditing: setIsEditingContext,
    isEditing,
  } = useEntries();
  const [formData, setFormData] = useState<Entry>(
    selectedEntry || {
      id: 0,
      application_hostname: "",
      timestamp: "",
      type: "",
      user: "",
      country: "",
      ip: "",
      device: "",
      tags: [],
      isDangerous: false,
    }
  );

  useEffect(() => {
    if (!selectedEntry && !isEditing) {
      setFormData({
        id: 0,
        application_hostname: "",
        timestamp: "",
        type: "",
        user: "",
        country: "",
        ip: "",
        device: "",
        tags: [],
        isDangerous: false,
      });
    }
  }, [selectedEntry, isEditing]);

  useEffect(() => {
    if (selectedEntry) {
      setFormData(selectedEntry);
    }
  }, [selectedEntry]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("tags.")) {
      const [_, index, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        tags:
          prev.tags?.map((tag, i) =>
            i === parseInt(index) ? { ...tag, [field]: value } : tag
          ) || [],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEntry) {
      updateEntry(selectedEntry.id, formData);
    }
    setIsEditingContext(false);
  };

  const shouldShowForm = selectedEntry || isEditing;

  if (!shouldShowForm) {
    return (
      <main className="w-2/4 p-8 bg-white shadow-md ml-4">
        <p className="text-center text-gray-500">
          Select an entry or create a new entry
        </p>
      </main>
    );
  }

  return (
    <main className="w-2/4 p-8 bg-white shadow-md ml-4 relative">
      <button
        onClick={() => {
          setFormData({
            id: 0,
            application_hostname: "",
            timestamp: "",
            type: "",
            user: "",
            country: "",
            ip: "",
            device: "",
            tags: [],
            isDangerous: false,
          });
          setIsEditingContext(false);
          setSelectedEntry(null);
        }}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
        aria-label="Close form"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <h2 className="text-2xl font-bold mb-6">Entry Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">User</p>
          <p className="mt-1 text-sm text-gray-900">{selectedEntry?.user}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Country</p>
          <p className="mt-1 text-sm text-gray-900">{selectedEntry?.country}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">IP</p>
          <p className="mt-1 text-sm text-gray-900">{selectedEntry?.ip}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Device</p>
          <p className="mt-1 text-sm text-gray-900">{selectedEntry?.device}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Tags</p>
          <div className="mt-1">
            {selectedEntry?.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center space-x-2"
                style={{ backgroundColor: tag.color + "20" }}
              >
                <span className="block w-1/3 py-2 px-3 text-sm text-gray-900">
                  {tag.title}
                </span>
                <span className="block w-1/2 py-2 px-3 text-sm text-gray-700">
                  {tag.description}
                </span>
              </div>
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

      <button
        onClick={() => setIsEditingContext(true)}
        className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Edit
      </button>

      {isEditing && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              <span className="ml-2 block text-sm text-gray-900">
                Is Dangerous
              </span>
            </label>
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <div className="mt-1 space-y-2">
              {formData.tags?.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2"
                  style={{ backgroundColor: tag.color + "20" }}
                >
                  <span className="block w-1/3 py-2 px-3 text-sm text-gray-900">
                    {tag.title}
                  </span>
                  <span className="block w-1/2 py-2 px-3 text-sm text-gray-700">
                    {tag.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditingContext(false)}
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
      )}
    </main>
  );
}
