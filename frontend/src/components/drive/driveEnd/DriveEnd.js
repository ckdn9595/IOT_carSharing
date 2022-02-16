import axios from 'axios'
import React, { useContext, useEffect, useState} from 'react'
import { DriveContext } from '../DriveContext';
import { 
  Box, 
  Grid,
  Container, 
  Typography, 
  Card,
  List,
  ListItem,
  ListItemButton,
  Chip,
  ListItemIcon,
  ListItemText,
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
  Modal,
  Dialog } from '@material-ui/core';
import DoorControl from '../driveCommon/DoorControl';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const DriveEnd = () => {
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

  // 차량 정보 가져오기
  // const getResData = async() =>{
  //   const response = await axios(option)
  //   console.log(response.data)
  //   setResInfo(response.data)
      //  const responseCar = await axios(optionCar)
      //  setResCarinfo(responseCar.data)
  // }

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

const [checkPicOpen, setCheckPicOpen] = useState(false)
const [checkOpen, setCheckOpen] = useState(false)

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
          width: '100%',
          bgcolor: 'background.paper',
          p: 1,
          flexDirection:'column',
            }}
      >
        <Typography
          textAlign='center'
          variant='h5'
        
        > 이용 정보 </Typography>

          <Grid>
                  <DirectionsCarIcon />

                  <ListItemText primary={`예약번호 : ${resInfo.res_info_seq}`}/>

                  <AccessTimeIcon/>

                  <ListItemText primary={`이용기간 : ${resInfo.res_info_start}`}/>
                  <ListItemText primary={`${resInfo.res_info_end}`}/>

                  <ArrowForwardIcon />
                  <ListItemText primary={`차량번호 : ${resInfo.car_seq}`}/>

                  <ArrowForwardIcon />
                  <ListItemText primary={`차량종류 : ${resInfo.res_info_seq}`}/>

                  <PersonIcon />
                  <ListItemText primary={`차량주인 : ${resInfo.res_info_seq}`}/>

                  <DirectionsCarIcon />
                  <ListItemText primary={`예약번호 : ${resInfo.res_info_seq}`}/>

                  <AccessTimeIcon/>
                  <ListItemText primary={`이용거리 : ${resInfo.res_info_start}`}/>

                  <ArrowForwardIcon />
                  <ListItemText primary={`이용요금 : ${resInfo.car_seq}`}/>

                  <ArrowForwardIcon />
                  <ListItemText primary={`결제상태 : ${resInfo.res_info_seq}`}/>

                  <PersonIcon />
                  <ListItemText primary={`차주승인 : ${resInfo.res_info_seq}`}/>
          </Grid>

      </Card>
  </Container>
    
  )
}

export default DriveEnd