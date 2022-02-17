import axios from 'axios'
import React, { useContext, useEffect, useState} from 'react'
import { DriveContext } from '../DriveContext';
import DriveState from './DriveState'
import { 
  Box, 
  Grid,
  Container, 
  Typography, 
  TextField, 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
} from '@mui/material';
import { API_BASE_URL } from 'src/config';


const DriveEndCheck = (props) => {
    const {resInfo, setResInfo,
        resCarInfo, setResCarInfo,
        token,
        setCheckEnd, setCheckStart,
        cardInfo, setCardInfo,
        endData, setEndData,
        } = useContext(DriveContext)
    const {payOpen, setPayOpen, rate, time} = props
    const [checkPicOpen, setCheckPicOpen] = useState(false)
    const [checkOpen, setCheckOpen] = useState(false)
    // 결제 보내기  
    const option = {
      url:`${API_BASE_URL}/user/payment`,
      method:'POST',
      headers:{Authorization: token},
      }
    const getResData = async()=>{
        try{
            const response = await axios(option)
            const data = await response.data.tempPayment
            // console.log(response)
            setCardInfo(data)
        }catch(err){
            console.log(err)
        }}
    // 날짜 문자로바꾸기
    const dateChange = (d) =>{
    let date = new Date(d)
    let year = date.getFullYear()
    let month = date.getMonth()+1 //1월 === 0
    let day = date.getDate()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    if (minutes<10){minutes='0'+minutes} if (hour<10){hour='0'+hour} 
    year = year.toString()
    month = month.toString()
    day = day.toString()
    hour = hour.toString()
    minutes = minutes.toString()
    const result = {year,month,day,hour,minutes}
    return result 
    }
    
    const getEndData = async() =>{
        let day = new Date()
        await setEndData({
            time:setTime(),
            rate:rate,
            card: cardInfo !==''? `${cardInfo.slice(0,4)}-****-****-****`: '1234-5678-9012-****',
            endDay:dateChange(day)
        })
   
    }

    useEffect(()=>{
        // setResData()  
        getResData()
        getEndData()
        console.log('엔드')
    },[payOpen])

    const sendConfirm =  async()=>{
        try{
            setPayOpen(false)
            setCheckStart(true)
            setCheckEnd(true)

        }catch(err){
            console.log(err)
        }}
    
    const setTime = () =>{
        let hour = parseInt(time / 60)
        let minute = time % 5
        return `${hour}시간 ${minute}분`
    }

    return(
        <>
        <Dialog
            open={payOpen}
            onClose={()=>{setPayOpen(false)}}
        >
            <DialogContent>
                <DialogTitle>
                    이용을 종료하시겠습니까?
                </DialogTitle>
                <Typography align='center'>
                    다음과 같은 요금이 결제 됩니다
                </Typography>

                <DialogContent>

                <DialogContentText>
                    이용시간 : {setTime()}
                </DialogContentText>
                <DialogContentText>
                    이용요금 : {rate} 원
                </DialogContentText>
                <DialogContentText>
                    결제방법 : {cardInfo !==''? `${cardInfo.slice(0,4)}-****-****-****`: '1234-5678-9012-****'}
                </DialogContentText>
                </DialogContent>
                </DialogContent>
            <DialogActions>
                <Button onClick={sendConfirm}>
                    결제하기
                </Button>
                <Button onClick={()=>{setPayOpen(false)}}>
                    취소
                </Button>
            </DialogActions>
        </Dialog>
        </>


    )
}
export default DriveEndCheck
