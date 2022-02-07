import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 자동차의 렌트한 이력 조회
// 자동차의 id값 prop
// 차주만 확인가능 하면 차주의 아이디prop
const dump = {
  car_res_seq:1,
  owner_seq:12,
  usr_seq:3,
  res_info_seq:1101,
  car_seq:1232,
  chat_seq:11,
  res_date:'2022-01-01-18:00 ~ 2022-01-02-14:00:',
  res_realtime:600,
  res_rate:60000,
  res_img:'',
  res_check:'',
  res_pay_valid:true,
  res_end_valid:true,
  res_drive_valid:false,
  res_door_on:false,
  }
const RentHistory = (props) =>{
  const {id} = props
  const [clickOn, setClickOn] = useState(false)
  const [data, setData] = useState({})
  const [isDone, setIsDone] = useState(false)

  // const getData = async() =>{
  //   try{
  //     // const response = await axios({
  //     //   url =`http://localhost:3000/api/car/${carId}/history`,
  //     //   method:'GET',
  //     // })
  //     const response = await axios.get(
  //       url =`http://localhost:3000/api/car/${carId}/history`
  //       )
  //     console.log(response.data)
  //     setData(response.data)
  //   } catch (error){
  //     alert('error!')
  //   }
  // }
  useEffect(()=>{
    setData(dump)
    setIsDone(dump.res_end_valid)
  },[])



  return(
    <div>
      <table class="tg">
<thead>
  <tr>
    <th class="tg-0lax">이용번호</th>
    <th class="tg-0lax">{data.res_info_seq}</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax">차번호</td>
    <td class="tg-0lax">{data.car_seq}</td>
  </tr>
  <tr>
    <td class="tg-0lax">차종</td>
    <td class="tg-0lax">{data.car_seq}의 차</td>
  </tr>
  <tr>
    <td class="tg-0lax">사용시간</td>
    <td class="tg-0lax">{data.res_date}</td>
  </tr>
  <tr>
    <td class="tg-0lax">이동거리</td>
    <td class="tg-0lax">api찾기</td>
  </tr>
  <tr>
    <td class="tg-0lax">이용요금</td>
    <td class="tg-0lax">{data.res_rate}</td>
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
      { isDone? <td class="tg-0lax">'사용완료'</td>:<td class="tg-0lax">고객센터버튼</td>}
  </tr>
</tbody>
</table>
    </div>
  )
}

export default RentHistory