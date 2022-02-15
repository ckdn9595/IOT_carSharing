import React, { useState } from 'react'
import {DriveContext} from './DriveContext'
import DriveStart from './driveReady/DriveStart'
import DriveOn from './driveOn/DriveOn'
import DriveEnd from './driveEnd/DriveEnd'
import DriveCheckList from './driveReady/DriveCheckList'

const Drive =() => {
  const [resInfo, setResInfo] = useState({}) // 예약정보
  const [resCarInfo, setResCarInfo] = useState({}) // 예약차량정보
  // DriveCheckList
  const [resCheckList, setResCheckList] = useState({})
  const [resResPicture, setResPicture] = useState({})
  // DriveCommon
  const [customerHelp, setCustomerHelp] = useState(false)
  const [doorOpen, setDoorOpen] = useState(false)
  // DriveOn
  // const []

  const resDump = {
    res_info_seq: 123,
    car_seq: 1, 
    usr_seq: 10, 
    car_res_date_start: '1995-12-17T03:24:00',
    car_res_date_end: '1996-1-24T03:24:00',
    res_res_check: false,
    res_reg_dt: '',//DataTypes.DATE
  }
  const N= 'n'
  const resCarDump = {
    car_res_seq: 1,
    owner_usr_seq: 20,
    usr_seq: 1, // 이용자 정보
    res_info_seq: 123,
    car_seq: 1,
    chat_seq: '',//채팅방 정보
    res_date_start: '1995-12-17T03:24:00',
    res_date_end: '1996-1-24T03:24:00',
    res_realtime: 7,
    res_rate: 150,
    res_img: '타기전체크이미지',
    res_check: '차량체크리스트',
    res_pay_valid: N,
    res_drive_valid: N,
    res_end_valid:N,
    res_door_on: N
  }

  return (
    <DriveContext.Provider value={{
      //DriveStart
      resInfo, setResInfo,
      resCarInfo, setResCarInfo,
      //DriveCheckList
      resCheckList, setResCheckList,
      resResPicture, setResPicture,
      //DriveOn

      //Dump
      resCarDump, resDump,
    }}>
      <DriveStart/>
{/* 
      // <DriveOn/> */}
      {/* <DriveEnd/> */}
      {/* <DriveCheckList/>  */}
    </DriveContext.Provider>
    
  )
}

export default Drive