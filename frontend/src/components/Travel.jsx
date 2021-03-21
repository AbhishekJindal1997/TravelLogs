import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "../API";
import EntryForm from "./EntryForm";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
/**
 * Configuration values for Mapbox Component.
 *
 * @interface ReactMapGl interface with configurations for creating the map.
 */
ReactMapGL.workerClass = MapboxWorker.default;

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Travel = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addLocation, setLocation] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState(""); // getting the values just need to fifure out way to assign it to lat and long of viewport
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 43.46495, // user latitude
    longitude: -80.52391, // user longitutde
    zoom: 7,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   setLatitude(position.coords.latitude);
    //   setLongitude(position.coords.longitude);
    // });
    (async () => {
      getEntries();
    })();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setLocation({
      latitude,
      longitude,
    });
  };

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/abhishekjindal1997/ckf7w3y2o0w5z19lnxsewi6ef"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
        onDblClick={showAddMarkerPopup}
      >
        {logEntries.map((entry) => (
          <React.Fragment key={entry._id}>
            <Marker
              key={entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude}
              offsetLeft={-12}
              offsetTop={-24}
            >
              <div
                onClick={() =>
                  setShowPopup({
                    [entry._id]: true,
                  })
                }
              >
                <img
                  src="https://i.imgur.com/y0G5YTX.png"
                  className="marker"
                  alt="marker"
                  style={{
                    height: `${7 * viewport.zoom}px`,
                    width: `${7 * viewport.zoom}px`,
                  }}
                ></img>
              </div>
            </Marker>
            {showPopup[entry._id] ? (
              <Popup
                className="popup"
                latitude={entry.latitude}
                longitude={entry.longitude}
                dynamicPosition={true}
                closeButton={true}
                closeOnClick={true}
                onClose={() => setShowPopup({})}
                anchor="top"
              >
                <div className="popup">
                  <h3 className="EntryTitle">{entry.title}</h3>
                  <p className="comments">{entry.comments}</p>
                  <small>
                    Visited on: {new Date(entry.visitDate).toLocaleDateString()}
                  </small>
                  {entry.image ? (
                    <img src={entry.image} alt={entry.title} />
                  ) : null}
                </div>
              </Popup>
            ) : null}
          </React.Fragment>
        ))}

        {addLocation ? (
          <>
            <Marker
              latitude={addLocation.latitude}
              longitude={addLocation.longitude}
            >
              <div>
                <svg
                  viewBox="0 0 24 24"
                  width="60"
                  height="60"
                  className="marker red"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            <Popup
              latitude={addLocation.latitude}
              longitude={addLocation.longitude}
              dynamicPosition={true}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setLocation(null)}
              anchor="top"
            >
              <div className="popup">
                <EntryForm
                  onClose={() => {
                    setLocation(null);
                    getEntries();
                  }}
                  location={addLocation}
                />
              </div>
            </Popup>
          </>
        ) : null}
      </ReactMapGL>
    </>
  );
};

export default Travel;
