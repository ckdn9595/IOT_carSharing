import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import Insurance from 'src/components/car-management/insurance/insurance';
import CarReview from 'src/components/car-management/review/car-review-create';
import Review from 'src/components/car-management/review/review'
import ReviewList from 'src/components/car-management/review/review-list'
import CarRegister from 'src/components/car-management/car-register';

const Customers = () => (
  <>
    <Head>
      <title>
        Customers | Material Kit
      </title>
    </Head>
    {/* <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box> */}
    {/* <Insurance/>
    <CarReview/>
    <ReviewList/>
    <Review/> */}
    <CarRegister/>

  </>
);
Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
