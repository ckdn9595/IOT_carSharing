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
} from '@mui/material';
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

const [checkPicOpen, setCheckPicOpen] = useState(false)
const [checkOpen, setCheckOpen] = useState(false)

  return (
    <>
    <Typography>
      실시간 이용정보 페이지
    </Typography>
    <Button onClick={()=>{console.log(resInfo)}}>check</Button>
    <Box
      sx={{display:'flex',
      border:'1px solid',
      flexDirection:'column',
      alignItems:'center',
      }}
    >
      <Grid
            sx={{display:'flex',
            border:'1px solid',
            alignItems:'center',
            }}
      >
      <Grid>
        사진차량사진입니다
        <Typography>차량위치찾기</Typography>
      </Grid>
      <Grid>
        <Typography>
         예약번호 {resInfo.res_info_seq}
        </Typography>
        <Typography>
          이용기간 {resInfo.car_res_date_start}
        </Typography>
        <Typography>
          차량번호 :22가나000
        </Typography>
        <Typography>
          차량종류 :쏘나다
        </Typography>
        <Typography>
          차량주인 :김싸피
        </Typography>
        </ Grid>
      </Grid>
    <Grid>


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
       <Typography>OK</Typography>
        
      </Button>
      <Button onClick={()=>{setCheckOpen(true)}}>
        탑승전 점검하기
      <Typography>OK</Typography>
      </Button>
    </Grid>
    <Grid>
            <DoorControl/>
    </Grid>
    <Grid>
      <Button>
        운행 하기
      </Button>
    </Grid>
    </Box>
    </>
    
  )
}

export default DriveStart