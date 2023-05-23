import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ModalWindow } from './Modal/Modal';
import { Button } from './Button/Button';
import { PixabayAPI } from './Pixabay/pixabay_api';

const pixabayAPI = new PixabayAPI();

export const App = () => {
  const [queryString, setQueryString] = useState('');
  const [imagesData, setImagesData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalShow, setIsModalShow] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [page, setPage] = useState(1);

  const handleSearchSubmit = ev => {
    ev.preventDefault();
    const { querystring } = ev.target;

    setQueryString(querystring.value);
    setPage(1);
    setTotalPages(0);
    setImagesData([]);
  };

  const handleImageClick = ev => {
    const currentID = Number(ev.currentTarget.id);
    setLargeImage(imagesData.find(el => el.id === currentID));
    setIsModalShow(true);
  };

  useEffect(() => {
    if (queryString.trim() !== '') {
      pixabayAPI.query = queryString;
      pixabayAPI.page = page;

      async function fetchData() {
        try {
          // setIsLoading(true);
          const { data } = await pixabayAPI.fetchPhotos();
          if (data.totalHits === 0) {
            Notify.warning('No images found for your request');
          } else {
            if (page === 1) Notify.success(`Found ${data.totalHits} images`);
            setImagesData(i => [...i, ...data.hits]);
            setTotalPages(() => Math.trunc(data.totalHits / 12 + 1));
          }
        } catch {
          console.log(Error);
        } finally {
          // setIsLoading(false);
        }
      }

      fetchData();
    }
  }, [queryString, page]);

  return (
    <>
      <Searchbar onSearchSubmit={handleSearchSubmit} />
      <ImageGallery imagesData={imagesData} onImageClick={handleImageClick} />
      {isModalShow && (
        <ModalWindow
          largeImage={largeImage}
          modalClose={() => {
            setIsModalShow(false);
          }}
        ></ModalWindow>
      )}
      {page < totalPages && (
        <Button onLoadMore={() => setPage(page + 1)}>LOAD MORE</Button>
      )}
    </>
  );
};
