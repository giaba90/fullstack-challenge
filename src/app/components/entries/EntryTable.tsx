import { useState } from 'react';
import { MouseEvent } from 'react';
import type { Entry } from '../../state/types/entries';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import EntryEditForm from './EntryEditDetailForm';

interface EntryTableProps {
    entries: Entry[];
}

export function EntryTable({ entries }: EntryTableProps) {
    const onSelect = (value: Entry) => { }
    const onEdit = (value: Entry, e: MouseEvent<HTMLButtonElement, MouseEvent>) => { }
    const onDelete = (value: number, e: MouseEvent<HTMLButtonElement, MouseEvent>) => { }

    const [showEditForm, setShowEditForm] = useState(false);
    const [editingEntry, setEditingEntry] = useState(false);
    if (showEditForm && editingEntry) {
        return (
            <EntryEditForm
                entry={editingEntry}
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    if (editingEntry) {
                        // Handle update
                    }
                }}
                onChange={(entry) => setEditingEntry(entry)}
                onCancel={() => {
                    setShowEditForm(false);
                    setEditingEntry(null);
                }}
            />
        )
    }

    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostname</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onSelect(entry)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.applicationHostname}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.timestamp}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={(e) => onEdit(entry, e)}>
                            <PencilIcon className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900" onClick={(e) => onDelete(entry.id, e)}>
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>

} 