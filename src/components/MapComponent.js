import React, { useEffect } from "react";

const MapComponent = (props) => {
  useEffect(() => {
    if (props.countryName === "Select a country") return;

    const H = window.H;

    const apikey = process.env.REACT_APP_HERE_API_KEY;

    if (!H || !apikey) {
      console.error("HERE Maps SDK or API key is missing.");
      return;
    }

    const platform = new H.service.Platform({
      apikey: apikey,
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
      document.getElementById("mapContainer"),
      defaultLayers.vector.normal.map,
      {
        zoom: 5,
        center: { lat: props.countryLat, lng: props.countryLng },
      }
    );

    const ui = H.ui.UI.createDefault(map, defaultLayers);
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    return () => {
      map.dispose();
    };
  }, [props.countryLat, props.countryLng, props.countryName]);

  return (
    <div style={{ width: "50%", height: "500px" }} id="mapContainer"></div>
  );
};

export default MapComponent;
