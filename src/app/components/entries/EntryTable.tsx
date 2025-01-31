import { useState } from 'react';
import type { Entry, EntryDetailType } from '../../state/types/entries';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import EntryEditForm from './EntryEditDetailForm';
import type { FormEvent } from 'react';

interface EntryTableProps {
    entries: Entry[];
}

export function EntryTable({ entries }: EntryTableProps) {
    const onSelect = (value: Entry) => { }
    const onEdit = (value: Entry) => { }
    const onDelete = (value: number) => {
        const id = value.toString();
        fetch(`/api/entry/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '1234567890'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Entry deleted:', data);
            })
            .catch(error => {
                console.error('Error deleting entry:', error);
            });
    }

    const [showEditForm, setShowEditForm] = useState(false);
    const [editingEntry, setEditingEntry] = useState<EntryDetailType | null>(null);
    /*  if (showEditForm && editingEntry) {
          return (
              <EntryEditForm
                  entry={editingEntry}
                  onSubmit={(e: FormEvent) => {
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
      }*/

    return (
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
                            <button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={() => onEdit(entry)}>
                                <PencilIcon className="h-5 w-5" />
                            </button>
                            <button className="text-red-600 hover:text-red-900" onClick={() => onDelete(entry.id)}>
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
} 