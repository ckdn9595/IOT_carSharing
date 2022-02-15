import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { 
  Box, 
  Grid,
  Container, 
  Typography, 
  TextField, 
  Button,
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
  SliderValueLabel,
  Modal,
} from '@mui/material';
import { CarContext } from '../carContext';

const RentHistory = ({list}) =>{
  const [clickOn, setClickOn] = useState(false)
  const [content, setConTent] = useState({})
  const {SendConfirm, setSendConfirm,
    open, setOpen
  } = useContext(CarContext)

  useEffect(()=>{
    setConTent(list)
  },[])
  const carId = content.car_res_seq
  const option = {
    url:`http://localhost:8001/api/car/${carId}/history`,
    method:'PUT',
    headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
    data: {res_end_valid : true,}
    }

    //이용승인 데이터 보내기
    // const sendConfirm = async () =>{
      //   try{
        //     const response = await axios(option)
        //     console.log(response.data)
        //   }catch(err){
          //     console.log(err)
          //   }
          // }
          
          // const sendConfirm = async () =>{
          //   setConTent({...content, res_end_valid:true})
          //   console.log(content)
          //   setSendConfirm(!SendConfirm)
          // }
  return(
    <>
    <Modal
       open={open}
       onClose={()=>{setOpen(false)}}   
    >
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={3}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}    
      >
      <Grid item  key={content.res_info_seq}
        display='flex'
        justifyContent='center'
        sx={{
          flexDirection:'column',
          alignItems:'center',

        }}
      >
          <Typography
            textAlign="justify"
            color="textPrimary"
            gutterBottom
            variant="h6"
            
          >          
            이용 번호 : {content.res_info_seq}
          </Typography>
          <Typography>
            사용기간
          </Typography>
          <Typography>
            {content.res_date}
          </Typography>
          <Typography
            textAlign="justify"
          
          >
            이동거리 : {content.res_rate}Km
          </Typography>
          <Typography
            textAlign="justify"          
          >
              이용요금 : {content.res_rate}원
            </Typography>
        {!content.res_end_valid? <Chip label='이용중'/> : <Chip color='success' label='이용완료'/>}
        {!content.res_end_valid?'':<Button onClick={sendConfirm}>승인하기</Button>}
        </Grid>
      </Grid>
    </Modal>
    </>
  )
}

export default RentHistory