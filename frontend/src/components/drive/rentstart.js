import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 예약한 차량 내역 불러오기
// 
const DriveStart = () =>{

  useEffect( async() =>{
    try{
      const response = await axios.get(`http://localhost:3000/api/resevation/${carID}`)
      console.log(response.data)
    }catch(err){
      console.log(err)
    }

  }, [])

  return(
    <div>
      <p>예약한 차량의 내역을 불러옵니다</p>
    </div>
  )
}

export default DriveStart