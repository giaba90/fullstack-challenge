import { ENTRY_TYPES, ValidationError } from "@/lib/types/entries";
import { z } from "zod";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { entryPostSchema } from "@/lib/validation";
import { TagInput } from "./UI/TagInput";
import { CheckboxField } from "./UI/CheckboxField";
import { SelectField } from "./UI/SelectField";
import { InputField } from "./UI/InputField";

interface EntryNewFormProps {
  isOpen: boolean;
  onClose: () => void;
  fetchEntries: () => void;
}

export interface EntryInputFieldProps {
  name: string;
  label: string;
  errors: Record<string, string[] | undefined>;
}

export interface EntrySelectFieldProps {
  name: string;
  label: string;
  options: typeof ENTRY_TYPES;
  errors: Record<string, string[] | undefined>;
}

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
      user: formData.get("user"),
      country: formData.get("country"),
      ip: formData.get("ip"),
      device: formData.get("device"),
      isDangerous: formData.get("isDangerous") === "on",
      tags: formData.getAll("tags").map((tag) => ({ title: tag })),
    };

    try {
      const validatedData = entryPostSchema.parse(entryData);
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
        setErrors(error.flatten().fieldErrors as ValidationError);
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
            <InputField
              name="applicationHostname"
              label="Hostname"
              errors={errors}
            />
            <SelectField
              name="type"
              label="Type"
              options={ENTRY_TYPES}
              errors={errors}
            />
            <InputField name="user" label="User" errors={errors} />
            <InputField name="country" label="Country" errors={errors} />
            <InputField name="ip" label="IP Address" errors={errors} />
            <InputField name="device" label="Device" errors={errors} />
            <CheckboxField
              name="isDangerous"
              label="Is Dangerous?"
              errors={errors}
            />
            {/* <TagInput name="tags" label="Tags" errors={errors} />*/}
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
