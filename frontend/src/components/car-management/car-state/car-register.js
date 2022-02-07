import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';
// 차량등록
// 사용자 prop
const CarRegister = () =>{
  // const 차주
  const [inputs, setInputs] = useState({
    car_num:'',
    car_kind:'',
    car_year:'',
    car_pic: {
      pic_out:[''],
      pic_in:[''],
      },
    car_intro:'',
  })
  const { car_num, car_kind, car_year, car_pic, car_intro} = inputs

  const onChange = event =>{
    const {name, value} = event.target
    setInputs({
      ...inputs,
      [name]: value,
    })
  }
  //버튼 누르면 api보내기 
  
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
          <TextField name="car_num" label="차량번호" onChange={onChange} />
          </Grid>
        <Grid item xs={6}>
          <TextField name="car_kind" label="차종입력" onChange={onChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField name="car_year" label="연식입력" onChange={onChange}/>
        </Grid>
        <Grid item xs={6}>
          <TextField name="car_intro" label="차량소개" onChange={onChange}/>
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
    <p>차량 번호{[inputs.car_num]}</p>
    <p>차량 종류{[inputs.car_kind]}</p>
    <p>차량 연식{[inputs.car_year]}</p>
    <p>차량 소개{[inputs.car_intro]}</p>
  </Container>
  )
}

export default CarRegister