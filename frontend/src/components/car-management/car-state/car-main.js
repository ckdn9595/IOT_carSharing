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

// 차량정보 불러와서 목록 조회하기
const OpenCarState = () => {
  const {register, carList, setCarList} = useContext(CarContext)

  
  // const option = {
  //   url:`http://localhost:8001/api/car/5/info`,
  //   // url:`https://i6a104.p.ssafy.io/api/car/35/info`,
  //   method:'GET',
  //   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
  //   }

  //   const getList= async() =>{
  //     try{
  //       const response = await axios(option)
  //       setCarList([...carList, response.data])
  //       console.log(carList)
  //     }catch(err){
  //       console.log('list get error')
  //       }
  //   }

  useEffect(()=>{
        // getList()
        console.log(carList)
  },[])

// carlist 에서 car_seq를 맵으로 carstate에게 넘겨준다
// carstate에서 하나씩 get으로 데이터 가져온다
return (
  <Card
  >
  {carList.map(car =>(
  <CarState key={car.carNum} car={car}/>
  ))}
  </Card>
)}

// 차량관리 구조
const CarMain = () => {
  const {visible, setVisible, carList, setCarList, token} = React.useContext(CarContext)
  const [registerVisible, setRegisterVisible] = useState(false)
  const onClickHandle = () =>{
    setVisible(!visible)
  }
  
  // carlist로 차량목록의 아이디만 가져옴
  const option = {
    url:`http://localhost:8001/api/car/27/info`,
    // url:`https://i6a104.p.ssafy.io/api/car/35/info`,
    method:'GET',
    headers:{token},
    }

  const getList= async() =>{
    try{
      const response = await axios(option)
      setCarList([...carList, response.data])
      console.log(response.data)
    }catch(err){
      console.log('list get error')
    }
  }
  
  useEffect(()=>{
    getList()
    console.log('초기화성공',carList)
  },[])
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
            width: 400,
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
      { carList && carList.length !== 0 ? <OpenCarState /> : <Typography>등록된 차량이 없습니다</Typography> }
    </Card>
    </Container>
  )
}

export default CarMain
