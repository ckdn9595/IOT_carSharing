import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 체크리스트 작성
// 렌트한 내용으로 보내기
const CheckList = () =>{
  const [전방좌측휀더, set전방좌측휀더] = useState()
  const [전방우측휀더, set전방우측휀더] = useState()
  const [후방좌측휀더, set후방좌측휀더] = useState()
  const [우측휀더후방, set우측휀더후방] = useState()
  // 등 사진 상태 등록
  const [자가진단체크리스트, set자가진단체크리스트] = useState()

  option = {
    url:`http://localhost:3000/api/car/${carID}/history/checklist`,
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
      <p> 예약된 차량의 이용 전 상태를 등록합니다</p>
      <table class="tg">
<thead>
  <tr>
    <th class="tg-0lax">외부사진</th>
    <th class="tg-0lax">외부사진2</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax">사진1</td>
    <td class="tg-0lax">사진2</td>
  </tr>
  <tr>
    <td class="tg-0lax">내부사진</td>
    <td class="tg-0lax">내부사진2</td>
  </tr>
  <tr>
    <td class="tg-0lax">사진3</td>
    <td class="tg-0lax">사진4</td>
  </tr>
  <tr>
    <td class="tg-0lax">등록취소</td>
    <td class="tg-0lax">등록완료</td>
  </tr>
</tbody>
</table>

<table class="tg">
<thead>
  <tr>
    <th class="tg-0lax">체크리스트</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax">체크할것들</td>
  </tr>
  <tr>
    <td class="tg-0lax">제출하기</td>
  </tr>
</tbody>
</table>
    </div>
  )
}

export default CheckList