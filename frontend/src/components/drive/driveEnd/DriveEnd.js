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
  Dialog } from '@material-ui/core';

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
      이용완료
    </Typography>
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
            flexDirection:'row'
            }}
      >
        <Grid>
          사진차량사진입니다
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
      <Typography>
        이용시간
      </Typography>
      <Typography>
        이용거리
      </Typography>
      <Typography>
        총 사용요금
      </Typography>
      <Typography>
        결제상태
      </Typography>
      <Typography>
        차주승인
      </Typography>
    </Grid>
      <Grid>
        <Button>
          리뷰 쓰기
        </Button>
      </Grid>
    </Box>
    </>
    
  )
}

export default DriveEnd