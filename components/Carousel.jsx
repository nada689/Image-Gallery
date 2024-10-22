import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import PropTypes from "prop-types";
import "./Carousel.scss"
const PhotosCarousel = ({ photos, currentPhoto }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  return (

      <Carousel activeIndex={currentIndex} onSelect={handleSelect} slide={false}>
        {/* Display the main photo or video */}
        <Carousel.Item>
          <img
            src={currentPhoto.Photo_Information}
            alt="Current Image"
          />
        </Carousel.Item>

        {/* Loop through other photos */}
        {photos.map((photo) =>
          photo.id !== currentPhoto.Id_Information ? (
            <Carousel.Item key={photo.id}>
              <img
                src={photo.image}
                alt={`Photo Preview ${photo.id}`} // Unique alt text for accessibility
              />
            </Carousel.Item>
          ) : null
        )}
      </Carousel>
  );
};

PhotosCarousel.propTypes = {
  photos: PropTypes.array,
  currentPhoto: PropTypes.object,
};

export default PhotosCarousel;
