import { getCarInfo } from "src/api/car";

const GetCarInfo = (map) =>{
    
    const searchCarInfo = async (map) => {
        // 지도의 현재 영역을 얻어옵니다 
        const bounds = map.getBounds();
        // 영역의 남서쪽 좌표를 얻어옵니다 
        const swLatLng = bounds.getSouthWest(); 
        // 영역의 북동쪽 좌표를 얻어옵니다 
        const neLatLng = bounds.getNorthEast(); 
        console.log(swLatLng);
        console.log(neLatLng);
        const location = {
            swLatLng,
            neLatLng
        }
        const option = "editLater";
        const param = JSON.stringify({
            option,
            location
        });
        console.log(param);
        await getCarInfo(
            param,
            (response) => {
              console.log(response);
              if (response.status === 200 ) {
                
              } else {
                
              }
            },
            (response) => {
                    console.log(response.message);
                  }
          );
    }

    searchCarInfo(map);

}

export default GetCarInfo;