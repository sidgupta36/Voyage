import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const MapTilerAutocomplete = ({ selectProps }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  useEffect(() => {
    if (!apiKey || apiKey === 'YOUR_MAPTILER_API_KEY_HERE') {
      setError('MapTiler API Key is missing');
      return;
    }

    const fetchPlaces = async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.maptiler.com/geocoding/${query}.json?key=${apiKey}`
        );
        setSuggestions(response.data.features);
        setShowSuggestions(true);
        setError(null);
      } catch (error) {
        console.error('Error fetching places:', error);
        setError('Failed to fetch places');
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchPlaces();
    }, 500); // Debounce

    return () => clearTimeout(timeoutId);
  }, [query, apiKey]);

  const handleSelect = (place) => {
    setQuery(place.place_name);
    setShowSuggestions(false);
    selectProps.onChange({
      label: place.place_name,
      value: place,
    });
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={selectProps.placeholder || "Search location..."}
          className="w-full rounded-xl border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-purple-500 dark:text-white transition-all h-12 text-lg pl-4 pr-10 placeholder:text-gray-400"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
          </div>
        )}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs mt-2 px-2 font-medium"
        >
          {error}
        </motion.div>
      )}

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-xl shadow-2xl mt-2 max-h-60 overflow-y-auto scrollbar-hide"
          >
            {suggestions.map((place, index) => (
              <motion.li
                key={place.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelect(place)}
                className="px-4 py-3 hover:bg-purple-50 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors flex items-center gap-2"
              >
                <span className="text-lg">📍</span>
                <span className="truncate">{place.place_name}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapTilerAutocomplete;
