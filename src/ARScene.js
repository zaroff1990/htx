import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const ARScene = () => {
    const [showAR, setShowAR] = useState(true); // Set initial state to true
    const [cameraStarted, setCameraStarted] = useState(false); // New state for tracking camera

    useEffect(() => {
        if (showAR) {
            // Check every 500ms if the video element is visible
            const intervalId = setInterval(() => {
                const video = document.querySelector('video');
                if (video && video.style.visibility !== 'hidden') {
                    setCameraStarted(true);
                    clearInterval(intervalId);
                }
            }, 500);

            // Clean up the interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [showAR]);

    return (
      <div>
        {!showAR && <button onClick={() => setShowAR(true)}>Start AR</button>}
        {showAR && (
          <div>
            {!cameraStarted && <div className="arjs-loader"><div>Loading, please wait...</div></div>}
            <a-scene
    vr-mode-ui="enabled: false;"
    renderer="logarithmicDepthBuffer: true;"
    embedded
    arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
  >
    <a-nft
      type="nft"
      url="https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/trex-image/trex"
      smooth="true"
      smoothCount="10"
      smoothTolerance=".01"
      smoothThreshold="5"
    >
      <a-entity
        gltf-model='/gltf/boombox/BoomBox.gltf'
        scale="1 1 1"
        position="0 0 0"
      >here
      </a-entity>
    </a-nft>
    <a-entity camera></a-entity>
  </a-scene>
          </div>
        )}
      <div className="footer">
      <Link to="/ar"><button className="arbutton"><img src="http://www.ristudios.com/wp-content/uploads/hou_ar.png"/></button></Link>{/* New button for ARScene */}
      <button className="mapbutton" onClick={() => {setShowAR(false); window.location.href="/";}}><img src="http://www.ristudios.com/wp-content/uploads/hou_map.png"/></button>
      <button className="gallerybutton" onClick={() => {setShowAR(false); window.location.href="/gallery";}}><img src="http://www.ristudios.com/wp-content/uploads/hou_list.png"/></button>
      </div>
      </div>
    );
};

export default ARScene;
