import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 차량 이용 기간 설정
const RentPeriodSet = () =>{
  const [차량이용기간, set] = useState()

  const option = {
    url: `http://localhost:3000/api/car/${carID}/time`,
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

  },[])

  return(
    <div>
      <p>차량 이용기간 설정</p>
      <table class="tg">
<thead>
  <tr>
    <th class="tg-0lax">임대가능기간설정</th>
    <th class="tg-0lax"></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax">시작일자</td>
    <td class="tg-0lax">1일</td>
  </tr>
  <tr>
    <td class="tg-0lax">종료일자</td>
    <td class="tg-0lax">2일</td>
  </tr>
  <tr>
    <td class="tg-0lax">확인</td>
    <td class="tg-0lax">취소</td>
  </tr>
</tbody>
</table>
    </div>
  )
}

export default RentPeriodSet