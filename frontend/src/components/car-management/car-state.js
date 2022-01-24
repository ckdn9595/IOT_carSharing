import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 차량정보수정
// 차량 정보 보는 페이지
// 수정 삭제
// 버튼은 
const CarState = () =>{
  const [사진, set]= useState(['사진'])
  const [차량상태, set] = useState([])
  const [차량소개, set] = useState([])

  
  const option = {
    url ='http://localhost:3000/api/car/register',
    method:'PUT',
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
      <p>차량 정보를 수정합니다.</p>
      <table class="tg">
<thead>
  <tr>
    <th class="tg-0lax"></th>
    <th class="tg-0lax">차량등록하기</th>
    <th class="tg-0lax"></th>
    <th class="tg-0lax">차량삭제하기</th>
    <th class="tg-0lax"></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">차종</td>
    <td class="tg-0lax">쏘나타</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">임대중</td>
  </tr>
  <tr>
    <td class="tg-0lax">차량사진</td>
    <td class="tg-0lax">차량번호</td>
    <td class="tg-0lax">12가</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">보험상태</td>
    <td class="tg-0lax">임대가능기간보기</td>
    <td class="tg-0lax">이용내역보기</td>
    <td class="tg-0lax"></td>
  </tr>
</tbody>
</table>
    </div>
  )
}

export default CarState