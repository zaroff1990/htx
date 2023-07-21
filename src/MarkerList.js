import React from 'react';

const MarkerList = ({ markers, onMarkerClick }) => {
  return (
    <div className="marker-list">
      {markers.map((marker) => (
        <div key={marker.slug} className="marker-item" onClick={() => onMarkerClick(marker)}>
          {marker.slug}
          {marker.name}
          <div class="da-img"><img src={marker.marker_url} /></div>
        </div>
      ))}
    </div>
  );

};

export default MarkerList;
