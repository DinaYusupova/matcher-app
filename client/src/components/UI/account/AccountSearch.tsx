import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AccountPhoto from './AccountPhoto';
import { apiService } from '../../../services/apiServiceConfig';
import type { AccountFilterType } from '../../../types/accountFilterType';


export default function SearchCard():JSX.Element {
  
    // Состояния для управления данными страницы
    const [searchGender, setSearchGender] = useState(''); // Пол, который ищет пользователь
    const [minSearchAge, setMinSearchAge] = useState(18);
    const [maxSearchAge, setMaxSearchAge] = useState(100);
    const [searchCity, setSearchCity] = useState(''); // Город, который ищет пользователь
    const [searchEditing, setSearchEditing] = useState(false); // Режим редактирования данных поиска



   useEffect(() => {
    const fetchUserFilter =async (): Promise<void> =>{
    const {data} = await apiService<AccountFilterType>('/account/filter');
    if (data){
    setSearchGender(data.searchGender);
    setSearchCity(data.searchCity);
    setMinSearchAge(data.minSearchAge);
    setMaxSearchAge(data.maxSearchAge)
    }}
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
      }
    setSearchEditing((prevSearchEditing) => !prevSearchEditing);
    };


     return (
             <Box sx={{ flex: 2, marginLeft: '20px' }}>
             <h2>Я ищу:</h2>
               <Box sx={{ display: 'flex', marginBottom: '10px', marginTop: '20px'}}>
                 <FormControl sx={{ marginRight: '10px', minWidth: '120px' }}>
                   <InputLabel id="gender-label">Пол</InputLabel>
                   <Select
                     labelId="gender-label"
                     value={searchGender}
                     onChange={(event) => setSearchGender(event.target.value)}
                     disabled={!searchEditing}
                   >
                     <MenuItem value="male">Мужской</MenuItem>
                     <MenuItem value="female">Женский</MenuItem>
                   </Select>
                 </FormControl>
                 <TextField
                   label="Город"
                   value={searchCity}
                   onChange={(event) => setSearchCity(event.target.value)}
                   fullWidth
                   disabled={!searchEditing}
                 />
                  </Box>
                  <TextField
                  label="Возраст от"
                  value={minSearchAge}
                  onChange={(event) => setMinSearchAge(event.target.value)}
                  type="number"
                  fullWidth
                  disabled={!searchEditing}
                  sx={{ marginRight: '10px', maxWidth: '120px' }}
                  InputProps={{ inputProps: { min: 0, max: maxSearchAge, step: 1 } }}
                  />

                  <TextField
                  label="до"
                  value={maxSearchAge}
                  onChange={(event) => setMaxSearchAge(event.target.value)}
                  type="number"
                  fullWidth
                  disabled={!searchEditing}
                  sx={{ marginRight: '10px', maxWidth: '120px' }}
                  InputProps={{ inputProps: { min: minSearchAge, step: 1 } }}
                  />
               <Button
                 variant={searchEditing ? 'outlined' : 'contained'}
                 onClick={handleSearchEditSaveClick}
                 fullWidth
                 sx={{ marginTop: '15px' }}
               >
                 {searchEditing ? 'Сохранить' : 'Редактировать'}
               </Button>
             </Box>
     );
   };