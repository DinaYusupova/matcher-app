import React, { useState } from 'react';
import './UserCard.css';
import { useAppSelector } from '../../redux/hooks';

export default function UserCard(): JSX.Element {
  const user = useAppSelector((store) => store.user);

  const [showDescription, setShowDescription] = useState(false);
  const [action, setAction] = useState(null);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleAction = (type) => {
    setAction(type);
    // Здесь вы можете добавить логику для обработки лайка или дизлайка
    setTimeout(() => {
      setAction(null);
    }, 300); // Сбрасываем анимацию через 300 миллисекунд
  };

  let profileClasses = 'user-profile';
  if (action === 'liked') {
    profileClasses += ' swipe-right liked';
  } else if (action === 'disliked') {
    profileClasses += ' swipe-left disliked';
  }

  return (
    <div className="centered-container">
      <div className={profileClasses}>
        <div className="user-photo">
          <img src={user.photo} alt="User" />
        </div>
        <div className="user-info">
          <div className="user-name-age">
            <h2>{user.name}</h2>
            <p>{user.age} лет</p>
          </div>
          {showDescription ? (
            <p className="user-description">{user.description}</p>
          ) : (
            <button onClick={toggleDescription}>Показать описание</button>
          )}
        </div>
        <div className="user-actions">
          <button onClick={() => handleAction('disliked')}>Дизлайк</button>
          <button onClick={() => handleAction('liked')}>Лайк</button>
        </div>
      </div>
    </div>
  );
}

// ендпоин -> отправляю запрос на БД
// eнпоинт -> next - принимает id current usera, result - tue, false, like или нет
