"use client";
import React, { useState, useEffect } from "react";

function EntryDetail({ entryId }) {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.API_URL}/entrydetail/${entryId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEntry(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchEntry();
  }, [entryId]);

  if (loading) {
    return <div>Loading Entry Details...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!entry) {
    return (
      <div className="text-gray-500">
        Seleziona un entry per visualizzarne i dettagli
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-bold mb-4">Entry Details</h2>
      <div className="mb-4">
        <p>
          <span className="font-bold">ID:</span> {entry.id}
        </p>
        <p>
          <span className="font-bold">User:</span> {entry.user}
        </p>
        <p>
          <span className="font-bold">Country:</span> {entry.country}
        </p>
        <p>
          <span className="font-bold">IP:</span> {entry.ip}
        </p>
        <p>
          <span className="font-bold">Device:</span> {entry.device}
        </p>
        <p>
          <span className="font-bold">Is Dangerous:</span>{" "}
          {entry.isDangerous ? "Yes" : "No"}
        </p>
      </div>
      <div>
        <h3 className="text-md font-bold mb-2">Tags:</h3>
        <ul>
          {entry.tags.map((tag, index) => (
            <li
              key={index}
              className="mb-4 border-b border-gray-200 last:border-b-0 pb-4 last:pb-0"
            >
              <p>
                <span className="font-bold">Title:</span> {tag.title}
              </p>
              <p>
                <span className="font-bold">Description:</span>{" "}
                {tag.description}
              </p>
              <p>
                <span className="font-bold">Color:</span>{" "}
                <span
                  style={{ backgroundColor: tag.color }}
                  className="px-2 py-1 rounded-md text-white inline-block"
                >
                  {tag.color}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EntryDetail;
