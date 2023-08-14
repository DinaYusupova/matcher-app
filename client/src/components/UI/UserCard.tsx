import React, { useState } from 'react';
import './UserCard.css';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
          <p>Больше пользователей с подходящими данными не найдено, расширьте фильтр поиска</p>
        </div>
      </div>
    );
  }

  return (
    <div className="centered-container">
      <div className={`${profileClasses} ${animationClass}`}>
        <div className="user-info">
          <div className="user-name-age">
            <h2>
              {profile.name}, {profile.age}
            </h2>
            <p>{profile.distanceBetweenUsers}</p>
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
              onClick={() => handleAction('liked')}
            >
              <FavoriteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
