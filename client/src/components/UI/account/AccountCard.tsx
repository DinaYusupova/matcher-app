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
import type { AccountUserType } from '../../../types/accountUserType';
import { AccountFilterType } from '../../../types/accountFilterType';
import SearchCard from './AccountSearch';
import AccountSearch from './AccountSearch';


export default function AccountCard():JSX.Element {
  const [accountUser, setAccountUser] = useState({
    gender: '',
    age: '',
    city: '',
    description: '',
  });

    // Состояния для управления данными страницы
    const [gender, setGender] = useState(''); // Пол пользователя
    const [age, setAge] = useState(''); // Возраст пользователя
    const [city, setCity] = useState(''); // Город пользователя
    const [about, setAbout] = useState(''); // Описание пользователя
    const [editing, setEditing] = useState(false); // Режим редактирования о себе

  useEffect(() => {
    const fetchUserInfo =async (): Promise<void> =>{
    const {data} = await apiService<AccountUserType>('/account');
    if(data){
    setAccountUser(data)
    setGender(data.gender);
    setAge(data.age);
    setCity(data.city);
    setAbout(data.description);
    }}
    fetchUserInfo()
   }, []);

 // Обработчик переключения режима редактирования о себе
    const handleEditSaveClick = async (): Promise<void> => {
      if (editing) {
      await  apiService.put('/account', {
          gender,
          age,
          city,
          description:about,
        });
        setAccountUser({
          gender,
          age,
          city,
          description:about,
        });
        
      }
      setEditing((prevEditing) => !prevEditing);
    }

     return (
       <Box
         display="flex"
         justifyContent="center"
         alignItems="center"
         minHeight="100vh"
         p={1}
       >
         <Card sx={{ maxWidth: '800px' }}>
           <CardContent sx={{ display: 'flex',  }}>
           <AccountPhoto/>
    
             <Box sx={{ flex: 2, marginLeft: '20px' }}>
             <Box sx={{ flex: 2, marginLeft: '20px' }}>
               <h2>О себе:</h2>
               <Box sx={{ display: 'flex', marginBottom: '10px' }}>
                 <FormControl sx={{ marginRight: '10px', minWidth: '120px' }}>
                   <InputLabel id="gender-label">Пол</InputLabel>
                   <Select
                     labelId="gender-label"
                     value={gender}
                     onChange={(event) => setGender(event.target.value)}
                     disabled={!editing}
                   >
                     <MenuItem value="male">Мужской</MenuItem>
                     <MenuItem value="female">Женский</MenuItem>
                   </Select>
                 </FormControl>
                 <TextField
                   label="Возраст"
                   value={age}
                   onChange={(event) => setAge(event.target.value)}
                   fullWidth
                   disabled={!editing}
                   sx={{ marginRight: '10px' }}
                 />
                 <TextField
                   label="Город"
                   value={city}
                   onChange={(event) => setCity(event.target.value)}
                   fullWidth
                   disabled={!editing}
                 />
               </Box>
               <TextField
                 label="О себе"
                 value={about}
                 onChange={(event) => setAbout(event.target.value)}
                 multiline
                 rows={3}
                 variant="outlined"
                 fullWidth
                 disabled={!editing}
               />
               <Button
                 variant={editing ? 'outlined' : 'contained'}
                 onClick={handleEditSaveClick}
                 fullWidth
                 sx={{ marginTop: '15px' }}
               >
                 {editing ? 'Сохранить' : 'Редактировать'}
               </Button>
             </Box>
             <AccountSearch/>
             </Box>
           </CardContent>
         </Card>
       </Box>
     );
   };