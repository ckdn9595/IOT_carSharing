import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RentHistoryList from '../history/car-rent-history-list';
import RentPeriod from '../period/car-rent-period';
import Insurance from '../insurance/insurance';
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

// 차량정보수정
// 차량 정보 보는 페이지
// 수정 삭제
// 버튼은 
const dump = {
  car_name:'good car',
  car_kind:'sonata',
  car_year:'2021',
  car_pic: {
    pic_out:['img','img2'],
    pic_in:[''],
    },
  car_intro:'',
}
const CarState = () =>{
  const [data, setData]= useState({})
  const [time, setTime] = useState(false)
  const [history, setHistory] = useState(false)
  const [insurance, setInsurance] = useState(false)

  const carId = 'prop.users_car'
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
      setData(response.data)
    } catch (error){
      alert('error!')
    }
  }
  const delData = async() =>{
    try{
      // const response = await axios({
      //   url =`http://localhost:3000/api/car/${carId}/info`,
      //   method:'GET',
      // })
      const response = await axios.delete(
        url =`http://localhost:3000/api/car/${carId}/info`
        )
      console.log(response.data)
      setData(response.data)
    } catch (error){
      alert('error!')
    }
  }

  
  return(
    <>
      <Grid>
        <Grid>
          차종
          차량번호
        </Grid>
        <Grid>
        <Button 
            variant="contained"
            color="secondary"
            onClick={()=>{delData}}

          >
            차량삭제
        </Button>
        </Grid>
        <Grid>
        </Grid>
        <Button 
            variant="contained"
            color="primary"
            onClick={()=>{setInsurance(!insurance)}}
          >
            보험가입
        </Button>
        <Button 
            variant="contained"
            color="primary"
            onClick={()=>{setTime(!time)}}
          >
            임대기간 설정
        </Button>
        <Button 
            variant="contained"
            color="primary"
            onClick={()=>{setHistory(!history)}}
          >
            이용내역 보기
        </Button>
        {insurance? <Insurance/>:''}
        {time? <RentPeriod/>:''}
    {history? <RentHistoryList/>:''}
      </Grid>
    </>

  )
}

export default CarState