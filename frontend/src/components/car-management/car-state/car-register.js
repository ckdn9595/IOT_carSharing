import React, { useState, useEffect, useRef } from 'react';
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
  SliderValueLabel,
} from '@mui/material';
import { NavItem } from 'src/components/nav-item';
// 차량등록
// 사용자 prop
const CarRegister = ( props ) =>{ 
  const [imageUrl, setImageUrl] = useState(null)
  const imgRef = useRef()
  const {setVisible} = props
  // const [pic, setPic] = useState({outPic:[],inPic:[]})
  // const [outPic, setOutPic] = useState('')
  const [inputs, setInputs] = useState({
    carNum:'',
    carKind:'',
    carYear:'',
    carPic: {outPic:[], inPic:[]},
    carIntro:'',
    carLicense:''
  })

  const { car_num, car_kind, car_year, car_pic, car_intro} = inputs

  const onChange = event =>{
    const {name, value} = event.target
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const onImgChange =  event =>{
    const {name, value} = event.target
    console.log(name,value)
    setInputs(
      {...inputs,
      carPic: {...inputs.carPic, [name]:[...inputs.carPic[name], value] },
      }
    )

    console.log(inputs)
  }

//   const thumbNail = map()
//   const setImageFromFile = ({ file, setImageUrl }) => {
//     let reader = new FileReader();
//     reader.onload = function () {
//        setImageUrl({ result: reader.result });
//     };
//     reader.readAsDataURL(file);
//  };

  const onClickImgBtn = event =>{
    event.preventDefault()
    imgRef.current.click()
  }

  // const option = {
  //   url =`http://localhost:3000/api/car/register`,
  //   method:'POST',
  //   data: inputs
  //   }

  const onSubmit = async() =>{
    try{
      const response = await axios(option)
      console.log('response.data')
    }catch(err){
      // console.log(err)
      // setValid(false) 
      setVisible(false)
      // alert('잘못된 요청입니다.')
      }
  }

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
        <Grid container spacing={2}  justifyContent="flex-end">
          <Grid item xs={6}>
          <TextField name="carNum" label="차량번호" onChange={onChange} />
          </Grid>
        <Grid item xs={6}>
          <TextField name="carKind" label="차종입력" onChange={onChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField name="carYear" label="연식입력" onChange={onChange}/>
        </Grid>
        <Grid item xs={6}>
          <TextField name="carIntro" label="차량소개" onChange={onChange}/>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            차량 등록증 등록
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="contained-button-file-license">
            <Input
              multiple type='file'
              id="contained-button-file-license"
              accept='image/*'
              onChange={onChange}
              style={{ 'display':'none' }}
              name='carLicense'
              />
              <Button variant="contained" component="span">
                사진등록
              </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            외부 사진 등록
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="contained-button-file">
            <Input
              multiple type='file'
              id="contained-button-file"
              accept='image/*'
              onChange={onImgChange}
              style={{ 'display':'none' }}
              name='outPic'
              />
              <Button variant="contained" component="span">
                사진등록
              </Button>
          </label>
        </Grid>
        <Grid>
          {/* {inputs.car_pic.pic_out} */}
        </Grid>

        <Grid item xs={12}>
          <Typography>
            내부 사진 등록
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="contained-button-file-in">
            <Input
              multiple type='file'
              id="contained-button-file-in"
              accept='image/*'
              onChange={onImgChange}
              style={{ 'display':'none' }}
              name='inPic'
              />
              <Button variant="contained" component="span">
                사진등록
              </Button>
          </label>
        </Grid>
      </Grid>
      <Button
       variant='contained'
       onClick={onSubmit}
      >
        등록하기
      </Button>
      </Box>
    </Box>
    <p>차량 번호{inputs.carNum}</p>
    <p>차량 종류{inputs.carKind}</p>
    <p>차량 연식{inputs.carYear}</p>
    <p>차량 소개{[inputs.carIntro]}</p>
  </Container>
  )
}

export default CarRegister