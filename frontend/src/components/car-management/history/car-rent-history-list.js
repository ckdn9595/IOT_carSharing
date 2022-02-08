import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RentHistory from './car-rent-history';
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

// 자동차의 렌트한 이력 조회
// 자동차의 id값 prop
// 차주만 확인가능 하면 차주의 아이디prop
const dump = [
  {id:1212},
  {id:1111}
]

const RentHistoryList = (props) =>{
  const [items, setItems] = useState([])
  // const {car_res_seq, res_rate} = props



  useEffect(()=>{
    setItems(dump)
    console.log('덤프가져오기',items)
  },[])
  // getItems aysnc() => {
  //   setItems(RentHistory.)

  // }



  // const option = {
  //   url =`http://localhost:3000/api/car/${carID}/history`,
  //   method:'GET',
  //   data:{
 
  //   }
  // }

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
    
  // },[])

  const RentSummary = (props)=>{
  const [items, setItems] = useState([])
  const {data} = props
  const [open, setOpen] = useState(false)

  useEffect(()=>{
    setItems(data)
    console.log('콘솔로그',items,data)
  },[])

  const onClickBtn = () =>{
    setOpen(!open)
  }

  return(
    <Box>
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      spacing={3}
    >
      <Grid
        item xs={6} key={items}
        display='flex'
        justifyContent='center'
        direction='column'
      >
          <Typography
            textAlign="center"
            color="textPrimary"
            gutterBottom
            variant="h6"
          >
            이용번호 : {items}
          </Typography>
          <Typography
            textAlign="center"
            color="textPrimary"
            gutterBottom
            variant="body1"  
          >
            사용시간
          </Typography>
        </Grid>

        <Grid itme xs={6}
          display='flex'
          direction='column'
          justifyContent='center'
          >
        <Typography>
            이용상태 : 이용중{}
          </Typography>
        <Grid
          item
          >            
        <Button
        justifyContent='center' 
        onClick={onClickBtn} 
        >
          이용종료 : 자세히보기
        </Button>

          </Grid>
          </Grid>
          {open?<RentHistory
          key={items}
          data={items}
          />:''}
    </Grid>
    </Box>
    )
  }

  return(
    <div>
      <p>자동차의 렌트이력을 조회합니다.</p>
      {/* 맵 */}
      {items.map(data => (
        <RentSummary
          key={data.id}
          data={data.id}
        />
      ))}
      {/* {items.map(data => (
        <RentHistory
          key={data.id}
          // id={data.id}
        />
      ))} */}
    
    </div>
  )
}

export default RentHistoryList