import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AccountPhoto from '../UI/account/AccountPhoto';
import { apiService } from '../../services/apiServiceConfig';

export default function AccountCard(): JSX.Element {
  // Состояние для хранения информации о пользователе
  const [accountUser, setAccountUser] = useState({
    name: '',
    gender: '',
    age: '',
    city: '',
    description: '',
  });

  // Состояния для управления данными страницы
  const [name, setName] = useState(''); // Имя пользователя
  const [gender, setGender] = useState(''); // Пол пользователя
  const [age, setAge] = useState(''); // Возраст пользователя
  const [city, setCity] = useState(''); // Город пользователя
  const [about, setAbout] = useState(''); // Описание пользователя
  const [aboutFieldsFilled, setAboutFieldsFilled] = useState(false); // Для отслеживания полей "О себе"
  const [isModalOpenAbout, setIsModalOpenAbout] = useState(false); // Состояние модального окна

  // Проверка, заполнены ли все поля "О себе"
  useEffect(() => {
    const areAboutFieldsFilled = name && gender && age && city && about;
    setAboutFieldsFilled(areAboutFieldsFilled);
  }, [name, gender, age, city, about]);

  // Обработчик нажатия на кнопку "Далее"
  const handleSaveClick = async (): Promise<void> => {
    if (!aboutFieldsFilled) {
      setIsModalOpenAbout(true); // Открыть модальное окно, если не все поля заполнены
    } else {
      // Отправка данных на сервер и обновление состояния
      await apiService.put('/account', {
        name,
        gender,
        age,
        city,
        description: about,
      });
      setAccountUser({
        name,
        gender,
        age,
        city,
        description: about,
      });
    }
  };

  // Тема для стилизации элементов MUI
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FE3C72', // Цвет контура и лейбла в активном состоянии
      },
      text: {
        primary: '#000', // Цвет текста
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        maxHeight="100vh"
        p={0}
        sx={{marginTop:'20px'}}
      >
        <Card
          sx={{
            maxWidth: '800px',
            width: '100%',
            height: '620px',
            borderRadius: '10px', // Закругление углов рамки
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Тень рамки
          }}
        >
          <CardContent sx={{ display: 'flex' }}>
            <AccountPhoto />
            <Box sx={{ flex: 2, marginLeft: '20px' }}>
              {/* Форма для заполнения информации о пользователе */}
              <h3 style={{
                fontFamily: 'Poppins, sans-serif', // Замените на имя вашего шрифта
                fontSize: '17px', // Настройте размер шрифта
                fontWeight: 550, // Настройте жирность шрифта
              }}>
                ЗАПОЛНИТЕ ИНФОРМАЦИЮ О СЕБЕ
              </h3>
              <TextField
                label="Имя"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
                sx={{ marginRight: '10px', marginTop: '10px' }}
              />
              <TextField
                label="Пол"
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                select // Добавляем атрибут select
                fullWidth
                sx={{ marginRight: '10px', marginTop: '15px' }}
              >
                <MenuItem value="male">Мужской</MenuItem>
                <MenuItem value="female">Женский</MenuItem>
              </TextField>
              <TextField
                label="Возраст"
                value={age}
                onChange={(event) => setAge(event.target.value)}
                fullWidth
                sx={{ marginRight: '10px', marginTop: '15px' }}
              />
              <TextField
                label="Город"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                fullWidth
                sx={{ marginTop: '15px' }}
              />
              <TextField
                label="О себе"
                value={about}
                onChange={(event) => setAbout(event.target.value)}
                multiline
                rows={3}
                sx={{ marginTop: '15px' }}
                variant="outlined"
                fullWidth
              />
              <Button
                variant="contained"
                onClick={handleSaveClick}
                fullWidth
                sx={{
                  marginTop: '17px',
                  backgroundColor: '#FE3C72', // Цвет кнопки как в Tinder
                  '&:hover': {
                    backgroundColor: '#E8355F', // Цвет при наведении
                  },
                  fontFamily: 'Poppins, sans-serif', // Замените на имя вашего шрифта
                  fontSize: '20px', // Настройте размер шрифта
                  fontWeight: 550, // Настройте жирность шрифта
                }}
                component={Link}
                to="/account/filter"
              >
                Далее
              </Button>
            </Box>
          </CardContent>
        </Card>
        {/* Модальное окно для напоминания о заполнении полей */}
        {!aboutFieldsFilled && (
          <Dialog open={isModalOpenAbout} onClose={() => setIsModalOpenAbout(false)}>
            <DialogTitle>Важное сообщение</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Пожалуйста, заполните информацию о себе перед началом поиска.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsModalOpenAbout(false)} color="primary">
                Закрыть
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </ThemeProvider>
  );
}
