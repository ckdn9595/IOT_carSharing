import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Button, Checkbox, FormGroup, FormControlLabel, Box, Typography } from '@mui/material';
import { CarContext } from '../CarContext';


const Insurance = ({carId}) =>{
  // { carId } = props 차량 정보 받아오기
  const {insurance, setInsurance} =useContext(CarContext)
  // const [rent, setRent]= useState(false)
  const {rent, setRent}= useContext(CarContext) //체크버튼 활성화,비활성화
  function agreeCheckHandle(){
    setRent(!rent)
  }

  // const option = {
  //   url:`http://localhost:8001/api/car/${carid}`,
  //   method:'PUT',
  //   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
  //   data: {rentInsurance:true}
  //   }

  const agreeSend= async()=>{
    try{
      //가입등료화면과  창닫기
      // const responsne = await axios(option)
      // console.log(response.data)
      await setInsurance(!insurance)
    }catch(err){
      console.log('failed')
      }
  }

  return(
    <>
    <Box>
      <h1>보험 등록하기</h1>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          p: 1,
          m: 1,
          border: '1px solid',
          maxWidth: 'sm'
        }}
      >
        <Typography>
약관의 규제에 관한 법률 제2조(정의) 이 법에서 사용하는 용어의 정의는 다음과 같다.
1. "약관"이란 그 명칭이나 형태 또는 범위에 상관없이 계약의 한쪽 당사자가 여러 명의 상대방과 계약을 체결하기 위하여 일정한 형식으로 미리 마련한 계약의 내용을 말한다.
2. "사업자"란 계약의 한쪽 당사자로서 상대 당사자에게 약관을 계약의 내용으로 할 것을 제안하는 자를 말한다.
3. "고객"이란 계약의 한쪽 당사자로서 사업자로부터 약관을 계약의 내용으로 할 것을 제안받은 자를 말한 다.

다수인을 상대로 동종의 거래를 반복하는 경우에 그 거래를 위하여 미리 작성해 놓은 정형적인 계약조건[1]

독일의 'allgemeine Geschäftsbedingungen'(독일 민법 제305조)을 번역한 용어라서 강학상 '보통거래약관'이라고 했는데, 입법자가 이를 규제하는 법률을 만들면서 심플하게 '약관'이라고 축약해 버렸다.
        </Typography>
      </Box >
      
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={rent} onChange={agreeCheckHandle}/>} label="약관에 동의합니다" />
      <Button 
        variant="contained"
        onClick={agreeSend}
      > 제출하기 </Button>
      </FormGroup>

    </Box>
    </>
  )
}

export default Insurance