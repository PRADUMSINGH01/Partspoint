"use client";
import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX, FiClock } from "react-icons/fi";
import { fetchParts } from "@/lib/partsById";
const MAX_RECENT_SEARCHES = 5;
const RECENT_SEARCH_EXPIRY_DAYS = 7;

interface SearchResult {
  sku: string;
  name?: string;
  brand?: string;
  stock?: number;
  price?: number;
  partNumber?: string;
  compatibleModels?: string[];
}

type RecentSearch = { query: string; timestamp: number };

export default function CarPartsSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches
  useEffect(() => {
    const item = localStorage.getItem("recentCarPartSearches");
    if (item) {
      try {
        const arr = JSON.parse(item) as RecentSearch[];
        const valid = arr.filter(
          (s) => Date.now() - s.timestamp < RECENT_SEARCH_EXPIRY_DAYS * 86400000
        );
        setRecent(valid.map((s) => s.query));
      } catch {
        localStorage.removeItem("recentCarPartSearches");
      }
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setMobileExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const saveRecent = (q: string) => {
    if (!q.trim()) return;
    const item = localStorage.getItem("recentCarPartSearches");
    const arr: RecentSearch[] = item ? JSON.parse(item) : [];
    const filtered = arr.filter(
      (s: RecentSearch) => s.query.toLowerCase() !== q.toLowerCase()
    );
    filtered.unshift({ query: q, timestamp: Date.now() });
    const sliced = filtered.slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem("recentCarPartSearches", JSON.stringify(sliced));
    setRecent(sliced.map((s: RecentSearch) => s.query));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery: string = query.trim();
    if (!trimmedQuery) return;

    setLoading(true);
    saveRecent(trimmedQuery);

    try {
      const response = await fetchParts();

      setResults(Array.isArray(response) ? response : [response]);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      {/* Desktop Search */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex items-center w-full"
      >
        <div className="relative w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder="Search by part #, name, or brand..."
            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={clear}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
            >
              <FiX />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-primary"
          >
            <FiSearch />
          </button>
        </div>
      </form>

      {/* Mobile Trigger */}
      <button
        className="md:hidden text-gray-600 p-2"
        onClick={() => {
          setMobileExpanded((prev) => !prev);
          setIsOpen((prev) => !prev);
        }}
        aria-label="Toggle search"
      >
        <FiSearch size={24} />
      </button>

      {/* Mobile Expanded */}
      {mobileExpanded && (
        <form
          onSubmit={handleSearch}
          className="fixed top-0 left-0 right-0 w-full bg-white p-4 shadow-lg z-50 flex items-center justify-center space-x-2"
          style={{ transform: "translateY(0)" }}
        >
          <div className="w-full max-w-xl flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              placeholder="Search car parts..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
            />
            {query && (
              <button
                type="button"
                onClick={clear}
                className="text-gray-400 hover:text-primary p-2 border-y border-r border-gray-300"
              >
                <FiX />
              </button>
            )}
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark transition border border-primary"
            >
              <FiSearch />
            </button>
          </div>
        </form>
      )}

      {/* Results Dropdown */}
      {(isOpen || mobileExpanded) && (
        <div
          className={`absolute ${
            mobileExpanded ? "top-[100%]" : "top-12"
          } left-0 w-full md:w-full bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden z-40`}
        >
          {/* Recent */}
          {query === "" && recent.length > 0 && (
            <div className="py-2 border-b border-gray-200">
              <h4 className="w-full px-4 py-1 text-xs font-semibold text-gray-500 uppercase">
                Recent Searches
              </h4>
              {recent.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(q);
                    setIsOpen(true);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <FiClock />
                  <span>{q}</span>
                </button>
              ))}
            </div>
          )}

          {/* Results */}
          {query && (
            <div className="max-h-64 overflow-y-auto w-full">
              {loading ? (
                <div className="p-4 text-center text-gray-500">
                  Searching...
                </div>
              ) : results.length > 0 ? (
                <ul>
                  {results.map((r) => (
                    <li
                      key={r.partNumber}
                      className="border-b last:border-b-0 w-full"
                    >
                      <a
                        href={`/Catalog/Fullview/${r.sku}`}
                        className="flex justify-between w-full items-start px-4 py-3 hover:bg-gray-50 transition"
                      >
                        <div>
                          <h5 className="font-medium text-gray-800">
                            {r.name || "Unnamed Part"}
                          </h5>
                          {r.partNumber && (
                            <p className="text-sm text-gray-500">
                              Part #: {r.partNumber}
                            </p>
                          )}
                          {r.brand && (
                            <p className="text-sm text-gray-500">
                              Brand: {r.brand}
                            </p>
                          )}
                          {r.compatibleModels &&
                            r.compatibleModels.length > 0 && (
                              <div className="mt-1 flex flex-wrap gap-1">
                                {r.compatibleModels.slice(0, 3).map((m) => (
                                  <span
                                    key={m}
                                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                                  >
                                    {m}
                                  </span>
                                ))}
                                {r.compatibleModels.length > 3 && (
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                    +{r.compatibleModels.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}
                        </div>
                        <div className="ml-4 text-right">
                          {r.price !== undefined && (
                            <span className="block font-medium text-primary">
                              ${r.price.toFixed(2)}
                            </span>
                          )}
                          {r.stock !== undefined && (
                            <span
                              className={`block text-xs mt-1 ${
                                r.stock > 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {r.stock > 0
                                ? `In stock (${r.stock})`
                                : "Out of stock"}
                            </span>
                          )}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  {!loading && "No parts found matching your search."}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
