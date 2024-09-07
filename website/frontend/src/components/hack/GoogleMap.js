import React, { useEffect, useRef } from 'react';

const GoogleMap = () => {
  const googleMapRef = useRef(null);
  const mapInstance = useRef(null);

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

  return (
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
  );  
};

export default GoogleMap;
