import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 차량예약등록
//

const reservationHistory = () =>{
  const [items , set]= useState({
    대여기간:"",
  })


  useEffect(async() =>{
    try{ 
      const response = await axios.get(`http://localhost:3000/api/resevation/${carID}/history`, items)
      console.log(response.data)
    }catch(err){
      console.log(err)
    }
  }, [])

  return(
    <div>
      <p>차량을 예약합니다</p>
    </div>
  )
}

export default reservationHistory