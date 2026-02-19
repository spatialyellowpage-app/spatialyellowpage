import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  MapPin,
  Globe,
  Filter,
  ExternalLink,
  Database,
  Code,
  Calendar,
  Tag,
  X,
  Send,
  Star,
  Download,
  Users,
  Award,
  Layers,
  Moon,
  Sun,
  Loader,
} from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);

useEffect(() => {
  fetch('/data.json')
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((err) => console.error('Failed to load products:', err));
}, []);

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🌍' },
    { id: 'urban', name: 'Urban Planning & Development', icon: '🏙️' },
    { id: 'environment', name: 'Environmental & Climate', icon: '🌿' },
    { id: 'agriculture', name: 'Agriculture & Forestry', icon: '🌾' },
    { id: 'disaster', name: 'Disaster Management', icon: '🚨' },
    { id: 'transportation', name: 'Transportation & Logistics', icon: '🚛' },
    { id: 'resources', name: 'Natural Resources & Mining', icon: '⛏️' },
    { id: 'telecom', name: 'Telecommunications', icon: '📡' },
    { id: 'realestate', name: 'Real Estate & Property', icon: '🏘️' },
    { id: 'research', name: 'Research & Academia', icon: '🔬' },
    { id: 'opensource', name: 'Open Source Tools', icon: '💻' },
    { id: 'basemaps', name: 'Basemaps & Imagery', icon: '🗺️' },
  ];

  const formats = [
    'all',
    'WMS',
    'WFS',
    'WCS',
    'GeoJSON',
    'Shapefile',
    'GeoTIFF',
    'KML',
    'REST API',
    'CSV',
    'PostGIS',
    'NetCDF',
    'HDF',
  ];
  const regions = [
    'all',
    'Global',
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'South America',
    'Oceania',
    'Multi-Regional',
  ];


  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesType =
        selectedType === 'all' || product.type === selectedType;
      const matchesFormat =
        selectedFormat === 'all' ||
        product.formats.some((f) => f.includes(selectedFormat));
      const matchesRegion =
        selectedRegion === 'all' || product.region === selectedRegion;
      const matchesPrice =
        priceFilter === 'all' ||
        (priceFilter === 'free' &&
          (product.pricing === 'Free' || product.pricing.includes('Free'))) ||
        (priceFilter === 'paid' &&
          product.pricing !== 'Free' &&
          !product.pricing.includes('Free'));
      const matchesRating = product.rating >= minRating;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesFormat &&
        matchesRegion &&
        matchesPrice &&
        matchesRating
      );
    });
  }, [
    searchTerm,
    selectedCategory,
    selectedType,
    selectedFormat,
    selectedRegion,
    priceFilter,
    minRating,
  ]);

  const dataTypes = ['all', ...new Set(products.map((p) => p.type))];

  const RatingStars = ({ rating, darkMode }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : darkMode
                ? 'text-gray-600'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span
          className={`text-sm ml-1 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {rating}
        </span>
      </div>
    );
  };

  const SubmissionModal = ({ darkMode }) => {
    const [formData, setFormData] = useState({
      name: '',
      provider: '',
      category: 'urban',
      type: '',
      coverage: '',
      region: 'Global',
      description: '',
      pricing: '',
      updateFrequency: '',
      license: '',
      directLink: '',
      apiDocs: '',
      dataTypes: '',
      formats: '',
      resolution: '',
      contact: '',
    });
    const [submittedData, setSubmittedData] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
    
      try {
        // Create FormData object for Google Apps Script
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          formDataToSend.append(key, formData[key]);
        });

        const response = await fetch("https://script.google.com/macros/s/AKfycbz70Ob1tLSL20y4hZIR8JRuw9hZsiknWDIvia45DY4xjpe4dwTq5qNnwC_lfI23BBIGdQ/exec", {
          method: "POST",
          mode: "no-cors", // Important for Google Apps Script
          body: formDataToSend,
        });
    
        // Store submitted data for preview
        setSubmittedData(formData);
        setIsLoading(false);
        
        // Reset form
        setFormData({
          name: '',
          provider: '',
          category: 'urban',
          type: '',
          coverage: '',
          region: 'Global',
          description: '',
          pricing: '',
          updateFrequency: '',
          license: '',
          directLink: '',
          apiDocs: '',
          dataTypes: '',
          formats: '',
          resolution: '',
          contact: '',
        });
      } catch (err) {
        setIsLoading(false);
        console.error("Submission error:", err);
        // Store data anyway for preview
        setSubmittedData(formData);
      }
    };

    const handleClosePreview = () => {
      setSubmittedData(null);
      setShowSubmissionForm(false);
    };

    const handleSubmitAnother = () => {
      setSubmittedData(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
        <div
          className={`rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden transition-colors duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div
            className={`border-b p-6 flex items-center justify-between ${
              darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <h2
              className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Submit a Spatial Product
            </h2>
            <button
              onClick={() => setShowSubmissionForm(false)}
              className={`transition-colors ${
                darkMode
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 overflow-y-auto"
            style={{ maxHeight: 'calc(90vh - 100px)' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Provider *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Google, NASA"
                  value={formData.provider}
                  onChange={(e) =>
                    setFormData({ ...formData, provider: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {categories
                    .filter((c) => c.id !== 'all')
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Type *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Satellite Imagery, Vector Data"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Coverage *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Global, Regional"
                  value={formData.coverage}
                  onChange={(e) =>
                    setFormData({ ...formData, coverage: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Region *
                </label>
                <select
                  required
                  value={formData.region}
                  onChange={(e) =>
                    setFormData({ ...formData, region: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {regions
                    .filter((r) => r !== 'all')
                    .map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Pricing *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Free, Commercial, Freemium"
                  value={formData.pricing}
                  onChange={(e) =>
                    setFormData({ ...formData, pricing: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Update Frequency
                </label>
                <input
                  type="text"
                  placeholder="e.g., Daily, Monthly, Real-time"
                  value={formData.updateFrequency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      updateFrequency: e.target.value,
                    })
                  }
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  License
                </label>
                <input
                  type="text"
                  placeholder="e.g., MIT, GPL, Commercial"
                  value={formData.license}
                  onChange={(e) =>
                    setFormData({ ...formData, license: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Resolution
                </label>
                <input
                  type="text"
                  placeholder="e.g., 10m, 30m, Variable"
                  value={formData.resolution}
                  onChange={(e) =>
                    setFormData({ ...formData, resolution: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  placeholder="contact@example.com"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Formats (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., WMS, WFS, GeoJSON"
                  value={formData.formats}
                  onChange={(e) =>
                    setFormData({ ...formData, formats: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Description *
              </label>
              <textarea
                required
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Direct Link/Database URL *
              </label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={formData.directLink}
                onChange={(e) =>
                  setFormData({ ...formData, directLink: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                API Documentation URL
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={formData.apiDocs}
                onChange={(e) =>
                  setFormData({ ...formData, apiDocs: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Data Types (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g., Vector, Raster, DEM"
                value={formData.dataTypes}
                onChange={(e) =>
                  setFormData({ ...formData, dataTypes: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
                <span>Submit for Review</span>
              </button>
              <button
                type="button"
                onClick={() => setShowSubmissionForm(false)}
                className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 ${
                  darkMode
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-50 to-indigo-50'
      }`}
    >
      {/* Header */}
      <header
        className={`shadow-sm border-b w-full transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://i.imgur.com/EeUEi7W.png"
                alt="Spatial Yellowpage Logo"
                className="w-16 h-16 object-contain"
              />
              <div>
                <h1
                  className={`text-3xl font-bold transition-colors ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Spatial Yellowpage
                </h1>
                <p
                  className={`text-sm transition-colors ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Global Directory of Spatial Products & Tools
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setShowSubmissionForm(true)}
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Submit Product
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Search and Filters */}
        <div
          className={`rounded-xl shadow-lg p-6 mb-8 w-full transition-all duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search
                className={`absolute left-3 top-3 w-5 h-5 transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-400'
                }`}
              />
              <input
                type="text"
                placeholder="Search products, providers, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                darkMode
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Advanced Filters</span>
            </button>
          </div>

          {showFilters && (
            <div
              className={`mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Data Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {dataTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Format
                </label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {formats.map((format) => (
                    <option key={format} value={format}>
                      {format === 'all' ? 'All Formats' : format}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Region
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region === 'all' ? 'All Regions' : region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Pricing
                </label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Pricing</option>
                  <option value="free">Free Only</option>
                  <option value="paid">Paid Only</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2
            className={`text-xl font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white shadow-lg font-semibold'
                    : darkMode
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-xs font-medium">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Found <span className="font-semibold">{filteredProducts.length}</span>{' '}
          products
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader
              className={`w-12 h-12 animate-spin ${
                darkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 transform hover:-translate-y-1 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-bold mb-1 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {product.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {product.provider}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.pricing === 'Free' ||
                      product.pricing.includes('Free')
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {product.pricing}
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-3">
                  <RatingStars rating={product.rating} darkMode={darkMode} />
                  <div
                    className={`flex items-center space-x-1 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>{product.downloads}</span>
                  </div>
                </div>

                <p
                  className={`mb-4 text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin
                      className={`w-4 h-4 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    />
                    <span
                      className={`truncate ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {product.coverage}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Database
                      className={`w-4 h-4 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    />
                    <span
                      className={`truncate ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {product.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar
                      className={`w-4 h-4 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    />
                    <span
                      className={`truncate ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {product.updateFrequency}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Code
                      className={`w-4 h-4 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    />
                    <span
                      className={`truncate ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {product.license}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Layers
                      className={`w-4 h-4 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    />
                    <span
                      className={`truncate ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {product.resolution}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users
                      className={`w-4 h-4 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    />
                    <span
                      className={`truncate text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {product.contact}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div
                    className={`text-xs font-semibold mb-2 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Supported Formats:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.formats.map((format, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          darkMode
                            ? 'bg-blue-900 text-blue-200'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div
                    className={`text-xs font-semibold mb-2 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Data Types:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.dataTypes.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded text-xs ${
                          darkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {product.standards && (
                  <div className="mb-4">
                    <div
                      className={`text-xs font-semibold mb-2 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Standards:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.standards.map((standard, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-1 rounded text-xs font-medium flex items-center space-x-1 ${
                            darkMode
                              ? 'bg-purple-900 text-purple-200'
                              : 'bg-purple-50 text-purple-700'
                          }`}
                        >
                          <Award className="w-3 h-3" />
                          <span>{standard}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <a
                    href={product.directLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <span>Access Directory</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  {product.apiDocs && (
                    <a
                      href={product.apiDocs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center space-x-2 px-4 py-2 font-semibold rounded-lg transition-all duration-300 ${
                        darkMode
                          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title="API Documentation"
                    >
                      <Code className="w-4 h-4" />
                      <span className="hidden sm:inline">API Docs</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div
              className={`mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}
            >
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3
              className={`text-xl font-semibold mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              No products found
            </h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        className={`border-t mt-16 w-full transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 py-8 text-center w-full ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <p className="mb-2">
          ©Spatial Yellowpage - Your Gateway to Global Spatial Data
          </p>
          <p className="text-sm">
            Comprehensive directory of {products.length}+ spatial products
            worldwide
          </p>
          <p
            className={`text-xs mt-2 ${
              darkMode ? 'text-gray-500' : 'text-gray-500'
            }`}
          >
            Data compiled from: Ochwada, L. N., & Ochwada, A. W. (2024). 
           <em>Free Geospatial Data Resources</em> (Version 1). Covering satellite imagery, 
            vector data, elevation, climate, and 300+ free global datasets. <br></br>
            Developed by Chidimma C Maduka (https://www.linkedin.com/in/chidimmacmaduka/)
          </p>
        </div>
      </footer>

      {/* Submission Modal */}
      {showSubmissionForm && <SubmissionModal darkMode={darkMode} />}

  
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;
