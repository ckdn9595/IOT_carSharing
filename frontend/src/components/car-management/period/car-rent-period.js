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

// 차량 이용 기간 설정
const RentPeriod = () =>{
  // const [차량이용기간, set] = useState()

  // const option = {
  //   url =`http://localhost:3000/api/car/${carID}/time`,
  //   method:'GET',
  //   data:{

  //   }
  // }

  // useEffect( () =>{
  //   const fetch = async () => {
  //     try{
  //       const response = await axios(option)
  //       console.log(response.data)
  //     }catch(err){
  //       console.log(err)
  //     }
  //   }
  //   fetch()

  // },[])

  return(
    <div>
      <p>차량 이용기간 보기</p>
      <Button value='설정하기'/>
      <RentPeriodSet/>
    </div>
  )
}

export default RentPeriod