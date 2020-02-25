import React, { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {listLogEntries} from './api'
import LogEntryForm from './LogEntryForm'
import './App.css'
import { Fragment } from 'react';



const App =()=> {
  const [logEntries, setLogEntries] = useState([])
  const [showPopup, setShowPopup] = useState({})
  const [addEntryLocation, setAddEntryLocation] = useState(null)
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 3
  });


const getEntries = async () => {
  const logEntries = await listLogEntries()
  setLogEntries(logEntries)
}



  useEffect(()=>{
    getEntries()    
  }, [])

const showAddMarkerPopup =(e)=> {
  setAddEntryLocation({
    latitude: e.lngLat[1],
    longitude: e.lngLat[0]
  })
}


  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >

      {
        logEntries.map(entry => (
          <Fragment key={entry._id}>
          <Marker 
            key={entry._id}
            latitude={entry.latitude} 
            longitude={entry.longitude}
            offsetLeft={-20}
            offsetTop={-10}
           >
            <div 
            onClick={()=> setShowPopup({
              [entry._id]: true
            })}>
              <img src="https://i.imgur.com/y0G5YTX.png" alt="maker" className="marker"/>
            </div>
          </Marker>
          {
            showPopup[entry._id] ? (

          <Popup
            latitude={entry.latitude}
            longitude={entry.longitude}
            dynamicPosition={true}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowPopup({})}
            anchor="top" >
          <div className="popup">
            <h3>{entry.title}</h3>
            <p>{entry.comments}</p>
            <small>Visited on {new Date(entry.visitDate).toLocaleDateString()}</small>
            {entry.image && <img src={entry.image} className="popImg" alt="image"/>}
          </div>
          </Popup>
            ) : null
          }
        </Fragment>
      ))
    }
    {
      addEntryLocation ? (
        <>
        <Marker 
            latitude={addEntryLocation.latitude} 
            longitude={addEntryLocation.longitude}
           >
            <div>
              <img src="https://i.imgur.com/y0G5YTX.png" alt="maker" className="marker"/>
            </div>
          </Marker>
        <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            dynamicPosition={true}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntryLocation(null)}
            anchor="top" >
          <div className="popup">
            <LogEntryForm 
            onClose={()=> {
              setAddEntryLocation(null);
              getEntries();
            }}
            location={addEntryLocation}/>
          </div>
          </Popup>

        </>
      ) : null
    }
  </ReactMapGL>
);
}

export default App