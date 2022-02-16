import React, { useState, useEffect, useContext } from 'react';
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
import { CarContext } from '../carContext';

// 차량 이용 기간 설정
const RentPeriodSet = (props) =>{
  const {settingTime, setSettingTime, setVisible, carId, car, visibleDate,} = props
  const {token, sendSuccess, setSendSuccess
  } = useContext(CarContext)
  

  const [startDate, setStartDate] = useState(settingTime[0])
  const [endDate, setEndDate] = useState(settingTime[1])
  const [start, setStart] = useState({})
  const [end, setEnd] = useState({})

  // setStart({
  //   year: startDate.getFullYear(),
  //   month: startDate.getMonth()+1,
  //   day: startDate.getDate(),
  //   hours: startDate.getHours(),
  //   minutes: startDate.getMinutes(),
  // })
  // setEnd({
  //   year: endDate.getFullYear(),
  //   month: endDate.getMonth()+1,
  //   day: endDate.getDate(),
  //   hours: endDate.getHours(),
  //   minutes: endDate.getMinutes(),
  // })
  
  const submitDate = () =>{
    
  }
  
  //carid 받아서 time으로 넘기면된다
  const option = {
    // url:`http://localhost:8001/api/car/${carId}/time`,
    url:`https://i6a104.p.ssafy.io/api/car/${carId}/time`,
    method:'PATCH',
    headers:{ Authorization: token },
    data:{car_res_date_start: startDate, car_res_date_end: endDate}
    }

  const onClickEvent =  async () =>{
    try{
      const response = await axios(option)
      // setSettingTime([start, end])
      setVisible(false)
      setSendSuccess(!sendSuccess)
    }catch(err){
      console.log(err)
      console.log('dateset',startDate,endDate)
      alert('전송실패')
      }
  }

  useEffect( () =>{
    startDate > endDate ?  setEndDate(startDate) : ''
  },[startDate])

  return(       
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
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
              }}
              />
            </Grid>
          <Grid container 
                sx={{
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