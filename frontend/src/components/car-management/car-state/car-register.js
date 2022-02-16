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
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  InputLabel,
  Input,
  Select,
  MenuItem,
  FormControl,
  ThemeProvider,
  Fab,
  Divider,
  FormControlLabel,
  Checkbox,
  SliderValueLabel,
} from '@mui/material';
import { NavItem } from 'src/components/nav-item';
import { CarContext } from '../carContext';
import { border, width } from '@mui/system';
import { set } from 'nprogress';
// 차량등록
// 사용자 prop
const CarRegister = () =>{ 
  const { inputs, setInputs,
    postfiles, setPostfiles,
    imageUrl, setImageUrl,
    register, setRegister,
    setVisible, visible,
    sendSuccess, setSendSuccess,
  } = useContext(CarContext)
  const [upImg, setUpImg] = useState('')
  const [modal, setModal] = useState(false)

  const imgRef = useRef()
  const { carNum, carYear, carImg, carModel, carSegment, carRate, carFuel} = inputs

  const onChange = event =>{
    const {name, value} = event.target
    setInputs({
      ...inputs,
      [name]: value,
    })
  }
  const formData = new FormData()
  const uploadContent = new FormData()

  // const uploadContent = new FormData()

  const option = {
    // url:`http://localhost:8001/api/car/register`,
    url:`https://i6a104.p.ssafy.io/api/car/register`,
    method:'POST',
    // {Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`, 'Content-Type': 'multipart/form-data'},
    data: formData
    }
  
  const uploading = () =>{

    for (let key in inputs){
      String(key) !== 'carImg' ? formData.append(key,inputs[key]): console.log('loading')
      
    }
    formData.append('carImg',upImg)
    // for (let value of formData.values()) {
    //   console.log(value, '업로드컨텐츠사진확인');
    // }
  
  }
  const onSubmit = async(event) =>{
    event.preventDefault()
    // uploading()

    if (carNum.length===7 && carImg && carModel && carYear && carFuel){
    try{
      uploading()
      // setRegister(register.concat(inputs))
      const response = await axios(option)
      await setVisible(false)
      // console.log(response.data)
      console.log('차량등록이 성공하였습니다')
      SetSendSuccess(!sendSuccess)
    }catch(err){
      // setVisible(false)
      // for (let key of formData.keys()) {
      //   console.log(key, formData.values(key));
      // }
      // // console.log('22',uploadContent.v)
      console.log(err)
      }
    }else{
      setModal(true)
    }
  }
  useEffect(()=>{
    switch(carModel){
      case '쏘나타':{
        setInputs({
          ...inputs,
          carSegment: 3,
          carRate:15000
        })
      } break
      case '모닝':{
        setInputs({
          ...inputs,
          carSegment: 1,
          carRate:5000
        })
      } break
      case '싼타페':{
        setInputs({
          ...inputs,
          carSegment: 2,
          carRate:20000
        })
      }  
    }
  },[carModel])
  const uploadFile = (e) => {
    e.stopPropagation();
    let reader = new FileReader();
    let file = e.target.files[0];
    const filesInArr = Array.from(e.target.files);
    // const formData = new FormData()
    formData.append('carImg', file)
    setUpImg(e.target.files[0])
    // for (let value of formData.values()) {
    //   console.log(value,'사진밸류');
    // }
  
    reader.onloadend = async() => {
      await setPostfiles({
        file: filesInArr,
        previewURL: reader.result,
      });
      // await setInputs({...inputs, carImg:formData})   
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  let preview = null;
  if (postfiles.file !== null) {
    preview = postfiles.file[0]?.type.includes("image/") ? (
      <Avatar
        variant="square"
        src={postfiles.previewURL}
        sx={{
          width: '100%',
          height: '100%'
          }}
      />) : '' 
    }
  return(
    <Box 
      sx={{
        margin: 5,
        display:'flex',
        flexDirection:'column',
        flexGrow:1,
        alignItems:'center',
      }}
    >
      <Container sx={{ 
                  display:'flex', 
                  flexDirection:'column', 
                  alignItems:'center', 
                  padding:3,
                  gap:1,
                  }}
      >

          <Typography variant="h5">
            임대자동차 등록
          </Typography>

        <Grid item>
          <TextField
            error={carNum.length === 7 ? false: true} 
            variant="standard" name="carNum" label="차량번호" onChange={onChange} required 
            />
        </Grid>
        <Grid item>
          <TextField
              error={carYear.length === 4 ? false: true} 
              variant="standard" name="carYear" label="연식입력" onChange={onChange} required
              />
        </Grid>

        <Grid item>
        <FormControl variant="standard" sx={{minWidth: 210}}>
          <InputLabel id="carModelSelect">차량종류</InputLabel>
          <Select
            labelId="carModelSelect"
            name="carModel"
            value={carModel}
            onChange={onChange}
          >
            <MenuItem value="">
              <em> </em>
            </MenuItem>
            <MenuItem value={"쏘나타"}>현대 쏘나타</MenuItem>
            <MenuItem value={"모닝"}>기아 모닝</MenuItem>
            <MenuItem value={"산타페"}>현대 싼타페</MenuItem>
          </Select>
        </FormControl>
        </Grid>

        <Grid item>
        <FormControl variant="standard" sx={{minWidth: 210}}>
        <InputLabel id="carFuelSelect">연료타입</InputLabel>
          <Select
            labelId="carFuelSelect"
            name="carFuel"
            value={carFuel}
            onChange={onChange}
          >
            <MenuItem value="">
              <em> </em>
            </MenuItem>
            <MenuItem value={"휘발유"}>휘발유</MenuItem>
            <MenuItem value={"경유"}>경유</MenuItem>
            <MenuItem value={"LPG"}>LPG</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        <Grid item>
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
              <Button variant="text" component="span">
              사진등록
              </Button>
          </label>
        </Grid>
        <Grid item xs={12} sx={{width: 200, height:400, justifyContent:'center,'}} >
            {!preview ? <Typography>사진을 등록해주세요</Typography>: preview}
        </Grid>
            {/* <TextField name="carIntro" label="차량소개" onChange={onChange}/> */}
      <Button
       variant='contained'
       onClick={onSubmit}
      >
        등록하기
      </Button>
      <Dialog
        open={modal}
        onClose={()=>{setModal(false)}}
      >
        <DialogTitle id="alert-dialog-title">
          {"차량 등록 오류!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
	          {carNum.length!==7 ?'차량번호가 잘못 되었습니다' :'입력하지 않은 정보가 있습니다!'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setModal(false)}} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
    </Box>
  )
}

export default CarRegister