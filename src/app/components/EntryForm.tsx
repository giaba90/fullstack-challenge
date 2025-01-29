"use client";
import React, { useState } from "react";

function EntryForm() {
  const [newEntry, setNewEntry] = useState({
    user: "",
    country: "",
    ip: "",
    device: "",
    isDangerous: false,
    tags: [],
  });

  const handleInputChange = (e: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = e.target;
    setNewEntry((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.API_URL}/entry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Clear the form or redirect/refresh
      setNewEntry({
        user: "",
        country: "",
        ip: "",
        device: "",
        isDangerous: false,
        tags: [],
      });
      alert("Entry created successfully!");
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  };

  const handleAddTag = () => {
    setNewEntry((prevState) => ({
      ...prevState,
      tags: [...prevState.tags, { title: "", description: "", color: "" }],
    }));
  };

  const handleTagChange = (
    index: number,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedTags = newEntry.tags.map((tag, i) => {
      if (i === index) {
        return { ...tag, [name]: value };
      }
      return tag;
    });

    setNewEntry((prevState) => ({
      ...prevState,
      tags: updatedTags,
    }));
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = newEntry.tags.filter((_, i) => i !== index);
    setNewEntry((prevState) => ({ ...prevState, tags: updatedTags }));
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-bold mb-4">Create New Entry</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="user"
          >
            User
          </label>
          <input
            type="text"
            id="user"
            name="user"
            onChange={handleInputChange}
            value={newEntry.user}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="country"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            onChange={handleInputChange}
            value={newEntry.country}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="ip"
          >
            IP Address
          </label>
          <input
            type="text"
            id="ip"
            name="ip"
            onChange={handleInputChange}
            value={newEntry.ip}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="device"
          >
            Device
          </label>
          <input
            type="text"
            id="device"
            name="device"
            onChange={handleInputChange}
            value={newEntry.device}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="isDangerous"
            name="isDangerous"
            onChange={handleInputChange}
            checked={newEntry.isDangerous}
            className="mr-2 leading-tight"
          />
          <label
            className="text-gray-700 text-sm font-bold"
            htmlFor="isDangerous"
          >
            Is Dangerous
          </label>
        </div>
        <div className="mb-4">
          <h3 className="text-md font-bold mb-2">Tags</h3>
          {newEntry.tags.map((tag, index) => (
            <div
              key={index}
              className="flex flex-col border-b border-gray-200 last:border-b-0 pb-4 last:pb-0 mb-2"
            >
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`title-${index}`}
              >
                Title
              </label>
              <input
                type="text"
                id={`title-${index}`}
                name="title"
                value={tag.title}
                onChange={(e) => handleTagChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              />
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`description-${index}`}
              >
                Description
              </label>
              <textarea
                id={`description-${index}`}
                name="description"
                value={tag.description}
                onChange={(e) => handleTagChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              />
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`color-${index}`}
              >
                Color
              </label>
              <input
                type="color"
                id={`color-${index}`}
                name="color"
                value={tag.color}
                onChange={(e) => handleTagChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveTag(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Remove Tag
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTag}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Add Tag
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Entry
        </button>
      </form>
    </div>
  );
}

export default EntryForm;
