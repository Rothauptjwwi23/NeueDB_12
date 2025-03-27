// Pfad: my-app/app/components/Header.tsx

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface User {
  _id?: string;
  name?: string;
  email?: string;
}

export default function Header() {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [user, setUser] = useState<User | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filterzustand
  const [filters, setFilters] = useState({
    location: "",
    date: "",
    category: "",
    keyword: "",
  });

  // Login-Zustand
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Registrierungs-Zustand
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  const router = useRouter();

  // Beim Laden Auth prüfen
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const userData = JSON.parse(userJson);
        setUser(userData);
      } catch (error) {
        console.error("Fehler beim Parsen des Benutzers:", error);
        localStorage.removeItem("user");
      }
    }
  };

  // Auth Modal öffnen/schließen
  const toggleAuthModal = () => {
    setIsAuthModalOpen(!isAuthModalOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  // Filter-Dropdown
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  // Mobile-Menü
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (filtersVisible) setFiltersVisible(false);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };

  // Filter-Suche
  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (filters.keyword.trim() !== "") {
      searchParams.append("search", filters.keyword.trim());
    }
    if (filters.location.trim() !== "") {
      searchParams.append("location", filters.location.trim());
    }
    if (filters.date.trim() !== "") {
      searchParams.append("date", filters.date.trim());
    }
    if (filters.category.trim() !== "") {
      searchParams.append("category", filters.category.trim());
    }
    router.push(`/?${searchParams.toString()}`);
    setFiltersVisible(false);
  };

  // Tabs (Login/Registrieren) wechseln
  const switchTab = (tab: "login" | "register") => {
    setActiveTab(tab);
    setLoginError("");
    setRegisterError("");
    setRegisterSuccess("");
  };

  // Logout
  const handleLogout = async () => {
    localStorage.removeItem("user");
    setUser(null);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    }
    window.location.href = "/";
  };

  // Login absenden
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthModalOpen(false);
        setLoginEmail("");
        setLoginPassword("");
        window.location.href = "/";
      } else {
        setLoginError(data.message || "Login fehlgeschlagen");
      }
    } catch (err) {
      setLoginError("Ein Fehler ist aufgetreten");
      console.error(err);
    }
  };

  // Registrieren absenden
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setRegisterSuccess("Registrierung erfolgreich! Du kannst dich jetzt einloggen.");
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");

        // Nach kurzer Zeit zum Login-Tab
        setTimeout(() => {
          switchTab("login");
        }, 2000);
      } else {
        setRegisterError(data.message || "Registrierung fehlgeschlagen");
      }
    } catch (err) {
      setRegisterError("Ein Fehler ist aufgetreten");
      console.error(err);
    }
  };

  // Klick außerhalb schließt Menüs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isUserMenuOpen && !target.closest(".user-menu-container")) {
        setIsUserMenuOpen(false);
      }
      if (filtersVisible && !target.closest(".filter-container") && !target.closest(".filter-button")) {
        setFiltersVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen, filtersVisible]);

  return (
    <>
      {/* HEADER-BEREICH */}
      <header className="fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-md z-50 border-b border-gray-800/40 shadow-lg">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="bg-gradient-to-br from-primary to-secondary p-1.5 rounded-md shadow-sm group-hover:shadow-primary/20 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </span>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-primary/80 tracking-wide">
                EventBooker
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex mx-4">
            <ul className="flex gap-4 sm:gap-6">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-gray-800/50 transition-colors text-sm font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-gray-800/50 transition-colors text-sm font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>Events hinzufügen</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/bookings"
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-gray-800/50 transition-colors text-sm font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <path d="m9 14 2 2 4-4"></path>
                  </svg>
                  <span>Meine Buchungen</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Action-Buttons (Filter, Login, User-Menü) */}
          <div className="flex items-center gap-3">
            {/* Filter-Button */}
            <button
              onClick={toggleFilters}
              className="filter-button bg-primary hover:bg-primary/90 px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition-all shadow-md hover:shadow-primary/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span className="text-xs sm:text-sm">Events suchen</span>
            </button>

            {/* Login / User-Menü */}
            {user ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="bg-secondary hover:bg-secondary/90 px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition-all shadow-md hover:shadow-secondary/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span className="text-xs sm:text-sm">{user.name || "Mein Konto"}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card-bg backdrop-blur-md rounded-md shadow-xl border border-gray-700/50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-700/30">
                      <p className="text-sm font-medium text-white">
                        {user.name || "Benutzer"}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user.email || ""}
                      </p>
                    </div>
                    <div className="py-1 border-t border-gray-700/30">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800/50 transition-colors text-red-400 hover:text-red-300"
                      >
                        Ausloggen
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={toggleAuthModal}
                className="bg-secondary hover:bg-secondary/90 px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition-all shadow-md hover:shadow-secondary/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                <span className="text-xs sm:text-sm">Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter-Dropdown - KOMPAKTE VERSION */}
        <AnimatePresence>
          {filtersVisible && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="filter-container absolute right-4 mt-1 bg-card-bg backdrop-blur-md text-white p-2 rounded-md shadow-xl border border-gray-700/50 w-52 z-50 text-xs"
            >
              <h3 className="text-xs font-semibold mb-1 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                Veranstaltungen filtern
              </h3>

              <div className="grid grid-cols-1 gap-1">
                <div className="form-group">
                  <label className="text-xs text-gray-300 mb-0.5 block">Ort</label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    placeholder="Ort eingeben"
                    className="w-full bg-gray-800/50 border border-gray-700/50 focus:border-primary rounded text-xs py-1 px-2 h-7"
                  />
                </div>
                <div className="form-group">
                  <label className="text-xs text-gray-300 mb-0.5 block">Datum</label>
                  <input
                    type="date"
                    value={filters.date}
                    onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                    className="w-full bg-gray-800/50 border border-gray-700/50 focus:border-primary rounded text-xs py-1 px-2 h-7"
                  />
                </div>
                <div className="form-group">
                  <label className="text-xs text-gray-300 mb-0.5 block">Kategorie</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full bg-gray-800/50 border border-gray-700/50 focus:border-primary rounded text-xs py-1 px-2 h-7"
                  >
                    <option value="">Alle Kategorien</option>
                    <option value="Sport">Sport</option>
                    <option value="Weiterbildung">Weiterbildung</option>
                    <option value="Konzert">Konzert</option>
                    <option value="Networking">Networking</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>
                <div className="flex gap-1 mt-1">
                  <input
                    type="text"
                    placeholder="Suchbegriff"
                    className="flex-1 bg-gray-800/50 border border-gray-700/50 focus:border-primary rounded text-xs py-1 px-2 h-7"
                    value={filters.keyword}
                    onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-primary hover:bg-primary/90 w-7 h-7 rounded flex items-center justify-center transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
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

      {/* Platzhalter, damit der Content nicht hinter dem Header verschwindet */}
      <div className="h-16"></div>

      {/* Auth-Modal (Login / Registrieren) - KOMPAKTE VERSION */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
              onClick={toggleAuthModal}
            ></div>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-card-bg rounded-lg shadow-xl border border-gray-700/50 w-full max-w-sm relative z-10 overflow-hidden"
            >
              {/* Tabs oben */}
              <div className="flex border-b border-gray-700/50">
                <button
                  className={`flex-1 py-2 font-medium text-sm transition-colors ${
                    activeTab === "login"
                      ? "text-white border-b-2 border-primary"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                  onClick={() => switchTab("login")}
                >
                  Login
                </button>
                <button
                  className={`flex-1 py-2 font-medium text-sm transition-colors ${
                    activeTab === "register"
                      ? "text-white border-b-2 border-primary"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                  onClick={() => switchTab("register")}
                >
                  Registrieren
                </button>
                <button
                  onClick={toggleAuthModal}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Login-Form */}
              {activeTab === "login" && (
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-3 text-white">Willkommen zurück</h2>

                  {loginError && (
                    <div className="mb-3 p-2 bg-red-900/30 border-l-4 border-red-500 text-red-300 text-xs">
                      {loginError}
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="flex flex-col items-center">
                    <div className="mb-3 w-3/4">
                      <label
                        htmlFor="email"
                        className="block text-gray-300 text-xs mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full p-2 text-sm bg-gray-800/50 border border-gray-700/50 focus:border-primary rounded-md text-white"
                        required
                      />
                    </div>
                    <div className="mb-4 w-3/4">
                      <div className="flex justify-between items-center mb-1">
                        <label
                          htmlFor="password"
                          className="block text-gray-300 text-xs"
                        >
                          Passwort
                        </label>
                        <a
                          href="#"
                          className="text-xs text-primary hover:text-secondary transition-colors"
                        >
                          Passwort vergessen?
                        </a>
                      </div>
                      <input
                        type="password"
                        id="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full p-2 text-sm bg-gray-800/50 border border-gray-700/50 focus:border-primary rounded-md text-white"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-3/4 bg-primary hover:bg-secondary text-white py-2 px-4 text-sm rounded-md transition-colors font-medium shadow-md hover:shadow-primary/20"
                    >
                      Einloggen
                    </button>
                  </form>
                  <div className="mt-4 text-center text-xs text-gray-400">
                    Noch kein Konto?{" "}
                    <button
                      onClick={() => switchTab("register")}
                      className="text-primary hover:text-secondary transition-colors font-medium"
                    >
                      Jetzt registrieren
                    </button>
                  </div>
                </div>
              )}

              {/* Registrieren-Form */}
              {activeTab === "register" && (
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-3 text-white">Erstelle ein Konto</h2>

                  {registerError && (
                    <div className="mb-3 p-2 bg-red-900/30 border-l-4 border-red-500 text-red-300 text-xs">
                      {registerError}
                    </div>
                  )}
                  {registerSuccess && (
                    <div className="mb-3 p-2 bg-green-900/30 border-l-4 border-green-500 text-green-300 text-xs">
                      {registerSuccess}
                    </div>
                  )}
                  <form onSubmit={handleRegister} className="flex flex-col items-center">
                    <div className="mb-3 w-3/4">
                      <label
                        htmlFor="name"
                        className="block text-gray-300 text-xs mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        className="w-full p-2 text-sm bg-gray-800/50 border border-gray-700/50 focus:border-primary rounded-md text-white"
                        required
                      />
                    </div>
                    <div className="mb-3 w-3/4">
                      <label
                        htmlFor="registerEmail"
                        className="block text-gray-300 text-xs mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="registerEmail"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="w-full p-2 text-sm bg-gray-800/50 border border-gray-700/50 focus:border-primary rounded-md text-white"
                        required
                      />
                    </div>
                    <div className="mb-4 w-3/4">
                      <label
                        htmlFor="registerPassword"
                        className="block text-gray-300 text-xs mb-1"
                      >
                        Passwort
                      </label>
                      <input
                        type="password"
                        id="registerPassword"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="w-full p-2 text-sm bg-gray-800/50 border border-gray-700/50 focus:border-primary rounded-md text-white"
                        required
                      />
                    </div>
                    <button
                    type="submit"
                    className="w-3/4 bg-primary hover:bg-secondary text-white py-2 px-4 text-sm rounded-md transition-colors font-medium shadow-md hover:shadow-primary/20"
                  >
                    Registrieren
                  </button>
                </form>
                <div className="mt-4 text-center text-xs text-gray-400">
                  Bereits registriert?{" "}
                  <button
                    onClick={() => switchTab("login")}
                    className="text-primary hover:text-secondary transition-colors font-medium">
                    Zum Login
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
);
}