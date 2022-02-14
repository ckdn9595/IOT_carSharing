import axios from 'axios'
import React, { useContext, useEffect, useState} from 'react'
import { DriveContext } from '../DriveContext';
import { 
  Box, 
  Grid,
  Container, 
  Typography, 
  TextField, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,

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
  CardContent,
  CardMedia,
  CardHeader,
  Card
} from '@mui/material';
import DoorControl from '../driveCommon/DoorControl';

const CheckOption = (props) =>{
    const {checkOpen, setCheckOpen} = props


    return(
        <div>
            체크리스트입미담
          <DialogTitle>운행전 Check</DialogTitle>
          <DialogContent>
            <DialogContentText>
              특이사항이 있으면 입력해주세요
            </DialogContentText>
            <TextField
              id="check"
              label="checkContent"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{setCheckOpen(false)}}>취소</Button>
            <Button onClick={()=>{setCheckOpen(false)}}>제출하기</Button>
          </DialogActions>
      </div>
    )
}

const CheckPicture = () =>{
    const [images, setImages] = useState([]
        ); 
    
      // const option = {
      //   url:`http://localhost:8001/api/car/아이디/예약정보`,
      //   method:'POST',
      //   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
      //   body:formData
      //   }
    
    const formData = new FormData()
    
    const uploadImage = event =>{
        event.preventDefault()
        const file = event.target.files
        const name = event.target.id
        const url = URL.createObjectURL(event.target.files[0])
        console.log(images[1] && true)
    
        setImages([...images,  {name:name, file:file, url:url}])
    
        console.log(images)
        // const preview = () =>{
        //     if(!file) return false;
        //     const reader = new FileReader()
        //     reader.onLoad= () =>{
        //         CardMedia = url(reader.result)
        //     }
        //     reader.readAsDataURL(files[0])
        // }
    }
    
    const sendImage = async (event)=>{
        event.preventDefault()
        try{
            for (let image of images){
            await formData.append(image.name,image.file)
            console.log(image)
            }
        // console.log(formData)
        console.log(formData.has('front'))
        console.log(images)
        const response = await axios(option)
        console.log(response.data)
        }catch(err){
            console.log(err)
        }
    }
    
    //   let profile_preview = null;
    //   if (postfiles.file !== null) {
    //     profile_preview = postfiles.file[0]?.type.includes("image/") ? (
    //       <img src={postfiles.previewURL} />
    //     ) :'';
    //   }
    
    return (
          <>
        <Box
            sx={{

                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}
        >
        <Grid
            container
            spacing={3}
            sx={{
                alignItems:'center',
            }}
        >
            <Card 
                item
                xs={4}

                >
                <CardHeader
                    title="전면 사진"
                    subheader="차량 전면부 사진을 올려주세요"
                />
                <label htmlFor="front">
                <Input
                  id='front'
                  type='file'
                  inputProps={{accept:"image/*"}}
                  style={{ 'display':'none' }}
                  onChange={uploadImage}
                  />
                  <Button size="small" component="span">
                  등록
                  </Button>
              </label>
                  <CardMedia
                  container
                  component='img'
                  height="140"
                  image={ images[0] && true ? images[0].url :''}
                  />
                {/* <CardMedia component='img' image={images[0].url}/> */}
            </Card>
    
            <Card 
                item
                xs={4}

                >
                <CardHeader
                    title="후면 사진"
                    subheader="차량 후면 사진을 올려주세요"
                />
                <label htmlFor="rear">
                <Input
                  id='rear'
                  type='file'
                  inputProps={{accept:"image/*"}}
                  style={{ 'display':'none' }}
                  onChange={uploadImage}
                  />
                  <Button size="small" component="span">
                  등록
                  </Button>
              </label>
              <CardMedia
                  component='img'
                  height="140"
                  image={ images[1] && true ? images[1].url :''}
                />
          
            </Card>
            <Card 
                item
                xs={4}

                >
                <CardHeader
                    title="좌측면 사진"
                    subheader="차량 왼쪽 사진을 올려주세요"
                />           
                <label htmlFor="leftSide">
                <Input
                  id='leftSide'
                  type='file'
                  inputProps={{accept:"image/*"}}
                  style={{ 'display':'none' }}
                  onChange={uploadImage}
                  />
                  <Button size="small" component="span">
                  등록
                  </Button>
              </label>
              <CardMedia
                  component='img'
                  height="140"
                  image={ images[2] && true ? images[2].url :''}
                />      
            </Card>
            <Card 
                item
                xs={4}
                >
                <CardHeader
                    title="우측면 사진"
                    subheader="차량 오른쪽 사진을 올려주세요"
                />
                <label htmlFor="leftSide">
                <Input
                  id='leftSide'
                  type='file'
                  inputProps={{accept:"image/*"}}
                  style={{ 'display':'none' }}
                  onChange={uploadImage}
                  />
                  <Button size="small" component="span">
                  등록
                  </Button>
                  </label>
              <CardMedia
                  component='img'
                  height="140"
                    image={ images[3] && true ? images[3].url :''}
                  />     
          
            </Card>
            <Card 
                item
                xs={4}

                >
                <CardHeader
                    title="실내 사진"
                    subheader="차량 실내 사진을 올려주세요"
                />
                <label htmlFor="inner">
                <Input
                  id='inner'
                  type='file'
                  inputProps={{accept:"image/*"}}
                  style={{ 'display':'none' }}
                  onChange={uploadImage}
                  />
                  <Button size="small" component="span">
                  등록
                  </Button>
                  </label>
              <CardMedia
                  component='img'
                  height="140"
                    image={ images[4] && true ? images[4].url :''}
                  />     
              </Card>
            </Grid>
            <Grid
                item
                xs={4} 
                >
            <Button onClick={sendImage}>등록하기</Button>
            </Grid>
        </Box>
        </>
      )
}


const DriveCheckList = (props) => {
    const {checkOpen, setCheckOpen, checkPicOpen, setCheckPicOpen}= props
    
    useEffect(()=>{
        console.log(checkOpen)
        console.log('체크픽오픈',checkPicOpen)
    },[checkPicOpen])
    
    return(
        <>
        {/* <CheckPicture/> */}
        {/* {checkOpen === true? <checkOption checkOpen={checkOpen} setCheckOpen={setCheckOpen} />:<checkPicture/>} */}
        {checkPicOpen === true? <CheckPicture/>: <CheckOption checkOpen={checkOpen} setCheckOpen={setCheckOpen} />}
        {/* <CheckOption checkOpen={checkOpen} setCheckOpen={setCheckOpen}/>
        <CheckPicture/> */}
        </>

    )
    }
  

export default DriveCheckList