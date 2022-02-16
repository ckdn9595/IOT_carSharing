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
  Chip,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,

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
  ListItemText,
} from '@mui/material';
import { CarContext } from '../carContext';
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
        alert, setAlert,
        token
      } = useContext(CarContext)
  useEffect(()=>{
    setData(car)
    console.log('차량상태',car)
    getSegment()
    getRentOn()
  },[])

  // 하나식 가져와야할 데이터 api/car/info ${carId}
  // const option = {
  //   url:`http://localhost:8001/api/car/register`,
  //   method:'GET',
  //   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
  //   }
  // const getData = async() =>{
  //   try{
  //     const response = await axios(option)
  //     setData(response.data)
  //   }catch(err){
  //     console.log(err)
  //   }
  // }

  // const delButton = async() =>{
  //   try{
  //     // const response = await axios(option)
  //     await setRegister(register.filter(car => car.carNum !== data.carNum))
  //   } catch (error){
  //     alert('error!')
  //   }
  // }
  const [segment, setSegment] = useState('')
  const [rentOn, setRentOn] = useState('')

  const getSegment = () =>{
    switch(car.car_segment){
      case 1: setSegment('경차')
      break
      case 2: setSegment('중형')
      break
      case 3: setSegment('SUV')
    }
  }
  const getRentOn= ()=>{
    // res_end_valid === 'Y'? setRentOn('대여 가능'):setRentOn('대여중')
    1===1? setRentOn('대여 가능'):setRentOn('대여중')
    
  }
  const [delOpen, setDelOpen] = useState(false)
  const delButton = async() =>{
    const option = {
    url:`http://localhost:8001/api/car/register`,
    method:'DELETE',
    headers:{token},
    }
    try{
      const response = await axios(option)
      setData(response.data)
      setDelOpen(false)
    }catch(err){
      console.log(err)
      setDelOpen(false)

    }
  }
  
  return(
    <>
    <Card container
      sx={{
        diplay:'flex',
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        p: 1,
          }}
    >
      <Container
        sx={{ display:'flex',
              justifyContent:'space-between',
              border: '1px solid',
              minWidth:'100%'
        }}
      >
        <Grid item>

          <Typography
            variant='h6'
            lineHeight={5}
            > 차량사진 </Typography>
        </Grid>
          <Grid sx={{display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    minwidth:'40%',
                    p:1,
                    }}>

          <Typography>{car.car_model} / {car.car_year}</Typography>
          <Typography variant='h6'>{car.car_num}</Typography>
          <Chip label={segment} variant="outlined" />
          </Grid>
        <Box
          sx={{
            display:'flex',
            p:1,
            gap:1,
            alignItems:'center',
            flexDirection:"column",
          }}
        
        >
        <Button 
            variant="contained"
            color="error"
            onClick={()=>{setDelOpen(true)}}
            >
            차량삭제
        </Button>
        {/* 차량삭제 모달 */}
        <Dialog
        open={delOpen}
        onClose={()=>{setDelOpen(false)}}
      >
        <DialogTitle>
          {'등록된 차량을 지웁니다'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText >
            등록된 차량을 정말로 삭제하시겠습니까? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={delButton} autoFocus>
            확인
          </Button>
          <Button onClick={()=>{setDelOpen(false)}}>취소</Button>
        </DialogActions>
      </Dialog>
        {rentOn ==='임대중'?<Chip label={rentOn} color='primary'/>:<Chip label={rentOn} variant="outlined"/> }
        </Box>
      </Container>

      <Box
        sx={{display:'flex',
        flexDirection: 'column',
      
      }}
      >
      <Grid
        sx={{display: 'flex',     
            alignItems: 'flex-start',
            p: 1,
            justifyContent:'center',
            }}
      >
        {car.car_rent_insurance_yn === 'Y'? <Button variant='text'>보험가입완료</Button>:     
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
            onClick={()=>{setTime(!time), setHistory(false)}}
          >
            임대기간 설정
        </Button>
        
        <Button 
            variant="contained"
            color="primary"
            onClick={()=>{setHistory(!history), setTime(false)}}
          >
            이용내역 보기
        </Button>
        </Grid>
        {time? <RentPeriod carId={car.car_num} />:''}
        {history? <RentHistoryList carId={car.car_num} />:''}
        {/* <Button 
            variant="contained"
            color="primary"
            onClick={()=>{setHistory(!리뷰)}}
            >
          </Button> */}
        {/* {history? <ReviewList carId={car.car_num}/>:""} */}
    </Box>
    </Card>
        {insurance? <Insurance carId={car.car_num} />:''}

    </>

  )
}

export default CarState