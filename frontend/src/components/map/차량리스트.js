import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 등록된 차량 불러오기
const CarList = () =>{
  const [차, set차] = useEffect(() =>{
    axios.get(`http://localhost:3000/api/search/detail/${carID}`)

    .then(response => console.log(response.data))
  }, [])

  return(
    <div>
      <p>차량리스트를 불러옵니다.</p>

      {차.map((item, index) =>{
        return(<p key={index}>{item}</p>)
      }) }
    </div>
  )
}

export default CarList