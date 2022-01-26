import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Grid, Typography, TextField, Button} from '@mui/material';

// 차량등록
// 사용자 prop
const CarRegister = () =>{
  // const 차주

  // const [차량번호, set] = useState()
  // const [차종, set] = useState()
  // const [차량크기, set] = useState()
  // const [사진, set]= useState(['사진'])
  // const [차량상태, set] = useState([])
  // const [차량소개, set] = useState([])

  // const option = {
  //   url ='http://localhost:3000/api/car/register',
  //   method:'POST',
  //   data:{
 
  //   }
  // }

  // useEffect( () =>{
  //   const fetch = async () => {
  //     try{
  //       const response = await axios(option)
  //       console.log(response.data)
  //     }catch(err){
  //       console.log(err)
  //     }
  //   } 
  //   fetch()

  // },[등록])

  return(
  <Container>
    <Box 
      sx={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
      }}
    >
      <Typography variant="h3">
        차량 등록
      </Typography>
      <Box component='form' sx={{mt: 4}}> 
      {/* mt 겹치기 막았음 */}
        <Grid container spacing={2}  justifyContent="flex-end">
          <Grid item xs={6}>
          <TextField label="차량번호"/>
          </Grid>
        <Grid item xs={6}>
          <TextField label="차종입력"/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="차종입력"/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="연식입력"/>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            외부 사진 등록
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            사진 카루셀
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            내부 사진 등록
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            사진 카루셀
          </Typography>
        </Grid>
      </Grid>
      <Button>
        등록하기
      </Button>
      </Box>
    </Box>

  {/* <tr>
    <td class="tg-0pky">연식</td>
    <td class="tg-0pky">연식입력</td>
  </tr>
  <tr>
    <td class="tg-0pky">차량외부사진</td>
  </tr>
  <tr>
    <td class="tg-0pky">외부사진</td>
  </tr>
  <tr>
    <td class="tg-0pky">차량내부사진</td>
  </tr>
  <tr>
    <td class="tg-0pky">내부사진</td>
  </tr>
  <tr>
    <td class="tg-0pky">추가설정</td>
  </tr>
  <tr>
    <td class="tg-0pky">체크리스트</td>
  </tr>
  <tr>
    <td class="tg-0pky">차량소개</td>
  </tr>
  <tr>
    <td class="tg-0lax">소개하기</td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">차량등록</td>

  </tr> */}

  </Container>
  )
}

export default CarRegister