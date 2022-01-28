import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RentHistory from './car-rent-history';

// 자동차의 렌트한 이력 조회
// 자동차의 id값 prop
// 차주만 확인가능 하면 차주의 아이디prop
const RentHistoryList = () =>{



  const option = {
    url: `http://localhost:3000/api/car/${carID}/history`,
    method:'GET',
    data:{
 
    }
  }

  useEffect( () =>{
    const fetch = async () => {
      try{
        const response = await axios(option)
        console.log(response.data)
      }catch(err){
        console.log(err)
      }
    }
    fetch()
    
  },[])
  return(
    <div>
      <p>자동차의 렌트이력을 조회합니다.</p>
      <RentHistory/>
    </div>
  )
}

export default RentHistoryList