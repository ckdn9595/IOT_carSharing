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



const DriveOn = () => {
  const {resInfo, setResInfo,
        resCheckList, setResCheckList,
        resResPicture, setResPicture,
        resCarInfo, setResCarInfo,
        doorOpen, setDoorOpen,

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
          border:'solid 1px',
          flexDirection:'column',
          p: 1,
            }}
      >
        <Grid
          sx={{display:'flex',
          border:'1px solid',
          alignItems:'center',
          flexDirection:'column',
          }}
        >
        <CardHeader
          title="실시간 이용정보"
          subheader={ 1 &&2?'예약정보':'예약번호'}
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
                  <ListItemText primary={`차량번호 : ${resInfo.res_info_seq}`}/>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                  <AccessTimeIcon/>
                  <ListItemText primary={`이용시간 : ${resInfo.res_date_start}`}/>
                  <ListItemText primary={`${resInfo.res_date_end}`}/>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                  <ArrowForwardIcon />
                  <ListItemText primary={`입력받을데이터 : ${resInfo.car_seq}`}/>
                  {/* 차량정보가저오기 */}
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                  <ArrowForwardIcon />
                  <ListItemText primary={`이용요금 : ${resInfo.res_rate}`}/>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                  <PersonIcon />
                  <ListItemText primary={`차량주인 : ${resInfo.res_info_seq}`}/>
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
      {payOpen === true? <DriveEndCheck payOpen={payOpen} setPayOpen={setPayOpen} />:''}
    </Container>
  )
}

export default DriveOn