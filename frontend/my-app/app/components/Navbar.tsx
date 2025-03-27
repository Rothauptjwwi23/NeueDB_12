"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Diese Version enthält einen Test-Text, um zu prüfen, ob die Datei überhaupt geladen wird
export default function Navbar() {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    date: "",
    category: "",
    keyword: "",
  });

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleSearch = () => {
    console.log("Search parameters:", filters);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b border-gray-800/30 shadow-md">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="bg-gradient-to-br from-primary to-secondary p-1.5 rounded-md shadow-sm group-hover:shadow-primary/20 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-white to-primary/50 bg-clip-text text-transparent">
              EventBooking - TEST
            </span>
          </Link>
        </div>

        {/* Navigation Links - Center */}
        <nav className="hidden md:flex mx-4">
          <ul className="flex gap-6">
            <li>
              <Link 
                href="/" 
                className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-gray-800/30 transition-colors text-sm font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/events" 
                className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-gray-800/30 transition-colors text-sm font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Events</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/bookings" 
                className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-gray-800/30 transition-colors text-sm font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  <path d="m9 14 2 2 4-4"></path>
                </svg>
                <span>My Bookings</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Actions Section */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <button
            onClick={toggleFilters}
            className="bg-primary hover:bg-secondary px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition-all shadow-sm hover:shadow-primary/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span className="hidden sm:inline">TESTBUTTON</span>
          </button>
          
          {/* Test Login Button */}
          <button
            onClick={() => console.log("Test login clicked")}
            className="bg-secondary hover:bg-primary px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition-all shadow-sm hover:shadow-primary/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            <span className="hidden sm:inline">TEST LOGIN</span>
          </button>
          
          {/* Mobile menu button - shows on smaller screens */}
          <button className="md:hidden flex items-center p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Dropdown */}
      <AnimatePresence>
        {filtersVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 mt-1 bg-card-bg/95 backdrop-blur-md text-white p-4 rounded-md shadow-xl border border-gray-700/50 w-80 z-50"
          >
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              TEST FILTER
            </h3>
            
            <div className="space-y-3">
              <div className="form-group">
                <label className="text-gray-300 text-xs mb-1 block">Location</label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                  placeholder="Enter location"
                  className="w-full bg-gray-700/50 border border-gray-600/50 focus:border-primary rounded"
                />
              </div>

              <div className="form-group">
                <label className="text-gray-300 text-xs mb-1 block">Date</label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) =>
                    setFilters({ ...filters, date: e.target.value })
                  }
                  className="w-full bg-gray-700/50 border border-gray-600/50 focus:border-primary rounded"
                />
              </div>

              <div className="form-group">
                <label className="text-gray-300 text-xs mb-1 block">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  className="w-full bg-gray-700/50 border border-gray-600/50 focus:border-primary rounded"
                >
                  <option value="">All Categories</option>
                  <option value="Sport">Sports</option>
                  <option value="Education">Education</option>
                  <option value="Concert">Concert</option>
                  <option value="Networking">Networking</option>
                  <option value="Workshop">Workshop</option>
                </select>
              </div>

              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Keyword"
                  className="flex-1 bg-gray-700/50 border border-gray-600/50 focus:border-primary rounded"
                  value={filters.keyword}
                  onChange={(e) =>
                    setFilters({ ...filters, keyword: e.target.value })
                  }
                />
                <button
                  onClick={handleSearch}
                  className="bg-primary hover:bg-secondary px-2 rounded flex items-center justify-center transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}