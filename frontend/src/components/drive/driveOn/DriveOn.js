import axios from 'axios'
import React, { useContext, useEffect, useRef, useState} from 'react'
import { DriveContext } from '../DriveContext';
import DriveState from './DriveState'
import DriveEndCheck from './DriveEndCheck';
import { 
  Box, 
  Grid,
  Container, 
  Typography, 
  TextField, 
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
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
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,

} from '@mui/material';
import DoorControl from '../driveCommon/DoorControl';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaidIcon from '@mui/icons-material/Paid';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { set } from 'nprogress';


const DriveOn = () => {
  const {resInfo, setResInfo,
        resCheckList, setResCheckList,
        resResPicture, setResPicture,
        resCarInfo, setResCarInfo,
        doorOpen, setDoorOpen,
        endDay, startDay,

        resDump, resCarDump,
        } = useContext(DriveContext)
  const [driveNow, setDriveNow] = useState('default')
  const [fare, setFare] = useState(0)
  const [payOpen, setPayOpen] = useState(false) 
  // const getResInfo =()=>{
  //   setResInfo(resDump)
  // }
  // const getResCarInfo =()=>{'
  //   setResCarInfo(resCarDump)
  // }
  // useEffect(()=>{
  //   setResInfo(resDump)
  //   setResCarInfo(resCarDump)
  //   getFare()
  // },[])

  // useEffect(()=>{
  //   // getResInfo()
  //   // getDriveNow()
  //   console.log('운행상태',driveNow,resInfo.res_end + resInfo.res_drive_valid)
  // },[resInfo])

  // useEffect(()=> {
  //   // getResCarInfo()
  //   // getFare()
  // },[resCarInfo])

  const doorStatus = async()=>{
    const response = await doorOpen
    await setDoorOpen(response)
  }
  useEffect(()=>{
    doorStatus()
    console.log('doorstatus')
  },[])



  const getDriveNow = () =>{
    switch(resInfo.res_end ==='n'|| resInfo.res_drive_valid ==='n'){
      case(''):
      setDriveNow('정지')
      break;
      case(true):
      setDriveNow('주행중')
      break
      case(false):
      setDriveNow('운행종료')
      break
    }
  }
  

  //차량의 정보가저옵니다
  // const option = {
  //   url:`http://localhost:8001/api/car/아이디/예약정보`,
  //   method:'GET',
  //   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
  //   }
  // const optionCar = {
  //   url:`http://localhost:8001/api/car/아이디/예약정보`,
  //   method:'GET',
  //   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
  //   }

  const getCarState = async() =>{
    // const response = await axios(option)
    // await setResCarInfo(response)
    // await setResCarInfo(resCarDump)
  }

  // const getResData = async() =>{
  //   const response = await axios(option)
  //   console.log(response.data)
  //   setResInfo(response.data)
      //  const responseCar = await axios(optionCar)
      //  setResCarinfo(responseCar.data)
  // }


  // const onSubmit = async() =>{
  //   try{
  //     setRegister(register.concat(inputs))
  //     // const response = await axios(option)
  //     // console.log(response.data)
  //     setVisible(false)
  //   }catch(err){
  //     setVisible(false)
  //     }
  // }


  // 이용시간구하기
  let today = new Date()

  // 날짜 문자로바꾸기
  const dateChange = (d) =>{
    let date = new Date(d)
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
  const temp = ()=>{
    let a = dateChange(today)
    let b = startDay
    let a_hour = Number(a.hour)
    let a_minutes = Number(a.minutes)
    let b_hour = Number(b.hour)
    let b_minutes = Number(b.minutes)
    let x = (a_hour+12-b_hour)*60 + (a_minutes- b_minutes)
    // console.log(resInfo)
    // console.log(resCarInfo)
    return x+1
  }
  const tempRate = ()=> {
    let time = temp()
    let rate = resCarInfo.car_rate
    return time* rate
  }

  const [rateRef, setRateRef] = useState(tempRate())
  const [timeRef, setTimeRef] = useState(temp())
  const [counter, setCounter] = useState(10)
  const time_ref =useRef(temp())
  const rate_ref = useRef(tempRate())
  const counter_ref = useRef(6)

useEffect(()=>{
  setInterval( () => {
    setTimeRef(time_ref.current)
    setRateRef(rate_ref.current)
    rate_ref.current += resCarInfo.car_rate
    // rate_ref.current += parseInt(resCarInfo.car_rate/6)
    time_ref.current += 1
    
    // counter_ref.current -= 1
    // if (counter_ref.current ===0){
    //   counter_ref.current = 6

    // }
    return () => clearInterval(rate_ref), clearInterval(time_ref)
  }, 60000)

},[])


  return (
    <Container
      sx={{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
      }}
    >
      <Card
        sx={{
          diplay:'flex',
          width: '500px',
          bgcolor: 'background.paper',
          border: '3px solid #5F87E1',
          flexDirection:'column',
          borderRadius:'7px',
          p: 1,
            }}
      >
        <Grid
          sx={{display:'flex',
          border: '5px solid #9BC3FF',
          alignItems:'center',
          flexDirection:'column',
          borderRadius:'7px'
          }}
        >
        <CardHeader
          title="실시간 이용정보"
          subheader={`예약번호: ${resInfo.car_res_seq}`}
        />
        <Grid>

          <Button>
              문제신고
          </Button>
          <Button>
              고객센터
          </Button>
        </Grid>
          <Grid>
          <List>
            <ListItemButton>
              <ListItemIcon>
                  <DirectionsCarIcon />
                  <ListItemText primary={`차량번호 : ${resCarInfo.car_num}`}/>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <EventAvailableIcon/>
                  <ListItemText primary={`종료일자 : ${endDay.year}년 ${endDay.month}월 ${endDay.day}일 ${endDay.hour}시 ${endDay.minutes}분`}/>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                  <AccessTimeIcon/>
                  <ListItemText primary={`이용시간 : ${timeRef}분`}/>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LocalAtmIcon/>
                  <ListItemText primary={`이용요금 : ${rateRef}원`}/>
              </ListItemIcon>
            </ListItemButton>
            {/* <ListItemButton>
              <ListItemIcon>
                  <ArrowForwardIcon />
                  <ListItemText primary={`차량번호 : ${resCarInfo.car_num}`}/>
              </ListItemIcon>
            </ListItemButton> */}
            <ListItemButton>
              <ListItemIcon>
                <DirectionsCarIcon />
                  <ListItemText primary={`차종 : ${resCarInfo.car_model}`}/>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                  <LocalGasStationIcon />
                  <ListItemText primary={`연료타입 : ${resCarInfo.car_fuel}`}/>
              </ListItemIcon>
            </ListItemButton>
          </List>
            </Grid>
          <Grid>
            <DoorControl/>
            <Button> 결제수단 </Button>
            <Button onClick={()=>{setPayOpen(true)}}> 이용종료</Button>
          </Grid>
        </Grid>
      
      </Card>
      {payOpen === true? <DriveEndCheck payOpen={payOpen} setPayOpen={setPayOpen} rate={rateRef} time={timeRef} />:''}
    </Container>
  )
}

export default DriveOn