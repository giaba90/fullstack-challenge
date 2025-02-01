import { useState } from "react";
import { EntryInputFieldProps } from "../EntryNewForm";

interface Tag {
  title: string;
  description: string;
  color: string;
}

export function TagInput({ name, label, errors }: EntryInputFieldProps) {
  const fieldErrors = errors[name] ?? [];
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState<Tag>({
    title: "",
    description: "",
    color: "",
  });

  const handleAddTag = () => {
    if (newTag.title && newTag.description && newTag.color) {
      setTags([...tags, newTag]);
      setNewTag({ title: "", description: "", color: "" });
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Title"
          value={newTag.title}
          onChange={(e) => setNewTag({ ...newTag, title: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTag.description}
          onChange={(e) =>
            setNewTag({ ...newTag, description: e.target.value })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        />
        <input
          type="text"
          placeholder="Color"
          value={newTag.color}
          onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="bg-indigo-600 text-white px-3 py-1 rounded-md"
        >
          Add
        </button>
      </div>

      <ul className="mt-2">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded-md"
          >
            <span>
              {tag.title} - {tag.description} ({tag.color})
            </span>
            <button
              type="button"
              onClick={() => handleRemoveTag(index)}
              className="text-red-500"
            >
              X
            </button>
          </li>
        ))}
      </ul>
      {fieldErrors.map((error, index) => (
        <p key={index} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ))}
      {/* hidden field for send data*/}
      <input type="hidden" name={name} value={JSON.stringify(tags)} />
    </div>
  );
}
