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
  carName:'good car',
  carKind:'sonata',
  carYear:'2021',
  carPic: {
    pic_out:['img','img2'],
    pic_in:[''],
    },
  carIntro:'',
}
const CarState = (props) =>{
  const [data, setData]= useState({})
  const [time, setTime] = useState(false)
  const [history, setHistory] = useState(false)
  const [insurance, setInsurance] = useState(false)

  // const carId = prop.users_car
  // const getData = async() =>{
  //   try{
  //     // const response = await axios({
  //     //   url =`http://localhost:3000/api/car/${carId}/info`,
  //     //   method:'GET',
  //     // })
  //     const response = await axios.get(
  //       url =`http://localhost:3000/api/car/${carId}/info`
  //       )
  //     console.log(response.data)
  //     setData(response.data)
  //   } catch (error){
  //     alert('error!')
  //   }
  // }
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
  useEffect(()=>{
    setData(props.car)
  },[])
  
  return(
    <>
    <Box container
      sx={{display:'flex',
          border:'1px solid',
          flexDirection:'column',
          alignItems:'center',
          }}
    >
      <Box 
        sx={{ display:'flex',
              m: 1,
              justifyContent:'space-between',
              border: '1px solid'
        }}
      >
          <Typography
            variant='h6'
            lineHeight={5}
          > 차량사진 </Typography>
          <Box sx={{display:'flex',
                    flexDirection:'column',
                    border:'1px solid',
                    alignItems:'center'
                    }}>

          <Typography>
            차종입니다  {data.carKind}
          </Typography>
          <Typography>
            차량번호입니다 {data.carYear}
          </Typography>
          </Box>
        <Box>
        <Button 
            variant="contained"
            color="secondary"
            onClick={()=>{delData}}
            >
            차량삭제
        </Button>
        <Typography>
          임대상태
        </Typography>
        </Box>
      </Box>

      <Box
        sx={{display:'flex',
        flexDirection: 'column',
      
      }}
      >
      <Grid
        sx={{display: 'flex',     
            border:"1px solid",
            alignItems: 'flex-start',
            p: 1,
            justifyContent:'center',
            }}
      >
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
        </Grid>
        <Grid item xs={12}>

        {insurance? <Insurance/>:''}
        {time? <RentPeriod/>:''}
        {history? <RentHistoryList/>:''}
        </Grid>
    </Box>
    </Box>
    </>

  )
}

export default CarState