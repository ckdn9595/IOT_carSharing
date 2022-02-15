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

} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import DoorControl from '../driveCommon/DoorControl';
import DriveCheckList from './DriveCheckList';
import { Dialog } from '@material-ui/core';

const DriveStart = () => {
  const {resInfo, setResInfo,
        resCheckList, setResCheckList,
        resResPicture, setResPicture,
        resCarInfo, setResCarInfo,

        resDump, resCarDump,
        } = useContext(DriveContext)


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

  const getResData = async() =>{
    const response = await resDump
    await setResInfo(response)
    // await setResCarInfo(resCarDump)
  }

  // 차량 정보 가져오기
  // const getResData = async() =>{
  //   const response = await axios(option)
  //   console.log(response.data)
  //   setResInfo(response.data)
      //  const responseCar = await axios(optionCar)
      //  setResCarinfo(responseCar.data)
  // }

  useEffect( ()=>{
    getResData()
  },[resInfo])


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
const onStart = () => {
  
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
            alignItem:"center",
            display:'flex',
            flexDirection:'column',
          }}
        >
          <>사진차량사진</>
          <Chip label='차량위치찾기'/>
        </Grid>
        <Grid>
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
                  <ListItemText primary={`이용기간 : ${resInfo.res_info_start}`}/>
                  <ListItemText primary={`${resInfo.res_info_end}`}/>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                  <ArrowForwardIcon />
                  <ListItemText primary={`차량번호 : ${resInfo.car_seq}`}/>
                  {/* 차량정보가저오기 */}
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                  <ArrowForwardIcon />
                  <ListItemText primary={`차량종류 : ${resInfo.res_info_seq}`}/>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                  <PersonIcon />
                  <ListItemText primary={`차량주인 : ${resInfo.res_info_seq}`}/>
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

export default DriveStart