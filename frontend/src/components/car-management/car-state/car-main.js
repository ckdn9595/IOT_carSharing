import React, { useState, useEffect, useContext } from 'react';
import CarState from './car-state';
import {CarContext} from '../carContext'
import { 
  Box, 
  Grid,
  Container, 
  Typography, 
  TextField, 
  Button,
  Avatar,
  createMuiTheme,
  ThemeProvider,
  Fab,
  Divider,
  FormControlLabel,
  Checkbox,
  Input,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import CarRegister from './car-register';
import axios from 'axios';

// 차량정보 불러와서 목록 조회하기
const OpenCarState = () => {
  const {register} = useContext(CarContext)
  const [carList,setCarList] = useState([])
  
  // const option = {
  //   url:`http://localhost:8001/api/car/`,
  //   method:'GET',
  //   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
  //   }

    const getList= async() =>{
      try{
        // const response = await axios(option)
        // setCarList([resposnse.data])
        // console.log(response.data)
      }catch(err){
        console.log('list get error')
        }
    }

  useEffect(()=>{
        getList()
  },[register])

  
return (
  <>
  {register.map(car =>(
  <CarState key={car.carNum} car={car}/>
  ))}
  </>
)}

// 차량관리 구조
const CarMain = () => {
  const {visible, setVisible, carList} = React.useContext(CarContext)
  const [registerVisible, setRegisterVisible] = useState(false)
  const onClickHandle = () =>{
    setVisible(!visible)
    console.log(visible)

  }
 useEffect(()=>{
   console.log(setVisible)
   console.log(visible)
 },[])

  return(
    <>
    <Box
      sx={{display: 'inline-flex',
      m: 1,
      p: 1,
      justifyContent:'space-around',
      border: '1px solid'
    }}
    >
      <Typography
        variant='h6'
        lineHeight='3'
      >
       차량 관리
      </Typography>
      <Button
        variant='contained'
        onClick={onClickHandle}
      >
        차량 등록
      </Button>
    </Box>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        p: 1,
        m: 1,
        border: '1px solid',
      }}
    >    
     <Grid item xs={12} sx={{border: '1px solid'}} >
    {visible ? <CarRegister/>:''}
      </Grid>
    </Box>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        p: 1,
        m: 1,
        border: '1px solid',

      }}
      >
        <Grid item xs={12} sx={{border: '1px solid'}} >
      { carList && carList.length === 0 ? <OpenCarState /> : <Typography>no data</Typography> }
        </Grid>
    </Box>
    </>
  )
}

export default CarMain
