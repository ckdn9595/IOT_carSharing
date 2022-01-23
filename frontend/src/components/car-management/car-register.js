import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 차량등록
const CarRegister = () =>{
  const 차주

  const [차량번호, set] = useState()
  const [차종, set] = useState()
  const [차량크기, set] = useState()
  const [사진, set]= useState(['사진'])
  const [차량상태, set] = useState([])
  const [차량소개, set] = useState([])

  const option = {
    url ='http://localhost:3000/api/car/register',
    method:'POST',
    data:{
 
    }
  }

  useEffect( async() =>{
    try{
      const response = await axios(option)
      console.log(response.data)
    }catch(err){
      console.log(err)
    } 
   
  },[])
  return(
    <div>
      <p>자동차를 등록합니다</p>
    </div>
  )
}

export default CarRegister