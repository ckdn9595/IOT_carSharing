import axios from 'axios'
import React, { useContext, useEffect, useState} from 'react'
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
} from '@mui/material';
import DoorControl from '../driveCommon/DoorControl';


const DriveOn = () => {
  const {resInfo, setResInfo,
        resCheckList, setResCheckList,
        resResPicture, setResPicture,
        resCarInfo, setResCarInfo,

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
  useEffect(()=>{
    setResInfo(resDump)
    setResCarInfo(resCarDump)
    getFare()
  },[])

  useEffect(()=>{
    // getResInfo()
    // getDriveNow()
    console.log('운행상태',driveNow,resInfo.res_end + resInfo.res_drive_valid)
  },[resInfo])

  useEffect(()=> {
    // getResCarInfo()
    // getFare()
  },[resCarInfo])

  const getFare = ()=>{
    const countFare = resCarInfo.res_realtime * 100
    console.log(resCarInfo)
    setFare(countFare)
  }

  const getDriveNow = () =>{
    switch(resInfo.res_end ==='n'|| resInfo.res_drive_valid ==='n'){
      case(''):
      setDriveNow('정지')
      break;
      case(true):
      setDriveNow('운행중')
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



  return (
    <>
    <Typography>
      이용상황
    </Typography>
    <Box
      sx={{display:'flex',
      border:'1px solid',
      flexDirection:'column',
      alignItems:'center',
      }}
    >
      <Card>
        <CardHeader
          title="실시간 이용정보"
          subheader="예약번호"
        />
          <Button>
              문제신고
          </Button>
          <Button>
              고객센터
          </Button>
          <CardContent>
            <Typography>
              운행상태 :
              {driveNow}
            </Typography>
            <Typography>
              이용시간: 
              {resCarInfo.res_realtime}
            </Typography>
            <Typography>
              주행거리
              :데이터없음
            </Typography>
            <Typography>
              이용요금 : 원
              {/* {carInfo.car_rate}/원 */}
            </Typography>
            <Typography>
              실시간 이용요금 {fare}
            </Typography>
            <DoorControl/>
          </CardContent>
            <Button> 결제수단 </Button>
            <Button onClick={()=>{setPayOpen(true)}}> 이용종료</Button>
      </Card>
      {payOpen === true? <DriveEndCheck payOpen={payOpen} setPayOpen={setPayOpen} />:''}
    </Box>
    </>
  )
}

export default DriveOn