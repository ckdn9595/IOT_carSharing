import React from 'react';
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

// 리뷰 수정, 삭제, 보기
function Review() {
  return <div>
    <tr>
      <td>
        제목
      </td>
      <td> 본문</td>
      <td> 평점</td>
      <td> 작성날짜</td>
      </tr>
  </div>;
}


export default Review;
