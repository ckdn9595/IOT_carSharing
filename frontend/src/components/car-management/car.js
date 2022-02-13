import App from '../../pages/_app'
import React, {useContext, useEffect, useState} from 'react'
import Customers from 'src/pages/reservation'
import { DashboardLayout } from '../dashboard-layout'
import CarMain from './car-state/car-main'

import {CarContext} from './carContext'

const Car = () => {
    // car-main
    const [register, setRegister] = useState([])
    const [visible, setVisible] = useState(false)
    const [carList, setCarList] = useState([])
    // car-register
    const [inputs, setInputs] = useState({
        carNum:'', //차량번호
        carModel:'', //차량이름
        carYear:'', //차량연식
        carSegment:'', //차량크기
        carFuel:'10',// 차량연료
        carRate:'', //차량 요금
        carImg:[], //차량 이미지
        rentInsurance:false//보험유무
      })
    const [postfiles, setPostfiles] = useState({
        file: [],
        previewURL: "",
      });
    const [imageUrl, setImageUrl] = useState(null)
    //car-state
    const [time, setTime] = useState(false)
    const [history, setHistory] = useState(false)
    const [insurance, setInsurance] = useState(false)
    const [insuranceCheck, setInsuranceCheck] = useState(false)
    //insurance 
    const [rent, setRent]= useState(false)
    // //car-rent-historylist
    // const [items, setItems] = useState([])
    // const [open, setOpen] = useState(false)
    // //car-rent-history
    // const [clickOn, setClickOn] = useState(false)
    // const [isDone, setIsDone] = useState(false)
    // car-rent-history-list
    const [list, setList] = useState([])
    // car-rent-history
    const [sendConfirm, setSendConfirm] = useState(true)
    
    // useEffect(()=>{
    //   // setRegister([])
    //   // setVisible(false)
    // },[])


    //

    // useEffect(()=>{
    //   switch(popState){
    //     case 'time':
    //         setTime(true),setHistory(false),setInsurance(false)
    //         break
    //     case 'insurance':
    //         setInsurance(true),setTime(false), setInsurance(false)   
    //         break
    //     case 'history':
    //         setTime(false),setInsurance(false),sethistory(true)
    //         break
    //     defalut:
    //         setTime(false),setInsurance(false),setHistory(false)
    //     }

    // },[popState])


  return (
    <CarContext.Provider value={{
      //car-main
      register,setRegister,
      visible, setVisible,
      carList, setCarList,
      // car-register
      inputs, setInputs,
      postfiles, setPostfiles,
      imageUrl, setImageUrl,
      //car-state
      time, setTime,
      history, setHistory,
      insurance, setInsurance,
      insuranceCheck, setInsuranceCheck,
      //insurance
      rent, setRent,
      //car-rent-historylist
      list, setList,
      //car-rent-history
      sendConfirm, setSendConfirm,
        
      }}>
    <CarMain/>
    </CarContext.Provider>
  )
}
export default Car