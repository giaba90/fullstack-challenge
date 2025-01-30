"use client";

import { EntriesProvider } from "./context/EntriesContext";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

export default function EntriesManager() {
  return (
    <EntriesProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex-grow flex">
          <MainContent />
        </div>
        <Footer />
      </div>
    </EntriesProvider>
  );
}
