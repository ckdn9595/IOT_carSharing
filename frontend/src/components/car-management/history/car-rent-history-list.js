import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RentHistory from './car-rent-history';

// 자동차의 렌트한 이력 조회
// 자동차의 id값 prop
// 차주만 확인가능 하면 차주의 아이디prop
const dump = [
  {id:1212},
  {id:1111}
]

const RentHistoryList = (props) =>{
  const [items, setItems] = useState([])
  const {car_res_seq, res_rate} = props


  useEffect(()=>{
    setItems(dump)
  
  },[])
  // getItems aysnc() => {
  //   setItems(RentHistory.)

  // }



  // const option = {
  //   url =`http://localhost:3000/api/car/${carID}/history`,
  //   method:'GET',
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
    
  // },[])

  return(
    <div>
      <p>자동차의 렌트이력을 조회합니다.</p>
      {/* 맵 */}
      {items.map(data => (
        <RentHistory
          key={data.id}
          // id={data.id}
        />
      ))}
    
    </div>
  )
}

export default RentHistoryList