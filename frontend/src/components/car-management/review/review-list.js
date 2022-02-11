import React, { useState, useEffect, useContext }  from 'react';
import axios from 'axios';
import Review from './review'
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
import { Reviews, ReviewsSharp } from '@mui/icons-material';
import { set } from 'nprogress';
//차량의 리뷰 가져와서 
function ReviewList({carId}) {
  const [reviews, setReviews] = useState([{id:1, title:'good',content:'gooosss'}])
  
  const option = {
    url:`http://localhost:8001/api/car/${carId}`,
    method:'GET',
    headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
    }
  // const getReviewList= async () =>{
  //   try{
  //     const response = await axios(option)
  //     console.log(response.data)
  //     setReviews(response.data)
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  // useEffect(()=>{
  //   getReviewList()
  // },[])


  return <>
    <p>이차의 리뷰 목록</p>
    {reviews.map( review=>(
      <Review key={review.id} review={review} />
    ))}
  </>
}

export default ReviewList;
