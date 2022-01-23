import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 체크리스트 작성
// 렌트한 내용으로 보내기
const CheckList = () =>{
  const [전방좌측휀더, set] = useState()
  const [전방우측휀더, set] = useState()
  const [후방좌측휀더, set] = useState()
  const [후방우측휀더, set] = useState()
  // 등 사진 상태 등록
  const [자가진단체크리스트, set] = useState()

  option = {
    url:`http://localhost:3000/api/car/${carID}/history/checklist`,
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
      <p> 예약된 차량의 이용 전 상태를 등록합니다</p>
    </div>
  )
}

export default CheckList