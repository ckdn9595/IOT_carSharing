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

const dump = [
    {
    year: 2022,
    month: 1,
    day: 30,
    hours: 3,
    minutes: 12
    },
    {
    year: 2022,
    month: 3,
    day: 31,
    hours: 15,
    minutes: 22
    }
]

// 차량 이용 기간 설정
const RentPeriod = ({carId}) =>{
  const [visible, setVisible] = useState(false)
  const [settingTime, setSettingTime] = useState(dump)
  const {token} = useContext(CarContext)

  const option = {
    url:`http://localhost:8001/api/car/27/time`,
    method:'GET',
    headers:{token},
    }

  const onClickEvent= () =>{
    setVisible(!visible)
  }

  const getDate = async() => {
    try{
      const response = await axios(option)
      setSettingTime(response.data)
    }catch(err){
      console.log(err)
      }
  }

  useEffect(() => {
    getDate()
  }, [settingTime])

  const {year} = settingTime[0]
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
          임대 기간 : {settingTime.map(date=>( <Typography>{date.year}년 {date.month}월 {date.day}일 {date.hours}시 {date.minutes}분</Typography>))}
      </Grid>
      <Grid>
    <Button
      variant='contained'
      onClick={onClickEvent}
      > 시간 설정 하기</Button>
      </Grid>
    {visible ? <RentPeriodSet setSettingTime={setSettingTime} setVisible={setVisible} carId={carId} />:''}
    </Box>
    
    </>

  )
}

export default RentPeriod