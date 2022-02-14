import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import React, { useEffect } from "react";
import Map from 'src/components/kakaoMap/kakaoMap';

const Dashboard = () => {
  // const container = useRef(null);
  // useEffect(() => {
  //   const options = {
  //     //지도를 생성할 때 필요한 기본 옵션
  //     center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  //     level: 3, //지도의 레벨(확대, 축소 정도)
  //   };
  //   new window.kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
  //   return () => {};
  // }, []);

  return (
  <>
    <Head>
      <title>
        Dashboard | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1
      }}
    >
      <Container maxWidth={false}>
        <Map/>
      {/* <div
        className="map"
        style={{ width: "500px", height: "500px" }}
        ref={container}
      ></div> */}
      </Container>
    </Box>
  </>
  )
};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
