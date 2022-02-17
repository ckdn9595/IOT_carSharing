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

import DoorControl from '../driveCommon/DoorControl';
import DriveCheckList from './DriveCheckList';
import DriveOn from '../driveOn/DriveOn';
import DriveEnd from '../driveEnd/DriveEnd';


const DriveBefore = ({setModalStart}) => {
  const {
    resInfo, setResInfo,
    resCheckList, setResCheckList,
    resResPicture, setResPicture,
    resCarInfo, setResCarInfo,
    token,
    baseUrl, setBaseUrl,
    resDump, resCarDump,
    checkStart, setCheckStart,
    checkEnd, setCheckEnd,
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
//   url:`http://localhost:8001/api/car/아이디/예약정보`,
//   method:'GET',
//   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
//   }

// 운행시작을 하면 체크스타트와 체크엔드가 모두 true가되어서 
// 운행시작전창은 안보인다
// 운행종료가 완료되면 체크스타트가 false가 된다

const onStart = () => {
  setCheckEnd(true)
  setModalStart(true)
  // 운행시작 api보내기
}


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
        }}
      >
      <Grid 
        sx={{
          alignItems:"center",
          display:'flex',
          flexDirection:'column',
        }}
      >
        <Avatar
          variant="square"
          // src={}
          alt="car Images"
          sx={{
            width: '70%',
            height: '50%'
            }}
        />
        <Chip sx={{ width:'50%',}} label='차량위치찾기'/>
      </Grid>
      <Grid sx={{width:'50%'}}>
        <List>
          <ListItemButton>
            <ListItemIcon>
                <DirectionsCarIcon />
                <ListItemText primary={`예약번호 : ${resInfo.res_info_seq}`}/>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
                <AccessTimeIcon/>
                <ListItemText secondary={`이용기간 : ${resInfo.res_info_end}까지`}/>
                {/* <ListItemText primary={`${resInfo.res_info_end}`}/> */}
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
                <ArrowForwardIcon />
                <ListItemText  primary={`차량번호 : ${resInfo.car_seq}`}/>
                {/* resCarInfo.car_num */}
                {/* 차량정보가저오기 */}
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
                <ArrowForwardIcon />
                <ListItemText primary={`차량종류 : ${resInfo.res_info_seq}`}/>
                {/* resCarInfo.car_model */}
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
                <PersonIcon />
                <ListItemText primary={`차량주인 : ${resInfo.res_info_seq}`}/>
                {/* 유저정보조회해서 아이디값 */}
            </ListItemIcon>
          </ListItemButton>
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
      open={checkPicOpen===true? checkPicOpen: checkOpen}
      onClose={()=>{{setCheckPicOpen(false)}}}
      >
      <DriveCheckList 
        setCheckPicOpen={setCheckPicOpen} checkPicOpen={checkPicOpen}
        setCheckOpen={setCheckOpen} checkOpen={checkOpen}
        />
      </Dialog>
      <Button onClick={()=>{setCheckPicOpen(true)}}>
        내부 외부 사진 찍기   
      </Button>
      <Chip label={'차량정보에서 사진정보가있으면'?"OK":"NEED"} color="primary" />
      <Button onClick={()=>{setCheckOpen(true)}}>
        탑승전 점검하기
      </Button>
      <Chip label={'차량정보에서 사진정보가있으면'?"OK":"NEED"} color="primary"/>
    </Grid>
    <Grid
      sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    }}
    >
      <DoorControl/>
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
    token,
    baseUrl, setBaseUrl,
    resDump, resCarDump,
    checkStart, setCheckStart,
    checkEnd, setCheckEnd,
    } = useContext(DriveContext)
    const [modalStart, setModalStart] = useState(false)

  // 유저의 예약정보 가져오기
  // const option = {
  //   url:`${baseUrl}/car/아이디/예약정보`,
  //   method:'GET',
  //   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
  //   }

  // 예약정보를 통해 차량정보 가져오기
  // const optionCar = {
  //   url:`${baseUrl}/car/아이디/예약정보`,
  //   method:'GET',
  //   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
  //   }

  // 예약정보의 최신걸 조회해서 값이 있으면 가져오고
  // 없으면 막아야함

  const getResData = async() =>{
    const response = resDump
    setResInfo(response)
   
  // await setResCarInfo(resCarDump)
  }

  // 차량 정보 가져오기 api추가되면 이걸로
  // const getResData = async() =>{
  //   try{
  //     const response = await axios(option)
  //     console.log(response.data)
  //     if(response.data[0].res_res_check === 'N'){
  //       setResInfo(response.data[0])
  //       const responseCar = await axios(optionCar)
  //       setResCarinfo(responseCar.data)
  //     }else{
  //       alert('예약 정보가 없습니다!')
  //     }
  //   }catch(err){
  //     console.log(err)
  //   }
  // }

  useEffect( ()=>{
  getResData()
  console.log('drive on')
  alert('api조회를 통해서 현재화면을 불러오기때문에 현재 예약관련 api를 받아오지 않아 새로고침하면 초기화면으로 돌아갑니다')

  },[])


  return (
    <Container
      sx={{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        p:1,
      }}
    >
      { resInfo && resInfo.res_res_check === 'Y'? <Typography> 새로운 예약 정보가 없습니다</Typography>:  <></>}
      { resInfo && resInfo.res_res_check === 'N' && checkStart === false && checkEnd === false ? <DriveBefore setModalStart={setModalStart} /> : <></>}
      { resInfo && resInfo.res_res_check === 'N' && checkStart === false && checkEnd === true? <DriveOn/>: <></>}
      { resInfo && resInfo.res_res_check === 'N' && checkStart === true && checkEnd === true? <DriveEnd/>: <></>}
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