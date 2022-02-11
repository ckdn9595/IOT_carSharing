import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Title,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Grid,
  Typography,
  Link,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@mui/material';

function Review({review}) {
  const [content, setContent] = useState({})

  useEffect(()=> {
    setContent({review})
  },[])
  const preventDefault=()=>{}

  return(<>
      <Typography  variant="h4">
        제목
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        리뷰내용
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          정보
        </Link>
      </div>
    </>
  )
}


export default Review;
