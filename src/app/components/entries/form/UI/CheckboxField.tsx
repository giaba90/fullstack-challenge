import { EntryInputFieldProps } from "../EntryNewForm";

export function CheckboxField({ name, label, errors }: EntryInputFieldProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        name={name}
        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
      />
      <label className="ml-2 block text-sm text-gray-900">{label}</label>
      {errors[name]?.map((error, index) => (
        <p key={index} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ))}
    </div>
  );
}
