"use client";
import React, { useState, useEffect } from "react";

interface EntriesListProps {
  onSelectEntry: (id: number) => void;
}

type Entry = {
  id: number;
  applicationHostname: string;
  timestamp: string;
  type: string;
};

function EntriesList({ onSelectEntry }: EntriesListProps) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/entry", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEntries(data);
      } catch (error: any) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading Entries...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-bold mb-4">Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id} className="mb-2 last:mb-0">
            <button
              onClick={() => onSelectEntry(entry.id)}
              className="w-full text-left bg-gray-100 hover:bg-gray-200 p-2 rounded text-black"
            >
              Entry Hostname: {entry.applicationHostname} - ID {entry.id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EntriesList;
