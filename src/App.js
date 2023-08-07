


import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import HOUSTON_CENTER from './hou_center';
import markersData from './markers.json';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MarkerList from './MarkerList';
import './index.css';
import './App.css';




const MarkerComponent = ({ text }) =>
  {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
      setShowPopup(!showPopup);
    };

    return (
    <div className="marker" onClick={togglePopup}>
      <div className="pin"></div>
      <div className="text">{text}</div>
      {showPopup && <div className="popup">Popup Card for {text}</div>}
    </div>
    );
  };

const HomePage = ({ markers, dbmarkers, userLocation }) => {
  var mapOptions = {
    center: userLocation || 'loading', // Set 'loading' initially
    zoom: 10, // Default zoom level
  };

  const getInfoWindowString = (place) => `
    <div>
      <div style="font-size: 16px;">
        ${place.name}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${place.star_rating}
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(place.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}</span>
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.categories[0].name}
      </div>
    </div>`;

    const getYourLocatioWindowString = (place) => `
      <div>
        <div style="font-size: 16px;">
          Your Location
        </div>
      </div>`;

  const apiIsLoaded = (map, maps, userLocation, markers, dbmarkers) => {
    const userMarkers = [];
    const gMarkers = [];
    const infowindows = [];

    if(userLocation)
    {
      userMarkers.push(new maps.Marker({
        position: {
          lat: userLocation.lat,
          lng: userLocation.lng,
        },
        map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      }));

      //infowindows.push(new maps.InfoWindow({
      //  content: getYourLocatioWindowString(userLocation),
      //}));
    }

    //infowindows[0].open(map,userMarkers[0]);

    markers.forEach((marker) => {
      gMarkers.push(new maps.Marker({
        position: {
          lat: marker.lat,
          lng: marker.lng,
        },
        map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      }));

      infowindows.push(new maps.InfoWindow({
        content: getInfoWindowString(marker),
      }));
    });

    dbmarkers.forEach((marker) => {
      gMarkers.push(new maps.Marker({
        position: {
          lat: marker.lat,
          lng: marker.lng,
        },
        map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        //icon: marker.marker_url,
      }));

      infowindows.push(new maps.InfoWindow({
        content: getInfoWindowString(marker),
      }));
    });


    gMarkers.forEach((marker, i) => {
      marker.addListener('click', () => {
        infowindows[i].open(map, marker);
      });
    });
  };

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [mapZoom, setMapZoom] = useState(12);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setMapCenter({ lat: marker.lat, lng: marker.lng });
    setMapZoom(15);
  };

  const handleCenterMap = () => {
    // Center the map on the user's location
    // This is a hack and needs to be fixed when the user swipes on the screen the center is not changed so it appears to have no effect
    handleCenterMap1();
    handleCenterMap2();
  };

  const handleCenterMap1 = () => {
    // Center the map on the user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapCenter({
          lat: position.coords.latitude+.0001,
          lng: position.coords.longitude+.0001
        });
        setMapZoom(12); // Set an appropriate zoom level
      },
      (error) => {
        console.log(error);
        // Handle error while getting the user's location
      }
    );
  };

  const handleCenterMap2 = () => {
    // Center the map on the user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setMapZoom(12); // Set an appropriate zoom level
      },
      (error) => {
        console.log(error);
        // Handle error while getting the user's location
      }
    );
  };

  return (
    <div className="map-container">
      <div className="center-button" onClick={handleCenterMap}>
        Center Map
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBumOu_99b5cEwXALn9SULH6NN_BmhPV7c' }}
        center={mapCenter}
        zoom={mapZoom}
        defaultCenter={mapOptions.center === 'loading' ? HOUSTON_CENTER : mapOptions.center}
        defaultZoom={mapOptions.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, userLocation, markers, dbmarkers)}
      >
      </GoogleMapReact>
      <MarkerList markers={dbmarkers} onMarkerClick={handleMarkerClick} />
      {selectedMarker && (
        <div className="selected-marker-popup">
          <h3>{selectedMarker.name}</h3>
          {/* Add additional details or actions for the selected marker */}
        </div>
      )}
      <div className="footer">
      <Link to="/ar"><button className="arbutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_ar.png"/></button></Link>{/* New button for ARScene */}
      <Link to="/"><button className="mapbutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_map.png"/></button></Link>
      <Link to="/gallery"><button className="gallerybutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_list.png"/></button></Link>
      </div>
    </div>
  );
};

const AframePage = () => {
  return (
    <div className="aframe-container">
      <iframe src='./aframe.html' width='100%' style={{height: '87vh'}}/>
      <div className="footer">
      <Link to="/ar"><button className="arbutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_ar.png"/></button></Link>{/* New button for ARScene */}
      <Link to="/"><button className="mapbutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_map.png"/></button></Link>
      <Link to="/gallery"><button className="gallerybutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_list.png"/></button></Link>
      </div>
    </div>
  );
};


const GalleryPageMW = ({ markers, dbmarkers, userLocation }) => {
  return (
    <div className="gallery-container">
      <iframe src='https://map.houstonfirst.com/place/ar-app/list/-1493/?lat=29.75213&lng=-95.35776' width='100%' style={{height: '87vh'}}/>
      <div className="footer">
      <Link to="/ar"><button className="arbutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_ar.png"/></button></Link>{/* New button for ARScene */}
      <Link to="/"><button className="mapbutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_map.png"/></button></Link>
      <Link to="/gallery"><button className="gallerybutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_list.png"/></button></Link>
      </div>
    </div>
  );
};

const BlogPage = ({}) => {
  return (
    <div className="blog-container">
      <iframe src='https://www.houstonfirst.com/news/' width='100%' style={{height: '87vh'}}/>
      <div className="footer">
      <Link to="/ar"><button className="arbutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_ar.png"/></button></Link>{/* New button for ARScene */}
      <Link to="/"><button className="mapbutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_map.png"/></button></Link>
      <Link to="/gallery"><button className="gallerybutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_list.png"/></button></Link>
      </div>
    </div>
  );
};

const EventsPage = ({}) => {
  return (
    <div className="events-container">
      <iframe src='https://experience.visithouston.com/checkout/3/visit-houston/8/houston-marketplace' width='100%' style={{height: '87vh'}}/>
      <div className="footer">
      <Link to="/ar"><button className="arbutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_ar.png"/></button></Link>{/* New button for ARScene */}
      <Link to="/"><button className="mapbutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_map.png"/></button></Link>
      <Link to="/gallery"><button className="gallerybutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_list.png"/></button></Link>
      </div>
    </div>
  );
};

const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setFileMarkers] = useState([]);
  const [dbmarkers, setDbMarkers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [menuButtonImage, setMenuButtonImage] = useState("/images/menu_btn.png"); // replace with your menu image path
  const [data, setData] = useState(null);
  const [baseURL, setBaseURL] = useState("https://map.houstonfirst.com/place/json/places/?lng=LNG&lat=LAT&category=restaurants&category=nightlife&category=things-to-do&category=hotels&category=shopping");


  const openNav = () => {
    setIsOpen(true);
    setMenuButtonImage("/images/menu_close.png"); // replace with your menu image path
  };

  const closeNav = () => {
    setIsOpen(false);
    setMenuButtonImage("/images/menu_btn.png"); // replace with your menu image path
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setUserLocation(null); // Handle geolocation error
        }
      );
    }

    // Simulating the loading of markers from a JSON file
    //setTimeout(() => {
      setFileMarkers(markersData);
    //  console.log(markers)
    //}, 1000);
  }, [markers, dbmarkers]);
   // Function to fetch markers from REST API
   const fetchMarkers = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDbMarkers(data);
    } catch (error) {
      console.log('Error fetching markers:', error);
    }
  };

  useEffect(() => {
    fetchMarkers(baseURL);
  }, [baseURL]);

  const addParameter = (param) => {
    const newURL = param;
    setBaseURL(newURL);
    localStorage.setItem('baseURL', newURL); // Store the URL in the local storage
    window.location.reload(); // Reload the app
  };
    useEffect(() => {
  const storedURL = localStorage.getItem('baseURL'); // Retrieve the URL from the local storage
  if (storedURL) {
    setBaseURL(storedURL);
  }
  fetchMarkers(baseURL);
}, [baseURL]);
  return (
    <Router>
      <div>
        {/* Header Bar */}
        <div className="header">
        <div className="logo">
            {/* Replace "logo.png" with the URL or path to your logo image */}
            <img src="/images/logos/Houston-Logo.png" alt="Logo" />
          </div>
          <div className="menu-button" onClick={isOpen ? closeNav : openNav}>
          <img src={menuButtonImage} alt="" />
          </div>
        </div>
        <div id="mySidenav" className={`sidenav ${isOpen ? 'open' : ''}`}>
          <div className="category-header"> FILTER CATEGORIES</div>
        <button className="category-button" onClick={() => addParameter("https://map.houstonfirst.com/place/json/places/?lng=LNG&lat=LAT&category=restaurants")}>
        <img src="/images/Asset 15.png" alt="" />RESTAURANTS</button>
      <button className="category-button" onClick={() => addParameter("https://map.houstonfirst.com/place/json/places/?lng=LNG&lat=LAT&category=nightlife")}>
      <img src="/images/Asset 20.png" alt="" />NIGHTLIFE</button>
      <button className="category-button" onClick={() => addParameter("https://map.houstonfirst.com/place/json/places/?lng=LNG&lat=LAT&category=shopping")}>
      <img src="/images/Asset 18.png" alt="" />SHOPPING</button>
      <button className="category-button" onClick={() => addParameter("https://map.houstonfirst.com/place/json/places/?lng=LNG&lat=LAT&category=things-to-do")}>
      <img src="/images/Asset 17.png" alt="" />THINGS TO DO</button>
      <div className="category-header">______________</div>
      <div className="category-header"> LINKS</div>
      <Link to="/blog"><button className="category-button"onClick={(closeNav)}><img src="/images/Asset 17.png" alt="" />BLOG</button></Link>
      <Link to="/events"><button className="category-button"onClick={(closeNav)}><img src="/images/Asset 17.png" alt="" />EVENTS</button></Link>


</div>
<a href="javascript:void(0)" class="closebtn" onClick={closeNav}></a>

        <Routes>
          <Route path="/" element={<HomePage markers={markers} dbmarkers={dbmarkers} userLocation={userLocation} />} />
          <Route path="/gallery" element={<GalleryPageMW markers={markers} dbmarkers={dbmarkers} userLocation={userLocation} />} />
          <Route path="/ar" element={<AframePage />} /> {/* New route for ARScene */}
          <Route path="/blog" element={<BlogPage />} /> {/* New route for ARScene */}
          <Route path="/events" element={<EventsPage />} /> {/* New route for ARScene */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
