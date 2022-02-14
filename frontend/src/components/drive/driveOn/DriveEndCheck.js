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

const DriveEndCheck = (props) => {
    const {resInfo, setResInfo,
        resCarInfo, setResCarInfo,
        } = useContext(DriveContext)
    const {payOpen, setPayOpen} = props
    // 결제 보내기  
    // const option = {
    //   url:`http://localhost:8001/api/car/아이디/예약정보`,
    //   method:'POST',
    //   headers:{Authorization: `Bearer ${sessionStorage.getItem("access_token")}`},
    //   }

    // const getResData = async()=>{
    //     try{
    //         const response = awiat axios(option)
    //     }catch{
    //         console.log(err)
    //     }}

    useEffect(()=>{
        // setResData()   
    },[])
    const sendConfirm =  async()=>{
        try{
            // const response = await axios(option)
            setPayOpen(false)
        }catch(err){
            console.log(err)
        }}



    return(
        <>
        <Dialog
            open={payOpen}
            onClose={()=>{setPayOpen(false)}}
        >
            <DialogContent>
                <DialogContentText>
                    이용을 종료하시겠습니까?
                    다음과 같은 요금이 결제 됩니다.
                </DialogContentText>
                <Typography>
                    이용시간 :{resInfo.realtime}
                </Typography>
                <Typography>
                    이용요금 :
                </Typography>
                    결제방법 :
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
