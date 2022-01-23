import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 이용 기간 체크
// 렌트한 내용으로 보내야함
// 이용중인 상태표시
// 페이지
// 시간, 이용종료, 고객센터 가져옴
// 문이 닫히고 차량이 정지중이면 주차중, 정지중이면 정차중, 이동상태면 주행중//
// 차량이 주차인 상태에서만 차량 문 제어 가능
const RentTimeCheck = () =>{
  const 사용시간
  const 이동거리
  const 이용요금
  const 단위요금, 예약시간
  const 임차인정보
  const 임대인이용승인
  const 임대인반납확인

  useEffect( async() =>{
    try{
      const response = await axios.get(`http://localhost:3000/api/car/${carID}/time`)
      console.log(response.data)
    }catch(err){
      console.log(err)
    }

  }, [])

  return(
    <div>
      <p>예약차량의 이용중인 상태를 표시합니다.</p>
    </div>
  )
}
  

export default RentTimeCheck