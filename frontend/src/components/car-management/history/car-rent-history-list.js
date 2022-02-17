import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RentHistory from './car-rent-history';
import { 
  Box, 
  Grid,
  Chip,
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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { CarContext } from '../carContext';
import { maxWidth } from '@mui/system';
import { API_BASE_URL } from 'src/config';

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
  const {
    open, setOpen,
  
  } = useContext(CarContext)

  useEffect(()=>{
    setItems(list.res_info_seq)
  },[])

  // 받은 예약의 id값으로 예약의 상세내용을 조회합니다
  // renthistory로 예약정보를보내고
  // rentHistory에서는 이용완료가 되면 
  // 사용확인 값을 보낼 수있도록 합니다.

  // car_res_info로 들어가서 
  // const getHistoy = async() =>{
  //   // list.res_info_seq
  //   const option = {
  //     url:`${API_BASE_URL}/car/${carId}/history/`,
  //     method:'GET',
  //     headers:{ Authorization: token },
  //     }
  //   try{
  //     const response = await axios(option)
  //     console.log('성공', response.data)
  //     await setList([response.data])
  //   }catch(err){
  //     console.log(err)
  //   }
  // }

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
        sx={{
          p:1,
        }}

      >
          <Typography
            textAlign="center"
            color="textPrimary"
            gutterBottom
            variant="h6"
          >
            이용번호 : {list.res_info_seq}
          </Typography>
          <Grid item
            sx={{

              display:'flex',  
              justifyContent:'center',
              gap:1,
            }}>
            <Grid item>
              <Typography
                textAlign="center"
                >
                사용시간 
              </Typography>
              <Typography
                textAlign="center"
              >
                {list.res_realtime}분
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                textAlign="center"
                >
                이용요금
              </Typography>
              <Typography
                textAlign="center"
              >
              {list.res_rate}원
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid itme xs={6}
          display='flex'
          direction='column'
          justifyContent='center'
          alignItems='center'
          sx={{
            p:1,
            gap:1,
          }}
          >
            {/* 보임 상태바꾸기 */}
        <Typography>
          {list && list.res_end_valid? <Chip label="이용중" color="primary" />: <Chip label="이용완료" color="secondary" />}
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
  const {
    list, setList, 
    rentSendConfirm,
    token,
  } = useContext(CarContext)
  // const {car_res_seq, res_rate} = props
  

  useEffect(()=>{
    getHistoy()
  },[rentSendConfirm])

  //차량의 모든예약리스트를 불러옵니다
  // rentsummary로 모든 예약리스트의 아이디를 보냅니다
  const getHistoy = async() =>{
    // list.res_info_seq
    const option = {
      url:`${API_BASE_URL}/car/${carId}/history/`,
      method:'GET',
      headers:{ Authorization: token },
      }
    try{
      const response = await axios(option)
      console.log('성공', response.data)
      await setList([response.data])
      console.log(list.length)
      console.log(list)
    }catch(err){
      console.log(err)
      console.log('히스토리리스트 실패')
      console.log(list)
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
      {/* 보임상태 바꿔야함 */}
      {list[0] && list[0].car_seq !== undefined ? <Typography align='center'>임대한기록이 없습니다</Typography> : list.map(data => (
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