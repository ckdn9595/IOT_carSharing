import React, { useState, useEffect } from 'react';
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
const RentPeriod = () =>{
  const [visible, setVisible] = useState(false)
  const [settingTime, setSettingTime] = useState(dump)

  // const option = {
  //   url =`http://localhost:3000/api/car/${carID}/time`,
  //   method:'GET',
  //   data:{

  //   }
  // }
  // let start = {
  //   year: visible.start.getFullYear(),
  //   month: visible.start.getMonth(),
  //   date: visible.start.getDate(),
  //   hours: visible.start.getHours(),
  //   minutes: visible.start.getMinutes(),
  // }
  // let end = {
  //   year: visible.end.getFullYear(),
  //   month: visible.end.getMonth(),
  //   date: visible.end.getDate(),
  //   hours: visible.end.getHours(),
  //   minutes: visible.end.getMinutes(),
  // }

  const onClickEvent= () =>{
    setVisible(!visible)
  }

  const getDate = async() => {
    try{
      const response = await axios(option)
      setSettingTime(response.data)
    }catch(err){
      alert('no data')
      console.log(settingTime)
      }
  }

  useEffect(() => {
    getDate()
  }, [settingTime])

  const {year} = settingTime[0]
  return(
    <>
    <Grid>
      <Grid>
        <Typography>
          임대 가능 상태
          {year}
        </Typography>
      </Grid>
      <Grid>
    <Button
      variant='contained'
      onClick={onClickEvent}
      > 시간 설정 하기</Button>
      </Grid>

    </Grid>
      



    {visible ? <RentPeriodSet setVisible={setVisible} />:''}
    </>

  )
}

export default RentPeriod