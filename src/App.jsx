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

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitted:', formData);
      alert('Thank you! Your submission will be reviewed.');
      setShowSubmissionForm(false);
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
