import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DatePicker, DateTimePicker, StaticDatePicker } from '@mui/lab';
import { 
  TextField, 
  Grid, 
  ProductCard, 
  Wrapper, 
  Box, 
  Container, 
  Button,
  Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { start } from 'nprogress';

// 차량 이용 기간 설정
const RentPeriodSet = ({setVisible}) =>{
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  // 자식에서 부모한테 보내기 설정
  // const [visible, setVisible ] = useState(false)
  let start = {
    year: startDate.getFullYear(),
    month: startDate.getMonth(),
    date: startDate.getDate(),
    hours: startDate.getHours(),
    minutes: startDate.getMinutes(),
  }
  let end = {
    year: endDate.getFullYear(),
    month: endDate.getMonth(),
    date: endDate.getDate(),
    hours: endDate.getHours(),
    minutes: endDate.getMinutes(),
  }
  
  let startMessage  = `${start.year}년 ${start.month+1}월${start.date}일${start.hours}시${start.minutes}분`
  let endMessage  = `${end.year}년 ${end.month+1}월${end.date}일${end.hours}시${end.minutes}분`
  
  const carId = ''
  const option = {
    url :`http://localhost:3000/api/car/${carId}/time`,
    method:'POST',
    data: [start, end],
    }
    
  const onClickEvent = async () =>{
    try{
      const response = await axios(option)
      setVisible(false)
      console.log(visible,'asas')
    }catch(err){
      console.log(err)
      alert('전송실패')


      }
  }


  // const handleChange = (event)=>{
  //   setStartDate(event.value)

  // }


  useEffect( () =>{
    startDate > endDate ?  setEndDate(startDate) : ''
  },[startDate])

  return(       
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container>
          <Grid container bgcolor="info.main" justify="center">
            <DateTimePicker
              renderInput={(props) => <TextField {...props}/>}
              label="rentpossible"
              value={startDate}
              inputFormat="yyyy/MM/dd hh:mm a"
              onChange={(newValue)=> {
                setStartDate(newValue)
                console.log(startDate)
              }}
              />
          </Grid>
          <Grid item xs={6}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props}/>}
              label="종료시간"
              value={endDate}
              minDateTime={startDate}
              inputFormat="yyyy/MM/dd hh:mm a"
              onChange={(newValue)=> {
                setEndDate(newValue)
                console.log(endDate)
              }}
              />
            </Grid>
          <Grid container direction="column">
            <Typography
              variant="h6"
            >
              시작날짜 : {startMessage}
            </Typography>
            <Typography
              variant="h6"
            >
              종료날짜 : {endMessage}
            </Typography>
          </Grid>
          <Button 
            variant="contained"
            color="primary"
            onClick={onClickEvent}
            className='confirm-button'
          >
              확인
          </Button>

          <Button 
            variant="contained"
            color="primary"
            onClick={()=>{setVisible(false)}}
            className='cancel-button'

          >
            취소
          </Button>

        </Container> 
      </LocalizationProvider>
  )
}

export default RentPeriodSet