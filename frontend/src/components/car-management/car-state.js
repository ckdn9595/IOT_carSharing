import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 차량정보수정
const CarState = () =>{
  const [사진, set]= useState(['사진'])
  const [차량상태, set] = useState([])
  const [차량소개, set] = useState([])

  
  const option = {
    url ='http://localhost:3000/api/car/register',
    method:'PUT',
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
      <p>차량 정보를 수정합니다.</p>
    </div>
  )
}

export default CarState