import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 자동차의 렌트한 이력 조회
// 자동차의 id값 prop
// 차주만 확인가능 하면 차주의 아이디prop
const RentHistory = () =>{



  const option = {
    url: `http://localhost:3000/api/car/${carID}/history`,
    method:'GET',
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
      <p>자동차의 렌트이력을 조회합니다.</p>
      <table class="tg">
<thead>
  <tr>
    <th class="tg-0lax">이용번호</th>
    <th class="tg-0lax">1</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax">차번호</td>
    <td class="tg-0lax">12가나</td>
  </tr>
  <tr>
    <td class="tg-0lax">차종</td>
    <td class="tg-0lax">쏘나타</td>
  </tr>
  <tr>
    <td class="tg-0lax">사용시간</td>
    <td class="tg-0lax">어제~오늘</td>
  </tr>
  <tr>
    <td class="tg-0lax">이동거리</td>
    <td class="tg-0lax">1000키로</td>
  </tr>
  <tr>
    <td class="tg-0lax">이용요금</td>
    <td class="tg-0lax">천만원</td>
  </tr>
  <tr>
    <td class="tg-0lax">차량상태사진</td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">이용전</td>
    <td class="tg-0lax">이용후</td>
  </tr>
  <tr>
    <td class="tg-0lax">이용전사진</td>
    <td class="tg-0lax">이용후사진</td>
  </tr>
  <tr>
    <td class="tg-0lax">고객센터버튼</td>
    <td class="tg-0lax">이용종료버튼</td>
  </tr>
</tbody>
</table>
    </div>
  )
}

export default RentHistory