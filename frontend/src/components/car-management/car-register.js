import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 차량등록
// 사용자 prop
const CarRegister = () =>{
  // const 차주

  // const [차량번호, set] = useState()
  // const [차종, set] = useState()
  // const [차량크기, set] = useState()
  // const [사진, set]= useState(['사진'])
  // const [차량상태, set] = useState([])
  // const [차량소개, set] = useState([])

  // const option = {
  //   url ='http://localhost:3000/api/car/register',
  //   method:'POST',
  //   data:{
 
  //   }
  // }

  // useEffect( () =>{
  //   const fetch = async () => {
  //     try{
  //       const response = await axios(option)
  //       console.log(response.data)
  //     }catch(err){
  //       console.log(err)
  //     }
  //   } 
  //   fetch()

  // },[등록])

  return(
    <div>
      <p>자동차를 등록합니다</p>
      <table class="tg">
<thead>
  <tr>
    <th class="tg-0pky">차량번호</th>
    <th class="tg-0pky">번호입력</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">차종</td>
    <td class="tg-0pky">차종입력</td>
  </tr>
  <tr>
    <td class="tg-0pky">연식</td>
    <td class="tg-0pky">연식입력</td>
  </tr>
  <tr>
    <td class="tg-0pky">차량외부사진</td>
  </tr>
  <tr>
    <td class="tg-0pky">외부사진</td>
  </tr>
  <tr>
    <td class="tg-0pky">차량내부사진</td>
  </tr>
  <tr>
    <td class="tg-0pky">내부사진</td>
  </tr>
  <tr>
    <td class="tg-0pky">추가설정</td>
  </tr>
  <tr>
    <td class="tg-0pky">체크리스트</td>
  </tr>
  <tr>
    <td class="tg-0pky">차량소개</td>
  </tr>
  <tr>
    <td class="tg-0lax">소개하기</td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax">차량등록</td>

  </tr>
</tbody>
</table>
    </div>
  )
}

export default CarRegister