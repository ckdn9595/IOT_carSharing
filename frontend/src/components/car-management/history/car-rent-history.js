import React, { useState, useEffect } from 'react';
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

// 자동차의 렌트한 이력 조회
// 자동차의 id값 prop
// 차주만 확인가능 하면 차주의 아이디prop
const dump = {
  car_res_seq:1,
  owner_seq:12,
  usr_seq:3,
  res_info_seq:1101,
  car_seq:1232,
  chat_seq:11,
  res_date:'2022-01-01-18:00 ~ 2022-01-02-14:00',
  res_realtime:600,
  res_rate:60000,
  res_img:'',
  res_check:'',
  res_pay_valid:true,
  res_end_valid:true,
  res_drive_valid:false,
  res_door_on:false,
  }
const RentHistory = (props) =>{
  const [clickOn, setClickOn] = useState(false)
  const [data, setData] = useState({})
  const [isDone, setIsDone] = useState(false)

  const carId = props.id
  const getData = async() =>{
    try{
      // const response = await axios({
      //   url =`http://localhost:3000/api/car/${carId}/history`,
      //   method:'GET',
      // })
      const response = await axios.get(
        url =`http://localhost:3000/api/car/${carId}/history`
        )
      console.log(response.data)
      setData(response.data)
    } catch (error){
    }
  }
  useEffect(()=>{
    getData()
    setIsDone(data.res_end_valid)
  },[])



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
      <Grid item  key={data.res_info_seq}
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
            이용 번호 :{data.res_info_seq}
          </Typography>
         <Typography
            color="textPrimary"
            variant="body1"
         >
            차 번호 :{data.car_seq}
          </Typography>
          <Typography>
            사용 시간 :{data.res_date}
          </Typography>
          <Typography>
            이동거리:{data.res_rate}
          </Typography>
         <Typography>
            이용요금 :{data.res_rate}
          </Typography>
      </Grid>
          <Typography>
            이용상황 : 이용완료!{}
          </Typography>
        <Button>
          이용완료 승인하기
        </Button>
        </Grid>
    </Box>
    </>
  )
}

export default RentHistory