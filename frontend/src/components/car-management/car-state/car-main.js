import React, { useState, useEffect, useContext } from 'react';
import CarState from './car-state';
import {CarContext} from '../carContext'
import { 
  Box, 
  Grid,
  Container, 
  Typography, 
  TextField, 
  Button,
  Card,
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
  //
  Backdrop,
  Modal,
  Fade,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CarRegister from './car-register';
import axios from 'axios';
import Car from '../car'
import { API_BASE_URL } from 'src/config';

// 차량정보 불러와서 목록 조회하기
const OpenCarState = () => {
  const {register, carList, setCarList, 
    token, 
  } = useContext(CarContext)
  
  useEffect(()=>{
    // getList()
    console.log(carList)
    // console.log('carlist초기화성공',carList)
    // console.log('오픈카상태')
  },[])

// carlist 에서 car_seq를 맵으로 carstate에게 넘겨준다
// carstate에서 하나씩 get으로 데이터 가져온다
return (
  <Card
  >
  {/* {carList ? carList.map(car =>(
  <CarState key={car.car_seq} car={car}/>
  )):''} */}
  {carList && carList.map(car =>(<CarState key={car.car_seq} car={car}/>))}
  </Card>
)}

// 차량관리 구조
const CarMain = () => {
  const {
    visible, setVisible,
    carList, setCarList, token, setToken,
    sendSuccess, setSendSuccess,
  } = React.useContext(CarContext)
  const [registerVisible, setRegisterVisible] = useState(false)
  
  const onClickHandle = () =>{
    if (token === 'Bearer null'){
      alert('로그인이 필요합니다.')
    }
    else if (carList[0] !== undefined ){
      alert('이미 차량이 등록되어있습니다.')
    }else{
    // console.log(carList)
    setVisible(!visible)}

  }

  // carlist로 차량목록의 아이디만 가져옴
  // 내가가진 모든 차량을 불러옵니다
  // opencarstate로 출력하고
  // openCarstate에서 carstate로 보낸 값을 통해서 각 차량의 예약정보를 불러옵니다
  const getList= async() =>{
    const token = await `Bearer ${sessionStorage.getItem("access_token")}`
    const option = {
      url:`${API_BASE_URL}/car/mycar`,
      method:'GET',
      headers:{ Authorization: token },
      }
    try{
      const response = await axios(option)
      const gotData = await response.data[0]
      setCarList([gotData])
      // console.log(response.data,'responsedata')
      await console.log(carList,'car')
    }catch(err){
      console.log('list get error')
      console.log(err)
    }
  }
  
  // useEffect(()=>{
  //   setTimeout(3000)
  // },[])

  useEffect(()=>{
    getList()
  
    console.log('carmain on')
  },[sendSuccess])
  return(
    <Container
      sx={{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
      }}
    >

    <Card
      
      sx={{
        width:'500px',
        display: 'flex',
        minWidth:'200px',
        m: 1,
        p: 5,
        justifyContent:'space-between',
        bgcolor: 'background.paper',

    }}
    >
      <Typography sx={{minWidth:'50px'}}
        variant='h6'
        lineHeight='3'
      >
       차량 관리
      </Typography>
      {/* <Button onClick={()=>{setSendSuccess(!sendSuccess)}} label='button'>button</Button> */}
      <Button  
        sx={{minWidth:'50px'}}
        variant='contained'
        onClick={onClickHandle}
      >
        차량 등록
      </Button>
    </Card>
    <Card
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container> 
        <Modal
          open={visible}
          onClose={()=>{setVisible(false)}}
          closeAfterTransition
        >  
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
            <Box sx={{margin: '0 auto', float:'right'}}>
              <CloseOutlinedIcon onClick={()=>{setVisible(false)}} />
            </Box>
            <CarRegister/> 
          </Box>
        </Modal>
        </Container>    
    </Card>
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        p: 1,
        m: 1,
        width:'500px',

      }}
    >
      { carList && carList[0] !== undefined ? <OpenCarState /> : <Typography>등록된 차량이 없습니다</Typography> }
    </Card>
    </Container>
  )
}

export default CarMain
