import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 차량리뷰 작성,읽기
const CarReview = () =>{
  const 차량이름
  const 임대인이름
  const 이용일자

  const [리뷰내용, set] = useState()
  const [평점, set] = useState()
  const [사진, set] = useState()

  
  const option = {
    url =`http://localhost:3000/api/car/${carID}/review`,
    method:'xxxx',
    data:{
      name:'',
      user:'',
      content:'',
      rate:'',
      car_image:'',  
    }
  }

  useEffect( async() =>{
    try{
      const response = await axios(option)
      console.log(response.data)
    }catch(err){
      console.log(err)
    } 
   
  },[])

  return(
    <div>
      <p>자동차 리뷰 등록</p>
    </div>
  )
}

export default CarReview