import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Button, Checkbox, FormGroup, FormControlLabel, Box, Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, 
  Alert

} from '@mui/material';
import { CarContext } from '../carContext';
import { set } from 'nprogress';

const Insurance = ({carId}) =>{
  // { carId } = props 차량 정보 받아오기
  const {insurance, setInsurance,
    openIn, setOpenIn,
    alert, setAlert,
    token,
  
  } = useContext(CarContext)
  // const [rent, setRent]= useState(false)
  const {rent, setRent}= useContext(CarContext) //체크버튼 활성화,비활성화

  function agreeCheckHandle(){
    setRent(!rent)
  }


  
  const agreeSend= async()=>{
    try{
      // const option = {
      //   url:`http://localhost:8001/api/car/${carid}/info`,
      //   method:'PATCH',
      //   headers:token,
      //   data: {rentInsurance:'Y'}
      //   }
      // const responsne = await axios(option)
      // console.log(response.data)
      setInsurance(false)
      setAlert(false)
    }catch(err){
      console.log('failed')
      setAlert(false)
      }
  }

  return(
    <>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        p: 1,
        m: 1,
        maxWidth: 'sm'
      }}
    >
      <Dialog
        open={insurance}
        onclose={()=>{setInsurance(false)}}
      >
      <DialogTitle>{'보험 등록'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>임대차 등록을 위해 보험 가입이 필요합니다.</Typography>
            <Typography>보험 내용 : 사고 발생시 일정 금액을 보장합니다.</Typography>
          </DialogContentText>
            {alert===true?<Alert severity="error">약관에 동의하지 않았습니다!</Alert>:''}
        </DialogContent>
        <DialogActions>

          <FormGroup>
            <FormControlLabel control={<Checkbox checked={rent} onChange={agreeCheckHandle}/>} label="약관에 동의합니다" />
          </FormGroup>
          <Button 
            onClick={()=>{rent===true?agreeSend():setAlert(true)} }
            > 제출하기 </Button>
          <Button
            onClick={()=>{setInsurance(false), setAlert(false)}}
            > 취소</Button>
        </DialogActions>
    </Dialog>
    </Box>
    </>
  )
}

export default Insurance