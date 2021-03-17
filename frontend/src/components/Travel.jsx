import React, { useState, useEffect } from "react";

import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "../API";
// import EntryForm from "../EntryForm";
// import "../App.css";
// import Navigation from "../Navigation";

const Travel = () => {
  //   const [logEntries, setLogEntries] = useState([]);
  //   const [showPopup, setShowPopup] = useState({});
  const [addLocation, setLocation] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState(""); // getting the values just need to fifure out way to assign it to lat and long of viewport
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 43.46495, // user latitude
    longitude: -80.52391, // user longitutde
    zoom: 4,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    // setLogEntries(logEntries);
    console.log(logEntries);
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
      ></ReactMapGL>
    </>
  );
};

export default Travel;
