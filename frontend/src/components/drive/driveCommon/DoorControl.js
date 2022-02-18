import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
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
  Chip,
} from '@mui/material';
import { DriveContext } from '../DriveContext';
import { API_BASE_URL } from 'src/config';

// 문 제어
const DoorControl = () => {
  const {resInfo, setResInfo,
   resCarInfo, setResCarInfo,
   doorOpen, setDoorOpen,
  
  } = useContext(DriveContext)

  const [door, SetDoor]= useState({door:''})

  const carId = resInfo.car_seq
  
  // const getResInfo =()=>{
    //   setResInfo(resInfo)
    // }
    // const getResCarInfo =()=>{
      //   setResInfo(resCarInfo)
      // }
      // useEffect(()=>{
        //   getResInfo()
        // },[resInfo])
        
        // useEffect( ()=> {
          //   getResCarInfo()
          // },[resCarInfo])
          
          const doorOpens = async ()=>{
            SetDoor({door:"open"})
            const option = {
              url:`https://i6a104.p.ssafy.io/api/mqtt/${carId}/control`,
              // url:`${API_BASE_URL}/mqtt/${carId}/control`,
              method:'GET',
              headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
              body:{door:"open"}
              }
              try{
                const response = await axios(option)
                console.log(response)
              }catch(err){
                console.log(err)
              }
            }
            const doorCloses = async ()=>{
              SetDoor({door:"close"})
              const option = {
                url:`https://i6a104.p.ssafy.io/api/mqtt/${carId}/control`,
                // url:`${API_BASE_URL}/mqtt/${carId}/control`,
                method:'GET',
                headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
                body:{door:"close"}
                }
              
              try{
                const response = await axios(option)
                console.log(response.data)
              }catch(err){
                console.log(err)
              }
            }
            
            const doorStatus = async()=>{
  const response = await door
  await setDoorOpen(response)
}
useEffect(()=>{
  doorStatus()
  console.log('door update')
},[door])

  return(
    <Grid
      sx={{
        display:'flex',
        flexDirection:'column'
    }}
    >
      <Grid
        sx={{
          display:'flex',
          justifyContent:'center',

        }}
      >
      <Typography sx={{fontWeight:'bold'}}>자동차 문 제어</Typography>
      </Grid>
      <Grid
        sx={{
          display:'flex',
          justifyContent:'center',
        }}
      >
        <Button onClick={doorOpens}>문 열기</Button>
        <Button onClick={doorCloses}>문 잠금</Button>
      </Grid>
        {doorOpen === 'open'?  <Chip label="차문 열림" color="primary"/> : <Chip label="차문 닫힘" color="primary" variant="outlined"/>}
    </Grid>
  )
}

export default DoorControl