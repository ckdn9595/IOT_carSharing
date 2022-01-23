import Head from 'next/head';
import { Box } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import MemberInfo from '../components/myPage/memberInfo';
import LicenseResi from '../components/myPage/licenseResi';
import PayCardInfo from '../components/myPage/payCardInfo';

const Account = () => (
  <>
    <Head>
      <title>
        내 정보 | 차키줘바
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <MemberInfo/>
    </Box>
    <Box
      component="main"
      sx={{
        flexGrow: 5,
        py: 8
      }}
    >
      <LicenseResi/>
    </Box>
    <Box
      component="main"
      sx={{
        flexGrow: 5,
        py: 8
      }}
    >
      <PayCardInfo/>
    </Box>
  </>
);

Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;
