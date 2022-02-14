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
} from '@mui/material';
import { DriveContext } from '../DriveContext';

// 문 제어
const DoorControl = () => {
  const {resInfo, setResInfo,
   resCarInfo, setResCarInfo } = useContext(DriveContext)

  const [door, SetDoor]= useState(0)

  // const option = {
  //   url:`http://localhost:8001/api/car/아이디/예약정보`,
  //   method:'',
  //   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
  //   body:,
  //   }
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

const doorOpen = async ()=>{
  SetDoor(1)
  try{const response = await axios(option)
  }catch(err){
    console.log(err)
  }
}
const doorClose = async ()=>{
  SetDoor(0)
  try{const response = await axios(option)
  }catch(err){
    console.log(err)
  }

}

  return(
    <div>
      <p>문 제어상태를 설정합니다.</p>
      <Button onClick={doorOpen}>문 열기</Button>
      <Button onClick={doorClose}>문 잠금</Button>
      <Typography>
        {door === 1? '문이 열였습니다':'문이 잠겨있습니다.'}
      </Typography>
    </div>
  )
}

export default DoorControl