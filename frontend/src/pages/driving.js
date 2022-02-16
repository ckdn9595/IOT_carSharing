import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';

import Drive from 'src/components/drive/Drive';
const Driving = () => (
  <>
    <Head>
      <title>
      차량이용정보 | 차키줘봐
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 5,
        py: 8
      }}
    >
      <Drive/>
    </Box>
  </>
);
Driving.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Driving;
