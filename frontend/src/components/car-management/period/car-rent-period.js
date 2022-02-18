import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@mui/material';
import RentPeriodSet from './car-rent-period-set';
import { getDate } from 'date-fns';
import { CarContext } from '../carContext';
import { API_BASE_URL } from 'src/config';

// 차량 이용 기간 설정
const RentPeriod = ({carId, car}) =>{
  const [visible, setVisible] = useState(false)
  const [settingTime, setSettingTime] = useState([])
  const [date, setDate] = useState()
  const [visibleDate, setVisibleDate] = useState([])
  
  const {
    token,
  } = useContext(CarContext)

    const onClickEvent= () =>{
      setVisible(!visible)
    }

  const option = {
    // url:`http://localhost:8001/api/car/${carId}/time`,
    url:`${API_BASE_URL}/car/${carId}/time`,
    method:'GET',
    headers:{ Authorization: token },
    }


  //api 조회해서 데이터 가져오는 함수
  // 세팅타임에 시간을 가져오고
  // 문자열로 변경하는 데이터를 만들어서 출력한다
  const getDate = async() => {
    try{
      const response = await axios(option)
      const data = await response.data
      setDate(data)
      console.log('date', data)
      // console.log('respose',response.data)

    }catch(err){
      console.log(err)
      console.log('setting',settingTime)
      console.log('시간',visibleDate)
      }
  }
  
  const dateChange = (date) =>{
    let year = date.getFullYear()
    let month = date.getMonth()+1 //1월 === 0
    let day = date.getDate()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    if (minutes<10){minutes='0'+minutes} if (hour<10){hour='0'+hour} 
    year = year.toString()
    month = month.toString()
    day = day.toString()
    hour = hour.toString()
    minutes = minutes.toString()
    const result = {year,month,day,hour,minutes}
    return result 
  }

  // 페이지 불러올 때 날짜를 문자열로 전환
  // settingtime은 불러온값, visibledate는 표시할 값
  useEffect(() => {
    getDate()
    if(date && date.car_res_date_start === undefined){
      const start = new Date()
      const end = new Date()
      setSettingTime([start,end])
      setVisibleDate([dateChange(start),dateChange(end)])
    }else{
      const start = new Date()
      const end = new Date()
      date && date.car_res_date_start? start = new Date(date.car_res_date_start):''
      date && date.car_res_date_end? end = new Date(date.car_res_date_end):''
    
      setSettingTime([start,end])
      setVisibleDate([dateChange(start),dateChange(end)])
    }
    // dateChange(start)
  }, [])

  return(
    <>
    <Box
        display='flex'

        sx={{
          p:1,
          flexDirection:'column',
          alignItems:'center',
        }}
    >
      <Grid item
            sx={{
                  border:'1px solid',
                  p:1,
                  m:1
          }}           
      >
          임대 기간 : {visibleDate.map(date=>( <Typography>{date.year}년 {date.month}월 {date.day}일 {date.hour}시 {date.minutes}분</Typography>))}
      </Grid>
      <Grid>
    <Button
      variant='contained'
      onClick={onClickEvent}
      > 시간 설정 하기</Button>
      </Grid>
    {visible ? <RentPeriodSet settingTime={settingTime} setSettingTime={setSettingTime} setVisible={setVisible} carId={carId} car={car} visibleDate={visibleDate} />:''}
    </Box>
    
    </>

  )
}

export default RentPeriod