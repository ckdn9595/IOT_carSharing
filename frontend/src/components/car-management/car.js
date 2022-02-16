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
        carFuel:'',// 차량연료
        carRate:'', //차량 요금
        carImg:[], //차량 이미지
        rentInsurance:'N'//보험유무
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
    const [alert, setAlert] = useState(false)
    // //car-rent-historylist
    // const [items, setItems] = useState([])
    const [open, setOpen] = useState(false)
    // //car-rent-history
    // const [clickOn, setClickOn] = useState(false)
    // const [isDone, setIsDone] = useState(false)
    // car-rent-history-list
    const [list, setList] = useState([])
    // car-rent-history
    const [sendConfirm, setSendConfirm] = useState(true)
    
    // api
    const [token, setToken] = useState()
    
    // useEffect(()=>{
    //   // setRegister([])
    //   // setVisible(false)
    // },[])


    //

    useEffect(()=>{
      setToken(`Authorization: Bearer ${sessionStorage.getItem("access_token")}`)
    },[])


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
      alert, setAlert,
      //car-rent-historylist
      list, setList,
      open, setOpen,
      //car-rent-history
      sendConfirm, setSendConfirm,
      
      //api
      token,
      }}>
    <CarMain/>
    </CarContext.Provider>
  )
}
export default Car