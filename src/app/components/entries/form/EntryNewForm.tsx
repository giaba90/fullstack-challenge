import { ENTRY_TYPES, ValidationError } from "@/lib/types/entries";
import { z } from "zod";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface EntryNewFormProps {
  isOpen: boolean;
  onClose: () => void;
  fetchEntries: () => void;
}

const entrySchema = z.object({
  applicationHostname: z.string().min(1, "Hostname is required"),
  type: z.enum(ENTRY_TYPES, {
    errorMap: () => ({ message: "Please select a valid type" }),
  }),
});

export function EntryNewForm({
  isOpen,
  onClose,
  fetchEntries,
}: EntryNewFormProps) {
  const [errors, setErrors] = useState<ValidationError>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const entryData = {
      applicationHostname: formData.get("applicationHostname"),
      type: formData.get("type"),
    };

    try {
      // Validate the data
      const validatedData = entrySchema.parse(entryData);

      const response = await fetch("/api/entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234567890",
        },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        alert("New entry saved successfully!");
        setErrors({});
        onClose();
        fetchEntries();
      } else {
        alert("Failed to save new entry");
        console.error("Failed to save new entry:", response.status);
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
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded bg-white p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium">
              New Entry
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hostname
              </label>
              <input
                type="text"
                name="applicationHostname"
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
            <div className="flex justify-between mt-6">
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
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
