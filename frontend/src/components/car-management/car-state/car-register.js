import React, { useState, useEffect, useRef, useContext } from 'react';
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
import { carContext } from '../carContext';
// 차량등록
// 사용자 prop
const CarRegister = () =>{ 
  const { inputs, setInputs,
    postfiles, setPostfiles,
    imageUrl, setImageUrl,
    register, setRegister,
    setVisible,
  } = useContext(carContext)

  const imgRef = useRef()
  const { carNum, carYear, carImg,} = inputs

  const onChange = event =>{
    const {name, value} = event.target
    setInputs({
      ...inputs,
      [name]: value,
    })
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

  const option = {
    url:`http://localhost:8001/api/car/register`,
    method:'POST',
    headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
    data: inputs
    }

  const onSubmit = async() =>{
    try{
      setRegister(register.concat(inputs))
      // const response = await axios(option)
      // console.log(response.data)
      setVisible(false)
    }catch(err){
      setVisible(false)
      }
  }

  const uploadFile = (e) => {
    e.stopPropagation();
    let reader = new FileReader();
    let file = e.target.files[0];
    const filesInArr = Array.from(e.target.files);
    const formData = new FormData()
    formData.append('carImg', file)
    for (let value of formData.values()) {
      console.log(value);
    }
    console.log(formData.mimetype)
  
    reader.onloadend = async() => {
      await setPostfiles({
        file: filesInArr,
        previewURL: reader.result,
      });
      await setInputs({...inputs, carImg:formData})   
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  let preview = null;
  if (postfiles.file !== null) {
    preview = postfiles.file[0]?.type.includes("image/") ? (
      <img src={postfiles.previewURL} />
    ) : ''
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
      <Box  sx={{ display:'flex', border:'1px solid', flexDirection:'column'}}> 
        <Grid item xs={12} >
          <TextField name="carNum" label="차량번호" onChange={onChange} />
        </Grid>
        <Grid item xs={6} >
          <TextField name="carModel" label="차종입력" onChange={onChange} />
        </Grid>
        <Grid item xs={6} >
          <TextField name="carYear" label="연식입력" onChange={onChange}/>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            차량 등록증 등록
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
          사진 등록
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="input-file">
            <Input
              multiple
              type='file'
              id="input-file"
              inputProps={{accept:"image/*"}}
              onChange={uploadFile}
              style={{ 'display':'none' }}
              name='carImg'
              />
              <Button variant="contained" component="span">
              사진등록
              </Button>
          </label>
        </Grid>
        <Grid>
          {/* {inputs.car_pic.pic_out} */}
        </Grid>
            {/* <TextField name="carIntro" label="차량소개" onChange={onChange}/> */}
      <Button
       variant='contained'
       onClick={onSubmit}
      >
        등록하기
      </Button>
      </Box>
    </Box>
    {preview}
    <p>차량 번호{inputs.carNum}</p>
    <p>차량 종류{inputs.carModel}</p>
    <p>차량 연식{inputs.carYear}</p>
  </Container>
  )
}

export default CarRegister