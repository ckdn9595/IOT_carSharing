import { getCarInfo } from "src/api/car";

const GetCarInfo = (map, option) => {
  const imageSrc = "/static/images/carMarker.png", // 마커이미지의 주소입니다    
        imageSize = new window.kakao.maps.Size(32, 34), // 마커이미지의 크기입니다
        imageOption = {offset: new window.kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
  const makeOverListener = (map, marker, infowindow) => {
    return function() {
      infowindow.open(map, marker);
    };
  }

  // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
  const makeOutListener = (infowindow) => {
    return function() {
      infowindow.close();
    };
  }
    
  const searchCarInfo = async (map, option) => {
      // 지도의 현재 영역을 얻어옵니다 
    const bounds = map.getBounds();
    // 영역의 남서쪽 좌표를 얻어옵니다 
    const swLatLng = bounds.getSouthWest(); 
    // 영역의 북동쪽 좌표를 얻어옵니다 
    const neLatLng = bounds.getNorthEast(); 
    
    const location = {
        swLatLng,
        neLatLng
    }
    const param = JSON.stringify({
        option,
        location
    });
    await getCarInfo(
      param,
      (response) => {
        if (response.status === 200 ) {
          console.log(response.data);
          let positions = [];
          response.data.forEach(e => { 
            positions.push({
                content: `<div class="">
                            <div style="width:150px;" >
                              <img src="../../../../${e.car_img}" width="120px" height="auto" />
                              <hr/>
                              <hr/>
                              모델 : ${e.car_model}
                              <hr/>
                              연식 : ${e.car_year}
                            </div>
                          </div>`,
                latlng: new window.kakao.maps.LatLng(e.car_dy, e.car_dx),
                x:e.car_dx, 
                y:e.car_dy,
                car_seq:e.car_seq
            });
          });
      
          for (let i = 0; i < positions.length; i ++) {

        
            // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
            //       markerPosition = new window.kakao.maps.LatLng(positions[i].y, positions[i].x); // 마커가 표시될 위치입니다

            // // 마커를 생성합니다
            // var marker = new kakao.maps.Marker({
            //     position: markerPosition, 
            //     image: markerImage // 마커이미지 설정 
            // });

            // 마커를 생성합니다
            const marker = new window.kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커의 위치
                image: markerImage,
                clickable: true
            });
        
            // 마커에 표시할 인포윈도우를 생성합니다 
            const infowindow = new window.kakao.maps.InfoWindow({
                content: positions[i].content // 인포윈도우에 표시할 내용
            });
        
            // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
            // 이벤트 리스너로는 클로저를 만들어 등록합니다 
            // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
            window.kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            window.kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
            window.kakao.maps.event.addListener(marker, 'click', function() {
            window.location.href = `/searchDetail?no=${positions[i].car_seq}`;
            });
          }
        }else {
          
        }
      },
      (response) => {
              console.log(response.message);
      }
    );
  };

    searchCarInfo(map, option);
    window.kakao.maps.event.addListener(map, 'idle', function(){
    searchCarInfo(map, option)
  });
};
export default GetCarInfo;