import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ClearIcon from '@mui/icons-material/Clear';
import { apiService } from '../../../services/apiServiceConfig';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AccountPhoto() {
  const [photos, setPhotos] = useState([]);
  
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await apiService('/userphoto');
        setPhotos(data);
      } catch (error) {
        console.error('Ошибка при загрузке фотографий:', error);
      }
    };
    fetchPhotos();
  }, []);

  const handlePhotoUpload = async (event) => {
    const uploadedPhoto = event.target.files?.[0];

    if (photos.length >= 5) {
      toast.error('Достигнут лимит загруженных фотографий');
      return;
    }

    if (uploadedPhoto) {
      const formData = new FormData();
      formData.append('photo', uploadedPhoto);
      try {
        const { data } = await apiService.post('/userphoto', formData);
        setPhotos((prev) => [...prev, data]);
        toast.info('Фотография добавлена');
      } catch (error) {
        console.error('Ошибка при загрузке фотографии:', error);
      }
    }
  };

  const handleDeletePhoto = async (id) => {
    try {
      const response = await apiService.delete(`/userphoto/${id}`);
      if (response.status === 200) {
        const { data } = await apiService('/userphoto');
        setPhotos(data);
      } else {
        console.error('Ошибка при удалении фотографии. Сервер вернул статус:', response.status);
      }
    } catch (error) {
      console.error('Ошибка при удалении фотографии:', error);
    } finally {
      toast.info('Фотография удалена');
    }
  };

  return (
    <Box sx={{ flex: 2, position: 'relative', textAlign: 'center', height: '500px', backgroundColor: '#f0f0f0' }}>
      <Box sx={{ position: 'relative', textAlign: 'center', height: '500px' }}>
        {photos.length === 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <label htmlFor="photo-input" style={{ cursor: 'pointer' }}>
              ЗАГРУЗИТЕ ФОТО
            </label>
          </div>
        )}

        {photos.length > 0 && (
          <Carousel showThumbs={false} showStatus={false}>
            {photos.map((photo) => (
              <div key={photo.id}>
                <IconButton
                  sx={{ position: 'absolute', top: '3px', right: '16px' }}
                  onClick={() => handleDeletePhoto(photo.id)}
                >
                  <ClearIcon />
                </IconButton>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <img
                    src={`http://localhost:3001/api/userphoto/photos/${photo.photo}`}
                    alt="Фотография"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </Box>

      <label htmlFor="photo-input">
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{ display: 'none' }}
          id="photo-input"
          name="photo"
        />
        <IconButton
          color="primary"
          aria-label="upload photo"
          component="span"
          sx={{ fontSize: '1.5rem', marginTop: '60px' }}
        >
          <AddPhotoAlternateIcon />
        </IconButton>
      </label>
    </Box>
  );
}

