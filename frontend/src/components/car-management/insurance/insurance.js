import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Checkbox, FormGroup, FormControlLabel, Box } from '@mui/material';

// 보험확인설정
//prop id받아서 보험 체크
const Insurance =() =>{
  const [isAgree, setIsAgree]= useState(false)

  function agreeCheckHandle(){
    setIsAgree(!isAgree)
  }

  // useEffect(() =>{
  //   const fetch = async () => {
  //     try{ 
  //       const response = await axios.post('http://localhost:3000/api/insurance',{
  //       agree: 동의})
  //       console.log(response.data)
  //     }catch(err){
  //       console.log(err)
  //     }
  //   }
  //   fetch()

  // },[agree])

  return(
    <>
    <Container>

      <h1>보험 등록하기</h1>
      <Box>
      <p>약관의 규제에 관한 법률 제2조(정의) 이 법에서 사용하는 용어의 정의는 다음과 같다.
1. &quot;약관&quot;이란 그 명칭이나 형태 또는 범위에 상관없이 계약의 한쪽 당사자가 여러 명의 상대방과 계약을 체결하기 위하여 일정한 형식으로 미리 마련한 계약의 내용을 말한다.
2. &quot;사업자&quot;란 계약의 한쪽 당사자로서 상대 당사자에게 약관을 계약의 내용으로 할 것을 제안하는 자를 말한다.
3. &quot;고객&quot;이란 계약의 한쪽 당사자로서 사업자로부터 약관을 계약의 내용으로 할 것을 제안받은 자를 말한 다.

다수인을 상대로 동종의 거래를 반복하는 경우에 그 거래를 위하여 미리 작성해 놓은 정형적인 계약조건[1]

독일의 &apos;allgemeine Geschäftsbedingungen&apos;(독일 민법 제305조)을 번역한 용어라서 강학상 &apos;보통거래약관&apos;이라고 했는데, 입법자가 이를 규제하는 법률을 만들면서 심플하게 &apos;약관&apos;이라고 축약해 버렸다.
</p>
      </Box>
      
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={isAgree} onChange={agreeCheckHandle}/>} label="약관에 동의합니다" />
      <Button variant="contained"> 제출하기 </Button>
      </FormGroup>

    </Container>
    </>
  )
}

export default Insurance