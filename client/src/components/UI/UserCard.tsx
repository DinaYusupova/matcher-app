import React, { useState } from 'react';
import './UserCard.css';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Carousel } from 'react-responsive-carousel';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { ProfileType } from '../../types/profileType';
import { dislikeProfileThunk, likeProfileThunk } from '../../redux/slices/profile/profileThunk';

export default function UserCard(): JSX.Element {
  const profile: ProfileType = useAppSelector((store) => store.profile.data[0]);

  const profiles: ProfileType[] = useAppSelector((store) => store.profile.data);

  const profilesStatus: string = useAppSelector((store) => store.profile.status);

  const dispatch = useAppDispatch();

  const [showDescription, setShowDescription] = useState(false);
  const [action, setAction] = useState(null);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleAction = (type) => {
    setAction(type);
    if (type === 'liked') {
      void dispatch(likeProfileThunk(profile.userId));
    }
    if (type === 'disliked') {
      void dispatch(dislikeProfileThunk(profile.userId));
    }
    // Здесь вы можете добавить логику для обработки лайка или дизлайка
    setTimeout(() => {
      setAction(null);
    }, 300);
  };

  let profileClasses = 'user-profile';
  let animationClass = ''; // Добавляем переменную для класса анимации

  if (action === 'liked' || profilesStatus === 'empty') {
    animationClass = 'swipe-right'; // Устанавливаем класс анимации
    profileClasses += ' liked';
  } else if (action === 'disliked') {
    animationClass = 'swipe-left'; // Устанавливаем класс анимации
    profileClasses += ' disliked';
  }

  if (!profiles.length) {
    return (
      <div className="centered-container">
        <div className="user-info no-profiles">
          <p>Пользователей с подходящими данными не найдено, расширьте фильтр поиска</p>
        </div>
      </div>
    );
  }

  return (
    <div className="centered-container">
      <div className={`${profileClasses} ${animationClass}`}>
        <div className="user-info">
          <div className="user-name-age">
            {Array.isArray(profile.photos) && profile.photos.length && (
              <Carousel showThumbs={false} showStatus={false}>
                {profile.photos.map((photo) => (
                  <div key={photo}>
                    <img
                      src={`http://localhost:3001/img/${photo}`}
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
            <h2>
              {profile.name}, {profile.age}
            </h2>
            {profile.distanceBetweenUsers && <h4>{profile.distanceBetweenUsers} км</h4>}
          </div>

          {profile.description.length <= 50 || showDescription ? (
            <div className="description">{profile.description}</div>
          ) : (
            <div className="description">
              {profile.description.slice(0, 50)}
              <IconButton
                color="error"
                aria-label="full-description"
                size="large"
                onClick={toggleDescription}
              >
                <ArrowDropDownIcon />
              </IconButton>
            </div>
          )}

          <div className="user-actions">
            <IconButton
              color="error"
              aria-label="like"
              size="large"
              onClick={() => handleAction('disliked')}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              color="success"
              aria-label="like"
              size="large"
              onClick={() => {
                console.log('liked');
                handleAction('liked');
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
