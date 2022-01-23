import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 차량 이용 기간 설정
const RentPeriodSet = () =>{
  const [차량이용기간, set] = useState()

  const option = {
    url =`http://localhost:3000/api/car/${carID}/time`,
    method:'POST',
    data:{

    }
  }

  useEffect(async() =>{
    try{
      const response = await axios(option)
      console.log(response.data)
    }catch(err){
      console.log(err)
    }

  },[])

  return(
    <div>
      <p>차량 이용기간 설정</p>
    </div>
  )
}

export default RentPeriodSet