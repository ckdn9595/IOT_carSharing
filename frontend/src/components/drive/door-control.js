import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 문 제어
const DoorControl = () =>{
  const [Door, SetDoor]= useState(0)

  useEffect( () =>{
    const fetch = async () => {
      try{
        const response = await axios.get(`http://localhost:3000/api/${carID}/문제어`)
        console.log(response.data)
      }catch(err){
        console.log(err)
      }
    }
    fetch()

  }, [])

  return(
    <div>
      <p>문 제어상태를 설정합니다.</p>
      <button value="오픈"/>
      <button value="잠금"/>
    </div>
  )
}

export default DoorControl