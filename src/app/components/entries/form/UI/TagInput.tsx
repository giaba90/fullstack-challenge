import { EntryInputFieldProps } from "./EntryNewForm";

export function TagInput({ name, label, errors }: EntryInputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {errors[name]?.map((error, index) => (
        <p key={index} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ))}
    </div>
  );
}
