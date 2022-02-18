import axios from 'axios'
import React, { useContext, useEffect, useRef, useState} from 'react'
import { DriveContext } from '../DriveContext';
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

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaidIcon from '@mui/icons-material/Paid';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';


const DriveEnd = () => {
  const {resInfo, setResInfo,
        resCheckList, setResCheckList,
        resResPicture, setResPicture,
        resCarInfo, setResCarInfo,
        endDay,
        endData, setEndData,

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
          title="예약 차량 이용 완료"
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
                <DirectionsCarIcon />
                  <ListItemText primary={`차종 : ${resCarInfo.car_model}`}/>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <EventAvailableIcon/>
                  <ListItemText primary={`종료일자 : ${endData.endDay.year}년 ${endData.endDay.month}월 ${endData.endDay.day}일 ${endData.endDay.hour}시 ${endData.endDay.minutes}분`}/>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                  <AccessTimeIcon/>
                  <ListItemText primary={`이용시간 : ${endData.time}`}/>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LocalAtmIcon/>
                  <ListItemText primary={`이용요금 : ${endData.rate}원`}/>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                  <LocalGasStationIcon />
                  <ListItemText primary={`결제수단 : ${endData.card}`}/>
              </ListItemIcon>
            </ListItemButton>
          </List>
            </Grid>
          <Grid>
          </Grid>
        </Grid>
      
      </Card>
      
  </Container>
    
  )
}

export default DriveEnd