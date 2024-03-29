
const CoordsInfo = (map, dispatch) =>{
    
    const geocoder = new window.kakao.maps.services.Geocoder();
    
    const clusterer = new window.kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
      minLevel: 10 // 클러스터 할 최소 지도 레벨 
    });
    
    searchDetailAddrFromCoords(map.getCenter(), function(result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const roadAddr = !!result[0].road_address ? result[0].road_address.address_name : '';
        const address = result[0].address.address_name;
        dispatch({ type: 'SET_ADDR', data: {address:address, roadAddr:roadAddr} });
       }
      const coords = map.getCenter();
      const markerPosition = new window.kakao.maps.LatLng(coords.getLat(), coords.getLng());
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      clusterer.addMarker(marker);
     });

     
    // var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
    //     infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    //searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    // kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    // searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
    //   if (status === window.kakao.maps.services.Status.OK) {
    //     var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
    //     detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
                
    //     var content = '<div class="bAddr">' +
    //                             '<span class="title">법정동 주소정보</span>' + 
    //                             detailAddr + 
    //                         '</div>';

    //             // 마커를 클릭한 위치에 표시합니다 
    //             marker.setPosition(mouseEvent.latLng);
    //             marker.setMap(map);

    //             // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
    //             infowindow.setContent(content);
    //             infowindow.open(map, marker);
    //         }   
    //     });
    // });
    
    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    window.kakao.maps.event.addListener(map, 'idle', function() {
      searchDetailAddrFromCoords(map.getCenter(), function(result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const roadAddr = !!result[0].road_address ? result[0].road_address.address_name : '';
          const address = result[0].address.address_name;
          dispatch({ type: 'SET_ADDR', data: {address:address, roadAddr:roadAddr} });
        }
      });
      clusterer.clear();
      const coords = map.getCenter();
      const markerPosition = new window.kakao.maps.LatLng(coords.getLat(), coords.getLng());
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      clusterer.addMarker(marker);
    });

    // function searchAddrFromCoords(coords, callback) {
    //     // 좌표로 행정동 주소 정보를 요청합니다
    //     geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
    // }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    // function displayCenterInfo(result, status) {
    //     if (status === kakao.maps.services.Status.OK) {
    //         var infoDiv = document.getElementById('centerAddr');

    //         for(var i = 0; i < result.length; i++) {
    //             // 행정동의 region_type 값은 'H' 이므로
    //             if (result[i].region_type === 'H') {
    //                 infoDiv.innerHTML = result[i].address_name;
    //                 break;
    //             }
    //         }
    //     }    
    // }
}

export default CoordsInfo;