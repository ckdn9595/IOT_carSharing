import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 이용 종료
// 사용시간과, 체크리스트를 보냄
const DriveEnd = () =>{
  const [사용시간, set] = useState()
  const [체크리스트, set] = useState()

  option = {
    url:`http://localhost:3000/api/car/${carID}/history/`,
    method:'POST',
    data:{
    }
  }


  useEffect( async () =>{
    try{
      const response = await axios(option)
      console.log(response.data)
    }catch(err){
      console.log(err)
    }
  }, [])

  return(
    <div>
      <p>이용이 끝나고 사용시간과 체크리스트를 등록합니다.</p>
    </div>
  )
}

export default DriveEnd