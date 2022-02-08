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
const CarMain = () =>{
  const [register, setRegister] = useState([])
  const [visible, setVisible] = useState(false)


  const getData = async() =>{
    try{
      // const response = await axios({
      //   url =`http://localhost:3000/api/car/${carId}/info`,
      //   method:'GET',
      // })
      const response = await axios.get(
        url =`http://localhost:3000/api/car/${carId}/info`
        )
      console.log(response.data)
      setRegister(response.data)
    } catch (error){
      console.log('등록된 차량이없스빈다.')
    }
  }

  useEffect( ()=> {
    getData()
  },[])


  const onClickHandle = () =>{
    setVisible(!visible)
  }



  return(
    <>
    <Button
      variant='contained'
      onClick={onClickHandle}
    >
      차량 등록
    </Button>
    {/* map */}
    {visible  ? <CarRegister setVisible={setVisible}/>:''}
    {register === ![] ?    <CarState/>:''}

    </>
  )
}

export default CarMain;
