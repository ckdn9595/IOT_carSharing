import React from 'react';
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
// 리뷰 목록 불러오기
// 차량정보 확인할 때
// 차량id prop
function ReviewList() {


  return <div>
    <p>이차의 리뷰 목록</p>
    <Review/>
  </div>;
}

export default ReviewList;
