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
  SliderValueLabel,
} from '@mui/material';
import { CarContext } from '../CarContext';

const RentHistory = ({list}) =>{
  const [clickOn, setClickOn] = useState(false)
  const [content, setConTent] = useState({})
  const {SendConfirm, setSendConfirm} = useContext(CarContext)

  useEffect(()=>{
    setConTent(list)
  },[])
  const carId = content.car_res_seq
  const option = {
    url:`http://localhost:8001/api/car/${carId}/history`,
    method:'PUT',
    headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
    data: {res_end_valid : true,}
    }

  const sendConfirm = async () =>{
    setConTent({...content, res_end_valid:true})
    console.log(content)
    setSendConfirm(!SendConfirm)
  }
  // const sendConfirm = async () =>{
  //   try{
  //     const response = await axios(option)
  //     console.log(response.data)
  //   }catch(err){
  //     console.log(err)
  //   }
  // }

  return(
    <>
    <Box>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={3}    
      >
      <Grid item  key={content.res_info_seq}
        display='flex'
        justifyContent='center'
        direction='column'
      >
          <Typography
            textAlign="center"
            color="textPrimary"
            gutterBottom
            variant="h6"
          >          
            이용 번호 :{content.res_info_seq}
          </Typography>
         <Typography
            color="textPrimary"
            variant="body1"
         >
            차 번호 :{content.car_seq}
          </Typography>
          <Typography>
            사용 시간 :{content.res_date}
          </Typography>
          <Typography>
            이동거리:{content.res_rate}
          </Typography>
         <Typography>
            이용요금 :{content.res_rate}
          </Typography>
      </Grid>
          <Typography>
            {!content.res_end_valid? '이용중' : '이용완료'}
          </Typography>
        {!content.res_end_valid? <Button onClick={sendConfirm}>
          이용완료 승인하기
        </Button>:''}
        </Grid>
    </Box>
    </>
  )
}

export default RentHistory