import React, { useState } from 'react';
import './UserCard.css';

export default function UserCard(): JSX.Element {
  const user = {
    name: 'Eve',
    age: 22,
    gender: 'Female',
    city: 'Chicago',
    userAuthId: 3,
    description: 'Aspiring artist and coffee enthusiast.',
    photo:
      'https://media.istockphoto.com/id/1289220545/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D0%B0%D1%8F-%D0%B6%D0%B5%D0%BD%D1%89%D0%B8%D0%BD%D0%B0-%D1%83%D0%BB%D1%8B%D0%B1%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D1%81%D0%BE-%D1%81%D0%BA%D1%80%D0%B5%D1%89%D0%B5%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8-%D1%80%D1%83%D0%BA%D0%B0%D0%BC%D0%B8.jpg?s=612x612&w=0&k=20&c=75Mz3Waiu8vJiPB_rGEE-6YNfrmffZreaRRNjlGE3Z8=',
  };

  const [showDescription, setShowDescription] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleLike = () => {
    setLiked(true);
    // Здесь вы можете добавить логику для обработки лайка
  };

  const handleDislike = () => {
    setDisliked(true);
    // Здесь вы можете добавить логику для обработки дизлайка
  };

  return (
    <div className="centered-container">
      <div className={`user-profile ${liked ? 'liked' : ''} ${disliked ? 'disliked' : ''}`}>
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
          <button onClick={handleDislike}>Дизлайк</button>
          <button onClick={handleLike}>Лайк</button>
        </div>
      </div>
    </div>
  );
}

// ендпоин -> отправляю запрос на БД
// eнпоинт -> next - принимает id current usera, result - tue, false, like или нет
