import React, { useState, useEffect, useContext } from 'react';
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
import { CarContext } from '../CarContext';
import { Filter } from '@mui/icons-material';
import ReviewList from '../review/review-list';

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
const CarState = ({car}) =>{
  const [data, setData]= useState({})
  // const [time, setTime] = useState(false)
  // const [history, setHistory] = useState(false)
  // const [insurance, setInsurance] = useState(false)
  // const [insuranceCheck, setInsuranceCheck] = useState(false)
 const {time, setTime,
        history, setHistory,
        insurance, setInsurance,
        register, setRegister,
      } = useContext(CarContext)
  useEffect(()=>{
    setData(car)
  },[])
  const option = {
    url:`http://localhost:8001/api/car/${car.carId}`,
    method:'DELETE',
    headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
    }

  // const delButton = async() =>{
  //   try{
  //     // const response = await axios(option)
  //     await setRegister(register.filter(car => car.carNum !== data.carNum))
  //   } catch (error){
  //     alert('error!')
  //   }
  // }
  const delButton = ()=>{
    setRegister(register.filter(car => car.carNum !== data.carNum))
  }

  
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
            차종입니다  {car.carModel}
          </Typography>
          <Typography>
            차량번호입니다 {car.carYear}
          </Typography>
          </Box>
        <Box>
        <Button 
            variant="contained"
            color="secondary"
            onClick={delButton}
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
        {car.rentInsurance === true? <Typography>보험가입완료</Typography>:     
          <Button 
            variant="contained"
            color="primary"
            onClick={()=>{setInsurance(!insurance)}}
          >
            보험가입
        </Button>}
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

        {insurance? <Insurance carId={car.carId} />:''}
        {time? <RentPeriod carId={car.carId} />:''}
        {history? <RentHistoryList carId={car.carId} />:''}
        </Grid>
        {/* <Button 
            variant="contained"
            color="primary"
            onClick={()=>{setHistory(!리뷰)}}
          >
        </Button> */}
        {history? <ReviewList carId={car.carId}/>:""}
    </Box>
    </Box>
    </>

  )
}

export default CarState