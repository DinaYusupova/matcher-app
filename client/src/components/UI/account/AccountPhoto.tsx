import type { ChangeEvent } from 'react';
import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ClearIcon from '@mui/icons-material/Clear';
import type { AccountPhotoType } from '../../../types/accountPhotoType';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { apiService } from '../../../services/apiServiceConfig';
import { Carousel } from 'react-responsive-carousel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AccountPhoto(): JSX.Element {
  const [photos, setPhotos] = useState<AccountPhotoType[]>([]);
  useEffect(() => {
    const fetchPhotos = async (): Promise<void> => {
      try {
        const { data } = await apiService<AccountPhotoType[]>('/userphoto');
        setPhotos(data);
      } catch (error) {
        console.error('Ошибка при загрузке фотографий:', error);
      }
    };
    fetchPhotos();
  }, []);

  const handlePhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedPhoto = event.target.files?.[0];

    if (photos.length >= 5) {
      toast.error('Достигнут лимит загруженных фотографий');
      return;
    }

    if (uploadedPhoto) {
      const formData = new FormData();
      formData.append('photo', uploadedPhoto);
      try {
        const { data } = await apiService.post<AccountPhotoType>('/userphoto', formData);
        setPhotos((prev) => [...prev, data]);
        toast.info('Фотография добавлена');
      } catch (error) {
        console.error('Ошибка при загрузке фотографии:', error);
      }
    }
  };

  const handleDeletePhoto = async (id: number) => {
    try {
      const response = await apiService.delete(`/userphoto/${id}`);
      if (response.status === 200) {
        const { data } = await apiService<AccountPhotoType[]>('/userphoto');
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
    <Box sx={{ flex: 2 }}>
      <Box sx={{ position: 'relative', textAlign: 'center' }}>
        <ToastContainer />

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
                <img
                  src={`http://localhost:3001/img/${photo.photo}`}
                  alt="Фотография"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
              </div>
            ))}
          </Carousel>
        )}
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
            sx={{ fontSize: '1.5rem' }}
          >
            <AddPhotoAlternateIcon />
          </IconButton>
        </label>
      </Box>
    </Box>
  );
}
