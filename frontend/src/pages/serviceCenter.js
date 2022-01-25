import Head from 'next/head';
import { Box } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import ServiceInquirly from '../components/serviceCenter/serviceInquirly';

const ServiceCenter = () => (
  <>
    <Head>
      <title>
        고객센터 | 차키줘바
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <ServiceInquirly/>
    </Box>
  </>
);
ServiceCenter.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default ServiceCenter;