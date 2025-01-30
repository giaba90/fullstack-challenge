import type { Entry } from '../../state/types/entries';

const ENTRY_TYPES = ['WEB', 'MOBILE'] as const;

interface EntryFormProps {
    entry: Entry;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (entry: Entry) => void;
    onCancel: () => void;
    submitLabel?: string;
}

export function EntryForm({ entry, onSubmit, onChange, onCancel, submitLabel = 'Save' }: EntryFormProps) {
    return (
        <form onSubmit={onSubmit} className="mb-4 p-4 border rounded-lg">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Hostname</label>
                    <input
                        type="text"
                        name="applicationHostname"
                        value={entry.applicationHostname}
                        onChange={(e) => onChange({ ...entry, applicationHostname: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                        name="type"
                        value={entry.type}
                        onChange={(e) => onChange({ ...entry, type: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select type</option>
                        {ENTRY_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
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
            </div>
        </form>
    );
}
