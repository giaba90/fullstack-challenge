import { z } from "zod";
import type { Entry, ValidationError } from "../../../lib/types/entries";
import { ENTRY_TYPES } from "../../../lib/types/entries";
import { useState } from "react";

interface EntryFormProps {
  entry: Entry;
  onClose: () => void;
  fetchEntries: () => void;
}

const entrySchema = z.object({
  applicationHostname: z.string().min(1, "Hostname is required"),
  type: z.enum(ENTRY_TYPES, {
    errorMap: () => ({ message: "Please select a valid type" }),
  }),
});

export function EntryEditForm({
  entry,
  onClose,
  fetchEntries,
}: EntryFormProps) {
  const [formData, setFormData] = useState(entry);
  const [errors, setErrors] = useState<ValidationError>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const entryData = {
      applicationHostname: formData.applicationHostname,
      type: formData.type,
    };

    try {
      // Validate the data
      const validatedData = entrySchema.parse(entryData);

      const response = await fetch(`/api/entry/${entry.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234567890",
        },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        alert("Entry updated successfully!");
        setErrors({});
        onClose();
        fetchEntries();
      } else {
        alert("Failed to update entry");
        console.error("Failed to update entry:", response.status);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors as ValidationError;
        setErrors(fieldErrors);
      } else {
        console.error("Error saving new entry:", error);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="mb-4 p-4 border rounded-lg">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hostname
          </label>
          <input
            type="text"
            name="applicationHostname"
            value={formData.applicationHostname}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.applicationHostname?.map((error, index) => (
            <p key={index} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select type</option>
            {ENTRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type?.map((error, index) => (
            <p key={index} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
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
      </div>
    </form>
  );
}
