import React, { useEffect, useRef, useState } from 'react';

const GoogleMap = ({ searchQuery }) => {
  const googleMapRef = useRef(null);
  const mapInstance = useRef(null);
  const [autocomplete, setAutocomplete] = useState(null);
  
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
  }, []);

  useEffect(() => {
    if (autocomplete && searchQuery) {
      const service = new window.google.maps.places.PlacesService(mapInstance.current);
      const request = {
        query: searchQuery,
        fields: ['name', 'geometry'],
      };
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
          mapInstance.current.setCenter(results[0].geometry.location);
          new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: mapInstance.current,
          });
        }
      });
    }
  }, [autocomplete, searchQuery]);

  return (
    <div>
      <input
        id="search-input"
        type="text"
        placeholder="Search for a place"
        style={{
          width: '98%',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      />
      <div
        ref={googleMapRef}
        style={{
          width: '100%',
          height: '500px',
          borderRadius: '16px', // Rounded corners
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)', // Soft shadow
          overflow: 'hidden', // Ensures content fits within rounded corners
        }}
      />
    </div>
  );
};

export default GoogleMap;
