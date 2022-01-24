import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 예약한 차량 내역 불러오기
// 
const DriveStart = () =>{

  useEffect( () =>{
    const fetch = async () => {
      try{
        const response = await axios.get(`http://localhost:3000/api/resevation/${carID}`)
        console.log(response.data)
      }catch(err){
        console.log(err)
      }
    }
    fetch()

  }, [])

  return(
    <div>
      <p>예약한 차량의 내역을 불러옵니다</p>
      <table class="tg">
<thead>
  <tr>
    <th class="tg-0lax">예약정보</th>
    <th class="tg-0lax"></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax">사진</td>
    <td class="tg-0lax">이용기간</td>
  </tr>
  <tr>
    <td class="tg-0lax">차량위치찾기</td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">내외부사진찍기</td>
    <td class="tg-0lax">탑승전점검하기</td>
  </tr>
  <tr>
    <td class="tg-0lax">문열기</td>
    <td class="tg-0lax">문닫기</td>
  </tr>
  <tr>
    <td class="tg-0lax">운행시작</td>
    <td class="tg-0lax"></td>
  </tr>
</tbody>
</table>
    </div>
  )
}

export default DriveStart