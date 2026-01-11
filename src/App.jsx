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

  const products = [
    // Existing products...
    {
      id: 1,
      name: 'OpenStreetMap',
      provider: 'OpenStreetMap Foundation',
      category: 'opensource',
      type: 'Vector Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Collaborative mapping platform with free editable map data. Community-driven geographic database with worldwide coverage.',
      pricing: 'Free',
      updateFrequency: 'Real-time',
      license: 'ODbL',
      directLink: 'https://www.openstreetmap.org',
      apiDocs: 'https://wiki.openstreetmap.org/wiki/API',
      dataTypes: ['Roads', 'Buildings', 'POIs', 'Land Use'],
      formats: ['GeoJSON', 'Shapefile', 'REST API'],
      resolution: 'Variable',
      contact: 'community@openstreetmap.org',
      rating: 4.8,
      downloads: '10M+',
      standards: ['OGC'],
    },
    {
      id: 2,
      name: 'QGIS',
      provider: 'QGIS Development Team',
      category: 'opensource',
      type: 'Desktop Software',
      coverage: 'Global',
      region: 'Global',
      description:
        'Professional open source GIS application for viewing, editing and analyzing geospatial data.',
      pricing: 'Free',
      updateFrequency: 'Monthly',
      license: 'GPL',
      directLink: 'https://qgis.org',
      apiDocs: 'https://qgis.org/api/',
      dataTypes: ['Analysis', 'Visualization', 'Processing'],
      formats: ['Shapefile', 'GeoTIFF', 'PostGIS', 'GeoJSON'],
      resolution: 'N/A',
      contact: 'info@qgis.org',
      rating: 4.9,
      downloads: '5M+',
      standards: ['OGC', 'GDAL'],
    },
    {
      id: 3,
      name: 'Copernicus Open Access Hub',
      provider: 'European Space Agency',
      category: 'basemaps',
      type: 'Satellite Imagery',
      coverage: 'Global',
      region: 'Global',
      description:
        'Free access to Sentinel satellite data including optical and radar imagery for environmental monitoring.',
      pricing: 'Free',
      updateFrequency: 'Daily',
      license: 'Open',
      directLink: 'https://scihub.copernicus.eu',
      apiDocs: 'https://scihub.copernicus.eu/userguide/',
      dataTypes: ['Sentinel-1', 'Sentinel-2', 'Sentinel-3', 'Multi-spectral'],
      formats: ['GeoTIFF', 'NetCDF', 'REST API'],
      resolution: '10m-1km',
      contact: 'eohelp@copernicus.esa.int',
      rating: 4.7,
      downloads: '3M+',
      standards: ['INSPIRE', 'ISO 19115'],
    },
    {
      id: 4,
      name: 'NASA Earth Observing System Data',
      provider: 'NASA EOSDIS',
      category: 'research',
      type: 'Satellite Imagery',
      coverage: 'Global',
      region: 'Global',
      description:
        'Comprehensive Earth science data from NASA satellite missions including MODIS, Landsat, and ASTER.',
      pricing: 'Free',
      updateFrequency: 'Daily',
      license: 'Public Domain',
      directLink: 'https://earthdata.nasa.gov',
      apiDocs:
        'https://earthdata.nasa.gov/eosdis/science-system-description/eosdis-components/earthdata-search',
      dataTypes: ['MODIS', 'Landsat', 'ASTER', 'VIIRS'],
      formats: ['HDF', 'GeoTIFF', 'NetCDF'],
      resolution: '250m-1km',
      contact: 'support@earthdata.nasa.gov',
      rating: 4.8,
      downloads: '5M+',
      standards: ['ISO 19115', 'FGDC'],
    },
    {
      id: 5,
      name: 'Global Biodiversity Information Facility',
      provider: 'GBIF',
      category: 'environment',
      type: 'Species Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Free and open access to biodiversity data with over 2 billion species occurrence records.',
      pricing: 'Free',
      updateFrequency: 'Daily',
      license: 'CC0/CC-BY',
      directLink: 'https://www.gbif.org',
      apiDocs: 'https://www.gbif.org/developer/summary',
      dataTypes: ['Species Occurrences', 'Taxonomy', 'Biodiversity'],
      formats: ['REST API', 'CSV', 'DwC-A'],
      resolution: 'Point Data',
      contact: 'info@gbif.org',
      rating: 4.6,
      downloads: '3M+',
      standards: ['OGC'],
    },
    {
      id: 6,
      name: 'WorldPop',
      provider: 'University of Southampton',
      category: 'urban',
      type: 'Population Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Open spatial demographic datasets providing population distributions at high resolution.',
      pricing: 'Free',
      updateFrequency: 'Annual',
      license: 'CC-BY',
      directLink: 'https://www.worldpop.org',
      apiDocs: 'https://www.worldpop.org/methods/populations',
      dataTypes: ['Population Density', 'Demographics', 'Age Structure'],
      formats: ['GeoTIFF', 'CSV'],
      resolution: '100m-1km',
      contact: 'info@worldpop.org',
      rating: 4.5,
      downloads: '500K+',
      standards: ['ISO 19115'],
    },
    {
      id: 7,
      name: 'OpenTopography',
      provider: 'UCSD/OpenTopography',
      category: 'research',
      type: 'Elevation Data',
      coverage: 'Multi-Regional',
      region: 'Multi-Regional',
      description:
        'High-resolution topography data and tools including lidar and photogrammetry point clouds.',
      pricing: 'Free',
      updateFrequency: 'Continuous',
      license: 'Varies',
      directLink: 'https://opentopography.org',
      apiDocs: 'https://portal.opentopography.org/apidocs/',
      dataTypes: ['Lidar', 'DEM', 'Point Clouds', 'DSM'],
      formats: ['GeoTIFF', 'LAS', 'LAZ'],
      resolution: '1m-30m',
      contact: 'info@opentopography.org',
      rating: 4.7,
      downloads: '800K+',
      standards: ['OGC', 'ISO 19115'],
    },
    {
      id: 8,
      name: 'European Environment Agency Data',
      provider: 'European Environment Agency',
      category: 'environment',
      type: 'Environmental Data',
      coverage: 'Europe',
      region: 'Europe',
      description:
        'Comprehensive environmental data for Europe including air quality, water, biodiversity, and land use.',
      pricing: 'Free',
      updateFrequency: 'Regular',
      license: 'EEA Standard',
      directLink: 'https://www.eea.europa.eu/data-and-maps',
      apiDocs: 'https://www.eea.europa.eu/data-and-maps/daviz/learn-more',
      dataTypes: ['Air Quality', 'Water', 'Biodiversity', 'Climate'],
      formats: ['Shapefile', 'GeoJSON', 'REST API'],
      resolution: 'Variable',
      contact: 'info@eea.europa.eu',
      rating: 4.4,
      downloads: '300K+',
      standards: ['INSPIRE'],
    },
    {
      id: 9,
      name: 'Global Forest Watch',
      provider: 'World Resources Institute',
      category: 'environment',
      type: 'Monitoring Platform',
      coverage: 'Global',
      region: 'Global',
      description:
        'Near real-time forest monitoring with deforestation alerts and tree cover change data.',
      pricing: 'Free',
      updateFrequency: 'Weekly',
      license: 'Open',
      directLink: 'https://www.globalforestwatch.org',
      apiDocs: 'https://data-api.globalforestwatch.org/',
      dataTypes: ['Forest Cover', 'Deforestation', 'Fire', 'Tree Loss'],
      formats: ['REST API', 'GeoJSON', 'CSV'],
      resolution: '30m',
      contact: 'gfw@wri.org',
      rating: 4.6,
      downloads: '400K+',
      standards: ['OGC'],
    },
    {
      id: 10,
      name: 'NOAA Climate Data Online',
      provider: 'NOAA National Centers',
      category: 'environment',
      type: 'Climate Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Access to NOAA archive of weather and climate data including temperature, precipitation, and extremes.',
      pricing: 'Free',
      updateFrequency: 'Daily',
      license: 'Public Domain',
      directLink: 'https://www.ncdc.noaa.gov/cdo-web/',
      apiDocs: 'https://www.ncdc.noaa.gov/cdo-web/webservices/v2',
      dataTypes: ['Temperature', 'Precipitation', 'Wind', 'Storms'],
      formats: ['REST API', 'CSV', 'NetCDF'],
      resolution: 'Station/Grid',
      contact: 'ncdc.info@noaa.gov',
      rating: 4.5,
      downloads: '2M+',
      standards: ['ISO 19115'],
    },
    {
      id: 11,
      name: 'OpenAerialMap',
      provider: 'Humanitarian OpenStreetMap',
      category: 'disaster',
      type: 'Aerial Imagery',
      coverage: 'Event-based',
      region: 'Multi-Regional',
      description:
        'Open aerial imagery for humanitarian response and disaster relief operations.',
      pricing: 'Free',
      updateFrequency: 'Event-driven',
      license: 'CC-BY',
      directLink: 'https://openaerialmap.org',
      apiDocs: 'https://docs.openaerialmap.org/',
      dataTypes: ['Drone Imagery', 'Aerial Photos', 'Orthomosaics'],
      formats: ['GeoTIFF', 'WMS'],
      resolution: '5cm-50cm',
      contact: 'info@hotosm.org',
      rating: 4.4,
      downloads: '150K+',
      standards: ['OGC'],
    },
    {
      id: 12,
      name: 'Natural Earth',
      provider: 'Natural Earth',
      category: 'basemaps',
      type: 'Vector Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Free vector and raster map data at multiple scales for cartography and GIS.',
      pricing: 'Free',
      updateFrequency: 'Quarterly',
      license: 'Public Domain',
      directLink: 'https://www.naturalearthdata.com',
      apiDocs: 'https://www.naturalearthdata.com/downloads/',
      dataTypes: ['Boundaries', 'Physical Features', 'Cultural'],
      formats: ['Shapefile', 'GeoPackage'],
      resolution: '1:10m-1:110m',
      contact: 'contact@naturalearthdata.com',
      rating: 4.7,
      downloads: '2M+',
      standards: ['OGC'],
    },
    {
      id: 13,
      name: 'GADM Database',
      provider: 'GADM',
      category: 'urban',
      type: 'Administrative Boundaries',
      coverage: 'Global',
      region: 'Global',
      description:
        'Database of global administrative areas with country, state, and local boundaries.',
      pricing: 'Free',
      updateFrequency: 'Annual',
      license: 'Free (Non-commercial)',
      directLink: 'https://gadm.org',
      apiDocs: 'https://gadm.org/data.html',
      dataTypes: ['Admin Boundaries', 'Political Divisions'],
      formats: ['Shapefile', 'GeoJSON', 'KML', 'GeoPackage'],
      resolution: 'Variable',
      contact: 'info@gadm.org',
      rating: 4.6,
      downloads: '1M+',
      standards: ['ISO 19115'],
    },
    {
      id: 14,
      name: 'PostGIS',
      provider: 'PostGIS Development Team',
      category: 'opensource',
      type: 'Database Extension',
      coverage: 'Global',
      region: 'Global',
      description:
        'Spatial database extension for PostgreSQL enabling storage and analysis of geographic data.',
      pricing: 'Free',
      updateFrequency: 'Quarterly',
      license: 'GPL',
      directLink: 'https://postgis.net',
      apiDocs: 'https://postgis.net/documentation/',
      dataTypes: ['Spatial Database', 'Vector', 'Raster', 'Topology'],
      formats: ['PostGIS', 'SQL'],
      resolution: 'N/A',
      contact: 'postgis-users@lists.osgeo.org',
      rating: 4.9,
      downloads: '5M+',
      standards: ['OGC', 'SQL/MM'],
    },
    {
      id: 15,
      name: 'GDAL/OGR',
      provider: 'GDAL Contributors',
      category: 'opensource',
      type: 'Software Library',
      coverage: 'Global',
      region: 'Global',
      description:
        'Translator library for 200+ raster and vector geospatial data formats.',
      pricing: 'Free',
      updateFrequency: 'Quarterly',
      license: 'MIT/X',
      directLink: 'https://gdal.org',
      apiDocs: 'https://gdal.org/api/',
      dataTypes: ['Format Conversion', 'Reprojection', 'Processing'],
      formats: ['200+ formats'],
      resolution: 'N/A',
      contact: 'gdal-dev@lists.osgeo.org',
      rating: 4.9,
      downloads: '10M+',
      standards: ['OGC', 'ISO 19115'],
    },
    {
      id: 16,
      name: 'GeoServer',
      provider: 'OSGeo',
      category: 'opensource',
      type: 'Map Server',
      coverage: 'Global',
      region: 'Global',
      description:
        'Open source server for sharing geospatial data via OGC web services.',
      pricing: 'Free',
      updateFrequency: 'Bi-annual',
      license: 'GPL',
      directLink: 'http://geoserver.org',
      apiDocs: 'https://docs.geoserver.org/',
      dataTypes: ['WMS', 'WFS', 'WCS', 'WMTS'],
      formats: ['WMS', 'WFS', 'WCS', 'REST API'],
      resolution: 'N/A',
      contact: 'geoserver-users@lists.sourceforge.net',
      rating: 4.7,
      downloads: '1M+',
      standards: ['OGC WMS', 'OGC WFS', 'OGC WCS'],
    },
    {
      id: 17,
      name: 'Leaflet',
      provider: 'Vladimir Agafonkin',
      category: 'opensource',
      type: 'JavaScript Library',
      coverage: 'Global',
      region: 'Global',
      description:
        'Leading open source JavaScript library for mobile-friendly interactive maps.',
      pricing: 'Free',
      updateFrequency: 'Regular',
      license: 'BSD-2-Clause',
      directLink: 'https://leafletjs.com',
      apiDocs: 'https://leafletjs.com/reference.html',
      dataTypes: ['Web Mapping', 'Interactive Maps'],
      formats: ['JavaScript'],
      resolution: 'N/A',
      contact: 'agafonkin@gmail.com',
      rating: 4.8,
      downloads: '15M+',
      standards: ['Web Standards'],
    },
    {
      id: 18,
      name: 'MapBox',
      provider: 'MapBox Inc.',
      category: 'basemaps',
      type: 'Mapping Platform',
      coverage: 'Global',
      region: 'Global',
      description:
        'Custom maps and location APIs for developers with high-quality basemaps.',
      pricing: 'Freemium',
      updateFrequency: 'Continuous',
      license: 'Commercial',
      directLink: 'https://www.mapbox.com',
      apiDocs: 'https://docs.mapbox.com/api/',
      dataTypes: ['Basemaps', 'Geocoding', 'Navigation', 'Satellite'],
      formats: ['REST API', 'Vector Tiles', 'Raster Tiles'],
      resolution: 'Variable',
      contact: 'support@mapbox.com',
      rating: 4.5,
      downloads: 'Enterprise',
      standards: ['Mapbox Vector Tiles'],
    },
    {
      id: 19,
      name: 'DIVA-GIS',
      provider: 'DIVA-GIS',
      category: 'research',
      type: 'Vector Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Free GIS data for every country including administrative boundaries and climate data.',
      pricing: 'Free',
      updateFrequency: 'Occasional',
      license: 'Free',
      directLink: 'https://www.diva-gis.org',
      apiDocs: 'https://www.diva-gis.org/Data',
      dataTypes: ['Boundaries', 'Roads', 'Climate', 'Elevation'],
      formats: ['Shapefile', 'Grid'],
      resolution: 'Variable',
      contact: 'diva@diva-gis.org',
      rating: 4.3,
      downloads: '600K+',
      standards: ['Standard GIS'],
    },
    {
      id: 20,
      name: 'WorldClim',
      provider: 'WorldClim',
      category: 'environment',
      type: 'Climate Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Global climate and weather data with historical and future climate projections.',
      pricing: 'Free',
      updateFrequency: 'Periodic',
      license: 'CC-BY-SA',
      directLink: 'https://www.worldclim.org',
      apiDocs: 'https://www.worldclim.org/data/index.html',
      dataTypes: ['Temperature', 'Precipitation', 'Bioclim'],
      formats: ['GeoTIFF', 'Grid'],
      resolution: '30s-10min',
      contact: 'info@worldclim.org',
      rating: 4.6,
      downloads: '800K+',
      standards: ['ISO 19115'],
    },
    {
      id: 21,
      name: 'ESA Climate Change Initiative',
      provider: 'European Space Agency',
      category: 'environment',
      type: 'Climate Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Essential climate variables from satellite observations for climate research.',
      pricing: 'Free',
      updateFrequency: 'Annual',
      license: 'Open',
      directLink: 'https://climate.esa.int',
      apiDocs: 'https://climate.esa.int/en/data-portal/',
      dataTypes: ['ECV', 'Climate Variables', 'Time Series'],
      formats: ['NetCDF', 'GeoTIFF'],
      resolution: 'Variable',
      contact: 'info@esa-cci.org',
      rating: 4.5,
      downloads: '200K+',
      standards: ['CF Conventions', 'ISO 19115'],
    },
    {
      id: 22,
      name: 'SRTM Digital Elevation',
      provider: 'NASA/USGS',
      category: 'research',
      type: 'Elevation Data',
      coverage: 'Near-Global',
      region: 'Multi-Regional',
      description:
        'Shuttle Radar Topography Mission 30m elevation data covering most of Earth.',
      pricing: 'Free',
      updateFrequency: 'Static',
      license: 'Public Domain',
      directLink: 'https://www2.jpl.nasa.gov/srtm',
      apiDocs: 'https://lpdaac.usgs.gov/products/',
      dataTypes: ['DEM', 'Elevation', 'Terrain'],
      formats: ['GeoTIFF', 'HGT'],
      resolution: '30m-90m',
      contact: 'lpdaac@usgs.gov',
      rating: 4.8,
      downloads: '5M+',
      standards: ['ISO 19115'],
    },
    {
      id: 23,
      name: 'Planet Labs Imagery',
      provider: 'Planet Labs',
      category: 'basemaps',
      type: 'Satellite Imagery',
      coverage: 'Global',
      region: 'Global',
      description:
        'Daily satellite imagery of entire Earth at 3-5m resolution.',
      pricing: 'Commercial',
      updateFrequency: 'Daily',
      license: 'Commercial',
      directLink: 'https://www.planet.com',
      apiDocs: 'https://developers.planet.com/',
      dataTypes: ['Daily Imagery', 'PlanetScope', 'SkySat'],
      formats: ['GeoTIFF', 'REST API'],
      resolution: '3-5m',
      contact: 'sales@planet.com',
      rating: 4.6,
      downloads: 'Enterprise',
      standards: ['OGC'],
    },
    {
      id: 24,
      name: 'Maxar/DigitalGlobe',
      provider: 'Maxar Technologies',
      category: 'basemaps',
      type: 'Satellite Imagery',
      coverage: 'Global',
      region: 'Global',
      description:
        'High-resolution commercial satellite imagery up to 30cm resolution.',
      pricing: 'Commercial',
      updateFrequency: 'Daily',
      license: 'Commercial',
      directLink: 'https://www.maxar.com',
      apiDocs: 'https://securewatchdocs.maxar.com/',
      dataTypes: ['WorldView', 'GeoEye', 'High-res Imagery'],
      formats: ['GeoTIFF', 'REST API'],
      resolution: '30cm-1m',
      contact: 'info@maxar.com',
      rating: 4.7,
      downloads: 'Enterprise',
      standards: ['OGC'],
    },
    {
      id: 25,
      name: 'Google Earth Engine',
      provider: 'Google',
      category: 'research',
      type: 'Analysis Platform',
      coverage: 'Global',
      region: 'Global',
      description:
        'Cloud-based platform for planetary-scale geospatial analysis.',
      pricing: 'Free (Research)',
      updateFrequency: 'Continuous',
      license: 'Google Terms',
      directLink: 'https://earthengine.google.com',
      apiDocs: 'https://developers.google.com/earth-engine',
      dataTypes: ['Landsat', 'Sentinel', 'MODIS', 'Climate'],
      formats: ['JavaScript API', 'Python API', 'REST API'],
      resolution: 'Variable',
      contact: 'earthengine@google.com',
      rating: 4.8,
      downloads: '500K+ users',
      standards: ['Google EE'],
    },
    {
      id: 26,
      name: 'Overture Maps Foundation',
      provider: 'Overture Maps',
      category: 'urban',
      type: 'Vector Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Open map data for buildings, transportation networks, and places.',
      pricing: 'Free',
      updateFrequency: 'Monthly',
      license: 'CDLA Permissive',
      directLink: 'https://overturemaps.org',
      apiDocs: 'https://docs.overturemaps.org/',
      dataTypes: ['Buildings', 'Transportation', 'Places', 'Administrative'],
      formats: ['GeoParquet', 'GeoJSON'],
      resolution: 'Variable',
      contact: 'info@overturemaps.org',
      rating: 4.5,
      downloads: '300K+',
      standards: ['OGC'],
    },
    {
      id: 27,
      name: 'HERE Maps',
      provider: 'HERE Technologies',
      category: 'transportation',
      type: 'Mapping Platform',
      coverage: 'Global',
      region: 'Global',
      description: 'Location platform with mapping, routing, and traffic data.',
      pricing: 'Freemium',
      updateFrequency: 'Real-time',
      license: 'Commercial',
      directLink: 'https://www.here.com',
      apiDocs: 'https://developer.here.com/',
      dataTypes: ['Maps', 'Routing', 'Traffic', 'Geocoding'],
      formats: ['REST API', 'Vector Tiles'],
      resolution: 'Variable',
      contact: 'developer@here.com',
      rating: 4.4,
      downloads: 'Enterprise',
      standards: ['Industry Standard'],
    },
    {
      id: 28,
      name: 'TomTom Maps',
      provider: 'TomTom',
      category: 'transportation',
      type: 'Mapping Platform',
      coverage: 'Global',
      region: 'Global',
      description: 'Navigation and mapping technology with real-time traffic.',
      pricing: 'Commercial',
      updateFrequency: 'Real-time',
      license: 'Commercial',
      directLink: 'https://www.tomtom.com',
      apiDocs: 'https://developer.tomtom.com/',
      dataTypes: ['Maps', 'Traffic', 'Routing', 'Search'],
      formats: ['REST API', 'SDK'],
      resolution: 'Variable',
      contact: 'developer@tomtom.com',
      rating: 4.3,
      downloads: 'Enterprise',
      standards: ['Industry Standard'],
    },
    {
      id: 29,
      name: 'OpenLayers',
      provider: 'OpenLayers Contributors',
      category: 'opensource',
      type: 'JavaScript Library',
      coverage: 'Global',
      region: 'Global',
      description:
        'High-performance web mapping library with support for multiple sources.',
      pricing: 'Free',
      updateFrequency: 'Regular',
      license: 'BSD-2-Clause',
      directLink: 'https://openlayers.org',
      apiDocs: 'https://openlayers.org/en/latest/apidoc/',
      dataTypes: ['Web Mapping', 'Vector', 'Raster'],
      formats: ['JavaScript'],
      resolution: 'N/A',
      contact: 'openlayers-dev@lists.osgeo.org',
      rating: 4.6,
      downloads: '>1M+',
      standards: ['Darwin Core', 'ISO 19115'],
    },
    {
      id: 30,
      name: 'ArcGIS Online',
      provider: 'Esri',
      category: 'basemaps',
      type: 'Cloud Platform',
      coverage: 'Global',
      region: 'Global',
      description:
        'Cloud-based mapping and analysis platform with extensive basemap collection.',
      pricing: 'Commercial',
      updateFrequency: 'Continuous',
      license: 'Commercial',
      directLink: 'https://www.arcgis.com',
      apiDocs: 'https://developers.arcgis.com/',
      dataTypes: ['Basemaps', 'Demographics', 'Imagery', 'Analysis'],
      formats: ['REST API', 'Feature Services', 'Map Services'],
      resolution: 'Variable',
      contact: 'info@esri.com',
      rating: 4.5,
      downloads: 'Enterprise',
      standards: ['OGC', 'Esri'],
    },
    {
      id: 31,
      name: 'OpenDroneMap',
      provider: 'OpenDroneMap Community',
      category: 'opensource',
      type: 'Processing Software',
      coverage: 'User-generated',
      region: 'Global',
      description:
        'Open source toolkit for processing drone imagery into maps and 3D models.',
      pricing: 'Free',
      updateFrequency: 'Regular',
      license: 'AGPL',
      directLink: 'https://www.opendronemap.org',
      apiDocs: 'https://docs.opendronemap.org/',
      dataTypes: ['Orthophotos', 'DSM', 'Point Clouds', '3D Models'],
      formats: ['GeoTIFF', 'LAZ', 'OBJ'],
      resolution: 'User-defined',
      contact: 'info@opendronemap.org',
      rating: 4.5,
      downloads: '200K+',
      standards: ['Standard GIS'],
    },
    {
      id: 32,
      name: 'Humanitarian Data Exchange',
      provider: 'UN OCHA',
      category: 'disaster',
      type: 'Data Portal',
      coverage: 'Multi-Regional',
      region: 'Multi-Regional',
      description: 'Open platform for sharing humanitarian data during crises.',
      pricing: 'Free',
      updateFrequency: 'Event-driven',
      license: 'Various Open',
      directLink: 'https://data.humdata.org',
      apiDocs: 'https://hdx-hxl-preview.readthedocs.io/',
      dataTypes: ['CODs', 'Population', 'Infrastructure', 'Conflict'],
      formats: ['Shapefile', 'CSV', 'GeoJSON'],
      resolution: 'Variable',
      contact: 'hdx@un.org',
      rating: 4.4,
      downloads: '400K+',
      standards: ['HXL'],
    },
    {
      id: 33,
      name: 'OpenCelliD',
      provider: 'Unwired Labs',
      category: 'telecom',
      type: 'Cell Tower Database',
      coverage: 'Global',
      region: 'Global',
      description: "World's largest open database of cell tower locations for geolocation and telecommunications analysis.",
      pricing: 'Freemium',
      updateFrequency: 'Real-time',
      license: 'CC-BY-SA',
      directLink: 'https://opencellid.org/',
      apiDocs: 'https://opencellid.org/api',
      dataTypes: ['Cell Towers', 'Mobile Networks', 'Geolocation'],
      formats: ['CSV', 'REST API'],
      resolution: 'Point Data',
      contact: 'info@opencellid.org',
      rating: 4.3,
      downloads: '2M+',
      standards: ['OpenCellID'],
    },
    {
      id: 34,
      name: 'Global Human Settlement Layer',
      provider: 'European Commission JRC',
      category: 'urban',
      type: 'Settlement Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Open and free spatial information about human settlements worldwide.',
      pricing: 'Free',
      updateFrequency: 'Periodic',
      license: 'CC-BY',
      directLink: 'https://ghsl.jrc.ec.europa.eu',
      apiDocs: 'https://ghsl.jrc.ec.europa.eu/download.php',
      dataTypes: ['Built-up Areas', 'Population Grid', 'Settlement Model'],
      formats: ['GeoTIFF', 'Shapefile'],
      resolution: '10m-1km',
      contact: 'jrc-ghsl@ec.europa.eu',
      rating: 4.6,
      downloads: '300K+',
      standards: ['ISO 19115'],
    },
    {
      id: 35,
      name: 'Global Land Cover Facility',
      provider: 'University of Maryland',
      category: 'environment',
      type: 'Land Cover Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Earth science data including land cover classification and change detection.',
      pricing: 'Free',
      updateFrequency: 'Periodic',
      license: 'Public Domain',
      directLink: 'http://glcf.umd.edu',
      apiDocs: 'http://glcf.umd.edu/data/',
      dataTypes: ['Land Cover', 'MODIS', 'AVHRR'],
      formats: ['GeoTIFF', 'HDF'],
      resolution: '250m-1km',
      contact: 'glcf@umd.edu',
      rating: 4.3,
      downloads: '500K+',
      standards: ['ISO 19115'],
    },
    {
      id: 36,
      name: 'Global Roads Open Access Data',
      provider: 'CIESIN Columbia',
      category: 'transportation',
      type: 'Road Network',
      coverage: 'Global',
      region: 'Global',
      description: 'Global roads dataset with over 30 million km of roads.',
      pricing: 'Free',
      updateFrequency: 'Static',
      license: 'Public Domain',
      directLink: 'https://sedac.ciesin.columbia.edu/data/collection/groads',
      apiDocs:
        'https://sedac.ciesin.columbia.edu/data/set/groads-global-roads-open-access-v1',
      dataTypes: ['Road Networks', 'Transportation Infrastructure'],
      formats: ['Shapefile', 'Geodatabase'],
      resolution: 'Variable',
      contact: 'ciesin.info@columbia.edu',
      rating: 4.4,
      downloads: '250K+',
      standards: ['ISO 19115'],
    },
    {
      id: 37,
      name: 'Global Wind Atlas',
      provider: 'DTU Wind Energy',
      category: 'resources',
      type: 'Wind Resource Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Free wind resource assessment data for renewable energy planning.',
      pricing: 'Free',
      updateFrequency: 'Periodic',
      license: 'CC-BY',
      directLink: 'https://globalwindatlas.info',
      apiDocs: 'https://globalwindatlas.info/about/method',
      dataTypes: ['Wind Speed', 'Wind Power Density', 'Energy Output'],
      formats: ['GeoTIFF', 'REST API'],
      resolution: '250m-1km',
      contact: 'gwa@dtu.dk',
      rating: 4.5,
      downloads: '200K+',
      standards: ['WMO'],
    },
    {
      id: 38,
      name: 'Global Solar Atlas',
      provider: 'World Bank/Solargis',
      category: 'resources',
      type: 'Solar Resource Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Solar resource data for renewable energy project planning.',
      pricing: 'Free',
      updateFrequency: 'Periodic',
      license: 'CC-BY',
      directLink: 'https://globalsolaratlas.info',
      apiDocs: 'https://globalsolaratlas.info/support/about',
      dataTypes: ['Solar Irradiation', 'PV Power Potential', 'DNI'],
      formats: ['GeoTIFF', 'REST API'],
      resolution: '250m-9km',
      contact: 'support@solargis.com',
      rating: 4.6,
      downloads: '300K+',
      standards: ['WMO'],
    },
    {
      id: 39,
      name: 'FIRMS - Fire Information',
      provider: 'NASA',
      category: 'disaster',
      type: 'Fire Detection',
      coverage: 'Global',
      region: 'Global',
      description:
        'Near real-time active fire data from MODIS and VIIRS satellites.',
      pricing: 'Free',
      updateFrequency: 'Near Real-time',
      license: 'Public Domain',
      directLink: 'https://firms.modaps.eosdis.nasa.gov',
      apiDocs: 'https://firms.modaps.eosdis.nasa.gov/api/',
      dataTypes: ['Active Fires', 'Thermal Anomalies', 'Fire Radiative Power'],
      formats: ['Shapefile', 'KML', 'WMS', 'REST API'],
      resolution: '375m-1km',
      contact: 'support@earthdata.nasa.gov',
      rating: 4.7,
      downloads: '1M+',
      standards: ['OGC'],
    },
    {
      id: 40,
      name: 'Global Surface Water Explorer',
      provider: 'European Commission JRC',
      category: 'environment',
      type: 'Water Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Location and temporal distribution of surface water from 1984 to present.',
      pricing: 'Free',
      updateFrequency: 'Annual',
      license: 'CC-BY',
      directLink: 'https://global-surface-water.appspot.com',
      apiDocs:
        'https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_4',
      dataTypes: ['Water Occurrence', 'Water Change', 'Seasonality'],
      formats: ['GeoTIFF', 'Earth Engine'],
      resolution: '30m',
      contact: 'jrc-water@ec.europa.eu',
      rating: 4.5,
      downloads: '250K+',
      standards: ['ISO 19115'],
    },
    {
      id: 41,
      name: 'OpenStreetMap Humanitarian',
      provider: 'HOT',
      category: 'disaster',
      type: 'Mapping Platform',
      coverage: 'Event-based',
      region: 'Multi-Regional',
      description:
        'Humanitarian mapping for disaster response and community development.',
      pricing: 'Free',
      updateFrequency: 'Real-time',
      license: 'ODbL',
      directLink: 'https://www.hotosm.org',
      apiDocs: 'https://www.hotosm.org/tools-and-data',
      dataTypes: ['Building Footprints', 'Roads', 'POIs', 'Infrastructure'],
      formats: ['Shapefile', 'GeoJSON', 'OSM'],
      resolution: 'Variable',
      contact: 'info@hotosm.org',
      rating: 4.6,
      downloads: '500K+',
      standards: ['OSM', 'OGC'],
    },
    {
      id: 42,
      name: 'Global Land Ice Measurements',
      provider: 'NSIDC',
      category: 'environment',
      type: 'Glacier Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Comprehensive glacier inventory and monitoring data worldwide.',
      pricing: 'Free',
      updateFrequency: 'Annual',
      license: 'Public Domain',
      directLink: 'https://www.glims.org',
      apiDocs: 'https://www.glims.org/RGI/',
      dataTypes: ['Glacier Outlines', 'Ice Thickness', 'Mass Balance'],
      formats: ['Shapefile', 'GeoJSON'],
      resolution: 'Variable',
      contact: 'nsidc@nsidc.org',
      rating: 4.4,
      downloads: '100K+',
      standards: ['ISO 19115'],
    },
    {
      id: 43,
      name: 'Global Mangrove Watch',
      provider: 'Aberystwyth University',
      category: 'environment',
      type: 'Mangrove Data',
      coverage: 'Tropical/Subtropical',
      region: 'Multi-Regional',
      description:
        'Monitoring mangrove forests globally with detailed change detection.',
      pricing: 'Free',
      updateFrequency: 'Annual',
      license: 'CC-BY',
      directLink: 'https://www.globalmangrovewatch.org',
      apiDocs: 'https://www.globalmangrovewatch.org/data-download',
      dataTypes: ['Mangrove Extent', 'Loss/Gain', 'Alerts'],
      formats: ['GeoTIFF', 'Shapefile'],
      resolution: '30m',
      contact: 'gmw@aber.ac.uk',
      rating: 4.3,
      downloads: '50K+',
      standards: ['ISO 19115'],
    },
    {
      id: 44,
      name: 'Global Fishing Watch',
      provider: 'Global Fishing Watch',
      category: 'resources',
      type: 'Fishing Activity Data',
      coverage: 'Global Oceans',
      region: 'Global',
      description:
        'Tracking commercial fishing activity worldwide using AIS data.',
      pricing: 'Free',
      updateFrequency: 'Near Real-time',
      license: 'CC-BY-SA',
      directLink: 'https://globalfishingwatch.org',
      apiDocs: 'https://globalfishingwatch.org/our-apis/',
      dataTypes: ['Vessel Tracking', 'Fishing Effort', 'AIS'],
      formats: ['REST API', 'CSV', 'GeoJSON'],
      resolution: 'Vessel-level',
      contact: 'info@globalfishingwatch.org',
      rating: 4.5,
      downloads: '150K+',
      standards: ['AIS'],
    },
    {
      id: 45,
      name: 'LandScan Population',
      provider: 'Oak Ridge National Lab',
      category: 'urban',
      type: 'Population Data',
      coverage: 'Global',
      region: 'Global',
      description: 'High-resolution global population distribution database.',
      pricing: 'Free (Academic)',
      updateFrequency: 'Annual',
      license: 'Restricted',
      directLink: 'https://landscan.ornl.gov',
      apiDocs: 'https://landscan.ornl.gov/documentation',
      dataTypes: ['Population Density', 'Ambient Population'],
      formats: ['GeoTIFF', 'Grid'],
      resolution: '1km',
      contact: 'landscan@ornl.gov',
      rating: 4.6,
      downloads: '200K+',
      standards: ['ISO 19115'],
    },
    {
      id: 46,
      name: 'Protected Planet',
      provider: 'UNEP-WCMC',
      category: 'environment',
      type: 'Protected Areas',
      coverage: 'Global',
      region: 'Global',
      description:
        'World Database on Protected Areas with conservation area boundaries.',
      pricing: 'Free',
      updateFrequency: 'Monthly',
      license: 'Non-commercial',
      directLink: 'https://www.protectedplanet.net',
      apiDocs: 'https://api.protectedplanet.net/',
      dataTypes: ['Protected Areas', 'Conservation', 'WDPA'],
      formats: ['Shapefile', 'GeoJSON', 'REST API'],
      resolution: 'Polygon',
      contact: 'info@unep-wcmc.org',
      rating: 4.5,
      downloads: '400K+',
      standards: ['WDPA', 'ISO 19115'],
    },
    {
      id: 47,
      name: 'VIIRS Nighttime Lights',
      provider: 'NOAA/NASA',
      category: 'urban',
      type: 'Nightlight Data',
      coverage: 'Global',
      region: 'Global',
      description:
        "Earth's surface lighting captured from space for urban analysis.",
      pricing: 'Free',
      updateFrequency: 'Monthly',
      license: 'Public Domain',
      directLink: 'https://eogdata.mines.edu/products/vnl/',
      apiDocs: 'https://eogdata.mines.edu/products/vnl/',
      dataTypes: ['Nighttime Lights', 'DNB', 'Urban Extent'],
      formats: ['GeoTIFF', 'NetCDF'],
      resolution: '500m',
      contact: 'eog@mines.edu',
      rating: 4.4,
      downloads: '300K+',
      standards: ['ISO 19115'],
    },
    {
      id: 48,
      name: 'Global Soil Information',
      provider: 'ISRIC World Soil Info',
      category: 'agriculture',
      type: 'Soil Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'SoilGrids provides soil property data at 250m resolution globally.',
      pricing: 'Free',
      updateFrequency: 'Periodic',
      license: 'CC-BY',
      directLink: 'https://soilgrids.org',
      apiDocs: 'https://www.isric.org/explore/soilgrids/faq-soilgrids',
      dataTypes: ['Soil Properties', 'pH', 'Organic Carbon', 'Texture'],
      formats: ['GeoTIFF', 'WCS'],
      resolution: '250m',
      contact: 'soil.information@isric.org',
      rating: 4.5,
      downloads: '250K+',
      standards: ['ISO 28258', 'OGC'],
    },
    {
      id: 49,
      name: 'Global Agricultural Lands',
      provider: 'NASA SEDAC',
      category: 'agriculture',
      type: 'Agricultural Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Global distribution of agricultural lands including croplands and pastures.',
      pricing: 'Free',
      updateFrequency: 'Periodic',
      license: 'CC-BY',
      directLink: 'https://sedac.ciesin.columbia.edu/data/collection/aglands',
      apiDocs: 'https://sedac.ciesin.columbia.edu/data/sets/browse',
      dataTypes: ['Croplands', 'Pastures', 'Agricultural Extent'],
      formats: ['GeoTIFF', 'NetCDF'],
      resolution: '5min-1km',
      contact: 'ciesin.info@columbia.edu',
      rating: 4.3,
      downloads: '200K+',
      standards: ['ISO 19115'],
    },
    {
      id: 50,
      name: 'Earthquake Data Portal',
      provider: 'USGS',
      category: 'disaster',
      type: 'Seismic Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Real-time and historical earthquake information worldwide.',
      pricing: 'Free',
      updateFrequency: 'Real-time',
      license: 'Public Domain',
      directLink: 'https://earthquake.usgs.gov',
      apiDocs: 'https://earthquake.usgs.gov/fdsnws/event/1/',
      dataTypes: ['Earthquakes', 'Seismic Events', 'Magnitude'],
      formats: ['GeoJSON', 'CSV', 'KML', 'REST API'],
      resolution: 'Event-based',
      contact: 'https://earthquake.usgs.gov/contactus/',
      rating: 4.7,
      downloads: '2M+',
      standards: ['QuakeML', 'FDSN'],
    },
    {
      id: 51,
      name: 'ESA WorldCover',
      provider: 'European Space Agency',
      category: 'environment',
      type: 'Land Cover',
      coverage: 'Global',
      region: 'Global',
      description:
        'Global land cover map at 10m resolution based on Sentinel data.',
      pricing: 'Free',
      updateFrequency: 'Annual',
      license: 'CC-BY',
      directLink: 'https://worldcover2021.esa.int',
      apiDocs: 'https://worldcover2021.esa.int/data/docs',
      dataTypes: ['Land Cover', '11 Classes', 'Sentinel-based'],
      formats: ['GeoTIFF', 'WMS'],
      resolution: '10m',
      contact: 'worldcover@esa.int',
      rating: 4.6,
      downloads: '300K+',
      standards: ['ISO 19115'],
    },
    {
      id: 52,
      name: 'GEBCO Bathymetry',
      provider: 'GEBCO',
      category: 'environment',
      type: 'Ocean Depth',
      coverage: 'Global Oceans',
      region: 'Global',
      description:
        'General Bathymetric Chart of the Oceans - global ocean floor mapping.',
      pricing: 'Free',
      updateFrequency: 'Annual',
      license: 'Public Domain',
      directLink: 'https://www.gebco.net',
      apiDocs:
        'https://www.gebco.net/data_and_products/gridded_bathymetry_data/',
      dataTypes: ['Bathymetry', 'Ocean Depth', 'Seafloor Topography'],
      formats: ['NetCDF', 'GeoTIFF', 'ASCII'],
      resolution: '15 arc-seconds',
      contact: 'info@gebco.net',
      rating: 4.5,
      downloads: '400K+',
      standards: ['IHO', 'IOC'],
    },
    {
      id: 53,
      name: 'ASTER Global DEM Version 3',
      provider: 'NASA/METI',
      category: 'research',
      type: 'Elevation Data',
      coverage: 'Global (83°N to 83°S)',
      region: 'Global',
      description:
        'Updated 30-meter resolution Digital Elevation Model with improved accuracy covering land surfaces between 83°N and 83°S, ideal for geosciences and environmental studies.',
      pricing: 'Free',
      updateFrequency: 'Static',
      license: 'Public Domain',
      directLink: 'https://asterweb.jpl.nasa.gov/gdem.asp',
      apiDocs: 'https://lpdaac.usgs.gov/products/astgtmv003/',
      dataTypes: ['DEM', 'Elevation', 'Terrain'],
      formats: ['GeoTIFF', 'HDF'],
      resolution: '30m',
      contact: 'lpdaac@usgs.gov',
      rating: 4.7,
      downloads: '2M+',
      standards: ['ISO 19115'],
    },
    {
      id: 54,
      name: 'ALOS Global Digital Surface Model',
      provider: 'JAXA',
      category: 'research',
      type: 'Satellite Imagery',
      coverage: 'Global',
      region: 'Global',
      description:
        '30m-resolution Digital Surface Model from the ALOS PALSAR satellite providing detailed global surface mapping for topographic analysis.',
      pricing: 'Free',
      updateFrequency: 'Static',
      license: 'JAXA Terms',
      directLink:
        'https://www.eorc.jaxa.jp/ALOS/en/dataset/aw3d30/aw3d30_e.htm',
      apiDocs: 'https://www.eorc.jaxa.jp/ALOS/en/dataset/aw3d30/data/index.htm',
      dataTypes: ['DSM', 'Surface Model', 'Elevation'],
      formats: ['GeoTIFF'],
      resolution: '30m',
      contact: 'alos-aw3d30@jaxa.jp',
      rating: 4.6,
      downloads: '800K+',
      standards: ['ISO 19115'],
    },
    {
      id: 55,
      name: 'ArcticDEM',
      provider: 'Polar Geospatial Center',
      category: 'environment',
      type: 'Elevation Data',
      coverage: 'Arctic (>60°N)',
      region: 'Multi-Regional',
      description:
        'High-resolution elevation models for all Arctic land areas north of 60 degrees latitude, generated using photogrammetry from satellite images.',
      pricing: 'Free',
      updateFrequency: 'Periodic',
      license: 'Public Domain',
      directLink: 'https://www.pgc.umn.edu/data/arcticdem/',
      apiDocs:
        'https://www.pgc.umn.edu/guides/arcticdem/introduction-to-arcticdem/',
      dataTypes: ['DEM', 'Arctic Elevation', 'Terrain'],
      formats: ['GeoTIFF', 'Cloud-optimized GeoTIFF'],
      resolution: '2m-32m',
      contact: 'pgc@umn.edu',
      rating: 4.7,
      downloads: '300K+',
      standards: ['ISO 19115'],
    },
    {
      id: 56,
      name: 'EarthEnv-DEM90',
      provider: 'Yale University',
      category: 'research',
      type: 'Elevation Data',
      coverage: 'Near-Global',
      region: 'Global',
      description:
        'Near-global 90m resolution DEM created by merging ASTER GDEM and SRTM data with post-processing to fill voids and smooth artifacts.',
      pricing: 'Free',
      updateFrequency: 'Static',
      license: 'CC-BY-NC-SA',
      directLink: 'https://www.earthenv.org/DEM',
      apiDocs: 'https://www.earthenv.org/metadata',
      dataTypes: ['DEM', 'Merged Elevation', 'Terrain'],
      formats: ['GeoTIFF'],
      resolution: '90m',
      contact: 'earthenv@yale.edu',
      rating: 4.5,
      downloads: '500K+',
      standards: ['ISO 19115'],
    },
    {
      id: 57,
      name: 'ETOPO1 Global Relief',
      provider: 'NOAA NGDC',
      category: 'environment',
      type: 'Elevation/Bathymetry',
      coverage: 'Global',
      region: 'Global',
      description:
        '1 arc-minute resolution relief model integrating land topography and ocean bathymetry, providing comprehensive Earth surface representation.',
      pricing: 'Free',
      updateFrequency: 'Static',
      license: 'Public Domain',
      directLink: 'https://www.ngdc.noaa.gov/mgg/global/global.html',
      apiDocs: 'https://www.ngdc.noaa.gov/mgg/global/relief/ETOPO1/docs/',
      dataTypes: ['Bathymetry', 'Topography', 'Relief'],
      formats: ['NetCDF', 'GeoTIFF', 'ASCII'],
      resolution: '1 arc-minute',
      contact: 'ngdc.info@noaa.gov',
      rating: 4.6,
      downloads: '1M+',
      standards: ['ISO 19115'],
    },
    {
      id: 58,
      name: 'Global Multi-Resolution Topography',
      provider: 'GMRT Synthesis',
      category: 'environment',
      type: 'Elevation Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'Gridded elevation data at approximately 100m resolution covering both terrestrial and seafloor topography for comprehensive global mapping.',
      pricing: 'Free',
      updateFrequency: 'Regular',
      license: 'CC-BY',
      directLink: 'https://www.gmrt.org/',
      apiDocs: 'https://www.gmrt.org/services/',
      dataTypes: ['Multi-resolution', 'Bathymetry', 'Topography'],
      formats: ['NetCDF', 'GeoTIFF'],
      resolution: '100m',
      contact: 'info@marine-geo.org',
      rating: 4.5,
      downloads: '400K+',
      standards: ['OGC', 'ISO 19115'],
    },
    {
      id: 59,
      name: 'MERIT DEM',
      provider: 'University of Tokyo',
      category: 'research',
      type: 'Elevation Data',
      coverage: 'Global (90°N-60°S)',
      region: 'Global',
      description:
        'Multi-Error-Removed Improved-Terrain DEM correcting multiple systematic errors in existing DEMs including SRTM, providing enhanced accuracy.',
      pricing: 'Free',
      updateFrequency: 'Static',
      license: 'CC-BY-NC',
      directLink: 'http://hydro.iis.u-tokyo.ac.jp/~yamadai/MERIT_DEM/',
      apiDocs: 'http://hydro.iis.u-tokyo.ac.jp/~yamadai/MERIT_DEM/',
      dataTypes: ['DEM', 'Error-corrected', 'Hydrologically-adjusted'],
      formats: ['GeoTIFF'],
      resolution: '90m',
      contact: 'yamadai@rainbow.iis.u-tokyo.ac.jp',
      rating: 4.8,
      downloads: '600K+',
      standards: ['ISO 19115'],
    },
    {
      id: 60,
      name: 'NASADEM',
      provider: 'NASA JPL',
      category: 'research',
      type: 'Elevation Data',
      coverage: 'Global (60°N-56°S)',
      region: 'Global',
      description:
        '1-arc-second resolution DEM based on refined SRTM data with improved processing algorithms providing enhanced elevation details.',
      pricing: 'Free',
      updateFrequency: 'Static',
      license: 'Public Domain',
      directLink:
        'https://earthdata.nasa.gov/esds/competitive-programs/measures/nasadem',
      apiDocs: 'https://lpdaac.usgs.gov/products/nasadem_hgtv001/',
      dataTypes: ['DEM', 'Enhanced SRTM', 'Elevation'],
      formats: ['GeoTIFF', 'HGT'],
      resolution: '30m',
      contact: 'lpdaac@usgs.gov',
      rating: 4.7,
      downloads: '1.5M+',
      standards: ['ISO 19115'],
    },
    {
      id: 61,
      name: 'TanDEM-X DEM',
      provider: 'DLR Germany',
      category: 'basemaps',
      type: 'Elevation Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'High-resolution 12m global DEM from TerraSAR-X and TanDEM-X satellites providing unprecedented detail for topographical analysis.',
      pricing: 'Free (Research)',
      updateFrequency: 'Static',
      license: 'Research License',
      directLink: 'https://tandemx-science.dlr.de/',
      apiDocs: 'https://geoservice.dlr.de/web/',
      dataTypes: ['High-res DEM', 'SAR-derived', 'Elevation'],
      formats: ['GeoTIFF'],
      resolution: '12m',
      contact: 'tandemx-science@dlr.de',
      rating: 4.9,
      downloads: '500K+',
      standards: ['ISO 19115'],
    },
    {
      id: 62,
      name: 'MODIS Land Cover',
      provider: 'NASA/USGS',
      category: 'environment',
      type: 'Land Cover',
      coverage: 'Global',
      region: 'Global',
      description:
        'Global land cover classification at 500m resolution from MODIS satellite providing yearly updates of land cover types worldwide.',
      pricing: 'Free',
      updateFrequency: 'Annual',
      license: 'Public Domain',
      directLink: 'https://lpdaac.usgs.gov/products/mcd12q1v006/',
      apiDocs: 'https://lpdaac.usgs.gov/documents/101/MCD12_User_Guide_V6.pdf',
      dataTypes: ['Land Cover', 'IGBP Classification', 'Vegetation'],
      formats: ['HDF', 'GeoTIFF'],
      resolution: '500m',
      contact: 'lpdaac@usgs.gov',
      rating: 4.6,
      downloads: '2M+',
      standards: ['ISO 19115'],
    },
    {
      id: 63,
      name: 'VIIRS Day/Night Band',
      provider: 'NOAA',
      category: 'urban',
      type: 'Nighttime Lights',
      coverage: 'Global',
      region: 'Global',
      description:
        'Monthly composites of nighttime lights from VIIRS satellite showing human settlements, economic activity, and light pollution patterns.',
      pricing: 'Free',
      updateFrequency: 'Monthly',
      license: 'Public Domain',
      directLink: 'https://eogdata.mines.edu/products/vnl/',
      apiDocs: 'https://eogdata.mines.edu/products/vnl/',
      dataTypes: ['Nightlights', 'Urban Extent', 'DNB'],
      formats: ['GeoTIFF', 'CSV'],
      resolution: '500m',
      contact: 'eog@mines.edu',
      rating: 4.7,
      downloads: '800K+',
      standards: ['ISO 19115'],
    },
    {
      id: 64,
      name: 'Landsat Collection 2',
      provider: 'USGS/NASA',
      category: 'basemaps',
      type: 'Satellite Imagery',
      coverage: 'Global',
      region: 'Global',
      description:
        'Longest continuously acquired collection of space-based moderate-resolution land remote sensing data providing 50+ years of Earth observation.',
      pricing: 'Free',
      updateFrequency: 'Every 16 days',
      license: 'Public Domain',
      directLink: 'https://www.usgs.gov/landsat-missions',
      apiDocs: 'https://www.usgs.gov/landsat-missions/landsat-collection-2',
      dataTypes: ['Multispectral', 'Landsat 8/9', 'Optical'],
      formats: ['GeoTIFF', 'HDF'],
      resolution: '30m',
      contact: 'custserv@usgs.gov',
      rating: 4.9,
      downloads: '10M+',
      standards: ['ISO 19115', 'FGDC'],
    },
    {
      id: 65,
      name: 'ASTER Satellite Imagery',
      provider: 'NASA/METI',
      category: 'basemaps',
      type: 'Satellite Imagery',
      coverage: 'Global (83°N-83°S)',
      region: 'Global',
      description:
        'Advanced Spaceborne Thermal Emission and Reflection Radiometer providing high spatial resolution multispectral imagery in visible to thermal infrared.',
      pricing: 'Free',
      updateFrequency: 'Archive',
      license: 'Public Domain',
      directLink: 'https://asterweb.jpl.nasa.gov/',
      apiDocs:
        'https://lpdaac.usgs.gov/data/get-started-data/collection-overview/missions/aster-overview/',
      dataTypes: ['Multispectral', 'Thermal', 'VNIR/SWIR/TIR'],
      formats: ['HDF', 'GeoTIFF'],
      resolution: '15m-90m',
      contact: 'lpdaac@usgs.gov',
      rating: 4.6,
      downloads: '1.5M+',
      standards: ['ISO 19115'],
    },
    {
      id: 66,
      name: 'JAXA PALSAR Forest Map',
      provider: 'JAXA',
      category: 'environment',
      type: 'Forest Cover',
      coverage: 'Global',
      region: 'Global',
      description:
        'Global forest/non-forest map based on PALSAR L-band SAR data providing accurate forest classification independent of weather conditions.',
      pricing: 'Free',
      updateFrequency: 'Annual',
      license: 'JAXA Terms',
      directLink: 'https://www.eorc.jaxa.jp/ALOS/en/dataset/fnf_e.htm',
      apiDocs: 'https://www.eorc.jaxa.jp/ALOS/en/dataset/fnf_e.htm',
      dataTypes: ['Forest Cover', 'SAR', 'Land Cover'],
      formats: ['GeoTIFF'],
      resolution: '25m',
      contact: 'alos-fnf@jaxa.jp',
      rating: 4.5,
      downloads: '400K+',
      standards: ['ISO 19115'],
    },
    {
      id: 67,
      name: 'SERVIR Global',
      provider: 'NASA/USAID',
      category: 'environment',
      type: 'Earth Observation Platform',
      coverage: 'Regional Focus',
      region: 'Multi-Regional',
      description:
        'Joint initiative providing satellite-based Earth observation data and geospatial analysis for environmental decision-making in developing regions.',
      pricing: 'Free',
      updateFrequency: 'Continuous',
      license: 'Open',
      directLink: 'https://www.servirglobal.net/',
      apiDocs: 'https://www.servirglobal.net/Resources',
      dataTypes: ['Multi-sensor', 'Regional Analysis', 'Capacity Building'],
      formats: ['Various'],
      resolution: 'Variable',
      contact: 'servir@nasa.gov',
      rating: 4.5,
      downloads: '300K+',
      standards: ['OGC', 'ISO 19115'],
    },
    {
      id: 68,
      name: 'Global Precipitation Measurement',
      provider: 'NASA/JAXA',
      category: 'environment',
      type: 'Weather Data',
      coverage: 'Global',
      region: 'Global',
      description:
        'International satellite mission providing next-generation observations of rain and snow worldwide every three hours for climate and weather research.',
      pricing: 'Free',
      updateFrequency: 'Every 3 hours',
      license: 'Public Domain',
      directLink: 'https://gpm.nasa.gov/',
      apiDocs: 'https://gpm.nasa.gov/data/directory',
      dataTypes: ['Precipitation', 'Rainfall', 'Snowfall'],
      formats: ['HDF5', 'NetCDF'],
      resolution: '0.1°-0.25°',
      contact: 'gsfc-dl-help-disc@mail.nasa.gov',
      rating: 4.7,
      downloads: '1M+',
      standards: ['ISO 19115'],
    },
    {
      id: 69,
      name: 'ESA Sentinel-1 SAR',
      provider: 'European Space Agency',
      category: 'basemaps',
      type: 'Radar Imagery',
      coverage: 'Global',
      region: 'Global',
      description:
        'C-band Synthetic Aperture Radar providing all-weather, day-and-night imagery for land and ocean monitoring with 12-day repeat cycle.',
      pricing: 'Free',
      updateFrequency: 'Every 12 days',
      license: 'Open',
      directLink: 'https://sentinel.esa.int/web/sentinel/missions/sentinel-1',
      apiDocs: 'https://scihub.copernicus.eu/userguide/',
      dataTypes: ['SAR', 'C-band Radar', 'Interferometry'],
      formats: ['GeoTIFF', 'NetCDF'],
      resolution: '10m-40m',
      contact: 'eohelp@copernicus.esa.int',
      rating: 4.8,
      downloads: '2M+',
      standards: ['INSPIRE', 'ISO 19115'],
    },
    {
      id: 70,
      name: 'ESA Sentinel-3 Ocean Data',
      provider: 'European Space Agency',
      category: 'environment',
      type: 'Ocean Monitoring',
      coverage: 'Global Oceans',
      region: 'Global',
      description:
        'Multi-instrument mission measuring sea surface topography, temperature, and color for ocean forecasting and climate monitoring.',
      pricing: 'Free',
      updateFrequency: 'Daily',
      license: 'Open',
      directLink: 'https://sentinel.esa.int/web/sentinel/missions/sentinel-3',
      apiDocs:
        'https://sentinels.copernicus.eu/web/sentinel/user-guides/sentinel-3-olci',
      dataTypes: ['Ocean Color', 'Sea Surface Temp', 'Topography'],
      formats: ['NetCDF', 'GeoTIFF'],
      resolution: '300m-1km',
      contact: 'eohelp@copernicus.esa.int',
      rating: 4.6,
      downloads: '800K+',
      standards: ['INSPIRE', 'ISO 19115'],
    },
    {
      id: 71,
      name: 'Atmospheric Science Data Center',
      provider: 'NASA Langley',
      category: 'environment',
      type: 'Atmospheric Data',
      coverage: 'Global',
      region: 'Global',
      description:
        "Specializes in data on Earth's radiation budget, clouds, aerosols, and tropospheric chemistry for atmospheric research and climate studies.",
      pricing: 'Free',
      updateFrequency: 'Continuous',
      license: 'Public Domain',
      directLink: 'https://asdc.larc.nasa.gov/',
      apiDocs: 'https://asdc.larc.nasa.gov/data/',
      dataTypes: ['Radiation', 'Clouds', 'Aerosols', 'Chemistry'],
      formats: ['HDF', 'NetCDF'],
      resolution: 'Variable',
      contact: 'support-asdc@earthdata.nasa.gov',
      rating: 4.5,
      downloads: '600K+',
      standards: ['ISO 19115'],
    },
    {
      id: 72,
      name: 'Japanese 55-year Reanalysis',
      provider: 'JMA Japan',
      category: 'environment',
      type: 'Climate Reanalysis',
      coverage: 'Global',
      region: 'Global',
      description:
        'Comprehensive dataset offering global atmospheric reanalysis data from 1958 onwards using data assimilation for climate diagnostics.',
      pricing: 'Free',
      updateFrequency: 'Continuous',
      license: 'Open',
      directLink: 'https://jra.kishou.go.jp/JRA-55/index_en.html',
      apiDocs: 'https://jra.kishou.go.jp/JRA-55/document_en.html',
      dataTypes: ['Reanalysis', 'Atmospheric', 'Historical'],
      formats: ['GRIB', 'NetCDF'],
      resolution: '1.25°',
      contact: 'jra@met.kishou.go.jp',
      rating: 4.6,
      downloads: '400K+',
      standards: ['WMO', 'ISO 19115'],
    },
  {
    id: 73,
    name: 'Climate Research Unit (CRU) Climate Datasets',
    provider: 'University of East Anglia',
    category: 'environment',
    type: 'Climate Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Comprehensive climate datasets including temperature, precipitation, pressure, and drought indicators in high and low resolution formats.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://crudata.uea.ac.uk/',
    apiDocs: 'https://crudata.uea.ac.uk/cru/data/',
    dataTypes: ['Temperature', 'Precipitation', 'Pressure', 'Drought'],
    formats: ['NetCDF', 'ASCII'],
    resolution: 'Variable',
    contact: 'cru@uea.ac.uk',
    rating: 4.6,
    downloads: '500K+',
    standards: ['ISO 19115']
  },
  {
    id: 74,
    name: 'Downscaled GCM Portal',
    provider: 'Climate Data Portal',
    category: 'environment',
    type: 'Climate Data',
    coverage: 'Global',
    region: 'Global',
    description: 'High-resolution climate data created from General Circulation Models covering essential climate variables for regional studies.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'http://www.worldclim.org/downscaling',
    apiDocs: 'http://www.worldclim.org/methods',
    dataTypes: ['GCM', 'Climate Projections', 'Downscaled'],
    formats: ['GeoTIFF', 'NetCDF'],
    resolution: 'Variable',
    contact: 'info@worldclim.org',
    rating: 4.4,
    downloads: '300K+',
    standards: ['ISO 19115']
  },
  {
    id: 75,
    name: 'European Climate Assessment Dataset (ECA&D)',
    provider: 'KNMI Netherlands',
    category: 'environment',
    type: 'Climate Data',
    coverage: 'Europe',
    region: 'Europe',
    description: 'Gridded observation data across Europe including cloudiness, temperature, and precipitation metrics for climate trend analysis.',
    pricing: 'Free',
    updateFrequency: 'Daily',
    license: 'Open',
    directLink: 'https://www.ecad.eu/',
    apiDocs: 'https://www.ecad.eu/documents.php',
    dataTypes: ['Temperature', 'Precipitation', 'Cloudiness'],
    formats: ['NetCDF', 'ASCII'],
    resolution: 'Station/Grid',
    contact: 'ecad@knmi.nl',
    rating: 4.5,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 76,
    name: 'Global Aerosol Climatology Project',
    provider: 'NASA',
    category: 'environment',
    type: 'Atmospheric Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Monthly averages of Aerosol Optical Thickness and Angstrom exponent from 1981-2006 for atmospheric science research.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Public Domain',
    directLink: 'https://gacp.giss.nasa.gov/',
    apiDocs: 'https://gacp.giss.nasa.gov/datasets/',
    dataTypes: ['Aerosol Optical Thickness', 'Angstrom Exponent'],
    formats: ['NetCDF', 'HDF'],
    resolution: 'Variable',
    contact: 'gacp@nasa.gov',
    rating: 4.3,
    downloads: '150K+',
    standards: ['ISO 19115']
  },
  {
    id: 77,
    name: 'GlobAerosol',
    provider: 'ESA',
    category: 'environment',
    type: 'Atmospheric Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Aerosol data including Aerosol Optical Depth at 550nm and Angstrom coefficient for climate modeling and air quality studies.',
    pricing: 'Free',
    updateFrequency: 'Archive',
    license: 'Open',
    directLink: 'http://www.globaerosol.info/',
    apiDocs: 'http://www.globaerosol.info/data.html',
    dataTypes: ['AOD', 'Angstrom Coefficient', 'Aerosol'],
    formats: ['NetCDF', 'GeoTIFF'],
    resolution: 'Variable',
    contact: 'info@globaerosol.info',
    rating: 4.2,
    downloads: '100K+',
    standards: ['ISO 19115']
  },
  {
    id: 78,
    name: 'Global Historical Climatology Network (GHCN)',
    provider: 'NOAA',
    category: 'environment',
    type: 'Climate Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Comprehensive database of climate summaries with daily and monthly data on temperature, precipitation, and other variables.',
    pricing: 'Free',
    updateFrequency: 'Daily',
    license: 'Public Domain',
    directLink: 'https://www.ncdc.noaa.gov/ghcn-daily-description',
    apiDocs: 'https://www.ncdc.noaa.gov/cdo-web/webservices/v2',
    dataTypes: ['Temperature', 'Precipitation', 'Historical'],
    formats: ['CSV', 'NetCDF'],
    resolution: 'Station',
    contact: 'ncdc.ghcn@noaa.gov',
    rating: 4.7,
    downloads: '2M+',
    standards: ['ISO 19115']
  },
  {
    id: 79,
    name: 'Global Precipitation Climatology Centre (GPCC)',
    provider: 'DWD Germany',
    category: 'environment',
    type: 'Precipitation Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Global precipitation analyses for climate monitoring and research using station-based observations.',
    pricing: 'Free',
    updateFrequency: 'Monthly',
    license: 'Open',
    directLink: 'https://www.dwd.de/EN/ourservices/gpcc/gpcc.html',
    apiDocs: 'https://opendata.dwd.de/climate_environment/GPCC/',
    dataTypes: ['Precipitation', 'Rainfall', 'Climate'],
    formats: ['NetCDF', 'ASCII'],
    resolution: '0.5°-2.5°',
    contact: 'gpcc@dwd.de',
    rating: 4.6,
    downloads: '800K+',
    standards: ['WMO', 'ISO 19115']
  },
  {
    id: 80,
    name: 'International Satellite Cloud Climatology Project',
    provider: 'NASA/NOAA',
    category: 'environment',
    type: 'Cloud Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Monthly averages of cloud variables including cover, top temperature, and optical thickness for atmospheric research.',
    pricing: 'Free',
    updateFrequency: 'Archive',
    license: 'Public Domain',
    directLink: 'https://isccp.giss.nasa.gov/',
    apiDocs: 'https://isccp.giss.nasa.gov/products/products.html',
    dataTypes: ['Cloud Cover', 'Cloud Temperature', 'Optical Thickness'],
    formats: ['NetCDF', 'HDF'],
    resolution: 'Variable',
    contact: 'isccp@giss.nasa.gov',
    rating: 4.4,
    downloads: '300K+',
    standards: ['ISO 19115']
  },
  {
    id: 81,
    name: 'HydroSHEDS',
    provider: 'WWF/USGS',
    category: 'environment',
    type: 'Hydrological Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Hydrological data derived from SRTM including river networks, watershed boundaries, drainage directions, and flow accumulations.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'https://www.hydrosheds.org/',
    apiDocs: 'https://www.hydrosheds.org/products',
    dataTypes: ['River Networks', 'Watersheds', 'Flow Direction'],
    formats: ['Shapefile', 'GeoTIFF'],
    resolution: '15s-30s',
    contact: 'hydrosheds@wwf.org',
    rating: 4.8,
    downloads: '1M+',
    standards: ['ISO 19115']
  },
  {
    id: 82,
    name: 'FAO AQUASTAT',
    provider: 'UN FAO',
    category: 'environment',
    type: 'Water Data',
    coverage: 'Global',
    region: 'Global',
    description: "UN's global water information system with comprehensive data on water resources and agricultural water management.",
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'Open',
    directLink: 'https://www.fao.org/aquastat/',
    apiDocs: 'https://www.fao.org/aquastat/en/databases/',
    dataTypes: ['Water Resources', 'Irrigation', 'Agricultural Water'],
    formats: ['CSV', 'Excel'],
    resolution: 'Country-level',
    contact: 'aquastat@fao.org',
    rating: 4.5,
    downloads: '400K+',
    standards: ['FAO']
  },
  {
    id: 83,
    name: 'Water Isotopes Database',
    provider: 'Waterisotopes.org',
    category: 'research',
    type: 'Water Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Global grids of hydrogen and oxygen isotope composition in precipitation and environmental waters in ArcGRID format.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'http://www.waterisotopes.org/',
    apiDocs: 'http://www.waterisotopes.org/',
    dataTypes: ['Isotopes', 'Precipitation', 'Hydrology'],
    formats: ['ArcGRID', 'ASCII'],
    resolution: 'Variable',
    contact: 'info@waterisotopes.org',
    rating: 4.3,
    downloads: '50K+',
    standards: ['ISO 19115']
  },
  {
    id: 84,
    name: 'National Snow and Ice Data Center (NSIDC)',
    provider: 'NSIDC',
    category: 'environment',
    type: 'Snow/Ice Data',
    coverage: 'Polar Regions',
    region: 'Multi-Regional',
    description: 'Comprehensive Arctic and Antarctic data including sea ice extent, glacier inventory, and snow cover information.',
    pricing: 'Free',
    updateFrequency: 'Daily',
    license: 'Public Domain',
    directLink: 'https://nsidc.org/',
    apiDocs: 'https://nsidc.org/support/how/how-do-i-programmatically-request-data-services',
    dataTypes: ['Sea Ice', 'Glaciers', 'Snow Cover'],
    formats: ['NetCDF', 'GeoTIFF', 'HDF'],
    resolution: 'Variable',
    contact: 'nsidc@nsidc.org',
    rating: 4.8,
    downloads: '1.5M+',
    standards: ['ISO 19115']
  },
  {
    id: 85,
    name: 'CryoSat Arctic Sea Ice Thickness',
    provider: 'ESA',
    category: 'environment',
    type: 'Ice Data',
    coverage: 'Arctic',
    region: 'Multi-Regional',
    description: 'Precise measurements of Arctic sea ice thickness from CryoSat mission for climate change impact assessment.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://earth.esa.int/eogateway/missions/cryosat',
    apiDocs: 'https://earth.esa.int/eogateway/documents/20142/37627/CryoSat-Product-Handbook.pdf',
    dataTypes: ['Sea Ice Thickness', 'Arctic', 'Radar Altimetry'],
    formats: ['NetCDF'],
    resolution: 'Variable',
    contact: 'cryosat@esa.int',
    rating: 4.6,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 86,
    name: 'World Glacier Monitoring Service (WGMS)',
    provider: 'WGMS',
    category: 'environment',
    type: 'Glacier Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Long-term observations of glacier fluctuations including mass balance, thickness, length, and area changes.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'Open',
    directLink: 'https://wgms.ch/',
    apiDocs: 'https://wgms.ch/data_databaseversions/',
    dataTypes: ['Glacier Mass Balance', 'Length Change', 'Thickness'],
    formats: ['CSV', 'Excel'],
    resolution: 'Glacier-level',
    contact: 'wgms@geo.uzh.ch',
    rating: 4.5,
    downloads: '100K+',
    standards: ['ISO 19115']
  },
  {
    id: 87,
    name: 'EM-DAT Emergency Events Database',
    provider: 'CRED',
    category: 'disaster',
    type: 'Disaster Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Comprehensive global database on natural and technological disasters including earthquakes, floods, and storms.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Academic License',
    directLink: 'https://www.emdat.be/',
    apiDocs: 'https://www.emdat.be/explanatory-notes',
    dataTypes: ['Disasters', 'Human Impact', 'Economic Loss'],
    formats: ['Excel', 'CSV'],
    resolution: 'Event-based',
    contact: 'contact@emdat.be',
    rating: 4.7,
    downloads: '500K+',
    standards: ['CRED']
  },
  {
    id: 88,
    name: 'Global Disaster Alert and Coordination System (GDACS)',
    provider: 'UN/EC JRC',
    category: 'disaster',
    type: 'Disaster Alerts',
    coverage: 'Global',
    region: 'Global',
    description: 'Real-time alerts about natural disasters worldwide including earthquakes, tsunamis, tropical cyclones, and floods.',
    pricing: 'Free',
    updateFrequency: 'Real-time',
    license: 'Open',
    directLink: 'https://www.gdacs.org/',
    apiDocs: 'https://www.gdacs.org/About/datafeeds.aspx',
    dataTypes: ['Disaster Alerts', 'Impact Assessment', 'Real-time'],
    formats: ['RSS', 'KML', 'GeoJSON', 'REST API'],
    resolution: 'Event-based',
    contact: 'gdacs@ec.europa.eu',
    rating: 4.6,
    downloads: '1M+',
    standards: ['OGC']
  },
  {
    id: 89,
    name: 'Global Volcanism Program',
    provider: 'Smithsonian Institution',
    category: 'disaster',
    type: 'Volcano Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Information on volcanic activity worldwide including eruption history, gas emissions, and ash advisories.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Open',
    directLink: 'https://volcano.si.edu/',
    apiDocs: 'https://volcano.si.edu/gvp_api.cfm',
    dataTypes: ['Volcanic Activity', 'Eruptions', 'Gas Emissions'],
    formats: ['CSV', 'JSON', 'REST API'],
    resolution: 'Volcano-level',
    contact: 'gvp@si.edu',
    rating: 4.5,
    downloads: '300K+',
    standards: ['Smithsonian']
  },
  {
    id: 90,
    name: 'Dartmouth Flood Observatory',
    provider: 'University of Colorado',
    category: 'disaster',
    type: 'Flood Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Archive of large flood events worldwide providing valuable data for flood risk analysis and management.',
    pricing: 'Free',
    updateFrequency: 'Event-driven',
    license: 'Open',
    directLink: 'https://floodobservatory.colorado.edu/',
    apiDocs: 'https://floodobservatory.colorado.edu/Archives/index.html',
    dataTypes: ['Flood Events', 'Impact Data', 'Satellite Imagery'],
    formats: ['Shapefile', 'KML', 'GeoTIFF'],
    resolution: 'Event-based',
    contact: 'floodobs@colorado.edu',
    rating: 4.4,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 91,
    name: 'CORINE Land Cover',
    provider: 'Copernicus/EEA',
    category: 'environment',
    type: 'Land Cover',
    coverage: 'Europe',
    region: 'Europe',
    description: 'Detailed land cover and land use information for European countries with multiple classification levels.',
    pricing: 'Free',
    updateFrequency: 'Every 6 years',
    license: 'Open',
    directLink: 'https://land.copernicus.eu/pan-european/corine-land-cover',
    apiDocs: 'https://land.copernicus.eu/user-corner/technical-library',
    dataTypes: ['Land Cover', 'Land Use', '44 Classes'],
    formats: ['GeoTIFF', 'Shapefile'],
    resolution: '100m',
    contact: 'copernicus@eea.europa.eu',
    rating: 4.7,
    downloads: '800K+',
    standards: ['INSPIRE', 'ISO 19115']
  },
  {
    id: 92,
    name: 'FAO Global Forest Resources Assessment',
    provider: 'UN FAO',
    category: 'environment',
    type: 'Forest Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Comprehensive data on global forest resources state and changes, essential for forest management and conservation.',
    pricing: 'Free',
    updateFrequency: 'Every 5 years',
    license: 'Open',
    directLink: 'https://www.fao.org/forest-resources-assessment/',
    apiDocs: 'https://www.fao.org/forest-resources-assessment/remote-sensing/en/',
    dataTypes: ['Forest Area', 'Forest Change', 'Biomass'],
    formats: ['Excel', 'CSV', 'PDF'],
    resolution: 'Country-level',
    contact: 'fra@fao.org',
    rating: 4.6,
    downloads: '600K+',
    standards: ['FAO']
  },
  {
    id: 93,
    name: 'Global Land Cover Facility - Vegetation Continuous Fields',
    provider: 'University of Maryland',
    category: 'environment',
    type: 'Vegetation Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Continuous fields of tree cover, non-tree cover, and bare ground percentage for vegetation dynamics studies.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Public Domain',
    directLink: 'http://glcf.umd.edu/data/vcf/',
    apiDocs: 'http://glcf.umd.edu/',
    dataTypes: ['Tree Cover', 'Vegetation', 'Continuous Fields'],
    formats: ['GeoTIFF', 'HDF'],
    resolution: '250m',
    contact: 'glcf@umd.edu',
    rating: 4.4,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 94,
    name: 'Harmonized World Soil Database',
    provider: 'FAO/IIASA',
    category: 'agriculture',
    type: 'Soil Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Comprehensive grid of soil characteristics crucial for agricultural potential and land cover analysis.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'https://www.fao.org/soils-portal/data-hub/soil-maps-and-databases/harmonized-world-soil-database-v12/en/',
    apiDocs: 'https://www.fao.org/soils-portal/data-hub/',
    dataTypes: ['Soil Properties', 'Texture', 'pH', 'Organic Carbon'],
    formats: ['Shapefile', 'Grid'],
    resolution: '1km',
    contact: 'soils@fao.org',
    rating: 4.6,
    downloads: '700K+',
    standards: ['ISO 28258']
  },
  {
    id: 95,
    name: 'Ocean Biogeographic Information System (OBIS)',
    provider: 'UNESCO-IOC',
    category: 'environment',
    type: 'Marine Biodiversity',
    coverage: 'Global Oceans',
    region: 'Global',
    description: 'Large-scale datasets on marine biodiversity with distribution records of marine species for ecological research.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'CC0/CC-BY',
    directLink: 'https://obis.org/',
    apiDocs: 'https://api.obis.org/',
    dataTypes: ['Species Occurrences', 'Marine Biodiversity', 'Taxonomy'],
    formats: ['CSV', 'DwC-A', 'REST API'],
    resolution: 'Point Data',
    contact: 'support@iobis.org',
    rating: 4.5,
    downloads: '500K+',
    standards: ['Darwin Core', 'OGC']
  },
  {
    id: 96,
    name: 'Marine Ecoregions of the World',
    provider: 'TNC/WWF',
    category: 'environment',
    type: 'Marine Regions',
    coverage: 'Global Oceans',
    region: 'Global',
    description: 'Detailed classification of oceanic and coastal ecosystems crucial for marine conservation planning.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'https://www.worldwildlife.org/publications/marine-ecoregions-of-the-world-a-bioregionalization-of-coastal-and-shelf-areas',
    apiDocs: 'N/A',
    dataTypes: ['Marine Ecoregions', 'Biogeographic', 'Coastal'],
    formats: ['Shapefile'],
    resolution: 'Regional',
    contact: 'science@tnc.org',
    rating: 4.4,
    downloads: '250K+',
    standards: ['ISO 19115']
  },
  {
    id: 97,
    name: 'Terrestrial Ecoregions of the World',
    provider: 'WWF',
    category: 'environment',
    type: 'Ecoregions',
    coverage: 'Global',
    region: 'Global',
    description: 'Global perspective on terrestrial biodiversity highlighting distribution and status of distinct ecological regions.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'https://www.worldwildlife.org/publications/terrestrial-ecoregions-of-the-world',
    apiDocs: 'N/A',
    dataTypes: ['Ecoregions', 'Biodiversity', 'Biomes'],
    formats: ['Shapefile'],
    resolution: 'Regional',
    contact: 'science@wwf.org',
    rating: 4.6,
    downloads: '600K+',
    standards: ['ISO 19115']
  },
  {
    id: 98,
    name: 'BirdLife International Data Zone',
    provider: 'BirdLife International',
    category: 'environment',
    type: 'Bird Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Detailed information on bird species and Important Bird and Biodiversity Areas for ornithological research.',
    pricing: 'Free (Academic)',
    updateFrequency: 'Annual',
    license: 'Restricted',
    directLink: 'http://datazone.birdlife.org/',
    apiDocs: 'http://datazone.birdlife.org/about',
    dataTypes: ['Bird Species', 'IBAs', 'Distribution'],
    formats: ['Shapefile', 'CSV'],
    resolution: 'Species/Site',
    contact: 'science@birdlife.org',
    rating: 4.5,
    downloads: '300K+',
    standards: ['ISO 19115']
  },
  {
    id: 99,
    name: 'ReefBase GIS',
    provider: 'WorldFish Center',
    category: 'environment',
    type: 'Coral Reef Data',
    coverage: 'Tropical Oceans',
    region: 'Multi-Regional',
    description: 'Extensive database on coral reefs including health, species diversity, and threats for conservation efforts.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'http://www.reefbase.org/',
    apiDocs: 'http://www.reefbase.org/gis_maps/datasets.aspx',
    dataTypes: ['Coral Reefs', 'Reef Health', 'Biodiversity'],
    formats: ['Shapefile', 'KML'],
    resolution: 'Variable',
    contact: 'reefbase@cgiar.org',
    rating: 4.3,
    downloads: '150K+',
    standards: ['ISO 19115']
  },
  {
    id: 100,
    name: 'Sea Around Us',
    provider: 'University of British Columbia',
    category: 'resources',
    type: 'Fisheries Data',
    coverage: 'Global Oceans',
    region: 'Global',
    description: 'Data on fish and fisheries including catch data, stock assessments, and ecosystem models for marine ecology.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'CC-BY',
    directLink: 'http://www.seaaroundus.org/',
    apiDocs: 'http://www.seaaroundus.org/data/#/api',
    dataTypes: ['Fisheries Catch', 'Stock Assessment', 'EEZ'],
    formats: ['CSV', 'REST API'],
    resolution: 'Country/EEZ',
    contact: 'seaaroundus@gmail.com',
    rating: 4.4,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 101,
    name: 'MOVEBANK',
    provider: 'Max Planck Institute',
    category: 'research',
    type: 'Animal Tracking',
    coverage: 'Global',
    region: 'Global',
    description: 'Global database for animal tracking data crucial for studying movement, migration patterns, and wildlife ecology.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Varies',
    directLink: 'https://www.movebank.org/',
    apiDocs: 'https://github.com/movebank/movebank-api-doc',
    dataTypes: ['Animal Tracking', 'GPS', 'Migration'],
    formats: ['CSV', 'REST API'],
    resolution: 'GPS tracks',
    contact: 'support@movebank.org',
    rating: 4.6,
    downloads: '300K+',
    standards: ['Darwin Core']
  },
  {
    id: 102,
    name: 'Anthropogenic Biomes',
    provider: 'University of Maryland',
    category: 'environment',
    type: 'Land Use Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Maps showing human-reshaped ecological landscapes (anthromes) at 5 arc-second resolution for sustainability studies.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'CC-BY',
    directLink: 'http://ecotope.org/anthromes/',
    apiDocs: 'http://ecotope.org/anthromes/maps/',
    dataTypes: ['Anthromes', 'Human Impact', 'Land Use'],
    formats: ['GeoTIFF', 'ASCII'],
    resolution: '5 arc-seconds',
    contact: 'anthromes@umd.edu',
    rating: 4.3,
    downloads: '150K+',
    standards: ['ISO 19115']
  },
  {
    id: 103,
    name: 'Atlas of the Biosphere',
    provider: 'University of Wisconsin',
    category: 'urban',
    type: 'Human Geography Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Gridded human data including per capita oil usage, literacy rate, population growth, and built-up land.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://sage.nelson.wisc.edu/data-and-models/atlas/',
    apiDocs: 'https://sage.nelson.wisc.edu/',
    dataTypes: ['Population', 'Economic', 'Environmental'],
    formats: ['Grid', 'Shapefile'],
    resolution: 'Variable',
    contact: 'sage@wisc.edu',
    rating: 4.4,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 104,
    name: 'ESPON Grid Data',
    provider: 'ESPON',
    category: 'urban',
    type: 'Socioeconomic Data',
    coverage: 'Europe',
    region: 'Europe',
    description: 'Human geography indicators in gridded raster form including GDP, population, and unemployment for Europe.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://www.espon.eu/tools-maps/espon-data-and-maps',
    apiDocs: 'https://www.espon.eu/',
    dataTypes: ['GDP', 'Population', 'Unemployment'],
    formats: ['GeoTIFF', 'Grid'],
    resolution: '1km',
    contact: 'info@espon.eu',
    rating: 4.3,
    downloads: '150K+',
    standards: ['INSPIRE']
  },
  {
    id: 105,
    name: 'History Database of the Global Environment (HYDE)',
    provider: 'PBL Netherlands',
    category: 'research',
    type: 'Historical Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Gridded time-series of population and land-use for last 12,000 years including GDP, agricultural areas, and emissions.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'CC-BY',
    directLink: 'https://themasites.pbl.nl/tridion/en/themasites/hyde/',
    apiDocs: 'https://themasites.pbl.nl/tridion/en/themasites/hyde/download/index-2.html',
    dataTypes: ['Historical Population', 'Land Use', 'Agriculture'],
    formats: ['ASCII', 'NetCDF'],
    resolution: '5 arc-minutes',
    contact: 'hyde@pbl.nl',
    rating: 4.7,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 106,
    name: 'Humanitarian Response Common Operational Datasets',
    provider: 'UN OCHA',
    category: 'disaster',
    type: 'Humanitarian Data',
    coverage: 'Multi-Regional',
    region: 'Multi-Regional',
    description: 'Registry of operational datasets for many countries including administrative boundaries, transport, and population.',
    pricing: 'Free',
    updateFrequency: 'Event-driven',
    license: 'Various Open',
    directLink: 'https://data.humdata.org/dashboards/cod',
    apiDocs: 'https://data.humdata.org/faq',
    dataTypes: ['Admin Boundaries', 'Population', 'Infrastructure'],
    formats: ['Shapefile', 'GeoJSON', 'CSV'],
    resolution: 'Variable',
    contact: 'hdx@un.org',
    rating: 4.5,
    downloads: '600K+',
    standards: ['HXL', 'COD']
  },
  {
    id: 107,
    name: 'CShapes - Historical Boundaries',
    provider: 'ETH Zurich',
    category: 'research',
    type: 'Historical Boundaries',
    coverage: 'Global',
    region: 'Global',
    description: 'Historical state boundaries and capitals post-WWII worldwide with all changes and dates for political science research.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'GPL',
    directLink: 'http://nils.weidmann.ws/projects/cshapes.html',
    apiDocs: 'http://nils.weidmann.ws/projects/cshapes.html',
    dataTypes: ['Historical Boundaries', 'Political Geography'],
    formats: ['Shapefile', 'R Package'],
    resolution: 'Country-level',
    contact: 'cshapes@ethz.ch',
    rating: 4.5,
    downloads: '100K+',
    standards: ['ISO 19115']
  },
  {
    id: 108,
    name: 'Eurostat GISCO Geodata',
    provider: 'Eurostat',
    category: 'urban',
    type: 'European Data',
    coverage: 'Europe',
    region: 'Europe',
    description: 'Wide range of geographical data for Europe including administrative boundaries, population grids, and land cover.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'Open',
    directLink: 'https://ec.europa.eu/eurostat/web/gisco',
    apiDocs: 'https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data',
    dataTypes: ['Admin Boundaries', 'Population', 'Transport'],
    formats: ['Shapefile', 'GeoJSON', 'TopoJSON'],
    resolution: 'Variable',
    contact: 'estat-gisco@ec.europa.eu',
    rating: 4.6,
    downloads: '800K+',
    standards: ['INSPIRE', 'ISO 19115']
  },
  {
    id: 109,
    name: 'Geoboundaries',
    provider: 'William & Mary geoLab',
    category: 'urban',
    type: 'Administrative Boundaries',
    coverage: 'Global',
    region: 'Global',
    description: 'Over 1 million boundaries within 200 countries for academic and commercial use with open licensing.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'Open',
    directLink: 'https://www.geoboundaries.org/',
    apiDocs: 'https://www.geoboundaries.org/api.html',
    dataTypes: ['Admin Boundaries', 'Multiple Levels'],
    formats: ['Shapefile', 'GeoJSON', 'GeoPackage', 'REST API'],
    resolution: 'Variable',
    contact: 'team@geoboundaries.org',
    rating: 4.7,
    downloads: '1M+',
    standards: ['ISO 19115']
  },
  {
    id: 110,
    name: 'Global Administrative Unit Layers (GAUL)',
    provider: 'FAO',
    category: 'urban',
    type: 'Administrative Boundaries',
    coverage: 'Global',
    region: 'Global',
    description: 'Reliable administrative boundaries worldwide with consistent updates implemented by FAO and partners.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://data.apps.fao.org/map/catalog/srv/eng/catalog.search#/metadata/9c35ba10-5649-41c8-bdfc-eb78e9e65654',
    apiDocs: 'https://www.fao.org/geonetwork/',
    dataTypes: ['Admin Boundaries', 'Country Divisions'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'gaul@fao.org',
    rating: 4.6,
    downloads: '700K+',
    standards: ['ISO 19115']
  },
  {
    id: 111,
    name: 'TZ Timezones',
    provider: 'IANA',
    category: 'urban',
    type: 'Timezone Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Timezone areas worldwide as used in Unix TZ database format, useful for time zone applications.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Public Domain',
    directLink: 'https://github.com/evansiroky/timezone-boundary-builder',
    apiDocs: 'https://github.com/evansiroky/timezone-boundary-builder',
    dataTypes: ['Timezones', 'Temporal'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'N/A',
    rating: 4.4,
    downloads: '500K+',
    standards: ['IANA']
  },
  {
    id: 112,
    name: 'VLIZ Maritime Boundaries',
    provider: 'Flanders Marine Institute',
    category: 'environment',
    type: 'Maritime Boundaries',
    coverage: 'Global Oceans',
    region: 'Global',
    description: 'Maritime boundaries and Exclusive Economic Zones with detailed treaty and legal information for maritime studies.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'CC-BY',
    directLink: 'https://www.marineregions.org/',
    apiDocs: 'https://www.marineregions.org/webservices.php',
    dataTypes: ['EEZ', 'Maritime Boundaries', 'Treaties'],
    formats: ['Shapefile', 'WMS', 'REST API'],
    resolution: 'Variable',
    contact: 'info@marineregions.org',
    rating: 4.6,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 113,
    name: 'World Borders Dataset',
    provider: 'thematicmapping.org',
    category: 'urban',
    type: 'Country Boundaries',
    coverage: 'Global',
    region: 'Global',
    description: 'World country borders with attributes including country codes, area, and population for demographic studies.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'CC-BY-SA',
    directLink: 'http://thematicmapping.org/downloads/world_borders.php',
    apiDocs: 'N/A',
    dataTypes: ['Country Borders', 'Demographics'],
    formats: ['Shapefile'],
    resolution: 'Country-level',
    contact: 'N/A',
    rating: 4.3,
    downloads: '2M+',
    standards: ['ISO 19115']
  },
  {
    id: 114,
    name: 'IUCN Red List Spatial Data',
    provider: 'IUCN',
    category: 'environment',
    type: 'Species Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Distribution of endangered plant and animal species worldwide for conservation and environmental impact assessments.',
    pricing: 'Free (Non-commercial)',
    updateFrequency: 'Periodic',
    license: 'Non-commercial',
    directLink: 'https://www.iucnredlist.org/resources/spatial-data-download',
    apiDocs: 'https://www.iucnredlist.org/resources/spatial-data-download',
    dataTypes: ['Endangered Species', 'Distribution', 'Conservation'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Species range',
    contact: 'redlist@iucn.org',
    rating: 4.7,
    downloads: '500K+',
    standards: ['ISO 19115']
  },
  {
    id: 115,
    name: 'World Database on Protected Areas (WDPA)',
    provider: 'UNEP-WCMC/IUCN',
    category: 'environment',
    type: 'Protected Areas',
    coverage: 'Global',
    region: 'Global',
    description: 'Global database of marine and terrestrial protected areas for conservation planning and biodiversity studies.',
    pricing: 'Free',
    updateFrequency: 'Monthly',
    license: 'Non-commercial',
    directLink: 'https://www.protectedplanet.net/en/thematic-areas/wdpa',
    apiDocs: 'https://api.protectedplanet.net/',
    dataTypes: ['Protected Areas', 'Conservation', 'Parks'],
    formats: ['Shapefile', 'GeoJSON', 'REST API'],
    resolution: 'Polygon',
    contact: 'protectedareas@unep-wcmc.org',
    rating: 4.8,
    downloads: '1M+',
    standards: ['WDPA', 'ISO 19115']
  },
  {
    id: 116,
    name: 'UNESCO World Heritage List',
    provider: 'UNESCO',
    category: 'environment',
    type: 'Heritage Sites',
    coverage: 'Global',
    region: 'Global',
    description: 'Natural and cultural sites recognized for universal value to humanity for conservation and heritage management.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'Open',
    directLink: 'https://whc.unesco.org/en/list/',
    apiDocs: 'https://whc.unesco.org/en/syndication/',
    dataTypes: ['Heritage Sites', 'Cultural', 'Natural'],
    formats: ['KML', 'Shapefile', 'XML'],
    resolution: 'Site-level',
    contact: 'wh-info@unesco.org',
    rating: 4.5,
    downloads: '300K+',
    standards: ['ISO 19115']
  },
  {
    id: 117,
    name: 'Global Rural-Urban Mapping Project (GRUMP)',
    provider: 'CIESIN Columbia',
    category: 'urban',
    type: 'Urban/Rural Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Datasets blending urban area data with population for understanding global human population distribution.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'CC-BY',
    directLink: 'https://sedac.ciesin.columbia.edu/data/collection/grump-v1',
    apiDocs: 'https://sedac.ciesin.columbia.edu/data/collection/grump-v1',
    dataTypes: ['Urban Extent', 'Population', 'Settlement Points'],
    formats: ['GeoTIFF', 'Shapefile'],
    resolution: '1km',
    contact: 'ciesin.info@columbia.edu',
    rating: 4.5,
    downloads: '600K+',
    standards: ['ISO 19115']
  },
  {
    id: 118,
    name: 'Crop Calendar GIS',
    provider: 'SAGE/IFPRI',
    category: 'agriculture',
    type: 'Agricultural Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Gridded data on planting and harvesting dates for 19 crops worldwide at multiple resolutions.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'https://sage.nelson.wisc.edu/data-and-models/datasets/crop-calendar-dataset/',
    apiDocs: 'https://sage.nelson.wisc.edu/',
    dataTypes: ['Crop Calendar', 'Planting Dates', 'Harvest'],
    formats: ['NetCDF', 'GeoTIFF'],
    resolution: '5min-0.5°',
    contact: 'sage@wisc.edu',
    rating: 4.4,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 119,
    name: 'EarthStat Agricultural Land Use',
    provider: 'University of Minnesota',
    category: 'agriculture',
    type: 'Agricultural Data',
    coverage: 'Global',
    region: 'Global',
    description: 'GIS datasets on agricultural land use including cropland, pasture, harvested areas, and fertilizer application rates.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'CC-BY',
    directLink: 'http://www.earthstat.org/',
    apiDocs: 'http://www.earthstat.org/',
    dataTypes: ['Cropland', 'Pasture', 'Yields', 'Fertilizer'],
    formats: ['GeoTIFF', 'NetCDF'],
    resolution: '5min',
    contact: 'earthstat@umn.edu',
    rating: 4.5,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 120,
    name: 'Global Irrigated and Rainfed Cropland',
    provider: 'IWMI',
    category: 'agriculture',
    type: 'Agricultural Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Vector mapping of global irrigated and rainfed cropland areas for agricultural and water resource management.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://www.iwmi.cgiar.org/resources/data-and-tools/',
    apiDocs: 'https://www.iwmi.cgiar.org/',
    dataTypes: ['Irrigated Areas', 'Rainfed Cropland', 'Agriculture'],
    formats: ['Shapefile', 'GeoTIFF'],
    resolution: 'Variable',
    contact: 'iwmi@cgiar.org',
    rating: 4.3,
    downloads: '250K+',
    standards: ['ISO 19115']
  },
  {
    id: 121,
    name: 'Global Urban Footprint',
    provider: 'DLR Germany',
    category: 'urban',
    type: 'Urban Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Global map of built-up areas at 12m resolution derived from radar satellite imagery for urbanization studies.',
    pricing: 'Free (Research)',
    updateFrequency: 'Static',
    license: 'Research License',
    directLink: 'https://www.dlr.de/eoc/en/desktopdefault.aspx/tabid-9628/',
    apiDocs: 'https://geoservice.dlr.de/web/',
    dataTypes: ['Urban Extent', 'Built-up Areas', 'Settlements'],
    formats: ['GeoTIFF'],
    resolution: '12m',
    contact: 'guf@dlr.de',
    rating: 4.6,
    downloads: '300K+',
    standards: ['ISO 19115']
  },
  {
    id: 122,
    name: 'Global Reservoir and Dam Database (GRanD)',
    provider: 'Global Water System Project',
    category: 'environment',
    type: 'Water Infrastructure',
    coverage: 'Global',
    region: 'Global',
    description: 'Geographically-referenced data on reservoirs over 0.1 km³ with high-resolution polygons and extensive metadata.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'http://globaldamwatch.org/grand/',
    apiDocs: 'http://globaldamwatch.org/grand/',
    dataTypes: ['Dams', 'Reservoirs', 'Water Storage'],
    formats: ['Shapefile', 'CSV'],
    resolution: 'Variable',
    contact: 'grand@globaldamwatch.org',
    rating: 4.5,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 123,
    name: 'ACLED Conflict Data',
    provider: 'Armed Conflict Location & Event Data Project',
    category: 'disaster',
    type: 'Conflict Data',
    coverage: 'Multi-Regional',
    region: 'Multi-Regional',
    description: 'Comprehensive data on reported conflict events in developing countries from 1997 to present for conflict analysis.',
    pricing: 'Freemium',
    updateFrequency: 'Weekly',
    license: 'CC-BY-NC',
    directLink: 'https://acleddata.com/',
    apiDocs: 'https://apidocs.acleddata.com/',
    dataTypes: ['Conflict Events', 'Political Violence', 'Protests'],
    formats: ['CSV', 'REST API'],
    resolution: 'Event-level',
    contact: 'info@acleddata.com',
    rating: 4.6,
    downloads: '500K+',
    standards: ['ACLED']
  },
  {
    id: 124,
    name: 'Uppsala Conflict Data Programme',
    provider: 'Uppsala University',
    category: 'disaster',
    type: 'Conflict Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Detailed information on political violence instances in Africa and Asia for conflict pattern analysis.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'CC-BY',
    directLink: 'https://ucdp.uu.se/',
    apiDocs: 'https://ucdp.uu.se/downloads/',
    dataTypes: ['Armed Conflict', 'Violence', 'Casualties'],
    formats: ['CSV', 'Shapefile', 'REST API'],
    resolution: 'Event-level',
    contact: 'ucdp@pcr.uu.se',
    rating: 4.7,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 125,
    name: 'Global Terrorism Database',
    provider: 'University of Maryland START',
    category: 'disaster',
    type: 'Terrorism Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Records terrorist events worldwide from 1970-present with detailed location and attribute information.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'Academic License',
    directLink: 'https://www.start.umd.edu/gtd/',
    apiDocs: 'https://www.start.umd.edu/gtd/about/',
    dataTypes: ['Terrorism', 'Attacks', 'Casualties'],
    formats: ['Excel', 'CSV'],
    resolution: 'Event-level',
    contact: 'gtd@start.umd.edu',
    rating: 4.5,
    downloads: '300K+',
    standards: ['GTD']
  },
  {
    id: 126,
    name: 'Facebook High Resolution Population Density',
    provider: 'Meta/CIESIN',
    category: 'urban',
    type: 'Population Data',
    coverage: 'Multi-Regional',
    region: 'Multi-Regional',
    description: 'High-resolution 30m population density maps for over 150 countries for demographic analysis.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'CC-BY',
    directLink: 'https://data.humdata.org/organization/facebook',
    apiDocs: 'https://dataforgood.facebook.com/dfg/docs',
    dataTypes: ['Population Density', 'Settlement'],
    formats: ['GeoTIFF', 'CSV'],
    resolution: '30m',
    contact: 'dataforgood@fb.com',
    rating: 4.6,
    downloads: '600K+',
    standards: ['ISO 19115']
  },
  {
    id: 127,
    name: 'GeoHive',
    provider: 'GeoHive',
    category: 'urban',
    type: 'Statistical Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Population and country statistics in non-GIS formats suitable for conversion for spatial analysis.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'http://www.geohive.com/',
    apiDocs: 'N/A',
    dataTypes: ['Population', 'Demographics', 'Statistics'],
    formats: ['CSV', 'HTML'],
    resolution: 'Country-level',
    contact: 'N/A',
    rating: 4.2,
    downloads: '100K+',
    standards: ['N/A']
  },
  {
    id: 128,
    name: 'High Resolution Settlement Layer (HRSL)',
    provider: 'Meta/CIESIN',
    category: 'urban',
    type: 'Population Data',
    coverage: 'Multi-Regional',
    region: 'Multi-Regional',
    description: 'Estimates human population at 30m resolution for 2015 for detailed population analysis and urban planning.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'CC-BY',
    directLink: 'https://data.humdata.org/organization/facebook',
    apiDocs: 'https://dataforgood.facebook.com/dfg/docs',
    dataTypes: ['Population', 'Settlement', 'Buildings'],
    formats: ['GeoTIFF', 'CSV'],
    resolution: '30m',
    contact: 'dataforgood@fb.com',
    rating: 4.5,
    downloads: '500K+',
    standards: ['ISO 19115']
  },
  {
    id: 129,
    name: 'IPUMS Terra',
    provider: 'University of Minnesota',
    category: 'research',
    type: 'Integrated Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Integrates population and environmental data providing historical and contemporary demographic data with environment.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Open',
    directLink: 'https://terra.ipums.org/',
    apiDocs: 'https://terra.ipums.org/terra-action/menu',
    dataTypes: ['Population', 'Environment', 'Land Use'],
    formats: ['CSV', 'Shapefile', 'GeoTIFF'],
    resolution: 'Variable',
    contact: 'ipums@umn.edu',
    rating: 4.4,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 130,
    name: 'Large Urban Areas 1950-2050',
    provider: 'SEDAC',
    category: 'urban',
    type: 'Urban Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Historic, current, and future population estimates in large urban areas worldwide for urban studies.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'CC-BY',
    directLink: 'https://sedac.ciesin.columbia.edu/data/collection/gpw-v4',
    apiDocs: 'https://sedac.ciesin.columbia.edu/data/collection/gpw-v4',
    dataTypes: ['Urban Population', 'Projections', 'Cities'],
    formats: ['CSV', 'Excel'],
    resolution: 'City-level',
    contact: 'ciesin.info@columbia.edu',
    rating: 4.3,
    downloads: '300K+',
    standards: ['ISO 19115']
  },
  {
    id: 131,
    name: 'Geofabrik OSM Extracts',
    provider: 'Geofabrik',
    category: 'opensource',
    type: 'Vector Data',
    coverage: 'Global',
    region: 'Global',
    description: 'OpenStreetMap data downloads in shapefile format for GIS-compatible use with regional extracts.',
    pricing: 'Free',
    updateFrequency: 'Daily',
    license: 'ODbL',
    directLink: 'https://download.geofabrik.de/',
    apiDocs: 'https://download.geofabrik.de/technical.html',
    dataTypes: ['Roads', 'Buildings', 'POIs', 'Land Use'],
    formats: ['Shapefile', 'PBF', 'OSM'],
    resolution: 'Variable',
    contact: 'info@geofabrik.de',
    rating: 4.7,
    downloads: '5M+',
    standards: ['OSM', 'OGC']
  },
  {
    id: 132,
    name: 'POI Factory',
    provider: 'POI Factory',
    category: 'urban',
    type: 'Points of Interest',
    coverage: 'Multi-Regional',
    region: 'Multi-Regional',
    description: 'Point of Interest files for GPS units including shops, businesses, places of worship, and speed cameras.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Various',
    directLink: 'https://www.poi-factory.com/',
    apiDocs: 'https://www.poi-factory.com/developers',
    dataTypes: ['POIs', 'Shops', 'Services', 'Speed Cameras'],
    formats: ['CSV', 'GPX'],
    resolution: 'Point Data',
    contact: 'support@poi-factory.com',
    rating: 4.2,
    downloads: '1M+',
    standards: ['GPS']
  },
  {
    id: 133,
    name: 'Flightradar24',
    provider: 'Flightradar24',
    category: 'transportation',
    type: 'Aviation Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Real-time information on airplane traffic worldwide including flight tracks, origins, destinations, and aircraft types.',
    pricing: 'Freemium',
    updateFrequency: 'Real-time',
    license: 'Commercial',
    directLink: 'https://www.flightradar24.com/',
    apiDocs: 'https://www.flightradar24.com/terms-and-conditions',
    dataTypes: ['Flight Tracking', 'Aircraft', 'Aviation'],
    formats: ['REST API', 'JSON'],
    resolution: 'Real-time',
    contact: 'support@flightradar24.com',
    rating: 4.5,
    downloads: 'Enterprise',
    standards: ['ADS-B']
  },
  {
    id: 134,
    name: 'Global Airports Database',
    provider: 'OurAirports',
    category: 'transportation',
    type: 'Aviation Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Comprehensive database of airports worldwide with ICAO/IATA codes, location, elevation, and runway details.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Public Domain',
    directLink: 'https://ourairports.com/',
    apiDocs: 'https://ourairports.com/data/',
    dataTypes: ['Airports', 'Runways', 'Aviation Infrastructure'],
    formats: ['CSV', 'Shapefile'],
    resolution: 'Point Data',
    contact: 'data@ourairports.com',
    rating: 4.6,
    downloads: '500K+',
    standards: ['ICAO']
  },
  {
    id: 135,
    name: 'Facebook Social Connectedness Index',
    provider: 'Meta',
    category: 'urban',
    type: 'Social Network Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Measures connectedness strength between geographical areas based on Facebook friendship ties for social network studies.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Research License',
    directLink: 'https://dataforgood.facebook.com/dfg/tools/social-connectedness-index',
    apiDocs: 'https://dataforgood.facebook.com/dfg/docs',
    dataTypes: ['Social Networks', 'Connectivity', 'Relationships'],
    formats: ['CSV'],
    resolution: 'Regional',
    contact: 'dataforgood@fb.com',
    rating: 4.3,
    downloads: '100K+',
    standards: ['N/A']
  },
  {
    id: 136,
    name: 'JRC Travel Time to Major Cities',
    provider: 'European Commission JRC',
    category: 'transportation',
    type: 'Accessibility Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Travel time to nearest major city (>50,000 people) at 1km resolution for urban connectivity studies.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'CC-BY',
    directLink: 'https://forobs.jrc.ec.europa.eu/products/gam/',
    apiDocs: 'https://forobs.jrc.ec.europa.eu/',
    dataTypes: ['Travel Time', 'Accessibility', 'Urban Connectivity'],
    formats: ['GeoTIFF'],
    resolution: '1km',
    contact: 'jrc-forest-resources@ec.europa.eu',
    rating: 4.5,
    downloads: '300K+',
    standards: ['ISO 19115']
  },
  {
    id: 137,
    name: 'MAP Accessibility to Cities',
    provider: 'Malaria Atlas Project',
    category: 'transportation',
    type: 'Accessibility Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Updated travel time dataset with enhanced road networks and better unpaved road treatment for accessibility analysis.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'CC-BY',
    directLink: 'https://malariaatlas.org/research-project/accessibility-to-cities/',
    apiDocs: 'https://malariaatlas.org/',
    dataTypes: ['Travel Time', 'Accessibility', 'Roads'],
    formats: ['GeoTIFF'],
    resolution: '1km',
    contact: 'map@bdi.ox.ac.uk',
    rating: 4.6,
    downloads: '250K+',
    standards: ['ISO 19115']
  },
  {
    id: 138,
    name: 'MarineTraffic',
    provider: 'MarineTraffic',
    category: 'transportation',
    type: 'Maritime Data',
    coverage: 'Global Oceans',
    region: 'Global',
    description: 'Real-time ship movements worldwide with vessel information and maritime statistics for maritime traffic analysis.',
    pricing: 'Freemium',
    updateFrequency: 'Real-time',
    license: 'Commercial',
    directLink: 'https://www.marinetraffic.com/',
    apiDocs: 'https://www.marinetraffic.com/en/ais-api-services',
    dataTypes: ['Vessel Tracking', 'AIS', 'Maritime'],
    formats: ['REST API', 'CSV'],
    resolution: 'Real-time',
    contact: 'support@marinetraffic.com',
    rating: 4.5,
    downloads: 'Enterprise',
    standards: ['AIS', 'IMO']
  },
  {
    id: 139,
    name: 'Open Flights',
    provider: 'OpenFlights',
    category: 'transportation',
    type: 'Aviation Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Airport, airline, and route data globally in CSV format including all known airports and numerous routes.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'ODbL',
    directLink: 'https://openflights.org/',
    apiDocs: 'https://openflights.org/data.html',
    dataTypes: ['Airports', 'Airlines', 'Routes'],
    formats: ['CSV', 'SQL'],
    resolution: 'Point/Network',
    contact: 'data@openflights.org',
    rating: 4.4,
    downloads: '800K+',
    standards: ['IATA', 'ICAO']
  },
  {
    id: 140,
    name: 'Undersea Telecommunications Cables',
    provider: 'TeleGeography',
    category: 'telecom',
    type: 'Infrastructure Data',
    coverage: 'Global Oceans',
    region: 'Global',
    description: 'Open-source map of undersea telecommunication cables frequently updated for global communication network analysis.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC-BY-SA',
    directLink: 'https://www.submarinecablemap.com/',
    apiDocs: 'https://github.com/telegeography/www.submarinecablemap.com',
    dataTypes: ['Submarine Cables', 'Infrastructure', 'Communications'],
    formats: ['Shapefile', 'KML', 'GeoJSON'],
    resolution: 'Cable routes',
    contact: 'research@telegeography.com',
    rating: 4.6,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 141,
    name: 'World Port Index',
    provider: 'National Geospatial-Intelligence Agency',
    category: 'transportation',
    type: 'Maritime Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Dataset listing approximately 3700 ports globally with location and facilities for maritime transport studies.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Public Domain',
    directLink: 'https://msi.nga.mil/Publications/WPI',
    apiDocs: 'https://msi.nga.mil/Publications/WPI',
    dataTypes: ['Ports', 'Harbor Facilities', 'Maritime Infrastructure'],
    formats: ['Shapefile', 'CSV'],
    resolution: 'Point Data',
    contact: 'msi@nga.mil',
    rating: 4.5,
    downloads: '500K+',
    standards: ['NGA']
  },
  {
    id: 142,
    name: 'GeoNames',
    provider: 'GeoNames',
    category: 'urban',
    type: 'Gazetteer',
    coverage: 'Global',
    region: 'Global',
    description: 'Geographical database with over 11 million placenames covering all countries for place name verification and research.',
    pricing: 'Freemium',
    updateFrequency: 'Continuous',
    license: 'CC-BY',
    directLink: 'https://www.geonames.org/',
    apiDocs: 'https://www.geonames.org/export/web-services.html',
    dataTypes: ['Place Names', 'Gazetteer', 'Toponymy'],
    formats: ['REST API', 'CSV', 'SQL'],
    resolution: 'Point Data',
    contact: 'support@geonames.org',
    rating: 4.7,
    downloads: '10M+',
    standards: ['ISO 3166']
  },
  {
    id: 143,
    name: 'G-Econ',
    provider: 'Yale University',
    category: 'urban',
    type: 'Economic Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Geographically-based economic data providing Gross Cell Product measurements on a raster basis for spatial economics.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'https://gecon.yale.edu/',
    apiDocs: 'https://gecon.yale.edu/',
    dataTypes: ['GDP', 'Economic Output', 'Grid-based Economics'],
    formats: ['Grid', 'Shapefile'],
    resolution: '1°',
    contact: 'gecon@yale.edu',
    rating: 4.4,
    downloads: '100K+',
    standards: ['ISO 19115']
  },
  {
    id: 144,
    name: 'GAR15 Global Assessment of Risk',
    provider: 'UNDRR',
    category: 'disaster',
    type: 'Risk Assessment',
    coverage: 'Global',
    region: 'Global',
    description: 'UN dataset showing capital invested in infrastructure at 5km resolution for risk assessment and disaster cost analysis.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://www.undrr.org/gar',
    apiDocs: 'https://www.undrr.org/gar',
    dataTypes: ['Infrastructure Value', 'Risk', 'Capital'],
    formats: ['GeoTIFF', 'Shapefile'],
    resolution: '5km',
    contact: 'gar@un.org',
    rating: 4.3,
    downloads: '150K+',
    standards: ['ISO 19115']
  },
  {
    id: 145,
    name: 'Africa GeoPortal',
    provider: 'Esri',
    category: 'regional',
    type: 'Regional Portal',
    coverage: 'Africa',
    region: 'Africa',
    description: 'Access to geospatial tools and data for African countries designed for mapping, analysis, and data sharing.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Various',
    directLink: 'https://www.africageoportal.com/',
    apiDocs: 'https://www.africageoportal.com/',
    dataTypes: ['Multi-theme', 'Regional', 'African Data'],
    formats: ['Various'],
    resolution: 'Variable',
    contact: 'africageoportal@esri.com',
    rating: 4.4,
    downloads: '300K+',
    standards: ['OGC', 'Esri']
  },
  {
    id: 146,
    name: 'Arctic Data Center',
    provider: 'NSF Arctic Data Center',
    category: 'environment',
    type: 'Regional Data',
    coverage: 'Arctic',
    region: 'Multi-Regional',
    description: 'Wide range of Arctic research data including sea ice extent, thickness, movement, and climate parameters.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Various Open',
    directLink: 'https://arcticdata.io/',
    apiDocs: 'https://arcticdata.io/catalog/',
    dataTypes: ['Sea Ice', 'Climate', 'Arctic Research'],
    formats: ['NetCDF', 'CSV', 'GeoTIFF'],
    resolution: 'Variable',
    contact: 'support@arcticdata.io',
    rating: 4.6,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 147,
    name: 'Antarctic Digital Database (ADD)',
    provider: 'British Antarctic Survey',
    category: 'environment',
    type: 'Regional Data',
    coverage: 'Antarctica',
    region: 'Multi-Regional',
    description: 'Seamless topographic data for Antarctica up to 60°S including coastline, contours, and rock outcrops.',
    pricing: 'Free',
    updateFrequency: 'Bi-annual',
    license: 'Open',
    directLink: 'https://www.add.scar.org/',
    apiDocs: 'https://www.add.scar.org/',
    dataTypes: ['Topography', 'Coastline', 'Antarctic Features'],
    formats: ['Shapefile', 'GeoPackage'],
    resolution: 'Variable',
    contact: 'add@bas.ac.uk',
    rating: 4.5,
    downloads: '150K+',
    standards: ['SCAR', 'ISO 19115']
  },
  {
    id: 148,
    name: 'BEDMAP2',
    provider: 'British Antarctic Survey',
    category: 'environment',
    type: 'Ice Data',
    coverage: 'Antarctica',
    region: 'Multi-Regional',
    description: 'Improved datasets for Antarctic ice bed, surface, and thickness for glaciological studies and ice sheet dynamics.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'https://www.bas.ac.uk/project/bedmap-2/',
    apiDocs: 'https://www.bas.ac.uk/project/bedmap-2/',
    dataTypes: ['Ice Thickness', 'Bedrock', 'Ice Surface'],
    formats: ['NetCDF', 'GeoTIFF'],
    resolution: '1km',
    contact: 'bedmap@bas.ac.uk',
    rating: 4.7,
    downloads: '250K+',
    standards: ['ISO 19115']
  },
  {
    id: 149,
    name: 'Quantarctica',
    provider: 'Norwegian Polar Institute',
    category: 'environment',
    type: 'Regional Data Collection',
    coverage: 'Antarctica',
    region: 'Multi-Regional',
    description: 'Comprehensive Antarctic datasets including basemaps, elevation, satellite imagery, glaciology, and geophysical data.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://www.npolar.no/quantarctica/',
    apiDocs: 'https://www.npolar.no/quantarctica/',
    dataTypes: ['Multi-theme', 'Antarctic', 'Glaciology'],
    formats: ['QGIS Project', 'Various'],
    resolution: 'Variable',
    contact: 'quantarctica@npolar.no',
    rating: 4.8,
    downloads: '100K+',
    standards: ['OGC', 'ISO 19115']
  },
  {
    id: 150,
    name: 'IPA Circum-arctic Permafrost Map',
    provider: 'International Permafrost Association',
    category: 'environment',
    type: 'Permafrost Data',
    coverage: 'Arctic',
    region: 'Multi-Regional',
    description: 'Vector map of permafrost and ground ice in Arctic region covering 20°N to 90°N for climate studies.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://ipa.arcticportal.org/products/gis-data',
    apiDocs: 'https://ipa.arcticportal.org/',
    dataTypes: ['Permafrost', 'Ground Ice', 'Arctic'],
    formats: ['Shapefile', 'GeoTIFF'],
    resolution: 'Variable',
    contact: 'ipa@ipa.arcticportal.org',
    rating: 4.4,
    downloads: '100K+',
    standards: ['ISO 19115']
  },
  {
    id: 151,
    name: 'China Historical GIS (CHGIS)',
    provider: 'Harvard University',
    category: 'research',
    type: 'Historical Data',
    coverage: 'China',
    region: 'Asia',
    description: 'Free database of placenames and historical administrative units for Chinese Dynasties for historical research.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'CC-BY-NC',
    directLink: 'https://sites.fas.harvard.edu/~chgis/',
    apiDocs: 'https://sites.fas.harvard.edu/~chgis/',
    dataTypes: ['Historical Boundaries', 'Place Names', 'Administrative'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'chgis@fas.harvard.edu',
    rating: 4.5,
    downloads: '80K+',
    standards: ['ISO 19115']
  },
  {
    id: 152,
    name: 'Geoscience Australia',
    provider: 'Australian Government',
    category: 'regional',
    type: 'National Data',
    coverage: 'Australia',
    region: 'Oceania',
    description: 'Comprehensive Australian geological, hydrological, and topographical data including detailed maps and datasets.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'CC-BY',
    directLink: 'https://www.ga.gov.au/',
    apiDocs: 'https://www.ga.gov.au/data-pubs',
    dataTypes: ['Geology', 'Topography', 'Hydrology'],
    formats: ['Shapefile', 'GeoTIFF', 'WMS'],
    resolution: 'Variable',
    contact: 'clientservices@ga.gov.au',
    rating: 4.7,
    downloads: '1M+',
    standards: ['OGC', 'ISO 19115']
  },
  {
    id: 153,
    name: 'LINZ Data Service',
    provider: 'Land Information New Zealand',
    category: 'regional',
    type: 'National Data',
    coverage: 'New Zealand',
    region: 'Oceania',
    description: 'Variety of datasets including topographic, hydrographic, survey, titles, geodetic data, and aerial photographs.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'CC-BY',
    directLink: 'https://data.linz.govt.nz/',
    apiDocs: 'https://www.linz.govt.nz/data/linz-data-service/guides-and-documentation',
    dataTypes: ['Topographic', 'Cadastral', 'Aerial Imagery'],
    formats: ['Shapefile', 'GeoTIFF', 'WMS', 'WFS'],
    resolution: 'Variable',
    contact: 'customersupport@linz.govt.nz',
    rating: 4.8,
    downloads: '800K+',
    standards: ['OGC', 'ISO 19115']
  },
  {
    id: 154,
    name: 'Statistics Canada Boundary Files',
    provider: 'Statistics Canada',
    category: 'regional',
    type: 'Administrative Boundaries',
    coverage: 'Canada',
    region: 'North America',
    description: 'Administrative and geographic boundaries for Canada essential for Canadian demographic research.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'Open',
    directLink: 'https://www12.statcan.gc.ca/census-recensement/2021/geo/sip-pis/boundary-limites/index-eng.cfm',
    apiDocs: 'https://www.statcan.gc.ca/en/developers',
    dataTypes: ['Admin Boundaries', 'Census Divisions', 'Electoral'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'infostats@statcan.gc.ca',
    rating: 4.6,
    downloads: '500K+',
    standards: ['ISO 19115']
  },
  {
    id: 155,
    name: 'U.S. Census Bureau TIGER/Line',
    provider: 'U.S. Census Bureau',
    category: 'regional',
    type: 'Administrative Boundaries',
    coverage: 'United States',
    region: 'North America',
    description: 'Detailed administrative and geographic boundaries including counties, congressional districts, and urban areas.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'Public Domain',
    directLink: 'https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html',
    apiDocs: 'https://www.census.gov/data/developers.html',
    dataTypes: ['Admin Boundaries', 'Roads', 'Water Features'],
    formats: ['Shapefile', 'GeoJSON', 'KML'],
    resolution: 'Variable',
    contact: 'geo.geography@census.gov',
    rating: 4.7,
    downloads: '5M+',
    standards: ['FGDC', 'ISO 19115']
  },
  {
    id: 156,
    name: 'USGS Earth Explorer',
    provider: 'U.S. Geological Survey',
    category: 'basemaps',
    type: 'Satellite Imagery Portal',
    coverage: 'Global',
    region: 'Global',
    description: 'Search, preview, and download satellite imagery including land cover and land use datasets for specific regions.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Public Domain',
    directLink: 'https://earthexplorer.usgs.gov/',
    apiDocs: 'https://m2m.cr.usgs.gov/',
    dataTypes: ['Landsat', 'ASTER', 'MODIS', 'Aerial'],
    formats: ['GeoTIFF', 'HDF'],
    resolution: 'Variable',
    contact: 'custserv@usgs.gov',
    rating: 4.6,
    downloads: '10M+',
    standards: ['ISO 19115', 'FGDC']
  },
  {
    id: 157,
    name: 'U.S. National Land Cover Database',
    provider: 'USGS',
    category: 'environment',
    type: 'Land Cover',
    coverage: 'United States',
    region: 'North America',
    description: 'High-resolution land cover information for the United States with multiple classification schemes.',
    pricing: 'Free',
    updateFrequency: 'Every 5 years',
    license: 'Public Domain',
    directLink: 'https://www.mrlc.gov/',
    apiDocs: 'https://www.mrlc.gov/data-services-page',
    dataTypes: ['Land Cover', 'Land Use', '16 Classes'],
    formats: ['GeoTIFF', 'WMS'],
    resolution: '30m',
    contact: 'mrlc@usgs.gov',
    rating: 4.7,
    downloads: '2M+',
    standards: ['ISO 19115']
  },
  {
    id: 158,
    name: 'PRISM Climate Data',
    provider: 'Oregon State University',
    category: 'environment',
    type: 'Climate Data',
    coverage: 'United States',
    region: 'North America',
    description: 'High-resolution climate data for the United States including temperature, precipitation, and climatic elements.',
    pricing: 'Free',
    updateFrequency: 'Monthly',
    license: 'Open',
    directLink: 'https://prism.oregonstate.edu/',
    apiDocs: 'https://prism.oregonstate.edu/documents/',
    dataTypes: ['Temperature', 'Precipitation', 'Climate'],
    formats: ['BIL', 'ASCII', 'GeoTIFF'],
    resolution: '800m-4km',
    contact: 'prism@oregonstate.edu',
    rating: 4.6,
    downloads: '1M+',
    standards: ['ISO 19115']
  },
  {
    id: 159,
    name: 'IGN France',
    provider: 'Institut National de l\'Information Géographique et Forestière',
    category: 'regional',
    type: 'National Data',
    coverage: 'France',
    region: 'Europe',
    description: 'Official source for French GIS data including relief, drainage, boundaries, raster maps, and coastline information.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Open',
    directLink: 'https://geoservices.ign.fr/',
    apiDocs: 'https://geoservices.ign.fr/documentation/',
    dataTypes: ['Topographic', 'Cadastral', 'Aerial Imagery'],
    formats: ['Shapefile', 'GeoTIFF', 'WMS', 'WMTS'],
    resolution: 'Variable',
    contact: 'contact@ign.fr',
    rating: 4.7,
    downloads: '2M+',
    standards: ['INSPIRE', 'OGC']
  },
  {
    id: 160,
    name: 'Ordnance Survey Open Data',
    provider: 'Ordnance Survey UK',
    category: 'regional',
    type: 'National Data',
    coverage: 'United Kingdom',
    region: 'Europe',
    description: 'Free geographic data for Great Britain including boundaries, place names, roads, rivers, and topography.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open Government Licence',
    directLink: 'https://www.ordnancesurvey.co.uk/opendatadownload/products.html',
    apiDocs: 'https://osdatahub.os.uk/docs/',
    dataTypes: ['Boundaries', 'Topography', 'Roads', 'Place Names'],
    formats: ['Shapefile', 'GeoPackage', 'GML'],
    resolution: 'Variable',
    contact: 'customerservices@os.uk',
    rating: 4.7,
    downloads: '1.5M+',
    standards: ['INSPIRE', 'OGC']
  },
  {
    id: 161,
    name: 'GovData Germany',
    provider: 'German Federal Government',
    category: 'regional',
    type: 'National Portal',
    coverage: 'Germany',
    region: 'Europe',
    description: 'Central platform for German open data providing access to geospatial data from federal, state, and local entities.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Various Open',
    directLink: 'https://www.govdata.de/',
    apiDocs: 'https://www.govdata.de/web/guest/daten',
    dataTypes: ['Multi-theme', 'Administrative', 'Environmental'],
    formats: ['Various'],
    resolution: 'Variable',
    contact: 'info@govdata.de',
    rating: 4.5,
    downloads: '800K+',
    standards: ['INSPIRE', 'OGC']
  },
  {
    id: 162,
    name: 'OneGeology Portal',
    provider: 'OneGeology',
    category: 'research',
    type: 'Geological Maps',
    coverage: 'Global',
    region: 'Global',
    description: 'Geological maps from worldwide organizations with varying detail levels for geological research and mineral exploration.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Various',
    directLink: 'http://www.onegeology.org/',
    apiDocs: 'http://www.onegeology.org/technical_progress/home.html',
    dataTypes: ['Geology', 'Lithology', 'Geological Maps'],
    formats: ['WMS', 'WFS'],
    resolution: 'Variable',
    contact: 'onegeology@bgs.ac.uk',
    rating: 4.5,
    downloads: '400K+',
    standards: ['OGC', 'GeoSciML']
  },
  {
    id: 163,
    name: 'USGS Mineral Resources Data System',
    provider: 'U.S. Geological Survey',
    category: 'resources',
    type: 'Mineral Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Comprehensive data on mineral resources, mines, and deposits including commodities, location, production, and geology.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Public Domain',
    directLink: 'https://mrdata.usgs.gov/mrds/',
    apiDocs: 'https://mrdata.usgs.gov/',
    dataTypes: ['Mineral Deposits', 'Mines', 'Commodities'],
    formats: ['Shapefile', 'CSV', 'KML'],
    resolution: 'Point Data',
    contact: 'mrdata@usgs.gov',
    rating: 4.6,
    downloads: '300K+',
    standards: ['USGS', 'ISO 19115']
  },
  {
    id: 164,
    name: 'USGS Energy Resources Program',
    provider: 'U.S. Geological Survey',
    category: 'resources',
    type: 'Energy Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Wide range of data on energy resources including oil, gas, coal, and geothermal energy for resource assessment.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Public Domain',
    directLink: 'https://www.usgs.gov/energy-and-minerals/energy-resources-program',
    apiDocs: 'https://www.usgs.gov/energy-and-minerals',
    dataTypes: ['Oil & Gas', 'Coal', 'Geothermal', 'Energy'],
    formats: ['Shapefile', 'GeoTIFF', 'PDF'],
    resolution: 'Variable',
    contact: 'energy_resources@usgs.gov',
    rating: 4.5,
    downloads: '250K+',
    standards: ['USGS', 'ISO 19115']
  },
  {
    id: 165,
    name: 'Energy Information Administration',
    provider: 'U.S. Department of Energy',
    category: 'resources',
    type: 'Energy Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Comprehensive energy data, analysis, and forecasts for U.S. and international markets including oil, gas, and renewables.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Public Domain',
    directLink: 'https://www.eia.gov/',
    apiDocs: 'https://www.eia.gov/opendata/',
    dataTypes: ['Energy Statistics', 'Oil', 'Gas', 'Electricity'],
    formats: ['CSV', 'Excel', 'REST API'],
    resolution: 'Country/Region',
    contact: 'infoctr@eia.gov',
    rating: 4.6,
    downloads: '1M+',
    standards: ['EIA']
  },
  {
    id: 166,
    name: 'Mindat.org',
    provider: 'Mindat.org',
    category: 'resources',
    type: 'Mineral Database',
    coverage: 'Global',
    region: 'Global',
    description: 'Comprehensive database of mineral information with data on thousands of minerals including properties and locations.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Various',
    directLink: 'https://www.mindat.org/',
    apiDocs: 'https://www.mindat.org/api.php',
    dataTypes: ['Minerals', 'Localities', 'Properties'],
    formats: ['REST API', 'CSV'],
    resolution: 'Point Data',
    contact: 'admin@mindat.org',
    rating: 4.7,
    downloads: '500K+',
    standards: ['Mineralogy']
  },
  {
    id: 167,
    name: 'International Livestock Research Institute Data',
    provider: 'ILRI',
    category: 'agriculture',
    type: 'Agricultural Data',
    coverage: 'Kenya',
    region: 'Africa',
    description: 'Detailed geospatial datasets for Kenya including administrative boundaries, villages, and agricultural statistics.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://www.ilri.org/data',
    apiDocs: 'https://www.ilri.org/',
    dataTypes: ['Agricultural Statistics', 'Boundaries', 'Villages'],
    formats: ['Shapefile', 'CSV'],
    resolution: 'Variable',
    contact: 'ilri-data@cgiar.org',
    rating: 4.4,
    downloads: '50K+',
    standards: ['ISO 19115']
  },
  {
    id: 168,
    name: 'Kenya Open Data',
    provider: 'Kenya Government',
    category: 'regional',
    type: 'National Portal',
    coverage: 'Kenya',
    region: 'Africa',
    description: 'Kenyan government open data portal with diverse data on education, poverty, employment, and agriculture.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://www.opendata.go.ke/',
    apiDocs: 'https://www.opendata.go.ke/',
    dataTypes: ['Socioeconomic', 'Demographics', 'Agriculture'],
    formats: ['CSV', 'Excel', 'Shapefile'],
    resolution: 'Variable',
    contact: 'opendata@ict.go.ke',
    rating: 4.3,
    downloads: '200K+',
    standards: ['Kenya Standard']
  },
  {
    id: 169,
    name: 'basemap.at',
    provider: 'Austrian Government',
    category: 'regional',
    type: 'Basemaps',
    coverage: 'Austria',
    region: 'Europe',
    description: 'Various vector datasets and shading data for Austria including basemaps and terrain models.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://basemap.at/',
    apiDocs: 'https://basemap.at/#lizenz',
    dataTypes: ['Basemaps', 'Vector', 'Terrain'],
    formats: ['Vector Tiles', 'WMS', 'WMTS'],
    resolution: '1m',
    contact: 'basemap@bev.gv.at',
    rating: 4.5,
    downloads: '300K+',
    standards: ['OGC']
  },
  {
    id: 170,
    name: 'Open Data Austria',
    provider: 'Austrian Government',
    category: 'regional',
    type: 'National Portal',
    coverage: 'Austria',
    region: 'Europe',
    description: 'Access to Austrian datasets including population, society, education, culture, and energy data.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Various Open',
    directLink: 'https://www.data.gv.at/',
    apiDocs: 'https://www.data.gv.at/infos/api-zugang/',
    dataTypes: ['Multi-theme', 'Socioeconomic', 'Environmental'],
    formats: ['Various'],
    resolution: 'Variable',
    contact: 'opendata@bka.gv.at',
    rating: 4.4,
    downloads: '400K+',
    standards: ['DCAT-AP']
  },
  {
    id: 171,
    name: 'Data.gov.be Belgium',
    provider: 'Belgian Government',
    category: 'regional',
    type: 'National Portal',
    coverage: 'Belgium',
    region: 'Europe',
    description: 'Belgian Open Data Initiative with over 10,000 datasets including agriculture, environment, and education.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Various Open',
    directLink: 'https://data.gov.be/',
    apiDocs: 'https://data.gov.be/en/docs',
    dataTypes: ['Multi-theme', 'Agriculture', 'Environment'],
    formats: ['Various'],
    resolution: 'Variable',
    contact: 'opendata@bosa.fgov.be',
    rating: 4.4,
    downloads: '500K+',
    standards: ['DCAT-AP']
  },
  {
    id: 172,
    name: 'Finnish Meteorological Institute',
    provider: 'FMI',
    category: 'environment',
    type: 'Weather Data',
    coverage: 'Finland',
    region: 'Europe',
    description: 'Meteorological and oceanographic data for Finland including weather station, radar, and satellite data.',
    pricing: 'Free',
    updateFrequency: 'Real-time',
    license: 'CC BY 4.0',
    directLink: 'https://en.ilmatieteenlaitos.fi/open-data',
    apiDocs: 'https://en.ilmatieteenlaitos.fi/open-data-manual',
    dataTypes: ['Weather', 'Climate', 'Oceanographic'],
    formats: ['WFS', 'WMS', 'NetCDF'],
    resolution: 'Variable',
    contact: 'avoin-data@fmi.fi',
    rating: 4.6,
    downloads: '600K+',
    standards: ['OGC', 'INSPIRE']
  },
  {
    id: 173,
    name: 'Statistics Finland',
    provider: 'Statistics Finland',
    category: 'urban',
    type: 'Statistical Data',
    coverage: 'Finland',
    region: 'Europe',
    description: 'Open geographic data including statistical areas with WMS and WFS interfaces compliant with INSPIRE.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.stat.fi/org/avoindata/paikkatietoaineistot_en.html',
    apiDocs: 'https://www.stat.fi/org/avoindata/',
    dataTypes: ['Statistical Areas', 'Demographics', 'Administrative'],
    formats: ['WMS', 'WFS', 'Shapefile'],
    resolution: 'Variable',
    contact: 'kirjaamo@stat.fi',
    rating: 4.5,
    downloads: '200K+',
    standards: ['INSPIRE', 'OGC']
  },
  {
    id: 174,
    name: 'BRGM France Geological Maps',
    provider: 'BRGM',
    category: 'research',
    type: 'Geological Data',
    coverage: 'France',
    region: 'Europe',
    description: 'Free digital geological maps of mainland France vectorized at 1:50,000 scale from InfoTerre portal.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'http://infoterre.brgm.fr/',
    apiDocs: 'http://infoterre.brgm.fr/',
    dataTypes: ['Geological Maps', 'Lithology', 'Stratigraphy'],
    formats: ['Shapefile', 'WMS', 'WFS'],
    resolution: '1:50,000',
    contact: 'infoterre@brgm.fr',
    rating: 4.6,
    downloads: '400K+',
    standards: ['INSPIRE', 'OGC']
  },
  {
    id: 175,
    name: 'Cadastre France',
    provider: 'French Government',
    category: 'urban',
    type: 'Cadastral Data',
    coverage: 'France',
    region: 'Europe',
    description: 'Comprehensive cadastral data for France with detailed property boundaries and tax information.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://cadastre.data.gouv.fr/',
    apiDocs: 'https://cadastre.data.gouv.fr/datasets',
    dataTypes: ['Cadastral', 'Property Boundaries', 'Parcels'],
    formats: ['Shapefile', 'GeoJSON', 'DXF'],
    resolution: 'Parcel-level',
    contact: 'cadastre@data.gouv.fr',
    rating: 4.5,
    downloads: '800K+',
    standards: ['INSPIRE']
  },
  {
    id: 176,
    name: 'Géolittoral France',
    provider: 'French Government',
    category: 'environment',
    type: 'Coastal Data',
    coverage: 'France',
    region: 'Europe',
    description: 'GIS data on French coasts and maritime areas including port activities and coastal dynamics.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'http://www.geolittoral.developpement-durable.gouv.fr/',
    apiDocs: 'http://www.geolittoral.developpement-durable.gouv.fr/',
    dataTypes: ['Coastal', 'Maritime', 'Ports'],
    formats: ['Shapefile', 'WMS'],
    resolution: 'Variable',
    contact: 'geolittoral@developpement-durable.gouv.fr',
    rating: 4.3,
    downloads: '150K+',
    standards: ['INSPIRE']
  },
  {
    id: 177,
    name: 'ParisData',
    provider: 'City of Paris',
    category: 'urban',
    type: 'City Data',
    coverage: 'France (Paris)',
    region: 'Europe',
    description: 'Open data for Paris with georeferenced datasets on urban planning, transportation, and city infrastructure.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'ODbL',
    directLink: 'https://opendata.paris.fr/',
    apiDocs: 'https://opendata.paris.fr/pages/home/',
    dataTypes: ['Urban', 'Transportation', 'Infrastructure'],
    formats: ['Shapefile', 'GeoJSON', 'CSV'],
    resolution: 'Variable',
    contact: 'opendata@paris.fr',
    rating: 4.5,
    downloads: '600K+',
    standards: ['OGC']
  },
  {
    id: 178,
    name: 'Federal Agency for Cartography Germany',
    provider: 'BKG Germany',
    category: 'regional',
    type: 'National Data',
    coverage: 'Germany',
    region: 'Europe',
    description: 'Geodata and services as part of German Open Data including topographic and administrative data.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Various Open',
    directLink: 'https://gdz.bkg.bund.de/',
    apiDocs: 'https://gdz.bkg.bund.de/index.php/default/open-data.html',
    dataTypes: ['Topographic', 'Administrative', 'Cadastral'],
    formats: ['Shapefile', 'WMS', 'WFS'],
    resolution: 'Variable',
    contact: 'gdz@bkg.bund.de',
    rating: 4.6,
    downloads: '1M+',
    standards: ['INSPIRE', 'OGC']
  },
  {
    id: 179,
    name: 'Geoportal.de Germany',
    provider: 'German Government',
    category: 'regional',
    type: 'National Portal',
    coverage: 'Germany',
    region: 'Europe',
    description: 'Central gateway for spatial data infrastructure in Germany with access to federal, state, and local geodata.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Various Open',
    directLink: 'https://www.geoportal.de/',
    apiDocs: 'https://www.geoportal.de/EN/GDI-DE/gdi-de.html',
    dataTypes: ['Multi-theme', 'Spatial Data Infrastructure'],
    formats: ['WMS', 'WFS', 'CSW'],
    resolution: 'Variable',
    contact: 'kontakt@geoportal.de',
    rating: 4.7,
    downloads: '2M+',
    standards: ['INSPIRE', 'OGC']
  },
  {
    id: 180,
    name: 'SwissTopo',
    provider: 'Swiss Federal Office of Topography',
    category: 'regional',
    type: 'National Data',
    coverage: 'Switzerland',
    region: 'Europe',
    description: 'High-resolution elevation and topographic data for Switzerland known for precision and quality.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://www.swisstopo.admin.ch/',
    apiDocs: 'https://www.swisstopo.admin.ch/en/geodata.html',
    dataTypes: ['Elevation', 'Topographic', 'Boundaries'],
    formats: ['Shapefile', 'GeoTIFF', 'WMS', 'WMTS'],
    resolution: '0.5m-25m',
    contact: 'geodata@swisstopo.ch',
    rating: 4.9,
    downloads: '800K+',
    standards: ['OGC', 'ISO 19115']
  },
  {
    id: 181,
    name: 'Swiss Glacier Monitoring Network',
    provider: 'GLAMOS',
    category: 'environment',
    type: 'Glacier Data',
    coverage: 'Switzerland',
    region: 'Europe',
    description: 'Long-term data on Swiss glaciers including length change, mass balance, and volume change.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'CC BY 4.0',
    directLink: 'https://www.glamos.ch/',
    apiDocs: 'https://www.glamos.ch/en/downloads',
    dataTypes: ['Glacier Mass Balance', 'Length Change', 'Volume'],
    formats: ['CSV', 'Shapefile'],
    resolution: 'Glacier-level',
    contact: 'glamos@vaw.baug.ethz.ch',
    rating: 4.6,
    downloads: '100K+',
    standards: ['ISO 19115']
  },
  {
    id: 182,
    name: 'Norway Digital Terrain Models',
    provider: 'Norwegian Mapping Authority',
    category: 'research',
    type: 'Elevation Data',
    coverage: 'Norway',
    region: 'Europe',
    description: 'High-resolution digital terrain models for Norway useful for environmental management and planning.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://hoydedata.no/',
    apiDocs: 'https://kartkatalog.geonorge.no/',
    dataTypes: ['DTM', 'Elevation', 'Terrain'],
    formats: ['GeoTIFF', 'LAS', 'WMS'],
    resolution: '0.25m-10m',
    contact: 'post@kartverket.no',
    rating: 4.7,
    downloads: '400K+',
    standards: ['INSPIRE', 'OGC']
  },
  {
    id: 183,
    name: 'British Isles GNSS Facility',
    provider: 'BIGF',
    category: 'research',
    type: 'GNSS Data',
    coverage: 'United Kingdom',
    region: 'Europe',
    description: 'Archived RINEX format GNSS data from continuous stations across British Isles for geodetic research.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Open',
    directLink: 'http://www.bigf.ac.uk/',
    apiDocs: 'http://www.bigf.ac.uk/',
    dataTypes: ['GNSS', 'GPS', 'Geodetic'],
    formats: ['RINEX'],
    resolution: 'Station-level',
    contact: 'bigf@bgs.ac.uk',
    rating: 4.5,
    downloads: '50K+',
    standards: ['RINEX', 'IGS']
  },
  {
    id: 184,
    name: 'GeoGratis Canada',
    provider: 'Natural Resources Canada',
    category: 'regional',
    type: 'National Data',
    coverage: 'Canada',
    region: 'North America',
    description: 'Comprehensive datasets about Canada including population, Landsat mosaics, land capability, and hydrology.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open Government Licence',
    directLink: 'https://www.nrcan.gc.ca/maps-tools-publications/tools/geodetic-reference-systems-tools/tools-applications/10925',
    apiDocs: 'https://www.nrcan.gc.ca/earth-sciences/geography/topographic-information/free-data-geogratis/11042',
    dataTypes: ['Topographic', 'Hydrology', 'Land Cover'],
    formats: ['Shapefile', 'GeoTIFF', 'WMS'],
    resolution: 'Variable',
    contact: 'geogratis@nrcan.gc.ca',
    rating: 4.6,
    downloads: '1M+',
    standards: ['OGC', 'ISO 19115']
  },
  {
    id: 185,
    name: 'Open Government Canada',
    provider: 'Government of Canada',
    category: 'regional',
    type: 'National Portal',
    coverage: 'Canada',
    region: 'North America',
    description: 'Wide array of open data including extensive geographic data integrated from GeoGratis.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Open Government Licence',
    directLink: 'https://open.canada.ca/',
    apiDocs: 'https://open.canada.ca/en/access-our-application-programming-interface-api',
    dataTypes: ['Multi-theme', 'Geographic', 'Socioeconomic'],
    formats: ['Various'],
    resolution: 'Variable',
    contact: 'open-ouvert@tbs-sct.gc.ca',
    rating: 4.7,
    downloads: '2M+',
    standards: ['OGC', 'ISO 19115']
  },
  {
    id: 186,
    name: 'Land Cover of North America',
    provider: 'NALCMS',
    category: 'environment',
    type: 'Land Cover',
    coverage: 'North America',
    region: 'North America',
    description: 'Collaborative land cover data integrating Canada, US, and Mexico utilizing Landsat 8 data.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'http://www.cec.org/north-american-environmental-atlas/land-cover-30m-2015-landsat-and-cbers/',
    apiDocs: 'http://www.cec.org/',
    dataTypes: ['Land Cover', 'Continental', '19 Classes'],
    formats: ['GeoTIFF'],
    resolution: '30m',
    contact: 'info@cec.org',
    rating: 4.5,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 187,
    name: 'British Columbia Geology Map',
    provider: 'Government of British Columbia',
    category: 'regional',
    type: 'Geological Data',
    coverage: 'Canada (BC)',
    region: 'North America',
    description: 'Detailed geological maps for British Columbia province in shapefile and PDF formats.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open Government Licence',
    directLink: 'https://www2.gov.bc.ca/gov/content/data/geographic-data-services',
    apiDocs: 'https://catalogue.data.gov.bc.ca/',
    dataTypes: ['Geology', 'Lithology', 'Mineral Resources'],
    formats: ['Shapefile', 'PDF', 'WMS'],
    resolution: 'Variable',
    contact: 'data@gov.bc.ca',
    rating: 4.5,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 188,
    name: 'City of Toronto Open Data',
    provider: 'City of Toronto',
    category: 'urban',
    type: 'City Data',
    coverage: 'Canada (Toronto)',
    region: 'North America',
    description: 'Official source for Toronto open data with visualizations, data stories, and diverse datasets.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Open Government Licence',
    directLink: 'https://open.toronto.ca/',
    apiDocs: 'https://open.toronto.ca/open-data-api/',
    dataTypes: ['Urban', 'Transportation', 'Demographics'],
    formats: ['Shapefile', 'GeoJSON', 'CSV', 'REST API'],
    resolution: 'Variable',
    contact: 'opendata@toronto.ca',
    rating: 4.6,
    downloads: '800K+',
    standards: ['OGC']
  },
  {
    id: 189,
    name: 'Social Explorer',
    provider: 'Social Explorer',
    category: 'urban',
    type: 'Demographic Data',
    coverage: 'United States',
    region: 'North America',
    description: 'Easy access to U.S. demographic information including historical census data and visualizations.',
    pricing: 'Freemium',
    updateFrequency: 'Regular',
    license: 'Subscription',
    directLink: 'https://www.socialexplorer.com/',
    apiDocs: 'https://www.socialexplorer.com/data/metadata',
    dataTypes: ['Demographics', 'Census', 'Historical'],
    formats: ['Web Interface', 'CSV'],
    resolution: 'Census Tract',
    contact: 'info@socialexplorer.com',
    rating: 4.4,
    downloads: '500K+',
    standards: ['Census']
  },
  {
    id: 190,
    name: 'Australian Bureau of Statistics Boundaries',
    provider: 'ABS',
    category: 'urban',
    type: 'Administrative Boundaries',
    coverage: 'Australia',
    region: 'Oceania',
    description: 'Various administrative and statistical boundaries for Australia for demographic studies.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'CC BY 4.0',
    directLink: 'https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs-edition-3/jul2021-jun2026/access-and-downloads/digital-boundary-files',
    apiDocs: 'https://www.abs.gov.au/about/data-services/application-programming-interfaces-apis',
    dataTypes: ['Admin Boundaries', 'Statistical Areas', 'Census'],
    formats: ['Shapefile', 'GeoJSON', 'MapInfo'],
    resolution: 'Variable',
    contact: 'client.services@abs.gov.au',
    rating: 4.6,
    downloads: '600K+',
    standards: ['ISO 19115']
  },
  {
    id: 191,
    name: 'Australian Government Data',
    provider: 'Australian Government',
    category: 'regional',
    type: 'National Portal',
    coverage: 'Australia',
    region: 'Oceania',
    description: 'Wide array of data including environmental, demographic, and economic datasets in various formats.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'CC BY 4.0',
    directLink: 'https://data.gov.au/',
    apiDocs: 'https://data.gov.au/data/api',
    dataTypes: ['Multi-theme', 'Environmental', 'Socioeconomic'],
    formats: ['Various'],
    resolution: 'Variable',
    contact: 'data@pmc.gov.au',
    rating: 4.5,
    downloads: '1M+',
    standards: ['ISO 19115']
  },
  {
    id: 192,
    name: 'National Map of Australia',
    provider: 'Australian Government',
    category: 'regional',
    type: 'National Platform',
    coverage: 'Australia',
    region: 'Oceania',
    description: 'Collaborative platform providing access to spatial data from Australian government agencies with user-friendly visualization.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'CC BY 4.0',
    directLink: 'https://nationalmap.gov.au/',
    apiDocs: 'https://nationalmap.gov.au/',
    dataTypes: ['Multi-theme', 'Topographic', 'Environmental'],
    formats: ['WMS', 'WFS', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'nationalmap@ga.gov.au',
    rating: 4.7,
    downloads: '1.5M+',
    standards: ['OGC', 'ISO 19115']
  },
  {
    id: 193,
    name: 'Queensland GIS Service',
    provider: 'Queensland Government',
    category: 'regional',
    type: 'State Data',
    coverage: 'Australia (Queensland)',
    region: 'Oceania',
    description: 'Wide range of data from Queensland government covering environmental, agricultural, and demographic information.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.data.qld.gov.au/',
    apiDocs: 'https://www.data.qld.gov.au/article/standards-and-guidance/dataset-creation-standards',
    dataTypes: ['Environment', 'Agriculture', 'Infrastructure'],
    formats: ['Shapefile', 'CSV', 'WMS'],
    resolution: 'Variable',
    contact: 'opendata@qld.gov.au',
    rating: 4.5,
    downloads: '500K+',
    standards: ['OGC', 'ISO 19115']
  },
  {
    id: 194,
    name: 'Victoria Open Data',
    provider: 'Victoria Government',
    category: 'regional',
    type: 'State Data',
    coverage: 'Australia (Victoria)',
    region: 'Oceania',
    description: 'Diverse datasets for Victoria including transportation, environment, and public facilities for regional analysis.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.data.vic.gov.au/',
    apiDocs: 'https://www.data.vic.gov.au/help-and-resources/introduction-to-the-api',
    dataTypes: ['Transportation', 'Environment', 'Urban'],
    formats: ['Shapefile', 'GeoJSON', 'CSV', 'REST API'],
    resolution: 'Variable',
    contact: 'data.vic@dffh.vic.gov.au',
    rating: 4.6,
    downloads: '600K+',
    standards: ['OGC']
  },
  {
    id: 195,
    name: 'Stats NZ Geographic Data Service',
    provider: 'Statistics New Zealand',
    category: 'urban',
    type: 'Statistical Data',
    coverage: 'New Zealand',
    region: 'Oceania',
    description: 'Wide range of statistical geospatial data including demographic, economic, and environmental datasets.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://datafinder.stats.govt.nz/',
    apiDocs: 'https://www.stats.govt.nz/integrated-data/',
    dataTypes: ['Demographics', 'Economic', 'Census'],
    formats: ['Shapefile', 'GeoJSON', 'WMS'],
    resolution: 'Variable',
    contact: 'info@stats.govt.nz',
    rating: 4.6,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 196,
    name: 'Auckland Council GeoMaps',
    provider: 'Auckland Council',
    category: 'urban',
    type: 'City Data',
    coverage: 'New Zealand (Auckland)',
    region: 'Oceania',
    description: 'Comprehensive GIS viewer with spatial data for Auckland including aerial photography, zoning, and infrastructure.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://geomapspublic.aucklandcouncil.govt.nz/',
    apiDocs: 'https://data-aucklandcouncil.opendata.arcgis.com/',
    dataTypes: ['Urban Planning', 'Zoning', 'Infrastructure'],
    formats: ['WMS', 'WFS', 'Shapefile'],
    resolution: 'Variable',
    contact: 'geospatial@aucklandcouncil.govt.nz',
    rating: 4.5,
    downloads: '300K+',
    standards: ['OGC']
  },
  {
    id: 197,
    name: 'LRIS Data Portal New Zealand',
    provider: 'Manaaki Whenua Landcare Research',
    category: 'environment',
    type: 'Environmental Data',
    coverage: 'New Zealand',
    region: 'Oceania',
    description: 'Soil and environmental data for New Zealand including 25m-resolution DEMs of North and South Islands.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'CC BY 4.0',
    directLink: 'https://lris.scinfo.org.nz/',
    apiDocs: 'https://lris.scinfo.org.nz/',
    dataTypes: ['Soil', 'DEM', 'Land Cover'],
    formats: ['GeoTIFF', 'Shapefile', 'WMS'],
    resolution: '25m',
    contact: 'lris@landcareresearch.co.nz',
    rating: 4.6,
    downloads: '350K+',
    standards: ['ISO 19115']
  },
  {
    id: 198,
    name: 'VanuaGIS Fiji',
    provider: 'Fiji Ministry of Lands',
    category: 'regional',
    type: 'National Portal',
    coverage: 'Fiji',
    region: 'Oceania',
    description: 'Web portal providing geospatial information for Fiji covering valuation, cadastral, disaster management, and land use.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'http://www.fiji.gov.fj/',
    apiDocs: 'N/A',
    dataTypes: ['Cadastral', 'Disaster Management', 'Land Use'],
    formats: ['Shapefile', 'KML'],
    resolution: 'Variable',
    contact: 'info@lands.gov.fj',
    rating: 4.2,
    downloads: '50K+',
    standards: ['ISO 19115']
  },
  {
    id: 199,
    name: 'Pacific Environment Data Portal',
    provider: 'SPREP',
    category: 'environment',
    type: 'Regional Portal',
    coverage: 'Pacific Islands',
    region: 'Oceania',
    description: 'Environmental GIS data for Pacific region including marine atlases and environmental datasets.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Various Open',
    directLink: 'https://pacific-data.sprep.org/',
    apiDocs: 'https://pacific-data.sprep.org/',
    dataTypes: ['Marine', 'Environment', 'Climate'],
    formats: ['Shapefile', 'GeoJSON', 'WMS'],
    resolution: 'Variable',
    contact: 'sprep@sprep.org',
    rating: 4.4,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 200,
    name: 'Digital Atlas of Micronesia',
    provider: 'University of Guam',
    category: 'regional',
    type: 'Regional Atlas',
    coverage: 'Micronesia',
    region: 'Oceania',
    description: 'Comprehensive web-based atlas for Federated States of Micronesia with hundreds of geospatial layers.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'http://www.hydrolab.guam.net/portal/apps/webappviewer/',
    apiDocs: 'N/A',
    dataTypes: ['Marine', 'Terrestrial', 'Environmental'],
    formats: ['Web Map', 'Shapefile'],
    resolution: 'Variable',
    contact: 'hydrolab@triton.uog.edu',
    rating: 4.3,
    downloads: '30K+',
    standards: ['OGC']
  },
  {
    id: 201,
    name: 'Papua New Guinea Environment Data Portal',
    provider: 'PNG Government',
    category: 'environment',
    type: 'National Portal',
    coverage: 'Papua New Guinea',
    region: 'Oceania',
    description: 'Wide range of environmental datasets including atmosphere, biodiversity, coastal, and marine data.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://png-data.sprep.org/',
    apiDocs: 'https://png-data.sprep.org/',
    dataTypes: ['Biodiversity', 'Climate', 'Marine'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'info@sprep.org',
    rating: 4.2,
    downloads: '80K+',
    standards: ['ISO 19115']
  },
  {
    id: 202,
    name: 'Samoa Environment Data Portal',
    provider: 'Samoa Government',
    category: 'environment',
    type: 'National Portal',
    coverage: 'Samoa',
    region: 'Oceania',
    description: 'Overview of GIS datasets including digital atlases and spatial data viewers for environmental decision-making.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://samoa-data.sprep.org/',
    apiDocs: 'https://samoa-data.sprep.org/',
    dataTypes: ['Environment', 'Climate', 'Marine'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'samoa@sprep.org',
    rating: 4.1,
    downloads: '40K+',
    standards: ['ISO 19115']
  },
  {
    id: 203,
    name: 'Solomon Islands Environment Data Portal',
    provider: 'Solomon Islands Government',
    category: 'environment',
    type: 'National Portal',
    coverage: 'Solomon Islands',
    region: 'Oceania',
    description: 'Comprehensive GIS datasets for Solomon Islands including environmental and marine data.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://solomonislands-data.sprep.org/',
    apiDocs: 'https://solomonislands-data.sprep.org/',
    dataTypes: ['Environment', 'Marine', 'Biodiversity'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'info@sprep.org',
    rating: 4.1,
    downloads: '35K+',
    standards: ['ISO 19115']
  },
  {
    id: 204,
    name: 'Tonga Environment Data Portal',
    provider: 'Tonga Government',
    category: 'environment',
    type: 'National Portal',
    coverage: 'Tonga',
    region: 'Oceania',
    description: 'Environmental information including climate, biodiversity, and geographic data for decision-making in Tonga.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://tonga-data.sprep.org/',
    apiDocs: 'https://tonga-data.sprep.org/',
    dataTypes: ['Climate', 'Biodiversity', 'Marine'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'tonga@sprep.org',
    rating: 4.1,
    downloads: '30K+',
    standards: ['ISO 19115']
  },
  {
    id: 205,
    name: 'Vanuatu Environment Data Portal',
    provider: 'Vanuatu Government',
    category: 'environment',
    type: 'National Portal',
    coverage: 'Vanuatu',
    region: 'Oceania',
    description: 'Easy access to environmental datasets for monitoring, evaluating, and analyzing conditions in Vanuatu.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://vanuatu-data.sprep.org/',
    apiDocs: 'https://vanuatu-data.sprep.org/',
    dataTypes: ['Environment', 'Climate', 'Geoscience'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'vanuatu@sprep.org',
    rating: 4.2,
    downloads: '45K+',
    standards: ['ISO 19115']
  },
  {
    id: 206,
    name: 'Kiribati Environment Data Portal',
    provider: 'Kiribati Government',
    category: 'environment',
    type: 'National Portal',
    coverage: 'Kiribati',
    region: 'Oceania',
    description: 'Environmental GIS data including coral reefs and climate data for understanding ecological challenges.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://kiribati-data.sprep.org/',
    apiDocs: 'https://kiribati-data.sprep.org/',
    dataTypes: ['Coral Reefs', 'Climate', 'Marine'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'kiribati@sprep.org',
    rating: 4.0,
    downloads: '25K+',
    standards: ['ISO 19115']
  },
  {
    id: 207,
    name: 'Marshall Islands Environment Data Portal',
    provider: 'Marshall Islands Government',
    category: 'environment',
    type: 'National Portal',
    coverage: 'Marshall Islands',
    region: 'Oceania',
    description: 'Comprehensive GIS and spatial data for Marshall Islands covering atmosphere, biodiversity, and marine areas.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://marshallislands-data.sprep.org/',
    apiDocs: 'https://marshallislands-data.sprep.org/',
    dataTypes: ['Marine', 'Biodiversity', 'Climate'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'info@sprep.org',
    rating: 4.0,
    downloads: '20K+',
    standards: ['ISO 19115']
  },
  {
    id: 208,
    name: 'Palau Environment Data Portal',
    provider: 'Palau Government',
    category: 'environment',
    type: 'National Portal',
    coverage: 'Palau',
    region: 'Oceania',
    description: 'Environmental information and datasets for Palau including protected areas and marine data.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://palau-data.sprep.org/',
    apiDocs: 'https://palau-data.sprep.org/',
    dataTypes: ['Protected Areas', 'Marine', 'Biodiversity'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'palau@sprep.org',
    rating: 4.1,
    downloads: '30K+',
    standards: ['ISO 19115']
  },
  {
    id: 209,
    name: 'Nauru Environment Data Portal',
    provider: 'Nauru Government',
    category: 'environment',
    type: 'National Portal',
    coverage: 'Nauru',
    region: 'Oceania',
    description: 'Environmental data portal for Nauru with OpenStreetMap extracts and EEZ boundary data.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://nauru-data.sprep.org/',
    apiDocs: 'https://nauru-data.sprep.org/',
    dataTypes: ['EEZ Boundaries', 'OSM Data', 'Environmental'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'nauru@sprep.org',
    rating: 4.0,
    downloads: '15K+',
    standards: ['ISO 19115']
  },
  {
    id: 210,
    name: 'Tuvalu Environment Data Portal',
    provider: 'Tuvalu Government',
    category: 'environment',
    type: 'National Portal',
    coverage: 'Tuvalu',
    region: 'Oceania',
    description: 'GIS mapping for Tuvalu including reef and coastal data for environmental studies and planning.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://tuvalu-data.sprep.org/',
    apiDocs: 'https://tuvalu-data.sprep.org/',
    dataTypes: ['Coastal', 'Reefs', 'Environment'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'tuvalu@sprep.org',
    rating: 4.0,
    downloads: '20K+',
    standards: ['ISO 19115']
  },
  {
    id: 211,
    name: 'Argentina National Geographic Institute',
    provider: 'IGN Argentina',
    category: 'regional',
    type: 'National Data',
    coverage: 'Argentina',
    region: 'South America',
    description: 'Extensive GIS data including geodetic information and geographical details with WMS and WFS services.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://www.ign.gob.ar/',
    apiDocs: 'https://www.ign.gob.ar/NuestrasActividades/Geodesia',
    dataTypes: ['Topographic', 'Geodetic', 'Boundaries'],
    formats: ['Shapefile', 'WMS', 'WFS'],
    resolution: 'Variable',
    contact: 'informes@ign.gob.ar',
    rating: 4.5,
    downloads: '400K+',
    standards: ['OGC', 'ISO 19115']
  },
  {
    id: 212,
    name: 'geobr Brazil',
    provider: 'IPEA Brazil',
    category: 'regional',
    type: 'National Data',
    coverage: 'Brazil',
    region: 'South America',
    description: 'Comprehensive package for downloading official Brazilian spatial datasets with harmonized attributes and projections.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://github.com/ipeaGIT/geobr',
    apiDocs: 'https://ipeagit.github.io/geobr/',
    dataTypes: ['Administrative', 'Census', 'Infrastructure'],
    formats: ['Shapefile', 'GeoJSON', 'R Package'],
    resolution: 'Variable',
    contact: 'geobr@ipea.gov.br',
    rating: 4.6,
    downloads: '300K+',
    standards: ['SIRGAS2000', 'ISO 19115']
  },
  {
    id: 213,
    name: 'Data.world',
    provider: 'data.world',
    category: 'research',
    type: 'Data Portal',
    coverage: 'Global',
    region: 'Global',
    description: 'Platform hosting diverse datasets including geospatial data with user-contributed content.',
    pricing: 'Freemium',
    updateFrequency: 'Continuous',
    license: 'Various',
    directLink: 'https://data.world/',
    apiDocs: 'https://docs.data.world/',
    dataTypes: ['Multi-theme', 'User-contributed'],
    formats: ['Various', 'REST API'],
    resolution: 'Variable',
    contact: 'help@data.world',
    rating: 4.3,
    downloads: '1M+',
    standards: ['Various']
  },
  {
    id: 214,
    name: 'Belize National Spatial Data Infrastructure',
    provider: 'Belize Government',
    category: 'regional',
    type: 'National Portal',
    coverage: 'Belize',
    region: 'North America',
    description: 'Platform offering boundaries, ecosystems, protected areas, and settlement data for Belize.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'http://www.nsdi.gov.bz/',
    apiDocs: 'N/A',
    dataTypes: ['Boundaries', 'Ecosystems', 'Protected Areas'],
    formats: ['Shapefile', 'KML'],
    resolution: 'Variable',
    contact: 'info@nsdi.gov.bz',
    rating: 4.2,
    downloads: '50K+',
    standards: ['ISO 19115']
  },
  {
    id: 215,
    name: 'Statistical Institute of Belize GIS',
    provider: 'SIB Belize',
    category: 'urban',
    type: 'Statistical Data',
    coverage: 'Belize',
    region: 'North America',
    description: 'GIS unit providing maps for census and survey operations useful for household surveys.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://sib.org.bz/',
    apiDocs: 'N/A',
    dataTypes: ['Census', 'Statistical Areas', 'Demographics'],
    formats: ['Shapefile', 'PDF'],
    resolution: 'Variable',
    contact: 'info@mail.sib.org.bz',
    rating: 4.1,
    downloads: '30K+',
    standards: ['Census']
  },
  {
    id: 216,
    name: 'Canadian Soil Information Service',
    provider: 'Agriculture Canada',
    category: 'agriculture',
    type: 'Soil Data',
    coverage: 'Canada',
    region: 'North America',
    description: 'Comprehensive soil maps for Canada in GIS formats with extensive metadata and methodology.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open Government Licence',
    directLink: 'https://sis.agr.gc.ca/cansis/',
    apiDocs: 'https://sis.agr.gc.ca/cansis/nsdb/',
    dataTypes: ['Soil Maps', 'Soil Properties', 'Agriculture'],
    formats: ['Shapefile', 'GeoTIFF'],
    resolution: 'Variable',
    contact: 'aafc.cansis-nsdb.aac@canada.ca',
    rating: 4.5,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 217,
    name: 'Toporama Canada',
    provider: 'Natural Resources Canada',
    category: 'basemaps',
    type: 'Topographic Maps',
    coverage: 'Canada',
    region: 'North America',
    description: 'Simplified raster versions of National Topographic Survey maps at 1:50,000 and 1:250,000 scales.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open Government Licence',
    directLink: 'https://atlas.gc.ca/toporama/',
    apiDocs: 'https://www.nrcan.gc.ca/maps-tools-and-publications/maps/topographic-maps/',
    dataTypes: ['Topographic', 'Relief', 'Features'],
    formats: ['GeoTIFF', 'WMS'],
    resolution: '1:50,000-1:250,000',
    contact: 'geoinfo@nrcan.gc.ca',
    rating: 4.6,
    downloads: '600K+',
    standards: ['OGC']
  },
  {
    id: 218,
    name: 'Manitoba Land Initiative',
    provider: 'Manitoba Government',
    category: 'regional',
    type: 'Provincial Data',
    coverage: 'Canada (Manitoba)',
    region: 'North America',
    description: 'Detailed land data for Manitoba province with registration required for access.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open Government Licence',
    directLink: 'https://mli2.gov.mb.ca/',
    apiDocs: 'https://mli2.gov.mb.ca/',
    dataTypes: ['Cadastral', 'Land Use', 'Infrastructure'],
    formats: ['Shapefile', 'WMS'],
    resolution: 'Variable',
    contact: 'mli@gov.mb.ca',
    rating: 4.3,
    downloads: '100K+',
    standards: ['ISO 19115']
  },
  {
    id: 219,
    name: 'Government of Ontario Open Data',
    provider: 'Ontario Government',
    category: 'regional',
    type: 'Provincial Portal',
    coverage: 'Canada (Ontario)',
    region: 'North America',
    description: 'Variety of open datasets from Ontario with approximately 2,903 datasets published.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Open Government Licence',
    directLink: 'https://data.ontario.ca/',
    apiDocs: 'https://data.ontario.ca/en/api',
    dataTypes: ['Multi-theme', 'Environmental', 'Infrastructure'],
    formats: ['Various', 'REST API'],
    resolution: 'Variable',
    contact: 'opendata@ontario.ca',
    rating: 4.5,
    downloads: '800K+',
    standards: ['OGC']
  },
  {
    id: 220,
    name: 'Peel Region Open Data',
    provider: 'Peel Region',
    category: 'urban',
    type: 'Regional Data',
    coverage: 'Canada (Peel)',
    region: 'North America',
    description: 'Data portal for Peel Region with information on demographics, population, housing, and economic activity.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open Government Licence',
    directLink: 'https://data.peelregion.ca/',
    apiDocs: 'https://data.peelregion.ca/',
    dataTypes: ['Demographics', 'Housing', 'Economic'],
    formats: ['Shapefile', 'CSV', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'opendata@peelregion.ca',
    rating: 4.3,
    downloads: '150K+',
    standards: ['OGC']
  },
  {
    id: 221,
    name: 'USGS 3D Elevation Program',
    provider: 'U.S. Geological Survey',
    category: 'research',
    type: 'LIDAR Data',
    coverage: 'United States',
    region: 'North America',
    description: 'Extremely high-resolution LIDAR elevation data for the United States with detailed topographic information.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Public Domain',
    directLink: 'https://www.usgs.gov/3d-elevation-program',
    apiDocs: 'https://www.usgs.gov/3d-elevation-program/about-3dep-products-services',
    dataTypes: ['LIDAR', 'DEM', 'Point Clouds'],
    formats: ['LAS', 'LAZ', 'GeoTIFF'],
    resolution: '1m-10m',
    contact: '3dep@usgs.gov',
    rating: 4.8,
    downloads: '2M+',
    standards: ['ASPRS', 'ISO 19115']
  },
  {
    id: 222,
    name: 'Integrated Public Alert and Warning System',
    provider: 'FEMA',
    category: 'disaster',
    type: 'Alert System',
    coverage: 'United States',
    region: 'North America',
    description: 'Alerts and data on various emergency situations in the United States including natural disasters.',
    pricing: 'Free',
    updateFrequency: 'Real-time',
    license: 'Public Domain',
    directLink: 'https://www.fema.gov/emergency-managers/practitioners/integrated-public-alert-warning-system',
    apiDocs: 'https://www.fema.gov/about/openfema/api',
    dataTypes: ['Emergency Alerts', 'Disasters', 'Warnings'],
    formats: ['REST API', 'CAP'],
    resolution: 'Event-based',
    contact: 'fema-new-media@fema.dhs.gov',
    rating: 4.5,
    downloads: '1M+',
    standards: ['CAP', 'IPAWS']
  },
  {
    id: 223,
    name: 'USGS Landslide Inventory Map',
    provider: 'U.S. Geological Survey',
    category: 'disaster',
    type: 'Hazard Data',
    coverage: 'United States',
    region: 'North America',
    description: 'Detailed map of landslides in the United States for understanding landslide risks and patterns.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Public Domain',
    directLink: 'https://www.usgs.gov/programs/landslide-hazards',
    apiDocs: 'https://www.usgs.gov/programs/landslide-hazards/data-tools',
    dataTypes: ['Landslides', 'Hazards', 'Inventory'],
    formats: ['Shapefile', 'KML', 'GeoJSON'],
    resolution: 'Event-based',
    contact: 'landslides@usgs.gov',
    rating: 4.4,
    downloads: '200K+',
    standards: ['USGS', 'ISO 19115']
  },
  {
    id: 224,
    name: 'USGS Volcano Hazards Program',
    provider: 'U.S. Geological Survey',
    category: 'disaster',
    type: 'Volcano Data',
    coverage: 'United States',
    region: 'North America',
    description: 'Information on volcanic activity and hazards in the United States including eruption forecasts and gas advisories.',
    pricing: 'Free',
    updateFrequency: 'Real-time',
    license: 'Public Domain',
    directLink: 'https://www.usgs.gov/programs/VHP',
    apiDocs: 'https://www.usgs.gov/programs/VHP/data',
    dataTypes: ['Volcanic Activity', 'Hazards', 'Monitoring'],
    formats: ['GeoJSON', 'KML', 'REST API'],
    resolution: 'Volcano-level',
    contact: 'vhpcommunications@usgs.gov',
    rating: 4.6,
    downloads: '400K+',
    standards: ['USGS']
  },
  {
    id: 225,
    name: 'United States National Ice Center',
    provider: 'USNIC',
    category: 'environment',
    type: 'Ice Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Sea ice analysis and prediction including interactive ice charts and sea ice data products.',
    pricing: 'Free',
    updateFrequency: 'Daily',
    license: 'Public Domain',
    directLink: 'https://usicecenter.gov/',
    apiDocs: 'https://usicecenter.gov/Products',
    dataTypes: ['Sea Ice', 'Ice Charts', 'Ice Concentration'],
    formats: ['Shapefile', 'GeoTIFF', 'KML'],
    resolution: 'Variable',
    contact: 'usnic.helpdesk@noaa.gov',
    rating: 4.5,
    downloads: '300K+',
    standards: ['WMO', 'ISO 19115']
  },
  {
    id: 226,
    name: 'China Data Institute',
    provider: 'University of Michigan',
    category: 'regional',
    type: 'National Data',
    coverage: 'China',
    region: 'Asia',
    description: 'Variety of datasets including administrative boundaries of China for research and analysis.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Academic',
    directLink: 'https://www.lib.umich.edu/collections/collecting-areas/social-sciences-data/data-services/china-data-lab',
    apiDocs: 'N/A',
    dataTypes: ['Administrative Boundaries', 'Socioeconomic'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'chinadatalab@umich.edu',
    rating: 4.4,
    downloads: '250K+',
    standards: ['ISO 19115']
  },
  {
    id: 227,
    name: 'India Office of Registrar General Administrative Atlas',
    provider: 'Government of India',
    category: 'regional',
    type: 'Administrative Boundaries',
    coverage: 'India',
    region: 'Asia',
    description: 'Detailed administrative boundaries of India for socio-economic studies and planning.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://censusindia.gov.in/',
    apiDocs: 'https://censusindia.gov.in/census.website/',
    dataTypes: ['Admin Boundaries', 'Census', 'Demographics'],
    formats: ['Shapefile', 'PDF'],
    resolution: 'Variable',
    contact: 'orgi@censusindia.gov.in',
    rating: 4.3,
    downloads: '500K+',
    standards: ['Census India']
  },
  {
    id: 228,
    name: 'PETRONAS Open Data Platform',
    provider: 'PETRONAS Malaysia',
    category: 'resources',
    type: 'Oil & Gas Data',
    coverage: 'Malaysia',
    region: 'Asia',
    description: 'Geospatial and technical data related to oil and gas industry in Malaysia.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'PETRONAS Terms',
    directLink: 'https://www.petronas.com/',
    apiDocs: 'N/A',
    dataTypes: ['Oil & Gas', 'Wells', 'Facilities'],
    formats: ['Various'],
    resolution: 'Variable',
    contact: 'enquiry@petronas.com',
    rating: 4.2,
    downloads: '80K+',
    standards: ['Industry Standard']
  },
  {
    id: 229,
    name: 'World Data Centre for Geomagnetism',
    provider: 'British Geological Survey',
    category: 'research',
    type: 'Geomagnetic Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Hosts geomagnetic data and provides access to global geomagnetic observations and models.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Open',
    directLink: 'http://www.wdc.bgs.ac.uk/',
    apiDocs: 'http://www.wdc.bgs.ac.uk/catalog/',
    dataTypes: ['Geomagnetism', 'Magnetic Field', 'Observatory Data'],
    formats: ['ASCII', 'IAGA', 'CDF'],
    resolution: 'Observatory-level',
    contact: 'wdc@bgs.ac.uk',
    rating: 4.4,
    downloads: '100K+',
    standards: ['IAGA', 'WDS']
  },
  {
    id: 230,
    name: 'European Data Portal',
    provider: 'European Commission',
    category: 'regional',
    type: 'Regional Portal',
    coverage: 'Europe',
    region: 'Europe',
    description: 'Access to various geospatial datasets including LIDAR data from European countries.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Various Open',
    directLink: 'https://data.europa.eu/',
    apiDocs: 'https://data.europa.eu/api/',
    dataTypes: ['Multi-theme', 'LIDAR', 'Environmental'],
    formats: ['Various'],
    resolution: 'Variable',
    contact: 'contact@data.europa.eu',
    rating: 4.6,
    downloads: '2M+',
    standards: ['DCAT-AP', 'INSPIRE']
  },
  {
    id: 231,
    name: 'NOAA Digital Coast',
    provider: 'NOAA',
    category: 'environment',
    type: 'Coastal Data',
    coverage: 'United States',
    region: 'North America',
    description: 'LIDAR data for coastal regions of the United States with topographic and bathymetric information.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Public Domain',
    directLink: 'https://coast.noaa.gov/digitalcoast/',
    apiDocs: 'https://coast.noaa.gov/digitalcoast/data/',
    dataTypes: ['LIDAR', 'Coastal', 'Elevation'],
    formats: ['LAS', 'LAZ', 'GeoTIFF'],
    resolution: '1m-5m',
    contact: 'coastal.info@noaa.gov',
    rating: 4.7,
    downloads: '1M+',
    standards: ['ASPRS', 'ISO 19115']
  },
  {
    id: 232,
    name: 'The National Map USA',
    provider: 'USGS',
    category: 'basemaps',
    type: 'Topographic Platform',
    coverage: 'United States',
    region: 'North America',
    description: 'Collaborative effort offering various geospatial datasets including LIDAR data for USA.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Public Domain',
    directLink: 'https://www.usgs.gov/programs/national-geospatial-program/national-map',
    apiDocs: 'https://apps.nationalmap.gov/services',
    dataTypes: ['Topographic', 'LIDAR', 'Imagery'],
    formats: ['GeoTIFF', 'LAS', 'WMS', 'WFS'],
    resolution: 'Variable',
    contact: 'tnm_help@usgs.gov',
    rating: 4.8,
    downloads: '5M+',
    standards: ['OGC', 'ISO 19115']
  },
  {
    id: 233,
    name: 'Orrbodies Geology Maps',
    provider: 'Orrbodies',
    category: 'research',
    type: 'Geological Data',
    coverage: 'Multi-Regional',
    region: 'Multi-Regional',
    description: 'Wide array of geology maps for multiple countries with free and commercial datasets.',
    pricing: 'Freemium',
    updateFrequency: 'Regular',
    license: 'Various',
    directLink: 'https://www.orrbodies.com/',
    apiDocs: 'N/A',
    dataTypes: ['Geology', 'Mineral Resources', 'Maps'],
    formats: ['Shapefile', 'PDF'],
    resolution: 'Variable',
    contact: 'info@orrbodies.com',
    rating: 4.3,
    downloads: '150K+',
    standards: ['Various']
  },
  {
    id: 234,
    name: 'Norwegian Petroleum Directorate',
    provider: 'NPD Norway',
    category: 'resources',
    type: 'Oil & Gas Data',
    coverage: 'Norway',
    region: 'Europe',
    description: 'National Data Repository of oil and gas information for Norwegian petroleum sector.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://www.npd.no/',
    apiDocs: 'https://factpages.npd.no/en/factpages/documentation/api',
    dataTypes: ['Oil & Gas', 'Wells', 'Fields'],
    formats: ['Shapefile', 'REST API', 'CSV'],
    resolution: 'Variable',
    contact: 'post@npd.no',
    rating: 4.6,
    downloads: '300K+',
    standards: ['NPD']
  },
  {
    id: 235,
    name: 'NLOG Dutch Oil and Gas Portal',
    provider: 'Netherlands Government',
    category: 'resources',
    type: 'Oil & Gas Data',
    coverage: 'Netherlands',
    region: 'Europe',
    description: 'National Data Repository providing data on oil and gas exploration and production in the Netherlands.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://www.nlog.nl/',
    apiDocs: 'https://www.nlog.nl/en/data',
    dataTypes: ['Oil & Gas', 'Wells', 'Seismic'],
    formats: ['Shapefile', 'CSV'],
    resolution: 'Variable',
    contact: 'nlog@minezk.nl',
    rating: 4.4,
    downloads: '150K+',
    standards: ['Dutch Standard']
  },
  {
    id: 236,
    name: 'Fractracker Alliance',
    provider: 'Fractracker',
    category: 'resources',
    type: 'Fracking Data',
    coverage: 'United States',
    region: 'North America',
    description: 'Maps and data on hydraulic fracturing and oil and gas activities with environmental and health impact focus.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC-BY-NC-SA',
    directLink: 'https://www.fractracker.org/',
    apiDocs: 'https://www.fractracker.org/map/',
    dataTypes: ['Fracking', 'Oil & Gas Wells', 'Infrastructure'],
    formats: ['Shapefile', 'KML'],
    resolution: 'Point Data',
    contact: 'info@fractracker.org',
    rating: 4.3,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 237,
    name: 'Global Oil and Gas Features Map',
    provider: 'Esri',
    category: 'resources',
    type: 'Oil & Gas Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Interactive map providing detailed information on global oil and gas infrastructure including wells and pipelines.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Esri Terms',
    directLink: 'https://www.arcgis.com/home/item.html?id=8099d9e3a98e4d4a9b6e5b3c3e5c8e3e',
    apiDocs: 'https://developers.arcgis.com/',
    dataTypes: ['Oil & Gas Infrastructure', 'Wells', 'Pipelines'],
    formats: ['Feature Service', 'Shapefile'],
    resolution: 'Variable',
    contact: 'info@esri.com',
    rating: 4.5,
    downloads: '400K+',
    standards: ['Esri', 'OGC']
  },
  {
    id: 238,
    name: 'International Seabed Authority',
    provider: 'ISA',
    category: 'resources',
    type: 'Mineral Data',
    coverage: 'Global Oceans',
    region: 'Global',
    description: 'Information on polymetallic nodule deposits in international seabed area for mineral resources.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://www.isa.org.jm/',
    apiDocs: 'https://www.isa.org.jm/maps',
    dataTypes: ['Polymetallic Nodules', 'Seabed Minerals', 'Mining Areas'],
    formats: ['Shapefile', 'KML'],
    resolution: 'Variable',
    contact: 'info@isa.org.jm',
    rating: 4.3,
    downloads: '80K+',
    standards: ['ISA', 'ISO 19115']
  },
  {
    id: 239,
    name: 'Volcanogenic Massive Sulphide Deposits',
    provider: 'Research Database',
    category: 'resources',
    type: 'Mineral Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Detailed information on VMS deposits worldwide significant for copper, zinc, lead, gold, and silver.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'https://mrdata.usgs.gov/vms/',
    apiDocs: 'https://mrdata.usgs.gov/',
    dataTypes: ['VMS Deposits', 'Minerals', 'Commodities'],
    formats: ['Shapefile', 'CSV'],
    resolution: 'Point Data',
    contact: 'mrdata@usgs.gov',
    rating: 4.2,
    downloads: '60K+',
    standards: ['USGS']
  },
  {
    id: 240,
    name: 'Canada Road Network File',
    provider: 'Statistics Canada',
    category: 'transportation',
    type: 'Road Data',
    coverage: 'Canada',
    region: 'North America',
    description: 'National road network in shapefile format with detailed street information and address ranges.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'Open Government Licence',
    directLink: 'https://www12.statcan.gc.ca/census-recensement/2021/geo/sip-pis/rnf-frr/index-eng.cfm',
    apiDocs: 'https://www.statcan.gc.ca/en/developers',
    dataTypes: ['Road Network', 'Streets', 'Addresses'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Street-level',
    contact: 'infostats@statcan.gc.ca',
    rating: 4.6,
    downloads: '600K+',
    standards: ['ISO 19115']
  },
  {
    id: 241,
    name: 'TransitFeeds Public GTFS',
    provider: 'TransitFeeds',
    category: 'transportation',
    type: 'Transit Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Extensive collection of publicly available GTFS feeds providing public transit schedules and route maps.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Various Open',
    directLink: 'https://transitfeeds.com/',
    apiDocs: 'https://transitfeeds.com/api/',
    dataTypes: ['Transit Schedules', 'Routes', 'Stops'],
    formats: ['GTFS', 'REST API'],
    resolution: 'Route/Stop-level',
    contact: 'support@transitfeeds.com',
    rating: 4.5,
    downloads: '800K+',
    standards: ['GTFS']
  },
  {
    id: 242,
    name: 'Railways Open Data',
    provider: 'Various',
    category: 'transportation',
    type: 'Railway Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Data on railway networks worldwide for transportation infrastructure studies.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Various Open',
    directLink: 'https://data.europa.eu/data/datasets?topic=tran',
    apiDocs: 'N/A',
    dataTypes: ['Railway Networks', 'Stations', 'Infrastructure'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'N/A',
    rating: 4.3,
    downloads: '300K+',
    standards: ['Various']
  },
  {
    id: 243,
    name: 'Capitaine European Train Stations',
    provider: 'Capitaine Train',
    category: 'transportation',
    type: 'Railway Data',
    coverage: 'Europe',
    region: 'Europe',
    description: 'Metadata for all train stations in Europe including latitude and longitude for transportation studies.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://github.com/trainline-eu/stations',
    apiDocs: 'https://github.com/trainline-eu/stations',
    dataTypes: ['Train Stations', 'Railways', 'Coordinates'],
    formats: ['CSV', 'JSON'],
    resolution: 'Station-level',
    contact: 'N/A',
    rating: 4.4,
    downloads: '250K+',
    standards: ['Railway Standard']
  },
  {
    id: 244,
    name: 'Eurostat Transport Data',
    provider: 'Eurostat',
    category: 'transportation',
    type: 'Transport Statistics',
    coverage: 'Europe',
    region: 'Europe',
    description: 'Wide range of transportation statistics for European countries covering various transport modes.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://ec.europa.eu/eurostat/web/transport/data/database',
    apiDocs: 'https://ec.europa.eu/eurostat/web/main/data/web-services',
    dataTypes: ['Transport Statistics', 'Modal Split', 'Infrastructure'],
    formats: ['CSV', 'Excel', 'REST API'],
    resolution: 'Country/Region',
    contact: 'estat-user-support@ec.europa.eu',
    rating: 4.5,
    downloads: '600K+',
    standards: ['Eurostat']
  },
  {
    id: 245,
    name: 'Facebook Movement Range Maps',
    provider: 'Meta',
    category: 'urban',
    type: 'Mobility Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Population responses to COVID-19 social distancing analyzing movement and stay-put trends.',
    pricing: 'Free',
    updateFrequency: 'Archive',
    license: 'Research License',
    directLink: 'https://dataforgood.facebook.com/dfg/tools/movement-range-maps',
    apiDocs: 'https://dataforgood.facebook.com/dfg/docs',
    dataTypes: ['Mobility', 'Movement', 'COVID-19'],
    formats: ['CSV'],
    resolution: 'Administrative',
    contact: 'dataforgood@fb.com',
    rating: 4.2,
    downloads: '300K+',
    standards: ['N/A']
  },
  {
    id: 246,
    name: 'Falling Rain Global Gazetteer',
    provider: 'Falling Rain',
    category: 'urban',
    type: 'Gazetteer',
    coverage: 'Global',
    region: 'Global',
    description: 'Comprehensive global directory of geographic place names with latitude, longitude, and altitude.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'http://www.fallingrain.com/',
    apiDocs: 'N/A',
    dataTypes: ['Place Names', 'Coordinates', 'Gazetteer'],
    formats: ['HTML', 'CSV'],
    resolution: 'Point Data',
    contact: 'N/A',
    rating: 4.2,
    downloads: '500K+',
    standards: ['Gazetteer']
  },
  {
    id: 247,
    name: 'GRUMP Settlement Points',
    provider: 'CIESIN Columbia',
    category: 'urban',
    type: 'Settlement Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Locations of individual settlements over time showing emergence of new settlements from GRUMP dataset.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'CC-BY',
    directLink: 'https://sedac.ciesin.columbia.edu/data/collection/grump-v1',
    apiDocs: 'https://sedac.ciesin.columbia.edu/data/collection/grump-v1',
    dataTypes: ['Settlement Points', 'Urban Growth', 'Population'],
    formats: ['Shapefile', 'CSV'],
    resolution: 'Point Data',
    contact: 'ciesin.info@columbia.edu',
    rating: 4.3,
    downloads: '300K+',
    standards: ['ISO 19115']
  },
  {
    id: 248,
    name: 'World Historical Gazetteer',
    provider: 'University of Pittsburgh',
    category: 'research',
    type: 'Historical Gazetteer',
    coverage: 'Global',
    region: 'Global',
    description: 'Data on populations of cities and towns through history for demographic and historical studies.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'CC-BY',
    directLink: 'https://whgazetteer.org/',
    apiDocs: 'https://whgazetteer.org/api/',
    dataTypes: ['Historical Place Names', 'Population', 'Temporal'],
    formats: ['GeoJSON', 'REST API'],
    resolution: 'Point Data',
    contact: 'whg@pitt.edu',
    rating: 4.4,
    downloads: '150K+',
    standards: ['Linked Places']
  },
  {
    id: 249,
    name: 'OpenStreetMap Nominatim',
    provider: 'OpenStreetMap',
    category: 'urban',
    type: 'Geocoding',
    coverage: 'Global',
    region: 'Global',
    description: 'Tool for searching OSM data by name and address and reverse geocoding for place name identification.',
    pricing: 'Free',
    updateFrequency: 'Real-time',
    license: 'ODbL',
    directLink: 'https://nominatim.openstreetmap.org/',
    apiDocs: 'https://nominatim.org/release-docs/latest/api/Overview/',
    dataTypes: ['Geocoding', 'Reverse Geocoding', 'Place Names'],
    formats: ['JSON', 'XML', 'REST API'],
    resolution: 'Address-level',
    contact: 'nominatim@openstreetmap.org',
    rating: 4.7,
    downloads: '10M+',
    standards: ['OSM']
  },
  {
    id: 250,
    name: 'NGIS Country Files',
    provider: 'National Geospatial-Intelligence Agency',
    category: 'urban',
    type: 'Gazetteer',
    coverage: 'Global',
    region: 'Global',
    description: 'List of regions, areas, and populated places for each country with geo-references from US Government.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Public Domain',
    directLink: 'https://geonames.nga.mil/gns/html/',
    apiDocs: 'https://geonames.nga.mil/gns/html/gis.html',
    dataTypes: ['Place Names', 'Populated Places', 'Features'],
    formats: ['Shapefile', 'CSV'],
    resolution: 'Point Data',
    contact: 'geonames@nga.mil',
    rating: 4.5,
    downloads: '800K+',
    standards: ['NGA']
  },
  {
    id: 251,
    name: 'OSM Metro Extracts',
    provider: 'Mapzen/Amazon',
    category: 'urban',
    type: 'City Data',
    coverage: 'Global',
    region: 'Global',
    description: 'City-sized extracts of OpenStreetMap dataset updated weekly for cities worldwide for urban studies.',
    pricing: 'Free',
    updateFrequency: 'Weekly',
    license: 'ODbL',
    directLink: 'https://www.interline.io/osm/extracts/',
    apiDocs: 'https://www.interline.io/osm/extracts/',
    dataTypes: ['Urban Data', 'OSM', 'City Extracts'],
    formats: ['Shapefile', 'GeoJSON', 'PBF'],
    resolution: 'Variable',
    contact: 'support@interline.io',
    rating: 4.6,
    downloads: '1M+',
    standards: ['OSM', 'OGC']
  },
  {
    id: 252,
    name: 'Wikimapia',
    provider: 'Wikimapia',
    category: 'opensource',
    type: 'Collaborative Mapping',
    coverage: 'Global',
    region: 'Global',
    description: 'Collaborative mapping project combining Google Maps with wiki system for adding location information worldwide.',
    pricing: 'Free',
    updateFrequency: 'Real-time',
    license: 'CC-BY-SA',
    directLink: 'https://wikimapia.org/',
    apiDocs: 'https://wikimapia.org/api/',
    dataTypes: ['Places', 'User-generated', 'POIs'],
    formats: ['REST API', 'KML'],
    resolution: 'Variable',
    contact: 'info@wikimapia.org',
    rating: 4.3,
    downloads: '5M+',
    standards: ['Wiki']
  },
  {
    id: 253,
    name: 'SimpleGeo Places',
    provider: 'SimpleGeo',
    category: 'urban',
    type: 'POI Data',
    coverage: 'Multi-Regional',
    region: 'Multi-Regional',
    description: 'Point of Interest data containing over 21 million POIs for 63+ countries under Creative Commons license.',
    pricing: 'Free',
    updateFrequency: 'Archive',
    license: 'CC-BY-SA',
    directLink: 'https://archive.org/details/SimpleGeoPlacesDataDump',
    apiDocs: 'N/A',
    dataTypes: ['POIs', 'Places', 'Businesses'],
    formats: ['JSON', 'CSV'],
    resolution: 'Point Data',
    contact: 'N/A',
    rating: 4.1,
    downloads: '200K+',
    standards: ['GeoJSON']
  },
  {
    id: 254,
    name: 'Coastal Water Quality',
    provider: 'NASA',
    category: 'environment',
    type: 'Water Quality Data',
    coverage: 'Global Oceans',
    region: 'Global',
    description: 'Information on coastal water quality globally measured by chlorophyll concentrations from SeaWIFS satellite.',
    pricing: 'Free',
    updateFrequency: 'Archive',
    license: 'Public Domain',
    directLink: 'https://oceancolor.gsfc.nasa.gov/',
    apiDocs: 'https://oceancolor.gsfc.nasa.gov/data/',
    dataTypes: ['Water Quality', 'Chlorophyll', 'Ocean Color'],
    formats: ['NetCDF', 'HDF'],
    resolution: '4km-9km',
    contact: 'oceancolor@nasa.gov',
    rating: 4.4,
    downloads: '300K+',
    standards: ['ISO 19115']
  },
  {
    id: 255,
    name: 'European Water Data (WISE)',
    provider: 'European Environment Agency',
    category: 'environment',
    type: 'Water Data',
    coverage: 'Europe',
    region: 'Europe',
    description: 'Extensive data on European water bodies including quality, quantity, pressures, and measures.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://water.europa.eu/',
    apiDocs: 'https://www.eea.europa.eu/data-and-maps/data#c0=5&c11=&c5=all&b_start=0',
    dataTypes: ['Water Quality', 'Water Quantity', 'Rivers', 'Lakes'],
    formats: ['Shapefile', 'CSV', 'WMS'],
    resolution: 'Variable',
    contact: 'water.helpdesk@eea.europa.eu',
    rating: 4.5,
    downloads: '400K+',
    standards: ['WFD', 'INSPIRE']
  },
  {
    id: 256,
    name: 'Catchment Characterisation and Modelling',
    provider: 'European Commission JRC',
    category: 'environment',
    type: 'Hydrological Data',
    coverage: 'Europe',
    region: 'Europe',
    description: 'Data on river basins, catchments, and rivers for European Union for hydrological studies.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'CC-BY',
    directLink: 'https://data.jrc.ec.europa.eu/collection/id-0071',
    apiDocs: 'https://data.jrc.ec.europa.eu/',
    dataTypes: ['River Basins', 'Catchments', 'Hydrology'],
    formats: ['Shapefile', 'NetCDF'],
    resolution: 'Variable',
    contact: 'jrc-ccm@ec.europa.eu',
    rating: 4.4,
    downloads: '250K+',
    standards: ['ISO 19115']
  },
  {
    id: 257,
    name: 'Copernicus Global Land Service - Water',
    provider: 'Copernicus',
    category: 'environment',
    type: 'Water Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Data on water cycle and surface water dynamics from EU Earth Observation Programme for global studies.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://land.copernicus.eu/global/products/wb',
    apiDocs: 'https://land.copernicus.eu/global/access',
    dataTypes: ['Water Bodies', 'Surface Water', 'Water Cycle'],
    formats: ['NetCDF', 'GeoTIFF'],
    resolution: '100m-300m',
    contact: 'copernicus@eea.europa.eu',
    rating: 4.6,
    downloads: '500K+',
    standards: ['Copernicus', 'ISO 19115']
  },
  {
    id: 258,
    name: 'NASA Global Hydrology Resource Center',
    provider: 'NASA GHRC',
    category: 'environment',
    type: 'Hydrological Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Hydrological data from NASA satellite and airborne missions for global research and hazard monitoring.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Public Domain',
    directLink: 'https://ghrc.nsstc.nasa.gov/',
    apiDocs: 'https://ghrc.nsstc.nasa.gov/home/data-access',
    dataTypes: ['Precipitation', 'Hydrology', 'Lightning'],
    formats: ['HDF', 'NetCDF', 'GeoTIFF'],
    resolution: 'Variable',
    contact: 'support-ghrc@earthdata.nasa.gov',
    rating: 4.5,
    downloads: '600K+',
    standards: ['ISO 19115']
  },
  {
    id: 259,
    name: 'USGS Water Data',
    provider: 'U.S. Geological Survey',
    category: 'environment',
    type: 'Water Data',
    coverage: 'United States',
    region: 'North America',
    description: 'Wide range of water data including streamflow, groundwater levels, water quality, and water use for US.',
    pricing: 'Free',
    updateFrequency: 'Real-time',
    license: 'Public Domain',
    directLink: 'https://waterdata.usgs.gov/',
    apiDocs: 'https://waterservices.usgs.gov/',
    dataTypes: ['Streamflow', 'Groundwater', 'Water Quality'],
    formats: ['REST API', 'CSV', 'JSON'],
    resolution: 'Station-level',
    contact: 'gs-w_water_data_support@usgs.gov',
    rating: 4.7,
    downloads: '2M+',
    standards: ['WaterML', 'OGC']
  },
  {
    id: 260,
    name: 'Major Watersheds of the World',
    provider: 'World Resources Institute',
    category: 'environment',
    type: 'Watershed Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Vector data showing outlines of major global watersheds for large-scale hydrological assessments.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'CC-BY',
    directLink: 'https://www.wri.org/data/major-watersheds-world',
    apiDocs: 'https://datasets.wri.org/',
    dataTypes: ['Watersheds', 'River Basins', 'Drainage'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Regional',
    contact: 'data@wri.org',
    rating: 4.4,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 261,
    name: 'GSHHS Global Shoreline Database',
    provider: 'NOAA',
    category: 'environment',
    type: 'Shoreline Data',
    coverage: 'Global',
    region: 'Global',
    description: 'High-resolution, consistent, accurate representation of world shorelines for coastal studies.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'LGPL',
    directLink: 'https://www.ngdc.noaa.gov/mgg/shorelines/',
    apiDocs: 'https://www.ngdc.noaa.gov/mgg/shorelines/',
    dataTypes: ['Shorelines', 'Coastlines', 'Islands'],
    formats: ['Shapefile', 'NetCDF'],
    resolution: 'Variable',
    contact: 'mgg.info@noaa.gov',
    rating: 4.7,
    downloads: '1M+',
    standards: ['ISO 19115']
  },
  {
    id: 262,
    name: 'Marine Regions',
    provider: 'Flanders Marine Institute',
    category: 'environment',
    type: 'Marine Data',
    coverage: 'Global Oceans',
    region: 'Global',
    description: 'Integrated standard list of marine georeferenced place names including maritime boundaries and EEZs.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC-BY',
    directLink: 'https://www.marineregions.org/',
    apiDocs: 'https://www.marineregions.org/webservices.php',
    dataTypes: ['Maritime Boundaries', 'EEZ', 'Marine Names'],
    formats: ['Shapefile', 'WMS', 'REST API'],
    resolution: 'Variable',
    contact: 'info@marineregions.org',
    rating: 4.6,
    downloads: '500K+',
    standards: ['ISO 19115']
  },
  {
    id: 263,
    name: 'CIA World Factbook Maritime Claims',
    provider: 'CIA',
    category: 'environment',
    type: 'Maritime Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Dataset detailing maritime claims of countries including territorial seas and contiguous zones.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'Public Domain',
    directLink: 'https://www.cia.gov/the-world-factbook/',
    apiDocs: 'N/A',
    dataTypes: ['Maritime Claims', 'Territorial Seas', 'EEZ'],
    formats: ['PDF', 'HTML'],
    resolution: 'Country-level',
    contact: 'N/A',
    rating: 4.3,
    downloads: '300K+',
    standards: ['CIA']
  },
  {
    id: 264,
    name: 'NOAA Exclusive Economic Zones',
    provider: 'NOAA',
    category: 'environment',
    type: 'Maritime Boundaries',
    coverage: 'Global',
    region: 'Global',
    description: 'Detailed outlines of countries Exclusive Economic Zones for maritime jurisdictional boundaries.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Public Domain',
    directLink: 'https://www.ncei.noaa.gov/maps/world-ocean-database/',
    apiDocs: 'https://www.ncei.noaa.gov/access/metadata/',
    dataTypes: ['EEZ', 'Maritime Boundaries', 'Ocean Jurisdiction'],
    formats: ['Shapefile', 'KML'],
    resolution: 'Variable',
    contact: 'ncei.info@noaa.gov',
    rating: 4.5,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 265,
    name: 'World Vector Shoreline',
    provider: 'NOAA',
    category: 'environment',
    type: 'Shoreline Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Widely used shoreline dataset at 1:250,000 scale for general mapping and visualization.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Public Domain',
    directLink: 'https://www.ngdc.noaa.gov/mgg/shorelines/wvs.html',
    apiDocs: 'https://www.ngdc.noaa.gov/mgg/shorelines/',
    dataTypes: ['Shorelines', 'Coastlines'],
    formats: ['Shapefile', 'ASCII'],
    resolution: '1:250,000',
    contact: 'mgg.info@noaa.gov',
    rating: 4.4,
    downloads: '800K+',
    standards: ['ISO 19115']
  },
  {
    id: 266,
    name: 'EEZ Land and Water Area Report',
    provider: 'World Resource Institute',
    category: 'environment',
    type: 'Maritime Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Detailed reports on land and water areas within Exclusive Economic Zones for environmental studies.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'CC-BY',
    directLink: 'https://www.wri.org/',
    apiDocs: 'https://datasets.wri.org/',
    dataTypes: ['EEZ', 'Land Area', 'Water Area'],
    formats: ['CSV', 'Excel'],
    resolution: 'Country-level',
    contact: 'data@wri.org',
    rating: 4.3,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 267,
    name: 'EUMETSAT Sea Ice Concentration',
    provider: 'EUMETSAT',
    category: 'environment',
    type: 'Ice Data',
    coverage: 'Polar Regions',
    region: 'Multi-Regional',
    description: 'Satellite-based sea ice concentration data offering comprehensive overview of polar sea ice cover.',
    pricing: 'Free',
    updateFrequency: 'Daily',
    license: 'Open',
    directLink: 'https://www.osi-saf.eumetsat.int/',
    apiDocs: 'https://www.osi-saf.eumetsat.int/products',
    dataTypes: ['Sea Ice Concentration', 'Ice Cover', 'Polar'],
    formats: ['NetCDF', 'GRIB'],
    resolution: '10km-25km',
    contact: 'ops@osi-saf.met.no',
    rating: 4.5,
    downloads: '300K+',
    standards: ['EUMETSAT']
  },
  {
    id: 268,
    name: 'Polar View Antarctic Node',
    provider: 'Polar View',
    category: 'environment',
    type: 'Ice Data',
    coverage: 'Antarctica',
    region: 'Multi-Regional',
    description: 'SAR imagery with derived sea ice concentration and charts for Antarctic coast monitoring.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://www.polarview.aq/',
    apiDocs: 'N/A',
    dataTypes: ['SAR', 'Sea Ice', 'Ice Charts'],
    formats: ['GeoTIFF', 'NetCDF'],
    resolution: 'Variable',
    contact: 'info@polarview.org',
    rating: 4.3,
    downloads: '100K+',
    standards: ['ISO 19115']
  },
  {
    id: 269,
    name: 'SnowEx Data Portal',
    provider: 'NASA',
    category: 'environment',
    type: 'Snow Data',
    coverage: 'United States',
    region: 'North America',
    description: 'Datasets on snow depth, density, water equivalent, and surface temperature for snow research.',
    pricing: 'Free',
    updateFrequency: 'Campaign-based',
    license: 'Public Domain',
    directLink: 'https://snow.nasa.gov/campaigns/snowex',
    apiDocs: 'https://nsidc.org/data/snowex',
    dataTypes: ['Snow Depth', 'Snow Density', 'SWE'],
    formats: ['NetCDF', 'GeoTIFF', 'HDF'],
    resolution: 'Variable',
    contact: 'nsidc@nsidc.org',
    rating: 4.4,
    downloads: '150K+',
    standards: ['ISO 19115']
  },
  {
    id: 270,
    name: 'Antarctic Ice Shelf Data',
    provider: 'British Antarctic Survey',
    category: 'environment',
    type: 'Ice Data',
    coverage: 'Antarctica',
    region: 'Multi-Regional',
    description: 'Detailed data on Antarctic ice shelves including boundaries and thickness for stability investigations.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://www.bas.ac.uk/data/our-data/maps/antarctic-ice-shelf/',
    apiDocs: 'https://www.bas.ac.uk/data/',
    dataTypes: ['Ice Shelves', 'Ice Thickness', 'Antarctica'],
    formats: ['NetCDF', 'Shapefile'],
    resolution: 'Variable',
    contact: 'data@bas.ac.uk',
    rating: 4.5,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 271,
    name: 'NSIDC Sea Ice Index',
    provider: 'NSIDC',
    category: 'environment',
    type: 'Ice Data',
    coverage: 'Arctic & Antarctic',
    region: 'Multi-Regional',
    description: 'Vital data on sea ice extent and concentration in Arctic and Antarctic for monitoring polar ice trends.',
    pricing: 'Free',
    updateFrequency: 'Daily',
    license: 'Public Domain',
    directLink: 'https://nsidc.org/data/seaice_index',
    apiDocs: 'https://nsidc.org/support/how/how-do-i-programmatically-request-data-services',
    dataTypes: ['Sea Ice Extent', 'Ice Concentration', 'Polar'],
    formats: ['NetCDF', 'GeoTIFF', 'Shapefile'],
    resolution: '25km',
    contact: 'nsidc@nsidc.org',
    rating: 4.7,
    downloads: '1M+',
    standards: ['ISO 19115']
  },
  {
    id: 272,
    name: 'Ice and Climate Exchange WAIS',
    provider: 'NSF ICE',
    category: 'environment',
    type: 'Ice Core Data',
    coverage: 'Antarctica',
    region: 'Multi-Regional',
    description: 'Ice core data from West Antarctic Ice Sheet Divide offering insights into historical climate conditions.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'https://www.waisdivide.unh.edu/',
    apiDocs: 'N/A',
    dataTypes: ['Ice Cores', 'Climate History', 'Antarctica'],
    formats: ['CSV', 'Excel'],
    resolution: 'Core samples',
    contact: 'wais@unh.edu',
    rating: 4.4,
    downloads: '50K+',
    standards: ['ISO 19115']
  },
  {
    id: 273,
    name: 'NASA IceBridge Data Portal',
    provider: 'NASA',
    category: 'environment',
    type: 'Ice Data',
    coverage: 'Polar Regions',
    region: 'Multi-Regional',
    description: 'Array of data from airborne surveys of polar ice including thickness, elevation, and snow depth measurements.',
    pricing: 'Free',
    updateFrequency: 'Campaign-based',
    license: 'Public Domain',
    directLink: 'https://icebridge.gsfc.nasa.gov/',
    apiDocs: 'https://nsidc.org/data/icebridge',
    dataTypes: ['Ice Thickness', 'Elevation', 'Snow Depth'],
    formats: ['NetCDF', 'HDF', 'GeoTIFF'],
    resolution: 'Variable',
    contact: 'nsidc@nsidc.org',
    rating: 4.6,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 274,
    name: 'Global Cryosphere Watch',
    provider: 'WMO',
    category: 'environment',
    type: 'Cryosphere Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Integrated cryosphere observation services providing data on snow, glaciers, ice sheets, and permafrost.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Open',
    directLink: 'https://globalcryospherewatch.org/',
    apiDocs: 'https://globalcryospherewatch.org/data/',
    dataTypes: ['Snow Cover', 'Glaciers', 'Permafrost', 'Ice Sheets'],
    formats: ['NetCDF', 'Shapefile'],
    resolution: 'Variable',
    contact: 'gcw@wmo.int',
    rating: 4.5,
    downloads: '300K+',
    standards: ['WMO']
  },
  {
    id: 275,
    name: 'Satellite Application Facility Climate Monitoring',
    provider: 'EUMETSAT',
    category: 'environment',
    type: 'Climate Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Near real-time and retrospective datasets on cloud cover, surface radiation budget, and climate variables.',
    pricing: 'Free',
    updateFrequency: 'Daily',
    license: 'Open',
    directLink: 'https://www.cmsaf.eu/',
    apiDocs: 'https://www.cmsaf.eu/EN/Products/Products_node.html',
    dataTypes: ['Cloud Cover', 'Radiation', 'Climate'],
    formats: ['NetCDF', 'HDF'],
    resolution: 'Variable',
    contact: 'contact.cmsaf@dwd.de',
    rating: 4.4,
    downloads: '250K+',
    standards: ['EUMETSAT', 'ISO 19115']
  },
  {
    id: 276,
    name: 'SURFACE Meteorological Data MADIS',
    provider: 'NOAA',
    category: 'environment',
    type: 'Weather Data',
    coverage: 'United States',
    region: 'North America',
    description: 'Meteorological Assimilation Data Ingest System providing surface weather and marine weather data.',
    pricing: 'Free',
    updateFrequency: 'Real-time',
    license: 'Public Domain',
    directLink: 'https://madis.ncep.noaa.gov/',
    apiDocs: 'https://madis.ncep.noaa.gov/madis_api.html',
    dataTypes: ['Surface Weather', 'Marine Weather', 'Observations'],
    formats: ['NetCDF', 'BUFR'],
    resolution: 'Station-level',
    contact: 'madis-support@noaa.gov',
    rating: 4.5,
    downloads: '800K+',
    standards: ['WMO']
  },
  {
    id: 277,
    name: 'Berkeley Earth Surface Temperature',
    provider: 'Berkeley Earth',
    category: 'environment',
    type: 'Temperature Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Comprehensive, transparent dataset of surface temperature for understanding global temperature changes.',
    pricing: 'Free',
    updateFrequency: 'Monthly',
    license: 'CC-BY',
    directLink: 'http://berkeleyearth.org/',
    apiDocs: 'http://berkeleyearth.org/data/',
    dataTypes: ['Surface Temperature', 'Climate', 'Historical'],
    formats: ['NetCDF', 'ASCII'],
    resolution: '1° grid',
    contact: 'info@berkeleyearth.org',
    rating: 4.6,
    downloads: '500K+',
    standards: ['ISO 19115']
  },
  {
    id: 278,
    name: 'Climate Data Guide',
    provider: 'NCAR',
    category: 'environment',
    type: 'Climate Portal',
    coverage: 'Global',
    region: 'Global',
    description: 'Expert-recommended datasets and guidance on their strengths, limitations, and applications for climate research.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Open',
    directLink: 'https://climatedataguide.ucar.edu/',
    apiDocs: 'https://climatedataguide.ucar.edu/',
    dataTypes: ['Climate Data Catalog', 'Guidance', 'Recommendations'],
    formats: ['Various'],
    resolution: 'Variable',
    contact: 'cdg@ucar.edu',
    rating: 4.7,
    downloads: '1M+',
    standards: ['NCAR']
  },
  {
    id: 279,
    name: 'UK Met Office Hadley Centre Datasets',
    provider: 'Met Office UK',
    category: 'environment',
    type: 'Climate Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Various datasets including HadCRUT for global temperature and HadISST for sea surface temperature.',
    pricing: 'Free',
    updateFrequency: 'Monthly',
    license: 'Open Government Licence',
    directLink: 'https://www.metoffice.gov.uk/hadobs/',
    apiDocs: 'https://www.metoffice.gov.uk/hadobs/hadcrut5/data/download.html',
    dataTypes: ['Temperature', 'SST', 'Climate'],
    formats: ['NetCDF', 'ASCII'],
    resolution: '5° grid',
    contact: 'hadobs@metoffice.gov.uk',
    rating: 4.6,
    downloads: '600K+',
    standards: ['ISO 19115']
  },
  {
    id: 280,
    name: 'World Ozone and UV Radiation Data Center',
    provider: 'Environment Canada',
    category: 'environment',
    type: 'Atmospheric Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Extensive data on ozone and ground-level UV irradiance from stations worldwide for atmospheric studies.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://woudc.org/',
    apiDocs: 'https://woudc.org/data.php',
    dataTypes: ['Ozone', 'UV Radiation', 'Atmospheric'],
    formats: ['CSV', 'NetCDF'],
    resolution: 'Station-level',
    contact: 'woudc.questions@ec.gc.ca',
    rating: 4.4,
    downloads: '200K+',
    standards: ['WMO', 'GAW']
  },
  {
    id: 281,
    name: 'NCAR GIS Climate Change Scenarios',
    provider: 'NCAR',
    category: 'environment',
    type: 'Climate Projections',
    coverage: 'Global',
    region: 'Global',
    description: 'Comprehensive collection from NCAR models including IPCC datasets for climate change modeling.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://www.earthsystemgrid.org/',
    apiDocs: 'https://www.earthsystemgrid.org/',
    dataTypes: ['Climate Scenarios', 'GCM', 'IPCC'],
    formats: ['NetCDF'],
    resolution: 'Variable',
    contact: 'esg-support@ucar.edu',
    rating: 4.5,
    downloads: '400K+',
    standards: ['CMIP', 'ISO 19115']
  },
  {
    id: 282,
    name: 'PANGAEA Earth & Environmental Science',
    provider: 'PANGAEA',
    category: 'research',
    type: 'Scientific Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Open-access library archiving georeferenced data from Earth system research including climate and environment.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'CC-BY',
    directLink: 'https://www.pangaea.de/',
    apiDocs: 'https://www.pangaea.de/submit/',
    dataTypes: ['Earth Science', 'Climate', 'Oceanography'],
    formats: ['Various', 'REST API'],
    resolution: 'Variable',
    contact: 'info@pangaea.de',
    rating: 4.6,
    downloads: '1M+',
    standards: ['DataCite', 'ISO 19115']
  },
  {
    id: 283,
    name: 'Climatological Database for Oceans',
    provider: 'CLIWOC',
    category: 'research',
    type: 'Historical Climate Data',
    coverage: 'Global Oceans',
    region: 'Global',
    description: 'Data from ships logs 1750-1850 including meteorological observations for historical climate studies.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'http://www.ucm.es/info/cliwoc/',
    apiDocs: 'N/A',
    dataTypes: ['Historical Climate', 'Ship Logs', 'Meteorology'],
    formats: ['CSV', 'Excel'],
    resolution: 'Ship observations',
    contact: 'cliwoc@ucm.es',
    rating: 4.3,
    downloads: '80K+',
    standards: ['Historical']
  },
  {
    id: 284,
    name: 'ECMWF Reanalysis Data',
    provider: 'ECMWF',
    category: 'environment',
    type: 'Climate Reanalysis',
    coverage: 'Global',
    region: 'Global',
    description: 'Weather forecast data including ERA-Interim and ERA5 datasets for climate diagnostics.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Open',
    directLink: 'https://www.ecmwf.int/en/forecasts/datasets',
    apiDocs: 'https://cds.climate.copernicus.eu/api-how-to',
    dataTypes: ['Reanalysis', 'Weather', 'Climate'],
    formats: ['GRIB', 'NetCDF'],
    resolution: '0.25°-1°',
    contact: 'copernicus-support@ecmwf.int',
    rating: 4.8,
    downloads: '2M+',
    standards: ['WMO', 'ISO 19115']
  },
  {
    id: 285,
    name: 'Global Potential Evapotranspiration',
    provider: 'CGIAR-CSI',
    category: 'environment',
    type: 'Climate Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Data on potential evapotranspiration and aridity indices at 30 arc-second resolution for agricultural planning.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'CC-BY',
    directLink: 'https://cgiarcsi.community/data/global-aridity-and-pet-database/',
    apiDocs: 'N/A',
    dataTypes: ['PET', 'Aridity Index', 'Climate'],
    formats: ['GeoTIFF'],
    resolution: '30 arc-seconds',
    contact: 'csi@cgiar.org',
    rating: 4.5,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 286,
    name: 'Climate Analysis Indicators Tool',
    provider: 'World Resources Institute',
    category: 'environment',
    type: 'Climate Data',
    coverage: 'Global',
    region: 'Global',
    description: 'CO2 emissions data by country and US state including adaptation measures for environmental policy.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'CC-BY',
    directLink: 'https://www.wri.org/data/cait-country-greenhouse-gas-emissions-data',
    apiDocs: 'https://datasets.wri.org/',
    dataTypes: ['CO2 Emissions', 'GHG', 'Climate'],
    formats: ['CSV', 'Excel'],
    resolution: 'Country-level',
    contact: 'data@wri.org',
    rating: 4.5,
    downloads: '500K+',
    standards: ['UNFCCC']
  },
  {
    id: 287,
    name: 'GCOS Essential Climate Variables',
    provider: 'GCOS/WMO',
    category: 'environment',
    type: 'Climate Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Data on critically important climate variables integral for monitoring Earth climate system.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Open',
    directLink: 'https://gcos.wmo.int/en/essential-climate-variables',
    apiDocs: 'https://gcos.wmo.int/en/ecv-factsheets',
    dataTypes: ['ECVs', 'Climate Variables', 'Monitoring'],
    formats: ['Various'],
    resolution: 'Variable',
    contact: 'gcos@wmo.int',
    rating: 4.6,
    downloads: '600K+',
    standards: ['WMO', 'GCOS']
  },
  {
    id: 288,
    name: 'Gridded Climatic Data for Continents',
    provider: 'AdaptWest',
    category: 'environment',
    type: 'Climate Data',
    coverage: 'North America, South America, Europe',
    region: 'Multi-Regional',
    description: 'Vast climatic data at 1km and 4km resolution including temperature, precipitation, and derived variables.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'CC-BY',
    directLink: 'https://adaptwest.databasin.org/',
    apiDocs: 'N/A',
    dataTypes: ['Temperature', 'Precipitation', 'Climate'],
    formats: ['GeoTIFF'],
    resolution: '1km-4km',
    contact: 'adaptwest@gmail.com',
    rating: 4.4,
    downloads: '300K+',
    standards: ['ISO 19115']
  },
  {
    id: 289,
    name: 'IRI Climate Data Library',
    provider: 'Columbia University IRI',
    category: 'environment',
    type: 'Climate Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Large collection of climate data including historical data and forecasts for climate-sensitive sectors.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Open',
    directLink: 'https://iridl.ldeo.columbia.edu/',
    apiDocs: 'https://iridl.ldeo.columbia.edu/dochelp/',
    dataTypes: ['Climate', 'Forecasts', 'Historical'],
    formats: ['NetCDF', 'GeoTIFF', 'REST API'],
    resolution: 'Variable',
    contact: 'help@iri.columbia.edu',
    rating: 4.7,
    downloads: '1M+',
    standards: ['OPeNDAP', 'ISO 19115']
  },
  {
    id: 290,
    name: 'NASA Global Change Master Directory',
    provider: 'NASA',
    category: 'environment',
    type: 'Climate Data Portal',
    coverage: 'Global',
    region: 'Global',
    description: 'Comprehensive collection of Earth science data from NASA missions and Earth Observing System.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Public Domain',
    directLink: 'https://gcmd.nasa.gov/',
    apiDocs: 'https://earthdata.nasa.gov/eosdis/science-system-description/eosdis-components/gcmd',
    dataTypes: ['Earth Science', 'Climate', 'Multi-theme'],
    formats: ['Various'],
    resolution: 'Variable',
    contact: 'gcmd@nasa.gov',
    rating: 4.6,
    downloads: '2M+',
    standards: ['ISO 19115', 'FGDC']
  },
  {
    id: 291,
    name: 'BioFRESH Freshwater Biodiversity',
    provider: 'BioFRESH',
    category: 'environment',
    type: 'Biodiversity Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Platform offering freshwater species distribution data for freshwater biodiversity research.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Various',
    directLink: 'http://www.freshwaterbiodiversity.eu/',
    apiDocs: 'N/A',
    dataTypes: ['Freshwater Species', 'Biodiversity', 'Distribution'],
    formats: ['Shapefile', 'CSV'],
    resolution: 'Species range',
    contact: 'biofresh@igb-berlin.de',
    rating: 4.3,
    downloads: '150K+',
    standards: ['Darwin Core']
  },
  {
    id: 292,
    name: 'Carbon Dioxide Information Analysis Center',
    provider: 'Oak Ridge National Lab',
    category: 'environment',
    type: 'Carbon Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Datasets on atmospheric CO2 concentrations and climate-related parameters for climate change research.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Public Domain',
    directLink: 'https://cdiac.ess-dive.lbl.gov/',
    apiDocs: 'https://cdiac.ess-dive.lbl.gov/',
    dataTypes: ['CO2', 'Carbon', 'Emissions'],
    formats: ['ASCII', 'NetCDF'],
    resolution: 'Variable',
    contact: 'cdiac@ornl.gov',
    rating: 4.5,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 293,
    name: 'Amphibian Species Distribution Grids',
    provider: 'IUCN',
    category: 'environment',
    type: 'Species Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Detailed global distribution data for amphibian species at 1km resolution for biodiversity studies.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Non-commercial',
    directLink: 'https://www.iucnredlist.org/resources/spatial-data-download',
    apiDocs: 'https://www.iucnredlist.org/resources/spatial-data-download',
    dataTypes: ['Amphibians', 'Species Distribution', 'Conservation'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: '1km',
    contact: 'redlist@iucn.org',
    rating: 4.4,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 294,
    name: 'PlantNet Identification',
    provider: 'PlantNet',
    category: 'environment',
    type: 'Plant Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Platform for identifying plants through image recognition contributing to botany and biodiversity research.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Open',
    directLink: 'https://plantnet.org/',
    apiDocs: 'https://my.plantnet.org/usage',
    dataTypes: ['Plant Identification', 'Taxonomy', 'Observations'],
    formats: ['REST API', 'JSON'],
    resolution: 'Observation-level',
    contact: 'contact@plantnet.org',
    rating: 4.5,
    downloads: '5M+',
    standards: ['Darwin Core']
  },
  {
    id: 295,
    name: 'Global High Resolution Soil Water Balance',
    provider: 'CGIAR-CSI',
    category: 'agriculture',
    type: 'Soil Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Data on evapotranspiration and soil water deficit at 30 arc-seconds for hydrological studies.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'CC-BY',
    directLink: 'https://cgiarcsi.community/',
    apiDocs: 'N/A',
    dataTypes: ['Soil Water', 'Evapotranspiration', 'Water Deficit'],
    formats: ['GeoTIFF'],
    resolution: '1km',
    contact: 'csi@cgiar.org',
    rating: 4.4,
    downloads: '300K+',
    standards: ['ISO 19115']
  },
  {
    id: 296,
    name: 'Human Impacts to Marine Ecosystems',
    provider: 'NCEAS',
    category: 'environment',
    type: 'Marine Impact Data',
    coverage: 'Global Oceans',
    region: 'Global',
    description: 'Detailed data on human-induced stresses to marine ecosystems including fishing and pollution.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'CC-BY',
    directLink: 'https://www.nceas.ucsb.edu/globalmarine',
    apiDocs: 'N/A',
    dataTypes: ['Marine Impacts', 'Fishing', 'Pollution'],
    formats: ['GeoTIFF', 'Shapefile'],
    resolution: '1km',
    contact: 'globalmarine@nceas.ucsb.edu',
    rating: 4.3,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 297,
    name: 'EUMETSAT ASCAT Soil Moisture',
    provider: 'EUMETSAT',
    category: 'agriculture',
    type: 'Soil Moisture Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Soil moisture dataset based on radar backscatter measurements from ASCAT aboard MetOp satellite.',
    pricing: 'Free',
    updateFrequency: 'Daily',
    license: 'Open',
    directLink: 'https://www.eumetsat.int/ascat',
    apiDocs: 'https://www.eumetsat.int/eumetsat-data-services',
    dataTypes: ['Soil Moisture', 'Radar', 'Agriculture'],
    formats: ['NetCDF', 'BUFR'],
    resolution: '25km',
    contact: 'ops@eumetsat.int',
    rating: 4.5,
    downloads: '400K+',
    standards: ['EUMETSAT']
  },
  {
    id: 298,
    name: 'World Soil Information',
    provider: 'ISRIC',
    category: 'agriculture',
    type: 'Soil Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Gridded datasets covering world soils with 22 attributes including organic carbon and water capacity.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'CC-BY',
    directLink: 'https://www.isric.org/explore/soil-geographic-databases',
    apiDocs: 'https://rest.isric.org/',
    dataTypes: ['Soil Properties', 'Organic Carbon', 'Water Capacity'],
    formats: ['GeoTIFF', 'WCS'],
    resolution: '250m',
    contact: 'soil.information@isric.org',
    rating: 4.6,
    downloads: '700K+',
    standards: ['ISO 28258']
  },
  {
    id: 299,
    name: 'The Nature Conservancy Conservation Atlas',
    provider: 'TNC',
    category: 'environment',
    type: 'Conservation Data',
    coverage: 'Global',
    region: 'Global',
    description: 'Interactive maps and conservation data including freshwater ecoregions and coral reefs.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Various',
    directLink: 'https://www.conservationgateway.org/',
    apiDocs: 'N/A',
    dataTypes: ['Conservation', 'Ecoregions', 'Protected Areas'],
    formats: ['Shapefile', 'KML'],
    resolution: 'Variable',
    contact: 'science@tnc.org',
    rating: 4.5,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 300,
    name: 'Hydrogeology Maps Africa',
    provider: 'British Geological Survey',
    category: 'environment',
    type: 'Hydrogeology Data',
    coverage: 'Africa',
    region: 'Africa',
    description: 'Free hydrogeology maps as GIS shapefiles with geology and hydrogeology attributes for African countries.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://www2.bgs.ac.uk/africagroundwateratlas/',
    apiDocs: 'N/A',
    dataTypes: ['Hydrogeology', 'Groundwater', 'Geology'],
    formats: ['Shapefile'],
    resolution: 'Variable',
    contact: 'enquiries@bgs.ac.uk',
    rating: 4.4,
    downloads: '150K+',
    standards: ['BGS']
  },
  {
    id: 301,
    name: 'FAO Globcover Algeria',
    provider: 'FAO',
    category: 'environment',
    type: 'Land Cover',
    coverage: 'Algeria',
    region: 'Africa',
    description: 'Detailed land cover information for Algeria with 46 classes in ESRI shapefile format.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'https://www.fao.org/geonetwork/',
    apiDocs: 'https://www.fao.org/geonetwork/',
    dataTypes: ['Land Cover', 'Algeria', '46 Classes'],
    formats: ['Shapefile'],
    resolution: '300m',
    contact: 'fao-gis@fao.org',
    rating: 4.2,
    downloads: '50K+',
    standards: ['FAO']
  },
  {
    id: 302,
    name: 'Angola Globcover Regional Data',
    provider: 'FAO',
    category: 'environment',
    type: 'Land Cover',
    coverage: 'Angola',
    region: 'Africa',
    description: 'Detailed land cover information for Angola with 46 classes derived from Globcover database.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'https://www.fao.org/geonetwork/',
    apiDocs: 'https://www.fao.org/geonetwork/',
    dataTypes: ['Land Cover', 'Angola', 'Classification'],
    formats: ['Shapefile'],
    resolution: '300m',
    contact: 'fao-gis@fao.org',
    rating: 4.2,
    downloads: '40K+',
    standards: ['FAO']
  },
  {
    id: 303,
    name: 'OSM Vector Layers Angola',
    provider: 'OSMtoday',
    category: 'opensource',
    type: 'Vector Data',
    coverage: 'Angola',
    region: 'Africa',
    description: 'Prepared geodata of Angola in SHP format including tourism, routes, streams, and administrative boundaries.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'ODbL',
    directLink: 'https://osmtoday.com/',
    apiDocs: 'N/A',
    dataTypes: ['OSM', 'Vector', 'Infrastructure'],
    formats: ['Shapefile'],
    resolution: 'Variable',
    contact: 'info@osmtoday.com',
    rating: 4.1,
    downloads: '30K+',
    standards: ['OSM']
  },
  {
    id: 304,
    name: 'Kenya GeoPortal',
    provider: 'Kenya Government',
    category: 'regional',
    type: 'National Portal',
    coverage: 'Kenya',
    region: 'Africa',
    description: 'Esri-powered portal providing access to geospatial tools and data for Kenya.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://kenya-geoportal-knbs.hub.arcgis.com/',
    apiDocs: 'https://developers.arcgis.com/',
    dataTypes: ['Multi-theme', 'Administrative', 'Economic'],
    formats: ['Feature Service', 'Shapefile'],
    resolution: 'Variable',
    contact: 'info@knbs.or.ke',
    rating: 4.3,
    downloads: '200K+',
    standards: ['Esri', 'OGC']
  },
  {
    id: 305,
    name: 'Orbital Geoportal Kenya',
    provider: 'Orbital Africa',
    category: 'regional',
    type: 'Regional Platform',
    coverage: 'Kenya & Africa',
    region: 'Africa',
    description: 'GIS platform disseminating open geospatial datasets with interactive web mapping for Kenya and Africa.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Various Open',
    directLink: 'https://geoportal.rcmrd.org/',
    apiDocs: 'https://geoportal.rcmrd.org/',
    dataTypes: ['Multi-theme', 'Regional', 'African Data'],
    formats: ['Shapefile', 'GeoJSON', 'WMS'],
    resolution: 'Variable',
    contact: 'geoportal@rcmrd.org',
    rating: 4.2,
    downloads: '150K+',
    standards: ['OGC']
  },
  {
    id: 306,
    name: 'Nigeria Mining Cadastre Office',
    provider: 'Nigerian Government',
    category: 'resources',
    type: 'Mining Data',
    coverage: 'Nigeria',
    region: 'Africa',
    description: 'Access to mining rights, licenses, and geospatial data related to mineral resources in Nigeria.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://www.mmc.gov.ng/',
    apiDocs: 'N/A',
    dataTypes: ['Mining Rights', 'Licenses', 'Mineral Resources'],
    formats: ['Shapefile', 'PDF'],
    resolution: 'Variable',
    contact: 'info@mmc.gov.ng',
    rating: 4.1,
    downloads: '60K+',
    standards: ['Mining Standard']
  },
  {
    id: 307,
    name: 'Polar Geospatial Center',
    provider: 'University of Minnesota',
    category: 'environment',
    type: 'Polar Data',
    coverage: 'Arctic & Antarctic',
    region: 'Multi-Regional',
    description: 'Geospatial support and mapping for polar science including high-resolution satellite imagery.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://www.pgc.umn.edu/',
    apiDocs: 'https://www.pgc.umn.edu/data/',
    dataTypes: ['Polar Imagery', 'DEM', 'Satellite'],
    formats: ['GeoTIFF', 'Shapefile'],
    resolution: '2m-50m',
    contact: 'pgc@umn.edu',
    rating: 4.7,
    downloads: '400K+',
    standards: ['ISO 19115']
  },
  {
    id: 308,
    name: 'Australian Antarctic Data Centre',
    provider: 'Australian Antarctic Division',
    category: 'environment',
    type: 'Antarctic Data',
    coverage: 'Antarctica',
    region: 'Multi-Regional',
    description: 'Data from Australian Antarctic programme including sea ice, maps, and aerial photography.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC-BY',
    directLink: 'https://data.aad.gov.au/',
    apiDocs: 'https://data.aad.gov.au/aadc/portal/',
    dataTypes: ['Sea Ice', 'Maps', 'Antarctic Research'],
    formats: ['NetCDF', 'Shapefile', 'GeoTIFF'],
    resolution: 'Variable',
    contact: 'data@aad.gov.au',
    rating: 4.5,
    downloads: '250K+',
    standards: ['ISO 19115']
  },
  {
    id: 309,
    name: 'U.S. Antarctic Resource Center',
    provider: 'USGS',
    category: 'environment',
    type: 'Antarctic Data',
    coverage: 'Antarctica',
    region: 'Multi-Regional',
    description: 'Scanned topographic maps, LIDAR-derived DEMs at 5m resolution, and aerial photography.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Public Domain',
    directLink: 'https://www.usgs.gov/centers/cm-water/antarctic-science',
    apiDocs: 'N/A',
    dataTypes: ['Topographic Maps', 'LIDAR', 'Aerial Photos'],
    formats: ['GeoTIFF', 'PDF'],
    resolution: '5m',
    contact: 'antarcticresearch@usgs.gov',
    rating: 4.4,
    downloads: '150K+',
    standards: ['USGS']
  },
  {
    id: 310,
    name: 'US National Ice Centre Antarctic Ice',
    provider: 'USNIC',
    category: 'environment',
    type: 'Ice Data',
    coverage: 'Antarctica',
    region: 'Multi-Regional',
    description: 'Daily ice extent maps for Antarctic area in KML format for tracking ice coverage changes.',
    pricing: 'Free',
    updateFrequency: 'Daily',
    license: 'Public Domain',
    directLink: 'https://usicecenter.gov/',
    apiDocs: 'https://usicecenter.gov/Products',
    dataTypes: ['Ice Extent', 'Daily Maps', 'Antarctic'],
    formats: ['KML', 'Shapefile'],
    resolution: 'Variable',
    contact: 'usnic.helpdesk@noaa.gov',
    rating: 4.4,
    downloads: '200K+',
    standards: ['USNIC']
  },
  {
    id: 311,
    name: 'Arctic Ocean Sea Surface Temperatures',
    provider: 'NOAA',
    category: 'environment',
    type: 'Ocean Temperature',
    coverage: 'Arctic Ocean',
    region: 'Multi-Regional',
    description: 'Sea surface temperature data 1981-2009 in multiple formats for Arctic climate studies.',
    pricing: 'Free',
    updateFrequency: 'Archive',
    license: 'Public Domain',
    directLink: 'https://www.ncei.noaa.gov/products/optimum-interpolation-sst',
    apiDocs: 'https://www.ncei.noaa.gov/access/metadata/',
    dataTypes: ['SST', 'Arctic', 'Historical'],
    formats: ['NetCDF', 'Shapefile', 'CSV'],
    resolution: '0.25°',
    contact: 'ncei.info@noaa.gov',
    rating: 4.3,
    downloads: '250K+',
    standards: ['ISO 19115']
  },
  {
    id: 312,
    name: 'ESA Climate Change Initiative Ice Sheets',
    provider: 'European Space Agency',
    category: 'environment',
    type: 'Ice Sheet Data',
    coverage: 'Greenland & Antarctica',
    region: 'Multi-Regional',
    description: 'Data on Greenland and Antarctic ice sheets including elevation and mass changes.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://climate.esa.int/en/projects/ice-sheets-greenland/',
    apiDocs: 'https://climate.esa.int/en/odp/#/dashboard',
    dataTypes: ['Ice Sheet Mass', 'Elevation Change', 'Glaciers'],
    formats: ['NetCDF', 'GeoTIFF'],
    resolution: 'Variable',
    contact: 'cci-icesheet@esa.int',
    rating: 4.6,
    downloads: '300K+',
    standards: ['ESA CCI']
  },
  {
    id: 313,
    name: 'Humanitarian Data Exchange Afghanistan',
    provider: 'UN OCHA',
    category: 'disaster',
    type: 'Humanitarian Data',
    coverage: 'Afghanistan',
    region: 'Asia',
    description: 'Various datasets for Afghanistan including administrative boundaries and UNAMA region boundaries.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Various Open',
    directLink: 'https://data.humdata.org/group/afg',
    apiDocs: 'https://hdx-hxl-preview.readthedocs.io/',
    dataTypes: ['Admin Boundaries', 'Humanitarian', 'Infrastructure'],
    formats: ['Shapefile', 'GeoJSON', 'KML'],
    resolution: 'Variable',
    contact: 'hdx@un.org',
    rating: 4.4,
    downloads: '300K+',
    standards: ['HXL', 'COD']
  },
  {
    id: 314,
    name: 'Vienna City Survey',
    provider: 'City of Vienna',
    category: 'urban',
    type: 'City Data',
    coverage: 'Austria (Vienna)',
    region: 'Europe',
    description: 'Highly detailed vector map of Vienna covering streets, buildings, landmarks, and transport with precision.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.data.gv.at/',
    apiDocs: 'https://www.data.gv.at/katalog/dataset/',
    dataTypes: ['Urban', 'Buildings', 'Infrastructure'],
    formats: ['Shapefile', 'GeoJSON', 'WMS'],
    resolution: 'Building-level',
    contact: 'open@data.gv.at',
    rating: 4.6,
    downloads: '400K+',
    standards: ['INSPIRE', 'OGC']
  },
  {
    id: 315,
    name: 'INSPIRE Austria',
    provider: 'Austrian Government',
    category: 'regional',
    type: 'National Infrastructure',
    coverage: 'Austria',
    region: 'Europe',
    description: 'Spatial data infrastructure for Austria offering wide range of thematic and technical spatial information.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Various Open',
    directLink: 'https://www.inspire.gv.at/',
    apiDocs: 'https://www.inspire.gv.at/',
    dataTypes: ['Multi-theme', 'Infrastructure', 'Environmental'],
    formats: ['WMS', 'WFS', 'Shapefile'],
    resolution: 'Variable',
    contact: 'inspire@bev.gv.at',
    rating: 4.5,
    downloads: '500K+',
    standards: ['INSPIRE', 'OGC']
  },
  {
    id: 316,
    name: 'Digital Terrain Model Austria OpenDEM',
    provider: 'Austrian Government',
    category: 'research',
    type: 'Elevation Data',
    coverage: 'Austria',
    region: 'Europe',
    description: '10m resolution digital terrain model for Austria processed in 2019 with high accuracy.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'CC BY 4.0',
    directLink: 'https://www.data.gv.at/',
    apiDocs: 'N/A',
    dataTypes: ['DTM', 'Elevation', 'Terrain'],
    formats: ['GeoTIFF'],
    resolution: '10m',
    contact: 'open@data.gv.at',
    rating: 4.6,
    downloads: '300K+',
    standards: ['ISO 19115']
  },
  {
    id: 317,
    name: 'Geological Map of Austria',
    provider: 'Geological Survey Austria',
    category: 'research',
    type: 'Geological Data',
    coverage: 'Austria',
    region: 'Europe',
    description: 'Comprehensive geological map at 1:50,000 scale with detailed geological information.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://www.geologie.ac.at/',
    apiDocs: 'N/A',
    dataTypes: ['Geology', 'Lithology', 'Stratigraphy'],
    formats: ['Shapefile', 'WMS'],
    resolution: '1:50,000',
    contact: 'office@geologie.ac.at',
    rating: 4.4,
    downloads: '200K+',
    standards: ['GeoSciML']
  },
  {
    id: 318,
    name: 'Belgium Municipalities',
    provider: 'Belgian Government',
    category: 'urban',
    type: 'Administrative Boundaries',
    coverage: 'Belgium',
    region: 'Europe',
    description: 'Dataset of all Belgian municipality boundaries for regional analysis and mapping.',
    pricing: 'Free',
    updateFrequency: 'Annual',
    license: 'Open',
    directLink: 'https://statbel.fgov.be/en/open-data',
    apiDocs: 'https://statbel.fgov.be/en/open-data',
    dataTypes: ['Municipalities', 'Admin Boundaries'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Municipality-level',
    contact: 'opendata@statbel.fgov.be',
    rating: 4.4,
    downloads: '250K+',
    standards: ['INSPIRE']
  },
  {
    id: 319,
    name: 'Belgium Marine Data',
    provider: 'Belgian Government',
    category: 'environment',
    type: 'Marine Data',
    coverage: 'Belgium',
    region: 'Europe',
    description: 'Comprehensive marine environment data including anchorage areas, navigation, wind farms, and dredging zones.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://www.marineatlas.be/',
    apiDocs: 'N/A',
    dataTypes: ['Marine', 'Navigation', 'Wind Farms'],
    formats: ['Shapefile', 'WMS'],
    resolution: 'Variable',
    contact: 'marine.atlas@economie.fgov.be',
    rating: 4.3,
    downloads: '150K+',
    standards: ['INSPIRE']
  },
  {
    id: 320,
    name: 'East Flanders Data',
    provider: 'East Flanders Government',
    category: 'urban',
    type: 'Regional Data',
    coverage: 'Belgium (East Flanders)',
    region: 'Europe',
    description: 'Cadastral data including historical records and orthophotos for East Flanders region.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://www.oost-vlaanderen.be/',
    apiDocs: 'N/A',
    dataTypes: ['Cadastral', 'Orthophotos', 'Historical'],
    formats: ['Shapefile', 'GeoTIFF'],
    resolution: 'Parcel-level',
    contact: 'gis@oost-vlaanderen.be',
    rating: 4.2,
    downloads: '100K+',
    standards: ['Belgian Standard']
  },
  {
    id: 321,
    name: 'Statbel Belgium',
    provider: 'Statistics Belgium',
    category: 'urban',
    type: 'Statistical Data',
    coverage: 'Belgium',
    region: 'Europe',
    description: 'Over 500 open data files covering diverse topics for commercial and non-commercial use.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://statbel.fgov.be/en/open-data',
    apiDocs: 'https://statbel.fgov.be/en/open-data/statistical-sectors',
    dataTypes: ['Statistics', 'Demographics', 'Economic'],
    formats: ['CSV', 'Excel', 'Shapefile'],
    resolution: 'Variable',
    contact: 'opendata@statbel.fgov.be',
    rating: 4.5,
    downloads: '600K+',
    standards: ['Eurostat']
  },
  {
    id: 322,
    name: 'Sub-surface Maps Flanders',
    provider: 'Flanders Government',
    category: 'research',
    type: 'Geological Data',
    coverage: 'Belgium (Flanders)',
    region: 'Europe',
    description: 'Geological data specific to Flanders for geological research and land use planning.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Open',
    directLink: 'https://www.dov.vlaanderen.be/',
    apiDocs: 'https://www.dov.vlaanderen.be/page/datavraag-en-download',
    dataTypes: ['Geology', 'Subsurface', 'Boreholes'],
    formats: ['Shapefile', 'WMS', 'WFS'],
    resolution: 'Variable',
    contact: 'dov@vlaanderen.be',
    rating: 4.4,
    downloads: '200K+',
    standards: ['INSPIRE']
  },
  {
    id: 323,
    name: 'HELCOM Baltic Sea Data',
    provider: 'Helsinki Commission',
    category: 'environment',
    type: 'Marine Data',
    coverage: 'Baltic Sea',
    region: 'Europe',
    description: 'Data on Baltic Sea area including biodiversity, environmental monitoring, and pollution.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open',
    directLink: 'https://helcom.fi/data/',
    apiDocs: 'https://metadata.helcom.fi/',
    dataTypes: ['Marine Biodiversity', 'Pollution', 'Monitoring'],
    formats: ['Shapefile', 'NetCDF', 'WMS'],
    resolution: 'Variable',
    contact: 'helcom@helcom.fi',
    rating: 4.5,
    downloads: '300K+',
    standards: ['INSPIRE', 'ISO 19115']
  },
  {
    id: 324,
    name: 'Finnish Snow and Ice Data',
    provider: 'Finnish Meteorological Institute',
    category: 'environment',
    type: 'Snow/Ice Data',
    coverage: 'Finland',
    region: 'Europe',
    description: 'Datasets on snow depth, ice cover, and winter season characteristics for Finland.',
    pricing: 'Free',
    updateFrequency: 'Daily',
    license: 'CC BY 4.0',
    directLink: 'https://en.ilmatieteenlaitos.fi/snow-and-ice',
    apiDocs: 'https://en.ilmatieteenlaitos.fi/open-data-manual',
    dataTypes: ['Snow Depth', 'Ice Cover', 'Winter Climate'],
    formats: ['NetCDF', 'WFS'],
    resolution: 'Station/Grid',
    contact: 'avoin-data@fmi.fi',
    rating: 4.4,
    downloads: '200K+',
    standards: ['OGC', 'CF']
  },
  {
    id: 325,
    name: 'City of Mississauga Open Data',
    provider: 'City of Mississauga',
    category: 'urban',
    type: 'City Data',
    coverage: 'Canada (Mississauga)',
    region: 'North America',
    description: 'Over 100 datasets including census, WiFi locations, licensed eateries for public use.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open Government Licence',
    directLink: 'https://data.mississauga.ca/',
    apiDocs: 'https://data.mississauga.ca/',
    dataTypes: ['Urban', 'Census', 'Infrastructure'],
    formats: ['Shapefile', 'CSV', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'opendata@mississauga.ca',
    rating: 4.3,
    downloads: '250K+',
    standards: ['OGC']
  },
  {
    id: 326,
    name: 'New Brunswick GIS Downloads',
    provider: 'New Brunswick Government',
    category: 'regional',
    type: 'Provincial Data',
    coverage: 'Canada (New Brunswick)',
    region: 'North America',
    description: 'Orthoimages, topography, and address information for New Brunswick province.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open Government Licence',
    directLink: 'https://www.snb.ca/geonb1/e/index-E.asp',
    apiDocs: 'N/A',
    dataTypes: ['Orthoimages', 'Topography', 'Addresses'],
    formats: ['Shapefile', 'GeoTIFF'],
    resolution: 'Variable',
    contact: 'geonb@snb.ca',
    rating: 4.2,
    downloads: '150K+',
    standards: ['ISO 19115']
  },
  {
    id: 327,
    name: 'Prince Edward Island GIS Data',
    provider: 'PEI Government',
    category: 'regional',
    type: 'Provincial Data',
    coverage: 'Canada (PEI)',
    region: 'North America',
    description: 'GIS data from Prince Edward Island government for provincial planning and analysis.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Open Government Licence',
    directLink: 'https://www.princeedwardisland.ca/en/topic/maps-and-gis',
    apiDocs: 'N/A',
    dataTypes: ['Administrative', 'Infrastructure', 'Land Use'],
    formats: ['Shapefile'],
    resolution: 'Variable',
    contact: 'gis@gov.pe.ca',
    rating: 4.1,
    downloads: '80K+',
    standards: ['ISO 19115']
  },
  {
    id: 328,
    name: 'University of Alberta Alberta GIS',
    provider: 'University of Alberta',
    category: 'regional',
    type: 'Provincial Data',
    coverage: 'Canada (Alberta)',
    region: 'North America',
    description: 'Range of Alberta GIS datasets and Edmonton-specific data for academic and research use.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Various',
    directLink: 'https://www.library.ualberta.ca/geospatial-data',
    apiDocs: 'N/A',
    dataTypes: ['Provincial', 'Urban', 'Demographics'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'data@ualberta.ca',
    rating: 4.3,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 329,
    name: 'Belize Forest Cover Change',
    provider: 'University of Belize',
    category: 'environment',
    type: 'Forest Data',
    coverage: 'Belize',
    region: 'North America',
    description: 'Dataset of forest cover 1980-2010 based on Landsat imagery with temporal analysis.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'https://www.researchgate.net/',
    apiDocs: 'N/A',
    dataTypes: ['Forest Cover', 'Change Detection', 'Landsat'],
    formats: ['GeoTIFF', 'Shapefile'],
    resolution: '30m',
    contact: 'N/A',
    rating: 4.2,
    downloads: '50K+',
    standards: ['ISO 19115']
  },
  {
    id: 330,
    name: 'Data Basin Belize Administrative',
    provider: 'Conservation Biology Institute',
    category: 'urban',
    type: 'Administrative Data',
    coverage: 'Belize',
    region: 'North America',
    description: 'Administrative districts of Belize for regional analysis and conservation planning.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'https://databasin.org/',
    apiDocs: 'N/A',
    dataTypes: ['Admin Districts', 'Boundaries'],
    formats: ['Shapefile', 'KML'],
    resolution: 'District-level',
    contact: 'databasin@consbio.org',
    rating: 4.1,
    downloads: '40K+',
    standards: ['ISO 19115']
  },
  {
    id: 331,
    name: 'CanadaGIS',
    provider: 'CanadaGIS',
    category: 'regional',
    type: 'National Portal',
    coverage: 'Canada',
    region: 'North America',
    description: 'Platform enhancing geographic awareness with resources for Canadian GIS and geospatial data.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Various',
    directLink: 'http://www.canadagis.com/',
    apiDocs: 'N/A',
    dataTypes: ['Multi-theme', 'Educational', 'Resources'],
    formats: ['Various'],
    resolution: 'Variable',
    contact: 'info@canadagis.com',
    rating: 4.2,
    downloads: '300K+',
    standards: ['Canadian']
  },
  {
    id: 332,
    name: 'Bolivia Land Cover Globcover',
    provider: 'FAO',
    category: 'environment',
    type: 'Land Cover',
    coverage: 'Bolivia',
    region: 'South America',
    description: 'Vectorized national land cover with 22 LCCS classes derived from Globcover archive.',
    pricing: 'Free',
    updateFrequency: 'Static',
    license: 'Open',
    directLink: 'https://www.fao.org/geonetwork/',
    apiDocs: 'N/A',
    dataTypes: ['Land Cover', 'Bolivia', '22 Classes'],
    formats: ['Shapefile'],
    resolution: '300m',
    contact: 'fao-gis@fao.org',
    rating: 4.2,
    downloads: '45K+',
    standards: ['FAO', 'LCCS']
  },
  {
    id: 333,
    name: 'GIS English Shapefiles',
    provider: 'GIS English',
    category: 'regional',
    type: 'Multi-Country Data',
    coverage: 'Multi-Regional',
    region: 'Multi-Regional',
    description: 'Free shapefile layers for various countries including roads, railways, waterways, and features.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'Various',
    directLink: 'http://www.gis-english.com/',
    apiDocs: 'N/A',
    dataTypes: ['Infrastructure', 'Transportation', 'Water'],
    formats: ['Shapefile'],
    resolution: 'Variable',
    contact: 'contact@gis-english.com',
    rating: 4.0,
    downloads: '200K+',
    standards: ['Various']
  },
  {
    id: 334,
    name: 'South Australian SAILIS',
    provider: 'South Australia Government',
    category: 'urban',
    type: 'Land Information',
    coverage: 'Australia (South Australia)',
    region: 'Oceania',
    description: 'Land and property information including cadastral, valuation, and property sales data for South Australia.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.sa.gov.au/topics/housing/land-management',
    apiDocs: 'N/A',
    dataTypes: ['Cadastral', 'Property', 'Valuation'],
    formats: ['Shapefile'],
    resolution: 'Parcel-level',
    contact: 'sailis@sa.gov.au',
    rating: 4.3,
    downloads: '200K+',
    standards: ['Australian']
  },
  {
    id: 335,
    name: 'Urban Infrastructure Portal Australia',
    provider: 'Australian Government',
    category: 'urban',
    type: 'Infrastructure Data',
    coverage: 'Australia',
    region: 'Oceania',
    description: 'Detailed data on urban infrastructure including transport networks and utilities across Australia.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.infrastructure.gov.au/',
    apiDocs: 'N/A',
    dataTypes: ['Infrastructure', 'Transport', 'Utilities'],
    formats: ['Shapefile', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'infrastructure@infrastructure.gov.au',
    rating: 4.4,
    downloads: '350K+',
    standards: ['ISO 19115']
  },
  {
    id: 336,
    name: 'Western Australian Landgate',
    provider: 'Landgate WA',
    category: 'urban',
    type: 'Land Information',
    coverage: 'Australia (Western Australia)',
    region: 'Oceania',
    description: 'Land and property information including maps, satellite imagery, and land ownership data for WA.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.landgate.wa.gov.au/',
    apiDocs: 'https://www.landgate.wa.gov.au/web-services',
    dataTypes: ['Cadastral', 'Imagery', 'Property'],
    formats: ['Shapefile', 'WMS', 'WFS'],
    resolution: 'Variable',
    contact: 'customerservice@landgate.wa.gov.au',
    rating: 4.5,
    downloads: '400K+',
    standards: ['OGC', 'ISO 19115']
  },
  {
    id: 337,
    name: 'Data SA South Australia',
    provider: 'SA Government',
    category: 'regional',
    type: 'State Portal',
    coverage: 'Australia (South Australia)',
    region: 'Oceania',
    description: 'Comprehensive resource for South Australia geospatial data on environment, population, and infrastructure.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'CC BY 4.0',
    directLink: 'https://data.sa.gov.au/',
    apiDocs: 'https://data.sa.gov.au/data/api',
    dataTypes: ['Multi-theme', 'Environment', 'Infrastructure'],
    formats: ['Shapefile', 'CSV', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'data@sa.gov.au',
    rating: 4.4,
    downloads: '300K+',
    standards: ['OGC']
  },
  {
    id: 338,
    name: 'dataACT Canberra',
    provider: 'ACT Government',
    category: 'urban',
    type: 'Territory Data',
    coverage: 'Australia (ACT)',
    region: 'Oceania',
    description: 'Diverse datasets for Australian Capital Territory including urban planning and transportation.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.data.act.gov.au/',
    apiDocs: 'https://www.data.act.gov.au/data/api',
    dataTypes: ['Urban Planning', 'Transport', 'Social'],
    formats: ['Shapefile', 'CSV', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'act.open.data@act.gov.au',
    rating: 4.3,
    downloads: '200K+',
    standards: ['OGC']
  },
  {
    id: 339,
    name: 'Discover Information Geographically Australia',
    provider: 'Australian Government',
    category: 'regional',
    type: 'National Platform',
    coverage: 'Australia',
    region: 'Oceania',
    description: 'Centralized platform for governmental GIS data including land cover and administrative boundaries.',
    pricing: 'Free',
    updateFrequency: 'Continuous',
    license: 'Various Open',
    directLink: 'https://elevation.fsdf.org.au/',
    apiDocs: 'N/A',
    dataTypes: ['Multi-theme', 'Elevation', 'Boundaries'],
    formats: ['Various'],
    resolution: 'Variable',
    contact: 'fsdf@ga.gov.au',
    rating: 4.5,
    downloads: '600K+',
    standards: ['Australian FSDF']
  },
  {
    id: 340,
    name: 'Government WA Mines Petroleum',
    provider: 'WA Government',
    category: 'resources',
    type: 'Mining & Petroleum Data',
    coverage: 'Australia (Western Australia)',
    region: 'Oceania',
    description: 'Data on geology, land use, and resources extraction in Western Australia for mining research.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.dmp.wa.gov.au/',
    apiDocs: 'N/A',
    dataTypes: ['Geology', 'Mining', 'Petroleum'],
    formats: ['Shapefile', 'PDF'],
    resolution: 'Variable',
    contact: 'dmp@dmirs.wa.gov.au',
    rating: 4.3,
    downloads: '250K+',
    standards: ['Australian']
  },
  {
    id: 341,
    name: 'Land Information System Tasmania',
    provider: 'Tasmanian Government',
    category: 'regional',
    type: 'State Data',
    coverage: 'Australia (Tasmania)',
    region: 'Oceania',
    description: 'Rich source of Tasmanian geographic data on land use and environmental factors for regional planning.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.thelist.tas.gov.au/',
    apiDocs: 'https://www.thelist.tas.gov.au/app/content/home',
    dataTypes: ['Land Use', 'Environment', 'Cadastral'],
    formats: ['Shapefile', 'WMS', 'WFS'],
    resolution: 'Variable',
    contact: 'thelist@dpipwe.tas.gov.au',
    rating: 4.4,
    downloads: '300K+',
    standards: ['OGC']
  },
  {
    id: 342,
    name: 'NSW Environment and Heritage',
    provider: 'NSW Government',
    category: 'environment',
    type: 'Environmental Data',
    coverage: 'Australia (NSW)',
    region: 'Oceania',
    description: 'Environmental data including conservation areas, biodiversity, and soil mapping for NSW.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.seed.nsw.gov.au/',
    apiDocs: 'https://www.seed.nsw.gov.au/',
    dataTypes: ['Conservation', 'Biodiversity', 'Soil'],
    formats: ['Shapefile', 'WMS', 'WFS'],
    resolution: 'Variable',
    contact: 'seed@environment.nsw.gov.au',
    rating: 4.5,
    downloads: '400K+',
    standards: ['OGC', 'ISO 19115']
  },
  {
    id: 343,
    name: 'Northern Territory Government Data',
    provider: 'NT Government',
    category: 'regional',
    type: 'Territory Data',
    coverage: 'Australia (Northern Territory)',
    region: 'Oceania',
    description: 'Spatial datasets for Northern Territory including land management and environmental monitoring.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://data.nt.gov.au/',
    apiDocs: 'https://data.nt.gov.au/',
    dataTypes: ['Land Management', 'Environment', 'Resources'],
    formats: ['Shapefile', 'CSV', 'GeoJSON'],
    resolution: 'Variable',
    contact: 'ntopendata@nt.gov.au',
    rating: 4.2,
    downloads: '200K+',
    standards: ['OGC']
  },
  {
    id: 344,
    name: 'Department of Conservation Geoportal NZ',
    provider: 'NZ Department of Conservation',
    category: 'environment',
    type: 'Conservation Data',
    coverage: 'New Zealand',
    region: 'Oceania',
    description: 'Conservation-related datasets including conservation areas, marine reserves, and huts.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.doc.govt.nz/about-us/science-publications/conservation-publications/geospatial-data/',
    apiDocs: 'N/A',
    dataTypes: ['Conservation Areas', 'Marine Reserves', 'Campsites'],
    formats: ['Shapefile', 'KML'],
    resolution: 'Variable',
    contact: 'geoconservation@doc.govt.nz',
    rating: 4.4,
    downloads: '250K+',
    standards: ['ISO 19115']
  },
  {
    id: 345,
    name: 'Koordinates New Zealand',
    provider: 'Koordinates',
    category: 'regional',
    type: 'Data Platform',
    coverage: 'New Zealand',
    region: 'Oceania',
    description: 'GIS data aggregation with focus on New Zealand including elevation and environmental datasets.',
    pricing: 'Freemium',
    updateFrequency: 'Continuous',
    license: 'Various',
    directLink: 'https://koordinates.com/',
    apiDocs: 'https://help.koordinates.com/api/',
    dataTypes: ['Multi-theme', 'Elevation', 'Environment'],
    formats: ['Shapefile', 'GeoJSON', 'REST API'],
    resolution: 'Variable',
    contact: 'support@koordinates.com',
    rating: 4.6,
    downloads: '1M+',
    standards: ['OGC']
  },
  {
    id: 346,
    name: 'LINZ Topographic Maps NZ',
    provider: 'LINZ',
    category: 'basemaps',
    type: 'Topographic Maps',
    coverage: 'New Zealand',
    region: 'Oceania',
    description: 'Free raster topographic maps at 1:50,000 and 1:250,000 scales for New Zealand.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.linz.govt.nz/products-services/maps/new-zealand-topographic-maps',
    apiDocs: 'https://www.linz.govt.nz/data/linz-data-service',
    dataTypes: ['Topographic', 'Relief', 'Features'],
    formats: ['GeoTIFF', 'PDF'],
    resolution: '1:50,000-1:250,000',
    contact: 'customersupport@linz.govt.nz',
    rating: 4.7,
    downloads: '500K+',
    standards: ['NZTM2000']
  },
  {
    id: 347,
    name: 'New Zealand Bathymetry',
    provider: 'NIWA',
    category: 'environment',
    type: 'Bathymetry Data',
    coverage: 'New Zealand EEZ',
    region: 'Oceania',
    description: '250m-resolution bathymetry data for New Zealand EEZ for marine and geological research.',
    pricing: 'Free',
    updateFrequency: 'Periodic',
    license: 'CC BY 4.0',
    directLink: 'https://niwa.co.nz/our-science/oceans/bathymetry',
    apiDocs: 'N/A',
    dataTypes: ['Bathymetry', 'Ocean Depth', 'Seafloor'],
    formats: ['GeoTIFF', 'ASCII'],
    resolution: '250m',
    contact: 'bathymetry@niwa.co.nz',
    rating: 4.5,
    downloads: '200K+',
    standards: ['ISO 19115']
  },
  {
    id: 348,
    name: 'NZ Topo Map',
    provider: 'LINZ',
    category: 'basemaps',
    type: 'Topographic Platform',
    coverage: 'New Zealand',
    region: 'Oceania',
    description: 'Detailed topographical maps covering all of New Zealand for outdoor activities and research.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.topomap.co.nz/',
    apiDocs: 'N/A',
    dataTypes: ['Topographic', 'Hiking Trails', 'Features'],
    formats: ['Web Map', 'WMS'],
    resolution: 'Variable',
    contact: 'customersupport@linz.govt.nz',
    rating: 4.6,
    downloads: '800K+',
    standards: ['NZTM2000']
  },
  {
    id: 349,
    name: 'Manaaki Whenua Landcare Research',
    provider: 'Landcare Research NZ',
    category: 'environment',
    type: 'Environmental Data',
    coverage: 'New Zealand',
    region: 'Oceania',
    description: 'Datasets on land, soil, and biodiversity conservation supporting sustainable land management.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.landcareresearch.co.nz/',
    apiDocs: 'https://lris.scinfo.org.nz/',
    dataTypes: ['Soil', 'Biodiversity', 'Land Cover'],
    formats: ['Shapefile', 'GeoTIFF'],
    resolution: 'Variable',
    contact: 'lris@landcareresearch.co.nz',
    rating: 4.5,
    downloads: '350K+',
    standards: ['ISO 19115']
  },
  {
    id: 350,
    name: 'GNS Science New Zealand',
    provider: 'GNS Science',
    category: 'research',
    type: 'Geological Data',
    coverage: 'New Zealand',
    region: 'Oceania',
    description: 'Geological and hydrogeological data including seismic, volcanic, and mineral resources information.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'CC BY 4.0',
    directLink: 'https://www.gns.cri.nz/',
    apiDocs: 'https://data.gns.cri.nz/',
    dataTypes: ['Geology', 'Seismic', 'Volcanic', 'Minerals'],
    formats: ['Shapefile', 'WMS', 'WFS'],
    resolution: 'Variable',
    contact: 'info@gns.cri.nz',
    rating: 4.6,
    downloads: '400K+',
    standards: ['OGC', 'ISO 19115']
  },
  {
    id: 351,
    name: 'Pacific Data Hub',
    provider: 'SPC',
    category: 'regional',
    type: 'Regional Portal',
    coverage: 'Pacific Islands',
    region: 'Oceania',
    description: 'Wide range of environmental and geographic datasets for Pacific island nations.',
    pricing: 'Free',
    updateFrequency: 'Regular',
    license: 'Various Open',
    directLink: 'https://pacificdata.org/',
    apiDocs: 'https://stats-nsi-stable.pacificdata.org/',
    dataTypes: ['Multi-theme', 'Environment', 'Demographics'],
    formats: ['CSV', 'Shapefile', 'REST API'],
    resolution: 'Variable',
    contact: 'sdd@spc.int',
    rating: 4.3,
    downloads: '300K+',
    standards: ['SDMX']
  }
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
