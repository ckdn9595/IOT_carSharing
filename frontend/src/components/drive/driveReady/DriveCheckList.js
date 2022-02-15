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
import { CarContext } from 'src/components/car-management/carContext';

const CheckOption = (props) =>{
    const {checkOpen, setCheckOpen} = props
    const {token} = useContext(CarContext)
    const [checkMent, setCheckMent] = useState('')

    // 체크멘트 예약정보에 보내기
    // const option = {
      //   url:`http://localhost:8001/api/car/아이디/예약정보`,
      //   method:'POST',
      //   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
      //   body: checkment
      //   }

    return(
        <div>
          <DialogTitle>운행전 체크하기</DialogTitle>
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
    const [images, setImages] = useState({}
        ); 
    const [frontImage, setFrontImage] = useState('')
    const [rearImage, setrearImage] = useState('')
    const [leftSideImage, setLeftSideImage] = useState('')
    const [rightSideImage, setRightSideImage] = useState('')
    const [innerImage, setInnerImage] = useState('')
    const [previewImg, setPreviewImg] = useState({})
    
      // const option = {
      //   url:`http://localhost:8001/api/car/아이디/예약정보`,
      //   method:'POST',
      //   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
      //   body:formData
      //   }
    
    const formData = new FormData()
    
    const uploadImage = event =>{
        event.stopPropagation();
        let reader = new FileReader();
        let file = event.target.files
        // formData.append(name, file)
        `set${event.target.id}Image(${event.target.files[0]})`

        console.log(frontImage)
        const filesInArr = Array.from(event.target.files);
        reader.onloadend = async() => {
            await setPreviewImg({
              ...preview,
              name: filesInArr,
              previewURL: reader.result,
            });
        // let preview = null
        // if ([name].file !== null) {
        //  preview = postfiles.file[0]?.type.includes("image/") ? (
        // <Avatar
        //     variant="square"
        //     src={previewImg.[name].previewURL}
        //     sx={{
        //     width: '100%',
        //     height: '100%'
        //     }}
        // />) : '' 
    }


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
                bgcolor: 'background.paper', 
                boxShadow: 24,
                p: 4,
                alignItem:'center',
            }}
        >
        <Grid item
            spacing={3}
            sx={{
                display:'flex',
                alignItems:'center',
                flexDirection:'column',
            }}
        >
            <Card
                sx={{
                 width:'100%',
                }} 
                >
                <CardHeader
                    title="전면 사진"
                    subheader="차량 전면부 사진을 올려주세요"
                />
                <label htmlFor="Front">
                <Input
                  id='Front'
                  name='Front'
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
                  image={  previewImg.frontImage && previewImg.frontImage.previewURL ? previewImg.frontImage.previewURL :''}
                  />
            </Card>
    
            <Card
                sx={{
                 width:'100%',
                }} 
                >
                <CardHeader
                    title="후면 사진"
                    subheader="차량 후면 사진을 올려주세요"
                />
                <label htmlFor="Rear">
                <Input
                  id='Rear'
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
                  image={  previewImg.rearImage &&previewImg.rearImage.previewURL ? previewImg.rearImage.previewURL :''}
                />
          
            </Card>
            <Card
                sx={{
                 width:'100%',
                }} 
                >
                <CardHeader
                    title="좌측면 사진"
                    subheader="차량 왼쪽 사진을 올려주세요"
                />           
                <label htmlFor="LeftSide">
                <Input
                  id='LeftSide'
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
                  image={  previewImg.leftSideImage && previewImg.leftSideImage.previewURL ? previewImg.leftSideImage.previewURL :''}

                />      
            </Card>
            <Card
                sx={{
                 width:'100%',
                }} 
                >
                <CardHeader
                    title="우측면 사진"
                    subheader="차량 오른쪽 사진을 올려주세요"
                />
                <label htmlFor="RighttSide">
                <Input
                  id='RightSide'
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
                  image={  previewImg.rightSideImage && previewImg.rightSideImage.previewURL ? previewImg.rightSideImage.previewURL :''}

                  />     
          
            </Card>
            <Card
                sx={{
                 width:'100%',
                }} 
                >
                <CardHeader
                    title="실내 사진"
                    subheader="차량 실내 사진을 올려주세요"
                />
                <label htmlFor="Inner">
                <Input
                  id='Inner'
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
                  image={  previewImg.innerImage && previewImg.innerImage.previewURL ? previewImg.innerImage.previewURL :''}

                  />     
              </Card>
            </Grid>
            <Grid
                sx={{
                width:'100%',
                }} 
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