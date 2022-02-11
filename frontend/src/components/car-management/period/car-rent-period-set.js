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
const RentPeriodSet = (props) =>{
  const {setSettingTime, setVisible, carId} = props

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  let start = {
    year: startDate.getFullYear(),
    month: startDate.getMonth()+1,
    day: startDate.getDate(),
    hours: startDate.getHours(),
    minutes: startDate.getMinutes(),
  }
  let end = {
    year: endDate.getFullYear(),
    month: endDate.getMonth()+1,
    day: endDate.getDate(),
    hours: endDate.getHours(),
    minutes: endDate.getMinutes(),
  }
  
  let startMessage  = `${start.year}년 ${start.month}월${start.day}일${start.hours}시${start.minutes}분`
  let endMessage  = `${end.year}년 ${end.month}월${end.day}일${end.hours}시${end.minutes}분`
  

  const option = {
    url:`http://localhost:8001/api/car/${carId}/time`,
    method:'PUT',
    headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
    data:{car_res_date_start: start, car_res_date_end: end}
    }

  const onClickEvent =  async () =>{
    try{
      const response = await axios(option)
      setSettingTime([start, end])
      setVisible(false)
    }catch(err){
      console.log(err)
      alert('전송실패')
      }
  }

  useEffect( () =>{
    startDate > endDate ?  setEndDate(startDate) : ''
  },[startDate])

  return(       
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
            sx={{border:'1px solid'}}  
        >
          <Grid item
            sx={{p:1,
                m:1,
                }}
          >
            <DateTimePicker
              renderInput={(props) => <TextField {...props}/>}
              label="시작시간"
              value={startDate}
              inputFormat="yyyy/MM/dd hh:mm a"
              onChange={(newValue)=> {
                setStartDate(newValue)
                console.log(startDate)
              }}
              />
          </Grid>
          <Grid item
            sx={{p:1,
                m:1,
                }}
          >
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
          <Grid container 
                sx={{
                    border:'1px solid',
                    justifyContent:'center',
                    }}
          >
          <Button 
            variant="contained"
            color="primary"
            onClick={onClickEvent}
            sx={{m:1}}
          >
              확인
          </Button>
          <Button 
            variant="contained"
            color="primary"
            onClick={()=>{setVisible(false)}}
            className='cancel-button'
            sx={{m:1}}

          >
            취소
          </Button>
          </Grid>
        </Box> 
      </LocalizationProvider>
  )
}

export default RentPeriodSet