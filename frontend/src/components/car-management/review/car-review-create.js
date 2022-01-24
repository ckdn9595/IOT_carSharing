import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@mui/material';


// 차량리뷰 작성,읽기
// 작성자 id prop 받기
const CarReview = () =>{
  const [content, setContent] = useState({
    본문:1,
    평점:2,
    사진:3,
  }) //리뷰 내용
  
  // const option = {
  //   url =`http://localhost:3000/api/car/${carID}/review`,
  //   method:'xxxx',
  //   data:{
  //     name:'',
  //     user:'',
  //     content:'',
  //     rate:'',
  //     car_image:'',  
  //   }
  // }
  const onSubmit = (event) => {
    event.preventDefault()
  }
  const onChange = (event) => {
    event.preventDefault()
    const {
    target : {value}
    } = event
    setContent({본문:value})
  }

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

  // },[리뷰])

  return(
    <>
      <Container>
        <h1> 리뷰 작성 하기</h1>
        <Grid>
          <TextField
          helperText="10자 이상 입력하세요"
          label="리뷰 작성"
          value={content.본문}
          onChange={onChange}
          >
          </TextField>
          <Button
            color="primary"
            variant="contained"
            onClick={onSubmit}
          >
            등록하기
          </Button>
          <TextField
          label="평점 입력"
          value={content.점수}
          onChange={onChange}
          >
          </TextField>
          <Button
            color="primary"
            variant="contained"
            onClick={onSubmit}
          >
            등록하기
          </Button>
          <TextField
          label="사진제출"
          value={content.사진}
          onChange={onChange}
          >
          </TextField>
          <Button
            color="primary"
            variant="contained"
            onClick={onSubmit}
          >
            등록하기
          </Button>
        </Grid>
        <div>
          {content.본문}
          </div>

      </Container>
    </>
  )
}

export default CarReview