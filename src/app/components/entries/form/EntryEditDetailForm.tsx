import { entryDetailSchema } from "@/lib/validation";
import type {
  EntryDetailType,
  ValidationError,
} from "../../../lib/types/entries";
import { useState } from "react";
import { z } from "zod";

interface EntryEditFormProps {
  entry: EntryDetailType;
  onClose: () => void;
}

export default function EntryEditDetailForm({
  entry,
  onClose,
}: EntryEditFormProps) {
  const [formData, setFormData] = useState(entry);
  const [errors, setErrors] = useState<ValidationError>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const entryData = {
      user: formData.user,
      country: formData.country,
      ip: formData.ip,
      device: formData.device,
      isDangerous: formData.isDangerous,
      tags: formData.tags,
    };

    try {
      // Validate the data
      const validatedData = entryDetailSchema.parse(entryData);

      const response = await fetch(`/api/entrydetail/${entry.id}`, {
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
