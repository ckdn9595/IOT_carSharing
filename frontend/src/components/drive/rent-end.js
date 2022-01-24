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


  useEffect( () =>{
    const fetch = async () => {
      try{
        const response = await axios(option)
        console.log(response.data)
      }catch(err){
        console.log(err)
      }
    }
    fetch()
  }, [])

  return(
    <div>
      <p>이용이 끝났습니다.</p>
      <table class="tg">
<thead>
  <tr>
    <th class="tg-0lax">이용정보</th>
    <th class="tg-0lax"></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax">차량사진</td>
    <td class="tg-0lax">예약정보</td>
  </tr>
  <tr>
    <td class="tg-0lax">사진</td>
    <td class="tg-0lax">예약정보들</td>
  </tr>
  <tr>
    <td class="tg-0lax">이용시간</td>
    <td class="tg-0lax">1초</td>
  </tr>
  <tr>
    <td class="tg-0lax">이용거리</td>
    <td class="tg-0lax">100키로</td>
  </tr>
  <tr>
    <td class="tg-0lax">총사용요금</td>
    <td class="tg-0lax">십만원</td>
  </tr>
  <tr>
    <td class="tg-0lax">결제상태</td>
    <td class="tg-0lax">결제승인</td>
  </tr>
  <tr>
    <td class="tg-0lax">차주확인</td>
    <td class="tg-0lax">확인완료</td>
  </tr>
  <tr>
    <td class="tg-0lax">고객센터</td>
    <td class="tg-0lax">리뷰쓰기</td>
  </tr>
</tbody>
</table>

    </div>
  )
}

export default DriveEnd