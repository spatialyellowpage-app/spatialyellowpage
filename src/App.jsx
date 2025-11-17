import React, { useState, useMemo } from 'react';
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
} from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

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
  ];

  const products = [
    {
      id: 1,
      name: 'OpenStreetMap',
      provider: 'OpenStreetMap Foundation',
      category: 'opensource',
      type: 'Vector Data',
      coverage: 'Global',
      description: 'Collaborative mapping platform with free editable map data',
      pricing: 'Free',
      updateFrequency: 'Real-time',
      license: 'ODbL',
      directLink: 'https://www.openstreetmap.org',
      dataTypes: ['Roads', 'Buildings', 'POIs', 'Land Use'],
    },
    {
      id: 2,
      name: 'QGIS',
      provider: 'QGIS Development Team',
      category: 'opensource',
      type: 'Desktop Software',
      coverage: 'Global',
      description: 'Professional open source GIS application',
      pricing: 'Free',
      updateFrequency: 'Monthly',
      license: 'GPL',
      directLink: 'https://qgis.org',
      dataTypes: ['Analysis', 'Visualization', 'Processing'],
    },
    {
      id: 3,
      name: 'PostGIS',
      provider: 'PostGIS Development Team',
      category: 'opensource',
      type: 'Database Extension',
      coverage: 'Global',
      description: 'Spatial database extension for PostgreSQL',
      pricing: 'Free',
      updateFrequency: 'Quarterly',
      license: 'GPL',
      directLink: 'https://postgis.net',
      dataTypes: ['Spatial Database', 'Vector', 'Raster'],
    },
    {
      id: 4,
      name: 'Sentinel-2 Imagery',
      provider: 'European Space Agency',
      category: 'environment',
      type: 'Satellite Imagery',
      coverage: 'Global',
      description: 'High-resolution multispectral imagery for land monitoring',
      pricing: 'Free',
      updateFrequency: 'Every 5 days',
      license: 'Open',
      directLink: 'https://scihub.copernicus.eu',
      dataTypes: ['Multispectral', 'Optical', '10m Resolution'],
    },
    {
      id: 5,
      name: 'USGS Earth Explorer',
      provider: 'US Geological Survey',
      category: 'research',
      type: 'Satellite Imagery',
      coverage: 'Global',
      description: 'Archive of satellite and aerial imagery',
      pricing: 'Free',
      updateFrequency: 'Continuous',
      license: 'Public Domain',
      directLink: 'https://earthexplorer.usgs.gov',
      dataTypes: ['Landsat', 'ASTER', 'Aerial Photos'],
    },
    {
      id: 6,
      name: 'Overture Maps',
      provider: 'Overture Maps Foundation',
      category: 'urban',
      type: 'Vector Data',
      coverage: 'Global',
      description: 'Open map data for buildings, transportation, and places',
      pricing: 'Free',
      updateFrequency: 'Monthly',
      license: 'CDLA',
      directLink: 'https://overturemaps.org',
      dataTypes: ['Buildings', 'Transportation', 'Places', 'Boundaries'],
    },
    {
      id: 7,
      name: 'GDAL',
      provider: 'GDAL/OGR Contributors',
      category: 'opensource',
      type: 'Software Library',
      coverage: 'Global',
      description:
        'Translator library for raster and vector geospatial data formats',
      pricing: 'Free',
      updateFrequency: 'Quarterly',
      license: 'MIT/X',
      directLink: 'https://gdal.org',
      dataTypes: ['Format Conversion', 'Processing', 'Analysis'],
    },
    {
      id: 8,
      name: 'GeoServer',
      provider: 'Open Source Geospatial Foundation',
      category: 'opensource',
      type: 'Map Server',
      coverage: 'Global',
      description: 'Open source server for sharing geospatial data',
      pricing: 'Free',
      updateFrequency: 'Bi-annual',
      license: 'GPL',
      directLink: 'http://geoserver.org',
      dataTypes: ['WMS', 'WFS', 'WCS', 'Web Services'],
    },
    {
      id: 9,
      name: 'Global Forest Watch',
      provider: 'World Resources Institute',
      category: 'environment',
      type: 'Monitoring Platform',
      coverage: 'Global',
      description: 'Near real-time forest monitoring and alerts',
      pricing: 'Free',
      updateFrequency: 'Weekly',
      license: 'Open',
      directLink: 'https://www.globalforestwatch.org',
      dataTypes: ['Deforestation', 'Forest Cover', 'Alerts'],
    },
    {
      id: 10,
      name: 'Leaflet',
      provider: 'Vladimir Agafonkin',
      category: 'opensource',
      type: 'JavaScript Library',
      coverage: 'Global',
      description:
        'Leading open source JavaScript library for mobile-friendly interactive maps',
      pricing: 'Free',
      updateFrequency: 'Regular',
      license: 'BSD-2-Clause',
      directLink: 'https://leafletjs.com',
      dataTypes: ['Web Mapping', 'Interactive Maps', 'Mobile'],
    },
    {
      id: 11,
      name: 'NASA SRTM',
      provider: 'NASA',
      category: 'research',
      type: 'Elevation Data',
      coverage: 'Near-Global (60°N-56°S)',
      description: 'Shuttle Radar Topography Mission elevation data',
      pricing: 'Free',
      updateFrequency: 'Static',
      license: 'Public Domain',
      directLink: 'https://www2.jpl.nasa.gov/srtm',
      dataTypes: ['DEM', '30m Resolution', 'Elevation'],
    },
    {
      id: 12,
      name: 'OpenAerialMap',
      provider: 'Humanitarian OpenStreetMap Team',
      category: 'disaster',
      type: 'Aerial Imagery',
      coverage: 'Global (Event-based)',
      description:
        'Open collection of aerial imagery for humanitarian response',
      pricing: 'Free',
      updateFrequency: 'Event-driven',
      license: 'CC-BY',
      directLink: 'https://openaerialmap.org',
      dataTypes: ['Drone Imagery', 'Disaster Response', 'High Resolution'],
    },
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
      const matchesPrice =
        priceFilter === 'all' ||
        (priceFilter === 'free' && product.pricing === 'Free') ||
        (priceFilter === 'paid' && product.pricing !== 'Free');

      return matchesSearch && matchesCategory && matchesType && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedType, priceFilter]);

  const dataTypes = ['all', ...new Set(products.map((p) => p.type))];

  const SubmissionModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      provider: '',
      category: 'urban',
      type: '',
      coverage: '',
      description: '',
      pricing: '',
      updateFrequency: '',
      license: '',
      directLink: '',
      dataTypes: '',
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you would send to your backend (Supabase, etc.)
      console.log('Submitted:', formData);
      alert('Thank you! Your submission will be reviewed.');
      setShowSubmissionForm(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Submit a Product
            </h2>
            <button
              onClick={() => setShowSubmissionForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provider *
                </label>
                <input
                  type="text"
                  required
                  value={formData.provider}
                  onChange={(e) =>
                    setFormData({ ...formData, provider: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Type *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Satellite Imagery"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coverage *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Global, Africa, USA"
                  value={formData.coverage}
                  onChange={(e) =>
                    setFormData({ ...formData, coverage: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pricing *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Free, $99/month"
                  value={formData.pricing}
                  onChange={(e) =>
                    setFormData({ ...formData, pricing: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Frequency
                </label>
                <input
                  type="text"
                  placeholder="e.g., Daily, Monthly"
                  value={formData.updateFrequency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      updateFrequency: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License
                </label>
                <input
                  type="text"
                  placeholder="e.g., MIT, GPL, Commercial"
                  value={formData.license}
                  onChange={(e) =>
                    setFormData({ ...formData, license: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Types (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g., Vector, Raster, DEM"
                value={formData.dataTypes}
                onChange={(e) =>
                  setFormData({ ...formData, dataTypes: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Submit for Review</span>
              </button>
              <button
                type="button"
                onClick={() => setShowSubmissionForm(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 w-full">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-4 py-6 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://i.imgur.com/EeUEi7W.png"
                alt="Spatial Yellowpage Logo"
                className="w-16 h-16 object-contain"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Spatial Yellowpage
                </h1>
                <p className="text-sm text-gray-600">
                  Global Directory of Spatial Products & Tools
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSubmissionForm(true)}
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
              >
                Submit Product
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 w-full">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, providers, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center justify-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                >
                  {dataTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pricing
                </label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg text-center transition ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white shadow-lg font-semibold'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-xs font-medium">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Found <span className="font-semibold">{filteredProducts.length}</span>{' '}
          products
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">{product.provider}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.pricing === 'Free'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {product.pricing}
                </div>
              </div>

              <p className="text-gray-700 mb-4 text-sm">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{product.coverage}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Database className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{product.type}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    {product.updateFrequency}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Code className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{product.license}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {product.dataTypes.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={product.directLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
              >
                <span>Access Database</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 w-full">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600 w-full">
          <p className="mb-2">
            Spatial Yellowpage - Your Gateway to Global Spatial Data
          </p>
          <p className="text-sm">
            Building a comprehensive directory of spatial products worldwide
          </p>
        </div>
      </footer>

      {/* Submission Modal */}
      {showSubmissionForm && <SubmissionModal />}
    </div>
  );
};

export default App;
