import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

import "./ShopMap.css";
import { SHOPDETAILS } from "../../utils/constants";

const magnoliaCakeCoords = {
  lat: -37.630214089441445,
  lng: 145.08355240001467,
};

const ShopMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    map.setCenter(magnoliaCakeCoords);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const openMapInNewTab = () => {
    window.open(
      SHOPDETAILS.MAGNOLIA_CAKE_GOOGLE_MAPS_LINK,
      "_blank",
      "noreferrer"
    );
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName="map-container-style"
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker
        title={SHOPDETAILS.MAGNOLIA_CAKE_SHOP_NAME}
        position={magnoliaCakeCoords}
        onClick={openMapInNewTab}
      />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(ShopMap);
