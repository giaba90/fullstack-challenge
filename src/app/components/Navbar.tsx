import { PlusIcon } from "@heroicons/react/24/solid";
import { useEntries } from "../context/EntriesContext";

export default function Navbar() {
  const { setSelectedEntry } = useEntries();

  const handleNewEntry = () => {
    setSelectedEntry(null); // This will trigger the creation of a new entry
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold text-gray-800">Entries Manager</h1>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleNewEntry}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nuovo Entry
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
