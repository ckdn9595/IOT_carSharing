import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReservationHistory from './reservation-history';

// 임차인이 빌린 내역


const ReservationHistoryList = () =>{
  const [items , set]= useState({
    대여기간:"",
  })


  useEffect( () =>{
    const fetch = async () => {
      try{
        const response = await axios.get(`http://localhost:3000/api/resevation/${carID}/history`, items)
        console.log(response.data)
      }catch(err){
        console.log(err)
      }
    }
    fetch()

  }, [])

  return(
    <div>
      <p>예약내용</p>
      <ReservationHistory/>
    </div>
  )
}

export default ReservationHistoryList