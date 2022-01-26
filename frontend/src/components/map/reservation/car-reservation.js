import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 차량예약등록
// 차량정보 불러옴

const CarReservation = () =>{
  const [items , set]= useState({
    대여기간:"",
  })
  const 차량번호
  const 임차인아이디
  const 결제성공여부
  const 임대인확인여부

  useEffect( () =>{
    const fetch = async () => {
      try{
        const response = await axios.post(`http://localhost:3000/api/resevation/${carID}`, items)
        console.log(response.data)
      }catch(err){
        console.log(err)
      }
    }
    fetch()
  }, [])


  return(
    <div>
      <p>차량을 예약합니다</p>
      <table class="tg">
<thead>
  <tr>
    <th class="tg-0lax">차량사진</th>
    <th class="tg-0lax">차량이름</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">차량위치</td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">평점</td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">예약문의버튼</td>
  </tr>
  <tr>
    <td class="tg-0lax">차량정보</td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">차량리뷰</td>
    <td class="tg-0lax"></td>
  </tr>
</tbody>
</table>
    </div>
  )
}

export default CarReservation