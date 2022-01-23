import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 보험확인설정
const Insurance =() =>{
  const [동의, set동의]= useState(0)

  useEffect( async() =>{
    try{ 
      const response = await axios.post('http://localhost:3000/api/insurance',{
      body: {agree: 동의},
    })
      console.log(response.data)
    }catch(err){
      console.log(err)
    }

  },)

  return(
    <div>
      <p>보험 등록하기</p>
    </div>
  )
}

export default Insurance