import React, { useState, useMemo } from 'react';
import { Search, MapPin, Globe, Filter, ExternalLink, Database, Code, Calendar, Tag, X, Send, Star, Download, Users, Award, Layers } from 'lucide-react';

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
    { id: 'basemaps', name: 'Basemaps & Imagery', icon: '🗺️' }
  ];

  const formats = ['all', 'WMS', 'WFS', 'WCS', 'GeoJSON', 'Shapefile', 'GeoTIFF', 'KML', 'REST API', 'CSV', 'PostGIS', 'NetCDF', 'HDF'];
  const regions = ['all', 'Global', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Multi-Regional'];

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
      description: 'Collaborative mapping platform with free editable map data. Community-driven geographic database with worldwide coverage.',
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
      standards: ['OGC']
    },
    {
      id: 2,
      name: 'QGIS',
      provider: 'QGIS Development Team',
      category: 'opensource',
      type: 'Desktop Software',
      coverage: 'Global',
      region: 'Global',
      description: 'Professional open source GIS application for viewing, editing and analyzing geospatial data.',
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
      standards: ['OGC', 'GDAL']
    },
    {
      id: 3,
      name: 'Copernicus Open Access Hub',
      provider: 'European Space Agency',
      category: 'basemaps',
      type: 'Satellite Imagery',
      coverage: 'Global',
      region: 'Global',
      description: 'Free access to Sentinel satellite data including optical and radar imagery for environmental monitoring.',
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
      standards: ['INSPIRE', 'ISO 19115']
    },
    {
      id: 4,
      name: 'NASA Earth Observing System Data',
      provider: 'NASA EOSDIS',
      category: 'research',
      type: 'Satellite Imagery',
      coverage: 'Global',
      region: 'Global',
      description: 'Comprehensive Earth science data from NASA satellite missions including MODIS, Landsat, and ASTER.',
      pricing: 'Free',
      updateFrequency: 'Daily',
      license: 'Public Domain',
      directLink: 'https://earthdata.nasa.gov',
      apiDocs: 'https://earthdata.nasa.gov/eosdis/science-system-description/eosdis-components/earthdata-search',
      dataTypes: ['MODIS', 'Landsat', 'ASTER', 'VIIRS'],
      formats: ['HDF', 'GeoTIFF', 'NetCDF'],
      resolution: '250m-1km',
      contact: 'support@earthdata.nasa.gov',
      rating: 4.8,
      downloads: '5M+',
      standards: ['ISO 19115', 'FGDC']
    },
    {
      id: 5,
      name: 'Global Biodiversity Information Facility',
      provider: 'GBIF',
      category: 'environment',
      type: 'Species Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Free and open access to biodiversity data with over 2 billion species occurrence records.',
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
      standards: ['OGC']
    },
    {
      id: 6,
      name: 'WorldPop',
      provider: 'University of Southampton',
      category: 'urban',
      type: 'Population Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Open spatial demographic datasets providing population distributions at high resolution.',
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
      standards: ['ISO 19115']
    },
    {
      id: 7,
      name: 'OpenTopography',
      provider: 'UCSD/OpenTopography',
      category: 'research',
      type: 'Elevation Data',
      coverage: 'Multi-Regional',
      region: 'Multi-Regional',
      description: 'High-resolution topography data and tools including lidar and photogrammetry point clouds.',
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
      standards: ['OGC', 'ISO 19115']
    },
    {
      id: 8,
      name: 'European Environment Agency Data',
      provider: 'European Environment Agency',
      category: 'environment',
      type: 'Environmental Data',
      coverage: 'Europe',
      region: 'Europe',
      description: 'Comprehensive environmental data for Europe including air quality, water, biodiversity, and land use.',
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
      standards: ['INSPIRE']
    },
    {
      id: 9,
      name: 'Global Forest Watch',
      provider: 'World Resources Institute',
      category: 'environment',
      type: 'Monitoring Platform',
      coverage: 'Global',
      region: 'Global',
      description: 'Near real-time forest monitoring with deforestation alerts and tree cover change data.',
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
      standards: ['OGC']
    },
    {
      id: 10,
      name: 'NOAA Climate Data Online',
      provider: 'NOAA National Centers',
      category: 'environment',
      type: 'Climate Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Access to NOAA archive of weather and climate data including temperature, precipitation, and extremes.',
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
      standards: ['ISO 19115']
    },
    {
      id: 11,
      name: 'OpenAerialMap',
      provider: 'Humanitarian OpenStreetMap',
      category: 'disaster',
      type: 'Aerial Imagery',
      coverage: 'Event-based',
      region: 'Multi-Regional',
      description: 'Open aerial imagery for humanitarian response and disaster relief operations.',
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
      standards: ['OGC']
    },
    {
      id: 12,
      name: 'Natural Earth',
      provider: 'Natural Earth',
      category: 'basemaps',
      type: 'Vector Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Free vector and raster map data at multiple scales for cartography and GIS.',
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
      standards: ['OGC']
    },
    {
      id: 13,
      name: 'GADM Database',
      provider: 'GADM',
      category: 'urban',
      type: 'Administrative Boundaries',
      coverage: 'Global',
      region: 'Global',
      description: 'Database of global administrative areas with country, state, and local boundaries.',
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
      standards: ['ISO 19115']
    },
    {
      id: 14,
      name: 'PostGIS',
      provider: 'PostGIS Development Team',
      category: 'opensource',
      type: 'Database Extension',
      coverage: 'Global',
      region: 'Global',
      description: 'Spatial database extension for PostgreSQL enabling storage and analysis of geographic data.',
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
      standards: ['OGC', 'SQL/MM']
    },
    {
      id: 15,
      name: 'GDAL/OGR',
      provider: 'GDAL Contributors',
      category: 'opensource',
      type: 'Software Library',
      coverage: 'Global',
      region: 'Global',
      description: 'Translator library for 200+ raster and vector geospatial data formats.',
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
      standards: ['OGC', 'ISO 19115']
    },
    {
      id: 16,
      name: 'GeoServer',
      provider: 'OSGeo',
      category: 'opensource',
      type: 'Map Server',
      coverage: 'Global',
      region: 'Global',
      description: 'Open source server for sharing geospatial data via OGC web services.',
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
      standards: ['OGC WMS', 'OGC WFS', 'OGC WCS']
    },
    {
      id: 17,
      name: 'Leaflet',
      provider: 'Vladimir Agafonkin',
      category: 'opensource',
      type: 'JavaScript Library',
      coverage: 'Global',
      region: 'Global',
      description: 'Leading open source JavaScript library for mobile-friendly interactive maps.',
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
      standards: ['Web Standards']
    },
    {
      id: 18,
      name: 'MapBox',
      provider: 'MapBox Inc.',
      category: 'basemaps',
      type: 'Mapping Platform',
      coverage: 'Global',
      region: 'Global',
      description: 'Custom maps and location APIs for developers with high-quality basemaps.',
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
      standards: ['Mapbox Vector Tiles']
    },
    {
      id: 19,
      name: 'DIVA-GIS',
      provider: 'DIVA-GIS',
      category: 'research',
      type: 'Vector Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Free GIS data for every country including administrative boundaries and climate data.',
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
      standards: ['Standard GIS']
    },
    {
      id: 20,
      name: 'WorldClim',
      provider: 'WorldClim',
      category: 'environment',
      type: 'Climate Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Global climate and weather data with historical and future climate projections.',
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
      standards: ['ISO 19115']
    },
    {
      id: 21,
      name: 'ESA Climate Change Initiative',
      provider: 'European Space Agency',
      category: 'environment',
      type: 'Climate Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Essential climate variables from satellite observations for climate research.',
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
      standards: ['CF Conventions', 'ISO 19115']
    },
    {
      id: 22,
      name: 'SRTM Digital Elevation',
      provider: 'NASA/USGS',
      category: 'research',
      type: 'Elevation Data',
      coverage: 'Near-Global',
      region: 'Multi-Regional',
      description: 'Shuttle Radar Topography Mission 30m elevation data covering most of Earth.',
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
      standards: ['ISO 19115']
    },
    {
      id: 23,
      name: 'Planet Labs Imagery',
      provider: 'Planet Labs',
      category: 'basemaps',
      type: 'Satellite Imagery',
      coverage: 'Global',
      region: 'Global',
      description: 'Daily satellite imagery of entire Earth at 3-5m resolution.',
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
      standards: ['OGC']
    },
    {
      id: 24,
      name: 'Maxar/DigitalGlobe',
      provider: 'Maxar Technologies',
      category: 'basemaps',
      type: 'Satellite Imagery',
      coverage: 'Global',
      region: 'Global',
      description: 'High-resolution commercial satellite imagery up to 30cm resolution.',
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
      standards: ['OGC']
    },
    {
      id: 25,
      name: 'Google Earth Engine',
      provider: 'Google',
      category: 'research',
      type: 'Analysis Platform',
      coverage: 'Global',
      region: 'Global',
      description: 'Cloud-based platform for planetary-scale geospatial analysis.',
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
      standards: ['Google EE']
    },
    {
      id: 26,
      name: 'Overture Maps Foundation',
      provider: 'Overture Maps',
      category: 'urban',
      type: 'Vector Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Open map data for buildings, transportation networks, and places.',
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
      standards: ['OGC']
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
      standards: ['Industry Standard']
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
      standards: ['Industry Standard']
    },
    {
      id: 29,
      name: 'OpenLayers',
      provider: 'OpenLayers Contributors',
      category: 'opensource',
      type: 'JavaScript Library',
      coverage: 'Global',
      region: 'Global',
      description: 'High-performance web mapping library with support for multiple sources.',
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
      standards: ['Darwin Core', 'ISO 19115']
    },
    {
      id: 30,
      name: 'ArcGIS Online',
      provider: 'Esri',
      category: 'basemaps',
      type: 'Cloud Platform',
      coverage: 'Global',
      region: 'Global',
      description: 'Cloud-based mapping and analysis platform with extensive basemap collection.',
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
      standards: ['OGC', 'Esri']
    },
    {
      id: 31,
      name: 'OpenDroneMap',
      provider: 'OpenDroneMap Community',
      category: 'opensource',
      type: 'Processing Software',
      coverage: 'User-generated',
      region: 'Global',
      description: 'Open source toolkit for processing drone imagery into maps and 3D models.',
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
      standards: ['Standard GIS']
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
      standards: ['HXL']
    },
    {
      id: 33,
      name: 'OpenCellID',
      provider: 'Unwired Labs',
      category: 'telecom',
      type: 'Cell Tower Database',
      coverage: 'Global',
      region: 'Global',
      description: 'World\'s largest open database of cell towers for geolocation.',
      pricing: 'Freemium',
      updateFrequency: 'Real-time',
      license: 'CC-BY-SA',
      directLink: 'https://opencellid.org',
      apiDocs: 'https://opencellid.org/api',
      dataTypes: ['Cell Towers', 'Geolocation', 'Network'],
      formats: ['REST API', 'CSV'],
      resolution: 'Point Data',
      contact: 'info@opencellid.org',
      rating: 4.2,
      downloads: '1M+',
      standards: ['OpenCellID']
    },
    {
      id: 34,
      name: 'Global Human Settlement Layer',
      provider: 'European Commission JRC',
      category: 'urban',
      type: 'Settlement Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Open and free spatial information about human settlements worldwide.',
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
      standards: ['ISO 19115']
    },
    {
      id: 35,
      name: 'Global Land Cover Facility',
      provider: 'University of Maryland',
      category: 'environment',
      type: 'Land Cover Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Earth science data including land cover classification and change detection.',
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
      standards: ['ISO 19115']
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
      apiDocs: 'https://sedac.ciesin.columbia.edu/data/set/groads-global-roads-open-access-v1',
      dataTypes: ['Road Networks', 'Transportation Infrastructure'],
      formats: ['Shapefile', 'Geodatabase'],
      resolution: 'Variable',
      contact: 'ciesin.info@columbia.edu',
      rating: 4.4,
      downloads: '250K+',
      standards: ['ISO 19115']
    },
    {
      id: 37,
      name: 'Global Wind Atlas',
      provider: 'DTU Wind Energy',
      category: 'resources',
      type: 'Wind Resource Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Free wind resource assessment data for renewable energy planning.',
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
      standards: ['WMO']
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
      standards: ['WMO']
    },
    {
      id: 39,
      name: 'FIRMS - Fire Information',
      provider: 'NASA',
      category: 'disaster',
      type: 'Fire Detection',
      coverage: 'Global',
      region: 'Global',
      description: 'Near real-time active fire data from MODIS and VIIRS satellites.',
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
      standards: ['OGC']
    },
    {
      id: 40,
      name: 'Global Surface Water Explorer',
      provider: 'European Commission JRC',
      category: 'environment',
      type: 'Water Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Location and temporal distribution of surface water from 1984 to present.',
      pricing: 'Free',
      updateFrequency: 'Annual',
      license: 'CC-BY',
      directLink: 'https://global-surface-water.appspot.com',
      apiDocs: 'https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_4',
      dataTypes: ['Water Occurrence', 'Water Change', 'Seasonality'],
      formats: ['GeoTIFF', 'Earth Engine'],
      resolution: '30m',
      contact: 'jrc-water@ec.europa.eu',
      rating: 4.5,
      downloads: '250K+',
      standards: ['ISO 19115']
    },
    {
      id: 41,
      name: 'OpenStreetMap Humanitarian',
      provider: 'HOT',
      category: 'disaster',
      type: 'Mapping Platform',
      coverage: 'Event-based',
      region: 'Multi-Regional',
      description: 'Humanitarian mapping for disaster response and community development.',
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
      standards: ['OSM', 'OGC']
    },
    {
      id: 42,
      name: 'Global Land Ice Measurements',
      provider: 'NSIDC',
      category: 'environment',
      type: 'Glacier Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Comprehensive glacier inventory and monitoring data worldwide.',
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
      standards: ['ISO 19115']
    },
    {
      id: 43,
      name: 'Global Mangrove Watch',
      provider: 'Aberystwyth University',
      category: 'environment',
      type: 'Mangrove Data',
      coverage: 'Tropical/Subtropical',
      region: 'Multi-Regional',
      description: 'Monitoring mangrove forests globally with detailed change detection.',
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
      standards: ['ISO 19115']
    },
    {
      id: 44,
      name: 'Global Fishing Watch',
      provider: 'Global Fishing Watch',
      category: 'resources',
      type: 'Fishing Activity Data',
      coverage: 'Global Oceans',
      region: 'Global',
      description: 'Tracking commercial fishing activity worldwide using AIS data.',
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
      standards: ['AIS']
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
      standards: ['ISO 19115']
    },
    {
      id: 46,
      name: 'Protected Planet',
      provider: 'UNEP-WCMC',
      category: 'environment',
      type: 'Protected Areas',
      coverage: 'Global',
      region: 'Global',
      description: 'World Database on Protected Areas with conservation area boundaries.',
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
      standards: ['WDPA', 'ISO 19115']
    },
    {
      id: 47,
      name: 'VIIRS Nighttime Lights',
      provider: 'NOAA/NASA',
      category: 'urban',
      type: 'Nightlight Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Earth\'s surface lighting captured from space for urban analysis.',
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
      standards: ['ISO 19115']
    },
    {
      id: 48,
      name: 'Global Soil Information',
      provider: 'ISRIC World Soil Info',
      category: 'agriculture',
      type: 'Soil Data',
      coverage: 'Global',
      region: 'Global',
      description: 'SoilGrids provides soil property data at 250m resolution globally.',
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
      standards: ['ISO 28258', 'OGC']
    },
    {
      id: 49,
      name: 'Global Agricultural Lands',
      provider: 'NASA SEDAC',
      category: 'agriculture',
      type: 'Agricultural Data',
      coverage: 'Global',
      region: 'Global',
      description: 'Global distribution of agricultural lands including croplands and pastures.',
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
      standards: ['ISO 19115']
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
      standards: ['QuakeML', 'FDSN']
    },
    {
      id: 51,
      name: 'ESA WorldCover',
      provider: 'European Space Agency',
      category: 'environment',
      type: 'Land Cover',
      coverage: 'Global',
      region: 'Global',
      description: 'Global land cover map at 10m resolution based on Sentinel data.',
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
      standards: ['ISO 19115']
    },
    {
      id: 52,
      name: 'GEBCO Bathymetry',
      provider: 'GEBCO',
      category: 'environment',
      type: 'Ocean Depth',
      coverage: 'Global Oceans',
      region: 'Global',
      description: 'General Bathymetric Chart of the Oceans - global ocean floor mapping.',
      pricing: 'Free',
      updateFrequency: 'Annual',
      license: 'Public Domain',
      directLink: 'https://www.gebco.net',
      apiDocs: 'https://www.gebco.net/data_and_products/gridded_bathymetry_data/',
      dataTypes: ['Bathymetry', 'Ocean Depth', 'Seafloor Topography'],
      formats: ['NetCDF', 'GeoTIFF', 'ASCII'],
      resolution: '15 arc-seconds',
      contact: 'info@gebco.net',
      rating: 4.5,
      downloads: '400K+',
      standards: ['IHO', 'IOC']
    }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesType = selectedType === 'all' || product.type === selectedType;
      const matchesFormat = selectedFormat === 'all' || product.formats.some(f => f.includes(selectedFormat));
      const matchesRegion = selectedRegion === 'all' || product.region === selectedRegion;
      const matchesPrice = priceFilter === 'all' || 
                          (priceFilter === 'free' && (product.pricing === 'Free' || product.pricing.includes('Free'))) ||
                          (priceFilter === 'paid' && product.pricing !== 'Free' && !product.pricing.includes('Free'));
      const matchesRating = product.rating >= minRating;
      
      return matchesSearch && matchesCategory && matchesType && matchesFormat && matchesRegion && matchesPrice && matchesRating;
    });
  }, [searchTerm, selectedCategory, selectedType, selectedFormat, selectedRegion, priceFilter, minRating]);

  const dataTypes = ['all', ...new Set(products.map(p => p.type))];

  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  const SubmissionModal = () => {
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
      contact: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitted:', formData);
      alert('Thank you! Your submission will be reviewed.');
      setShowSubmissionForm(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-xl">
            <h2 className="text-2xl font-bold text-gray-900">Submit a Spatial Product</h2>
            <button
              onClick={() => setShowSubmissionForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">License</label>
                <input
                  type="text"
                  placeholder="e.g., MIT, GPL, Commercial"
                  value={formData.license}
                  onChange={(e) => setFormData({...formData, license: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resolution</label>
                <input
                  type="text"
                  placeholder="e.g., 10m, 30m, Variable"
                  value={formData.resolution}
                  onChange={(e) => setFormData({...formData, resolution: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                <input
                  type="email"
                  placeholder="contact@example.com"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Formats (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g., WMS, WFS, GeoJSON"
                  value={formData.formats}
                  onChange={(e) => setFormData({...formData, formats: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                required
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Direct Link/Database URL *</label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={formData.directLink}
                onChange={(e) => setFormData({...formData, directLink: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Documentation URL</label>
              <input
                type="url"
                placeholder="https://..."
                value={formData.apiDocs}
                onChange={(e) => setFormData({...formData, apiDocs: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Types (comma-separated)</label>
              <input
                type="text"
                placeholder="e.g., Vector, Raster, DEM"
                value={formData.dataTypes}
                onChange={(e) => setFormData({...formData, dataTypes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                <h1 className="text-3xl font-bold text-gray-900">Spatial Yellowpage</h1>
                <p className="text-sm text-gray-600">Global Directory of Spatial Products & Tools</p>
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
              <span>Advanced Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  {dataTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  {formats.map(format => (
                    <option key={format} value={format}>
                      {format === 'all' ? 'All Formats' : format}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>
                      {region === 'all' ? 'All Regions' : region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pricing</label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Pricing</option>
                  <option value="free">Free Only</option>
                  <option value="paid">Paid Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="0">All Ratings</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map(category => (
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
          Found <span className="font-semibold">{filteredProducts.length}</span> products
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.provider}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  product.pricing === 'Free' || product.pricing.includes('Free')
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {product.pricing}
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-3">
                <RatingStars rating={product.rating} />
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Download className="w-4 h-4" />
                  <span>{product.downloads}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-4 text-sm">{product.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 truncate">{product.coverage}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Database className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 truncate">{product.type}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 truncate">{product.updateFrequency}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Code className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 truncate">{product.license}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Layers className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 truncate">{product.resolution}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 truncate text-xs">{product.contact}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs font-semibold text-gray-600 mb-2">Supported Formats:</div>
                <div className="flex flex-wrap gap-2">
                  {product.formats.map((format, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs font-semibold text-gray-600 mb-2">Data Types:</div>
                <div className="flex flex-wrap gap-2">
                  {product.dataTypes.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {product.standards && (
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-600 mb-2">Standards:</div>
                  <div className="flex flex-wrap gap-2">
                    {product.standards.map((standard, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium flex items-center space-x-1">
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
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                  <span>Access Database</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                {product.apiDocs && (
                  <a
                    href={product.apiDocs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 w-full">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600 w-full">
          <p className="mb-2">Spatial Yellowpage - Your Gateway to Global Spatial Data</p>
          <p className="text-sm">Comprehensive directory of {products.length}+ spatial products worldwide</p>
          <p className="text-xs mt-2 text-gray-500">Covering satellite imagery, vector data, elevation, climate, tools, APIs, and more</p>
        </div>
      </footer>

      {/* Submission Modal */}
      {showSubmissionForm && <SubmissionModal />}
    </div>
  );
};

export default App;