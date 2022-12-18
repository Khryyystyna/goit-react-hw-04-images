import { GlobalStyle } from './GlobalStyle';
import { addImages } from './api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

export const App = () => {

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isBtnVisible, setIsBtnVisible] = useState(null);
  const [total, setTotal] = useState(0);
  

  useEffect(() => {
     if (!query) {
      return;
    } else {
      addImages(query, page)
        .then(({ hits, total }) => {
          if (hits.length > 12) {
            setIsBtnVisible(true);
          }
          if (total === 0) {
            setLoading(false);
          }
            setImages(images => [...images, ...hits]);
            setTotal(total);
            setLoading( false );
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
  }, [query, page]);


  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(page => page + 1);
    setLoading(true);

    const amountOfPages = total / 12 - page;
    if (amountOfPages < 0) {
      setIsBtnVisible(false);
    }
  };

  
    return (
      <>
        <Searchbar onSubmit={handleSubmit} query={query} />
        {images.length > 0 && (
          <ImageGallery>
            {images.map(image => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
          </ImageGallery>
        )}
        {loading && <Loader />}
        {images.length > 0 && images.length !== total  && !loading && (
          <Button onClick={loadMore} />
        )}
        <GlobalStyle />
        <ToastContainer
          position="top-center"
          autoClose={3000} />
      </>
    );
  }

