import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { apiService } from '../../services/apiServiceConfig';

export default function SearchCard(): JSX.Element {
  // Состояния для хранения критериев поиска пользователя
  const [searchGender, setSearchGender] = useState(''); // Пол
  const [minSearchAge, setMinSearchAge] = useState(18); // Минимальный возраст
  const [maxSearchAge, setMaxSearchAge] = useState(100); // Максимальный возраст
  const [searchCity, setSearchCity] = useState(''); // Город
  const [searchFieldsFilled, setSearchFieldsFilled] = useState(false); // Заполнены ли все поля
  const [isModalOpenSearch, setIsModalOpenSearch] = useState(false); // Открыто ли модальное окно

  // Эффект useEffect для определения, заполнены ли все поля поиска
  useEffect(() => {
    const areSearchFieldsFilled = searchGender && minSearchAge && maxSearchAge && searchCity;
    setSearchFieldsFilled(areSearchFieldsFilled);
  }, [searchGender, minSearchAge, maxSearchAge, searchCity]);

  // Функция для обработки клика по кнопке поиска
  const handleSearchMatch = async () => {
    if (searchFieldsFilled) {
      await apiService.put('/account/filter', {
        searchGender,
        minSearchAge,
        maxSearchAge,
        searchCity,
      });
      // Перенаправление на страницу с результатами
    } else if (!searchFieldsFilled) {
      // Открытие модального окна, если не заполнены все поля
      setIsModalOpenSearch(true);
    }
  };

  // Тема для стилизации элементов MUI
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FE3C72', // Основной цвет
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
        <Card  sx={{
            maxWidth: '550px',
            width: '100%',
            height: '620px',
            borderRadius: '10px', // Закругление углов рамки
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Тень рамки
          }}
        >
          <CardContent sx={{ display: 'flex' }}>
            <Box sx={{ flex: 2, marginLeft: '20px', marginRight: '20px' }}>
              <h3
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '20px',
                  fontWeight: 550,
                  textAlign: 'center', // Выравнивание по центру
                  marginTop: '50px',
                }}
              >
                ЗАПОЛНИТЕ ФИЛЬТР ПОИСКА
              </h3>

              {/* Выбор пола */}
              <TextField
                label="Пол"
                value={searchGender}
                onChange={(event) => setSearchGender(event.target.value)}
                select // Используем атрибут select
                fullWidth
                sx={{ marginRight: '10px', marginTop: '50px' }}
              >
                <MenuItem value="male">Мужской</MenuItem>
                <MenuItem value="female">Женский</MenuItem>
              </TextField>

              {/* Ввод города */}
              <TextField
                label="Город"
                value={searchCity}
                onChange={(event) => setSearchCity(event.target.value)}
                fullWidth
                sx={{ marginTop: '20px' }}
              />

              {/* Ввод возрастного диапазона */}
              <Box sx={{ display: 'flex', marginTop: '20px' }}>
                <TextField
                  label="Возраст от"
                  value={minSearchAge}
                  onChange={(event) => setMinSearchAge(event.target.value)}
                  type="number"
                  fullWidth
                  InputProps={{ inputProps: { min: 0, max: maxSearchAge, step: 1 } }}
                  sx={{ marginRight: '10px' }}
                />
                <TextField
                  label="до"
                  value={maxSearchAge}
                  onChange={(event) => setMaxSearchAge(event.target.value)}
                  type="number"
                  fullWidth
                  InputProps={{ inputProps: { min: minSearchAge, step: 1 } }}
                />
              </Box>

              {/* Кнопка для начала поиска */}
              <Button
                variant="contained"
                onClick={handleSearchMatch}
                fullWidth
                sx={{
                  marginTop: '80px',
                  backgroundColor: '#FE3C72', // Цвет кнопки, как на Tinder
                  '&:hover': {
                    backgroundColor: '#E8355F', // Цвет при наведении
                  },
                  fontFamily: 'Poppins, sans-serif', // Замените на имя вашего шрифта
                  fontSize: '20px', // Размер шрифта
                  fontWeight: 550, // Насыщенность шрифта
                }}
                component={Link}
                to="/match"
              >
                Начать поиск
              </Button>

              {/* Модальное окно, если не заполнены все поля */}
              {!searchFieldsFilled && (
                <Dialog open={isModalOpenSearch} onClose={() => setIsModalOpenSearch(false)}>
                  <DialogTitle>Важное сообщение</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Пожалуйста, заполните поля фильтра перед началом поиска.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setIsModalOpenSearch(false)} color="primary">
                      Закрыть
                    </Button>
                  </DialogActions>
                </Dialog>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
