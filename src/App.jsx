import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import getImg from './services/imgAPI';
import Modal from './components/Modal';
import Loader from './components/Loader';
import scrollTo from './services/scrollTo';
import './styles.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [renderBtn, setRenderBtn] = useState(false);
  const [images, setImages] = useState([]);
  const [largeImg, setLargeImg] = useState({ src: '', alt: '' });
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!searchQuery) return;
    const q = searchQuery;
    const options = { q, page };
    setIsLoading(true);

    getImg(options)
      .then(({ hits, totalHits }) => {
        setImages(prev => [...prev, ...hits]);
        setRenderBtn(page < Math.ceil(totalHits / 12));
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [page, searchQuery]);

  const formSubmitQuery = query => {
    setPage(1);
    setSearchQuery(query);
    setError(null);
    setImages([]);
  };

  const changePage = () => {
    setPage(prev => prev + 1);
  };

  const onImgClick = (src, alt) => {
    setLargeImg({ src, alt });
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <div>
      <SearchBar onSubmit={formSubmitQuery} />
      <ImageGallery images={images} onImgClick={onImgClick} />
      {isLoading && <Loader isLoading={isLoading} />}
      {renderBtn && images.length > 0 && (
        <Button onClick={changePage} scroll={scrollTo()} />
      )}
      {showModal && (
        <Modal src={largeImg.src} alt={largeImg.alt} onClose={toggleModal} />
      )}
      {error && <h1>{error}</h1>}
      {images.length === 0 && <h2>Nothing, please start your search</h2>}
    </div>
  );
};

export default App;
