import React, { useState, useEffect } from 'react';
import CarState from './car-state';
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

const OpenCarState = (props) => {
  const {register} =props
return (
  <>
  {register.map(car =>(
  <CarState key={car.carNum} car={car}/>
  ))}
  </>
)}

const CarMain = () =>{
  const [register, setRegister] = useState([])
  const [visible, setVisible] = useState(false)

  // const getCarList = async() =>{
  //   const response = await axios.get(
  //     url = `http://localhost:8001/api/users/${carId}/info`
  //   )
  // }
  const getData = async() =>{
    try{
      // const response = await axios({
      //   url =`http://localhost:3000/api/car/${carId}/info`,
      //   method:'GET',
      // })
      // const response = await axios.get(
      //   url =`http://localhost:8001/api/car/${carId}/info`
      //   )
      // console.log(response.data)
      // setRegister(response.data)
      console.log(register)
    } catch (error){
      console.log('등록된 차량이없스빈다.')
    }
  }
  

  

  useEffect( ()=> {
    getData()

  },[register])


  const onClickHandle = () =>{
    setVisible(!visible)
  }


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
    {/* map */}
     <Grid item xs={12} sx={{border: '1px solid'}} >
    {visible  ? <CarRegister register={register} setRegister={setRegister}  setVisible={setVisible}/>:''}
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
      { 1 === 1? <OpenCarState register={register} /> : <Typography variant='h5' > 등록된 차량이 없습니다. </Typography> }
        </Grid>

    </Box>
    </>
  )
}

export default CarMain;
