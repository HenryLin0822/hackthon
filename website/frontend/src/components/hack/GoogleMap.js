import React, { useEffect, useRef, useState } from 'react';

const GoogleMap = ({ searchQuery }) => {
  const googleMapRef = useRef(null);
  const mapInstance = useRef(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const markerRef = useRef(null); // Ref to keep track of the current marker

  // Your Google Maps API key
  const apiKey = 'AIzaSyAG76siZPiYe27wx--Ao5zidU7GkKk5OBg';

  useEffect(() => {
    // Function to load Google Maps script
    const loadGoogleMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.addEventListener('load', () => {
        initializeGoogleMap();
      });
    };

    // Function to initialize the Google Map
    const initializeGoogleMap = () => {
      const mapOptions = {
        center: { lat: 25.0330, lng: 121.5654 }, // Default to Taipei 101 location
        zoom: 12,
      };

      mapInstance.current = new window.google.maps.Map(googleMapRef.current, mapOptions);
      const input = document.getElementById('search-input');
      const options = {
        types: ['geocode'],
        componentRestrictions: { country: 'TW' }
      };
      const autocompleteService = new window.google.maps.places.Autocomplete(input, options);
      setAutocomplete(autocompleteService);
    };

    if (!window.google) {
      loadGoogleMapScript();
    } else {
      initializeGoogleMap();
    }

    return () => {
      // Cleanup the script on component unmount
      if (window.google) {
        delete window.google;
      }
    };
  }, [apiKey]);

  useEffect(() => {
    if (mapInstance.current && searchQuery) {
      const service = new window.google.maps.places.PlacesService(mapInstance.current);
      const request = {
        query: searchQuery,
        fields: ['name', 'geometry'],
      };
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
          // Remove the previous marker if it exists
          if (markerRef.current) {
            markerRef.current.setMap(null);
          }

          // Add a new marker
          const newMarker = new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: mapInstance.current,
            title: results[0].name, // Optional: Add a title to the marker
          });
          markerRef.current = newMarker; // Update the marker reference

          // Zoom in on the new pin
          mapInstance.current.setZoom(15); // Adjust the zoom level as needed
          mapInstance.current.setCenter(results[0].geometry.location);
        }
      });
    }
  }, [searchQuery]);

  return (
    <div>
      <div
        ref={googleMapRef}
        style={{
          width: '80%',
          height: '300px',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};

export default GoogleMap;
