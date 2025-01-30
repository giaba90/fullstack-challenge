import React from 'react';

interface EntryDetailProps {
    label: string;
    value: string | undefined | null;
}

const EntryDetail: React.FC<EntryDetailProps> = ({ label, value }) => (
    <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-sm text-gray-900">{value}</p>
    </div>
);

export default EntryDetail; 