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

  useEffect( () =>{
    const fetch = async () => {
      try{
        const response = await axios.get(`http://localhost:3000/api/car/${carID}/time`)
        console.log(response.data)
      }catch(err){
        console.log(err)
      }
    }
    fetch()

  }, [])

  return(
    <div>
      <p>예약차량의 이용중인 상태를 표시합니다.</p>
      <table class="tg">
<thead>
  <tr>
    <th class="tg-0lax">신고</th>
    <th class="tg-0lax"></th>
    <th class="tg-0lax">고객센터</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">차량운행상태</td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">사용시간</td>
    <td class="tg-0lax">주행거리</td>
    <td class="tg-0lax">단위요금</td>
  </tr>
  <tr>
    <td class="tg-0lax">10초</td>
    <td class="tg-0lax">100키로</td>
    <td class="tg-0lax">오백원</td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">실시간이용요금</td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">결제수단</td>
    <td class="tg-0lax">문컨트롤</td>
    <td class="tg-0lax">이용종료</td>
  </tr>
</tbody>
</table>
    </div>
    
  )
}
  

export default RentTimeCheck