import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 자동차의 렌트한 이력 조회
const RentHistory = () =>{



  const option = {
    url =`http://localhost:3000/api/car/${carID}/history`,
    method:'GET',
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
      <p>자동차의 렌트이력을 조회합니다.</p>
    </div>
  )
}

export default RentHistory