import "mapbox-gl/dist/mapbox-gl.css";

import React, { useEffect } from "react";

import mapboxgl from "mapbox-gl";

// @ts-ignore
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const CustomerMap = ({ userAddressMapRef }) => {
  // map properties
  const mapContainer = React.useRef(null);
  const [mapLoaded, setMapLoaded] = React.useState(false);

  // static image properties
  const staticImageLatitude = process.env.REACT_APP_STATIC_IMAGE_LATITUDE;
  const staticImageLongitude = process.env.REACT_APP_STATIC_IMAGE_LONGITUDE;
  const staticImageZoom = process.env.REACT_APP_STATIC_IMAGE_ZOOM;
  const staticImageApiUsername = process.env.REACT_APP_STATIC_IMAGE_USERNAME;
  const staticImageApiStyleId = process.env.REACT_APP_STATIC_IMAGE_STYLE_ID;
  const staticImageApiWidth = process.env.REACT_APP_STATIC_IMAGE_WIDTH;
  const staticImageApiHeight = process.env.REACT_APP_STATIC_IMAGE_HEIGHT;

  // static image is set by default to the restaurant address
  const mapStyles = {
    mapParentContainer: {
      // necessary for static image
      width: "100%",
      minHeight: "85vh",
      display: "grid",
    },
    mapContainer: {
      gridColumn: "1",
      gridRow: "1",
      width: "100%",
      height: "100%",
    },
    staticImage: {
      backgroundImage: `url('https://api.mapbox.com/styles/v1/${staticImageApiUsername}/${staticImageApiStyleId}/static/${staticImageLongitude},${staticImageLatitude},${staticImageZoom}/${staticImageApiWidth}x${staticImageApiHeight}?access_token=${mapboxgl.accessToken}')`,
      width: "100%",
      height: "100%",
      gridColumn: 1,
      gridRow: 1,
    },
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [+staticImageLongitude, +staticImageLatitude], // Algeries longitude and latitude
      zoom: +staticImageZoom,
      refreshExpiredTiles: false, // no refresh ; default is true
      testMode: true, // must be set to default value 'false' in production
    });

    // add zoomin, zoomout, fullscreen buttons
    map.addControl(new mapboxgl.FullscreenControl(), "top-right");
    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-right"
    );

    // track user location
    const mapLocationControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });
    map.addControl(mapLocationControl, "bottom-right");
    mapLocationControl.on("error", () => {
      console.log("An error event has occurred when retrieving user location.");
    });

    // only shows the map when fully loaded
    map.on("load", () => {
      setMapLoaded(true);
    });

    // add marker
    const marker = new mapboxgl.Marker({
      color: "var(--secondary)",
    })
      .setLngLat([
        userAddressMapRef.current.longitude,
        userAddressMapRef.current.latitude,
      ])
      .addTo(map);

    // update marker to the new clicked location
    map.on("click", (e) => {
      marker.setLngLat([e.lngLat.lng, e.lngLat.lat]);
      userAddressMapRef.current = {
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat,
      };
    });

    // something got wrong with mapboxgl
    map.on("error", () => {
      console.log("Something got wrong with map.");
    });
  }, []);

  return (
    <div style={mapStyles.mapParentContainer}>
      <div
        ref={mapContainer}
        style={
          mapLoaded
            ? { ...mapStyles.mapContainer, visibility: "visible" }
            : { ...mapStyles.mapContainer, visibility: "hidden" }
        }
      />
      <div style={mapStyles.staticImage} />
    </div>
  );
};

export default CustomerMap;
