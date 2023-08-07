import React from 'react';

const MarkerList = ({ markers, onMarkerClick }) => {

  // Helper function to generate star icons with partial stars based on the rating
  const generateStarIcons = (rating) => {
    const fullStars = Math.floor(rating); // Get the integer part of the rating
    const decimalPart = rating - fullStars; // Get the decimal part of the rating

    const starIcons = [];
    for (let i = 1; i <= 5; i++) {
      let starImage;
      if (i <= fullStars) {
        // Full star for the integer part
        starImage = '/images/filled-star.png';
      } else if (i === fullStars + 1 && decimalPart > 0) {
        // Partial star for the decimal part
        starImage = '/images/partial-star.png';
      } else {
        // Empty star for the rest
        starImage = '/images/empty-star.png';
      }
      starIcons.push(<img className="star-icon" key={i} src={starImage} alt={`Star ${i}`} />);
    }
    return starIcons;
  };

  return (
    <div className="marker-list">
      {markers.map((marker) => (
        <div key={marker.slug} className="marker-item" onClick={() => onMarkerClick(marker)}>
          <img className="marker-image" src={marker.marker_url} alt={`Marker ${marker.id}`} />
          <div className="marker-details">
            {/* {marker.slug} */}
            {marker.name}
            {marker.categories.map((category) => (
              <div key={category.slug} className="category-details">{category.name}</div>
            ))}
            {marker.subcategories.map((subcategory) => (
              <div key={subcategory.slug} className="subcategory-details">{subcategory.name}</div>
            ))}
            <div className="star-rating">{generateStarIcons(marker.star_rating)}</div>          
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarkerList;
