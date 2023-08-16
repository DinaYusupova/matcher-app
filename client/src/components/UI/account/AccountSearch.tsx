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
} from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { apiService } from '../../../services/apiServiceConfig';
import type { AccountFilterType } from '../../../types/accountFilterType';

export default function SearchCard({aboutFieldsFilled}) :JSX.Element {
  const [searchGender, setSearchGender] = useState('');
  const [minSearchAge, setMinSearchAge] = useState(18);
  const [maxSearchAge, setMaxSearchAge] = useState(100);
  const [searchCity, setSearchCity] = useState('');
  const [searchEditing, setSearchEditing] = useState(false);
  const [searchFieldsFilled, setSearchFieldsFilled] = useState(false);
  const [isModalOpenAbout, setIsModalOpenAbout] = useState(false);
  const [isModalOpenSearch, setIsModalOpenSearch] = useState(false);

  useEffect(() => {
   const fetchUserFilter =async (): Promise<void> =>{
    try{ 
    const {data} = await apiService<AccountFilterType>('/account/filter');
    if (data){
    setSearchGender(data.searchGender);
    setSearchCity(data.searchCity);
    setMinSearchAge(data.minSearchAge);
    setMaxSearchAge(data.maxSearchAge)
    
    }}catch{
      console.log('err')
    }
    }
    fetchUserFilter()
   }, []);

// Обработчик переключения режима редактирования данных поиска
const handleSearchEditSaveClick = async ():  Promise<void> => { 
  if (searchEditing) {
  await  apiService.put('/account/filter', {
      searchGender,
      minSearchAge,
      maxSearchAge,
      searchCity,
    });
    setSearchGender(searchGender);
    setMinSearchAge(minSearchAge);
    setMaxSearchAge(maxSearchAge);
    setSearchCity(searchCity);

};
setSearchEditing((prevSearchEditing) => !prevSearchEditing);
}

useEffect(() => {
  const areSearchFieldsFilled =
    searchGender && minSearchAge && maxSearchAge && searchCity;
  setSearchFieldsFilled(areSearchFieldsFilled);
}, [searchGender, minSearchAge, maxSearchAge, searchCity]);

const handleSearchMatch = () => {
  if (searchFieldsFilled && aboutFieldsFilled) {
    window.location.href = '/match';
  } else if(!aboutFieldsFilled){
    setIsModalOpenAbout(true);
  }else if(!searchFieldsFilled){
    setIsModalOpenSearch(true);
  }
};

const theme2 = createTheme({
  palette: {
    primary: {
      main: '#fff', // Цвет контура и лейбла в активном состоянии
    },
    text: {
      primary: '#fff', // Цвет текста
    },
  },
});

  return (
    
    
    <Box sx={{ flex: 2, marginLeft: '20px' , marginTop: '10px'}}>
        <h3 style={{
                fontFamily: 'Poppins, sans-serif', // Замените на имя вашего шрифта
                fontSize: '17px', // Настройте размер шрифта
                fontWeight: 550, // Настройте жирность шрифта
              }}>Я ИЩУ:</h3>
        <Box
  sx={{
    display: 'flex',
    marginBottom: '10px',
    marginTop: '10px',
    alignItems: 'flex-end', // Выравнивание по нижнему краю
  }}
>
  <TextField
    label="Пол"
    value={searchGender}
    onChange={(event) => setSearchGender(event.target.value)}
    select
    fullWidth
    disabled={!searchEditing}
    sx={{ marginRight: '10px', width: '22%' }}
  >
    <MenuItem value="male">M</MenuItem>
    <MenuItem value="female">Ж</MenuItem>
  </TextField>
  <TextField
    label="Возраст от"
    value={minSearchAge}
    onChange={(event) => setMinSearchAge(event.target.value)}
    type="number"
    fullWidth
    disabled={!searchEditing}
    sx={{ marginRight: '10px', flex: 1 }} // Равномерное распределение ширины
    InputProps={{ inputProps: { min: 0, max: maxSearchAge, step: 1 } }}
  />
  <TextField
    label="до"
    value={maxSearchAge}
    onChange={(event) => setMaxSearchAge(event.target.value)}
    type="number"
    fullWidth
    disabled={!searchEditing}
    sx={{ flex: 1 }} // Равномерное распределение ширины
    InputProps={{ inputProps: { min: minSearchAge, step: 1 } }}
  />
</Box>
        <TextField
            label="Город"
            value={searchCity}
            onChange={(event) => setSearchCity(event.target.value)}
            fullWidth
            disabled={!searchEditing} />
       <ThemeProvider theme={theme2}>
        <Button
          variant={searchEditing ? 'outlined' : 'contained'}
          onClick={handleSearchEditSaveClick}
          fullWidth
          sx={{ marginTop: '10px',
          marginBottom: '5px', // Уменьшаем нижний отступ
          fontSize: '14px',
           color: 'white', // Устанавливаем белый цвет текста
          fontWeight: 'bold', // Делаем текст жирным
          backgroundColor: '#a8a3a3', // Цвет кнопки как в Tinder
          '&:hover': {
            backgroundColor: '#919191', // Цвет при наведении
          },
         }}
        >
          {searchEditing ? 'Сохранить' : 'Редактировать'}
        </Button>
        </ThemeProvider> 
        <Button
          variant={searchEditing ? 'contained' : 'contained'} // Изменил 'contained' на 'outlined'
          onClick={handleSearchMatch}
          fullWidth
          sx={{ marginTop: '10px',
          marginBottom: '5px', // Уменьшаем нижний отступ
          fontSize: '14px',
          fontWeight: 'bold', // Делаем текст жирным
         }}
        >
          Начать поиск
        </Button>
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
  );
}