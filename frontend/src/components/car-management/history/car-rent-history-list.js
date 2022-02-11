import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RentHistory from './car-rent-history';
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
import { carContext } from '../carContext';

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
  res_end_valid:false,
  res_drive_valid:false,
  res_door_on:false,
  }

const RentSummary = ({list})=>{
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  useEffect(()=>{
    setItems(list.res_info_seq)
  },[])

  const onClickBtn = () =>{
    setOpen(!open)
  }

  return(
    <>
    <Box sx={{display:'flex'}}>
      <Grid
        item xs={6} key={list.res_info_seq}
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
            이용번호 : {list.res_info_seq}
          </Typography>
          <Typography
            textAlign="center"
            color="textPrimary"
            gutterBottom
            variant="body1"  
          >
            사용시간:{list.res_realtime}분
            이용요금:{list.res_rate}원
          </Typography>
        </Grid>

        <Grid itme xs={6}
          display='flex'
          direction='column'
          justifyContent='center'
          >
        <Typography>
            이용상태 : {list.res_end_valid? '이용중': '이용완료'}
          </Typography>
          
        <Button
        justifyContent='center' 
        onClick={onClickBtn} 
        >
          자세히보기
        </Button>
          </Grid>

    </Box>
        <Box>
          {open?<RentHistory
          key={list.res_info_seq}
          list={list}
          />:''}
        </Box>
    </>
    )
  }
const RentHistoryList = ({carId}) =>{
  const {list, setList, rentSendConfirm} = useContext(carContext)
  // const {car_res_seq, res_rate} = props
  

  useEffect(()=>{
    setList([dump])
  },[rentSendConfirm])

  const option = {
    url:`http://localhost:8001/api/car/${carId}/history`,
    method:'GET',
    headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
    }
  const getList = async() =>{
    try{
      const response = await axios(option)
      console.log(response.data)
      await setList([response.data])
    }catch(err){
      console.log(err)
    }
  }

  // useEffect(()=>{
  //   getList()
  // },[])

  return(
    <>
    <Box
      xs={{display:'flex',
    }}
    >
      {list.map(data => (
        <RentSummary
          key={data.res_info_seq}
          list={data}
        />
      ))}
    </Box>
    </>
  )
}

export default RentHistoryList