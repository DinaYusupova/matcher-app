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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountPhoto from './AccountPhoto';
import { apiService } from '../../../services/apiServiceConfig';
import type { AccountUserType } from '../../../types/accountUserType';
import AccountSearch from './AccountSearch';




export default function AccountCard():JSX.Element {
  const [accountUser, setAccountUser] = useState({
    name: '',
    gender: '',
    age: '',
    city: '',
    description: '',
  });

    // Состояния для управления данными страницы
    const [name, setName] = useState(''); // Пол пользователя
    const [gender, setGender] = useState(''); // Пол пользователя
    const [age, setAge] = useState(''); // Возраст пользователя
    const [city, setCity] = useState(''); // Город пользователя
    const [about, setAbout] = useState(''); // Описание пользователя
    const [editing, setEditing] = useState(false); // Режим редактирования о себе
    const [aboutFieldsFilled, setAboutFieldsFilled] = useState(false); // Для отслеживания полей "О себе"
    const [loading, setLoading] = useState(true);
    

   


    useEffect(() => {
      const fetchUserInfo = async (): Promise<void> => {
        try {
          const { data } = await apiService<AccountUserType>('/account');
          if (data) {
            setAccountUser(data);
            setName(data.name);
            setGender(data.gender);
            setAge(data.age);
            setCity(data.city);
            setAbout(data.description);
          }
        } catch (error) {
          console.error('Ошибка при загрузке данных:', error);
        }
      };
  
      fetchUserInfo();
    }, []);

  useEffect(() => {
    // Проверяем, все ли поля заполнены
    const areAboutFieldsFilled = name && gender && age && city && about;
    setAboutFieldsFilled(areAboutFieldsFilled);
  }, [name, gender, age, city, about]);

 // Обработчик переключения режима редактирования о себе
    const handleEditSaveClick = async (): Promise<void> => {
      if (editing) {
      await  apiService.put('/account', {
          name,
          gender,
          age,
          city,
          description:about,
        });
        setAccountUser({
          name,
          gender,
          age,
          city,
          description: about,
        });
        
      }
      setEditing((prevEditing) => !prevEditing);
    }

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

  const theme3 = createTheme({
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
      <ThemeProvider theme={theme}>
       <Box
         display="flex"
         justifyContent="center"
         alignItems="center"
         minHeight="100vh"
         p={1}
       >
         <Card  sx={{
            maxWidth: '800px',
            width: '100%',
            height: '620px',
            borderRadius: '10px', // Закругление углов рамки
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Тень рамки
          }}>
           <CardContent sx={{ display: 'flex',  }}>
           <AccountPhoto/>
             <Box sx={{ flex: 2, marginLeft: '20px' }}>
             <Box sx={{ flex: 2, marginLeft: '20px' }}>
               <h3 style={{
                fontFamily: 'Poppins, sans-serif', // Замените на имя вашего шрифта
                fontSize: '17px', // Настройте размер шрифта
                fontWeight: 550, // Настройте жирность шрифта
              }}>О СЕБЕ:</h3>
               <TextField
                   label="Имя"
                   value={name}
                   onChange={(event) => setName(event.target.value)}
                   fullWidth
                   disabled={!editing}
                   sx={{ marginRight: '10px' }}
                 />
               <Box sx={{ display: 'flex', marginBottom: '10px', marginTop: '10px' }}>
            
                  <TextField
                label="Пол"
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                select // Добавляем атрибут select
                fullWidth
                disabled={!editing}
                sx={{ marginRight: '10px',  width: '40%'}}
              >
                <MenuItem value="male">M</MenuItem>
                <MenuItem value="female">Ж</MenuItem>
              </TextField>
                 <TextField
                   label="Возраст"
                   value={age}
                   onChange={(event) => setAge(event.target.value)}
                   fullWidth
                   disabled={!editing}
                   sx={{ marginRight: '10px', width: '40%' }}
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
                 <ThemeProvider theme={theme3}>
               <Button
                 variant={editing ? 'outlined' : 'contained'}
                 onClick={handleEditSaveClick}
                 fullWidth
                 sx={{ marginTop: '10px',
                 marginBottom: '5px', // Уменьшаем нижний отступ
                 fontSize: '14px',
                 fontWeight: 'bold', // Делаем текст жирным
                 color: 'white',
                 backgroundColor: '#a8a3a3', // Цвет кнопки как в Tinder
                 '&:hover': {
                   backgroundColor: '#919191', // Цвет при наведении
                 },
                }}
               >
                 {editing ? 'Сохранить' : 'Редактировать'}
               </Button>
               </ThemeProvider>
             </Box>
             <AccountSearch aboutFieldsFilled={aboutFieldsFilled}/>
             </Box>
           </CardContent>
         </Card>
       </Box>
        </ThemeProvider>
     );
   };
