import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ images, onImgClick }) => {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onClick={() => onImgClick(largeImageURL, tags)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
