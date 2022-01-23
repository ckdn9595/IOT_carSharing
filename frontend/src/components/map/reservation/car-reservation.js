import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 차량예약등록
//

const CarReservation = () =>{
  const [items , set]= useState({
    대여기간:"",
  })
  const 차량번호
  const 임차인아이디
  const 결제성공여부
  const 임대인확인여부

  useEffect( async() =>{
    try{
      const response = await axios.post(`http://localhost:3000/api/resevation/${carID}`, items)
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

export default DriveStart