import axios from 'axios'
import React, { useContext, useEffect, useState} from 'react'
import { DriveContext } from '../DriveContext';
import { 
  Box, 
  Grid,
  Container, 
  Typography, 
  TextField, 
  Button,
  Card,
  Chip,
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
  Modal,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NumbersIcon from '@mui/icons-material/Numbers';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import DoorControl from '../driveCommon/DoorControl';
import DriveCheckList from './DriveCheckList';
import DriveOn from '../driveOn/DriveOn';
import DriveEnd from '../driveEnd/DriveEnd';
import { API_BASE_URL } from 'src/config';


const DriveBefore = ({setModalStart}) => {
  const {
    resInfo, setResInfo,
    resCheckList, setResCheckList,
    resResPicture, setResPicture,
    resCarInfo, setResCarInfo,
    token,
    resDump, resCarDump,
    checkStart, setCheckStart,
    checkEnd, setCheckEnd,

    startDay,
    endDay,
    } = useContext(DriveContext)




//운행시작 버튼 운행시작알리기
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

//car_seq 통해서 차량정보가져오기

const [checkPicOpen, setCheckPicOpen] = useState(false)
const [checkOpen, setCheckOpen] = useState(false)

//onstart 시작정보 post로 보내기
// const optionCar = {
//   url:`http://localhost:8001/api/car/`,
//   method:'GET',
//   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
//   }

// 운행시작을 하면 체크스타트와 체크엔드가 모두 true가되어서 
// 운행시작전창은 안보인다
// 운행종료가 완료되면 체크스타트가 false가 된다


const onStart = () => {
  if (checkCheck === false){
    alert('점검리스트를 작성해주세요')
  }else{
    setCheckEnd(true)
    setModalStart(true)  
  }
  // 운행시작 api보내기
}

const [checkCheck, setCheckCheck] = useState(false)
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
        
        p: 1,
          }}
    >
      <Typography
        textAlign='center'
        variant='h5'
      
      > 예약 정보 </Typography>
      <Grid
        sx={{display:'flex',
        border:'1px solid',
        alignItems:'center',
        border: '3px solid #9BC3FF',
        }}
      >
      <Grid 
        xs={4}
        sx={{
          alignItems:"center",
          display:'flex',
          flexDirection:'column',
        }}
      >
        <Avatar
          variant="square"
          src={`/static/images/${resCarInfo.car_img}`}
          alt="car Images"
          sx={{
            width: '90%',
            height: '100%',
            border: '1px solid #9BC3FF',

            }}
        />
        {/* <Chip sx={{ width:'50%',}} label='차량위치찾기'/> */}
      </Grid>
      <Grid sx={{width:'50%'}}>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <NumbersIcon/>
                <ListItemText primary={`예약번호 : ${resInfo.res_info_seq}`}/>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
                <AccessTimeIcon/>
                <ListItemText secondary={`시작일자 : ${startDay.year}년 ${startDay.month}월 ${startDay.day}일 ${startDay.hour}시 ${startDay.minutes}분`}/>
                {/* <ListItemText primary={`${resInfo.res_info_end}`}/> */}
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
                <AccessTimeIcon/>
                <ListItemText secondary={`종료일자 : ${endDay.year}년 ${endDay.month}월 ${endDay.day}일 ${endDay.hour}시 ${endDay.minutes}분`}/>
                {/* <ListItemText primary={`${resInfo.res_info_end}`}/> */}
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ErrorOutlineIcon/>
                <ListItemText  primary={`차량번호 : ${resCarInfo.car_num}`}/>
                {/* resCarInfo.car_num */}
                {/* 차량정보가저오기 */}
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <DirectionsCarIcon />
                <ListItemText primary={`차량종류 : ${resCarInfo.car_model}`}/>
                {/* resCarInfo.car_model */}
            </ListItemIcon>
          </ListItemButton>
          {/* <ListItemButton> */}
            {/* <ListItemIcon> */}
                {/* <PersonIcon /> */}
                {/* <ListItemText primary={`차량주인 : ${resInfo.res_info_seq}`}/> */}
                {/* 유저정보조회해서 아이디값 */}
            {/* </ListItemIcon>
          </ListItemButton> */}
        </List>
        </ Grid>
      </Grid>
    <Grid
      sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    }}
    >
      <Dialog
      open={checkOpen}
      onClose={()=>{{setCheckOpen(false)}}}
      >
      <DriveCheckList 
        setCheckPicOpen={setCheckPicOpen} checkPicOpen={checkPicOpen}
        setCheckOpen={setCheckOpen} checkOpen={checkOpen}
        setCheckCheck={setCheckCheck}
        />
      </Dialog>
      {/* <Button onClick={()=>{
        setCheckPicOpen(true)
        }}>
        내부 외부 사진 찍기   
      </Button>
      <Chip label={''?"OK":"NEED"} color="primary" /> */}
      <Button onClick={()=>{
        setCheckOpen(true)
        }}>
        탑승전 점검하기
      </Button>
      <Chip label={checkCheck?"OK":"NEED"} color="primary"/>
    </Grid>
    <Grid
      sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    }}
    >

    </Grid>
    <Grid
      sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    }}
    >
      <Button onClick={onStart}>
        운행시작
      </Button>
    </Grid>
    </Card>
  </Container>
  )
}

const DriveStart = () => {
  const {
    resInfo, setResInfo,
    resCheckList, setResCheckList,
    resResPicture, setResPicture,
    resCarInfo, setResCarInfo,
    startDay, setStartDay,
    endDay, setEndDay,
    token,

    resDump, resCarDump,
    checkStart, setCheckStart,
    checkEnd, setCheckEnd,
    } = useContext(DriveContext)
    const [modalStart, setModalStart] = useState(false)

  // 유저의 예약정보 가져오기


  // 예약정보를 통해 차량정보 가져오기
  // const optionCar = {
  //   url:`${baseUrl}/car/아이디/예약정보`,
  //   method:'GET',
  //   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
  //   }

  // 예약정보의 최신걸 조회해서 값이 있으면 가져오고
  // 없으면 막아야함

  // const getResData = async() =>{
  //   const response = resDump
  //   setResInfo(response)
   
  // await setResCarInfo(resCarDump)
  // }

  // 차량 정보 가져오기 api추가되면 이걸로
  const getResData = async() =>{
    const token = await `Bearer ${sessionStorage.getItem("access_token")}`
    const option = {
      url:`${API_BASE_URL}/car/myhistory`,
      method:'GET',
      headers:{Authorization: token},
      }
    try{
      const response = await axios(option)
      const data = await response.data
      const order = await data.length-1
      const carNum = await data[order].car_seq
      setResInfo(data[order])
      // 차량정보 가져오기 
      const optionCar = {
        url:`${API_BASE_URL}/car/${carNum}/info`,
        method:'GET',
        headers:{Authorization: token},
        }

      const carResponse = await axios(optionCar)
      const carData = await carResponse.data
      setResCarInfo(carData)
      // console.log(carData)
      // console.log('예약정보',resInfo)
      // console.log('예약차정보',resCarInfo)
      // console.log('운행조회성공')
      //날짜변경
      const carDateStart = await data[order].res_date_start
      const carDateEnd = await data[order].res_date_end

      setStartDay(dateChange(carDateStart))
      setEndDay(dateChange(carDateEnd))

      // console.log(data.length)
      // console.log(data[order])
      // 
      // if(response.data[0].res_res_check === 'N'){
      //   setResInfo(response.data[0])
      //   const responseCar = await axios(optionCar)
      //   setResCarinfo(responseCar.data)
      // }else{
      //   alert('예약 정보가 없습니다!')
      // }
    }catch(err){
      console.log(err)
    }
  }

  useEffect( ()=>{
  getResData()
  console.log('drive on')
  // alert('api조회를 통해서 현재화면을 불러오기때문에 현재 예약관련 api를 받아오지 않아 새로고침하면 초기화면으로 돌아갑니다')

  },[])

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
  


  return (
    <Container
      sx={{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        p:1,
      }}
    >
      {/* <DriveEnd/> */}
      { resInfo && resInfo.res_check === 'Y'? <Typography> 새로운 예약 정보가 없습니다</Typography>:  <></>}
      { resInfo && resInfo.res_check === null && checkStart === false && checkEnd === false ? <DriveBefore setModalStart={setModalStart} /> : <></>}
      { resInfo && resInfo.res_check === null && checkStart === false && checkEnd === true? <DriveOn/>: <></>}
      { resInfo && resInfo.res_check === null && checkStart === true && checkEnd === true? <DriveEnd/>: <></>}
      <Dialog
        open={modalStart}
        onClose={()=>{setModalStart(false)}}
      >
        <DialogTitle >
          {"운행을 시작합니다"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            즐거운 운전 하세요!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setModalStart(false)}}>확인</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default DriveStart;