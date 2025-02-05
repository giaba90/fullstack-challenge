"use client";

import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import { MainContentProvider } from "./context/MainContentContext";

export default function EntriesManager() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow flex">
        <MainContentProvider>
          <MainContent />
        </MainContentProvider>
      </div>
      <Footer />
    </div>
  );
}
