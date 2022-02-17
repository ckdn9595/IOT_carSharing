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
import { API_BASE_URL } from 'src/config';

const Insurance = ({carId}) =>{
  // { carId } = props 차량 정보 받아오기
  const {insurance, setInsurance,
    openIn, setOpenIn,
    alert, setAlert,
    sendSuccess, setSendSuccess,
    token,
  } = useContext(CarContext)

  // const [rent, setRent]= useState(false)
  const {rent, setRent}= useContext(CarContext) //체크버튼 활성화,비활성화
  const [send, setSend] = useState(false) // 정보갱신

  function agreeCheckHandle(){
    setRent(!rent)
  }
  const agreeSend= async()=>{
    const option = {
      url:`${API_BASE_URL}/car/${carId}/info`,
      method:'PATCH',
      headers:{ Authorization: token },
      data: {car_rent_insurance_yn:'Y'}
      }
    if (rent === true){
      try{
        const response = await axios(option)
        // console.log(response.status)
        setInsurance(false)
        setAlert(false)
        setSendSuccess(!sendSuccess)
      }catch(err){
        console.log(err)
        setAlert(false)
        }
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