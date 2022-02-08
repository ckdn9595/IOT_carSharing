import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import { login, getUserInfo } from "../api/member.js";
import { useUsersState, useUsersDispatch } from 'src/context/UserContext.js';

const Login = () => {
  const dispatch = useUsersDispatch();
  const getInfo = async() => {
    await getUserInfo(
      (response) => {
        console.log(response);
        if (response.status === 200 ) {
          dispatch({ type: 'GET_USER_SUCCESS', data: response.data });
          localStorage.loginData = JSON.stringify(response.data);
        } else {
         console.log("유저 정보 가져오기 오류");
        }
      },
      () => {
             console.log("유저 정보 가져오기 연결 오류");
            }
    );
  }
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      userId: '',
      userPassword: ''
    },
    validationSchema: Yup.object({
      userId: Yup
        .string()
        .max(255)
        .required(
          'id is required'),
      userPassword: Yup
        .string()
        .max(255)
        .required(
          'Password is required'),
    }),
    onSubmit: async (e) => {
      let member = e;
      dispatch({ type: 'GET_USER', data: null });
      await login(
        member,
        (response) => {
          console.log(member);
          console.log(response);
          if (response.status === 200 ) {
            let token = response.data["token"];
            sessionStorage.setItem("access_token", token);
            getInfo();
            router.push('/');
          } else {
            dispatch({ type: 'GET_USER_ERROR', error: e });
            alert('아이디/비밀번호 확인해주세요.');
          }
        },
        (response) => {
                console.log(response.message);
                alert('아이디/비밀번호 확인해주세요.');
                dispatch({ type: 'GET_USER_ERROR', error: e });
              }
      );
    }
  });
  const formik2 = useFormik({
    initialValues: {
     
    },
   
    onSubmit: () => {
      alert("Oauth 기능(추후)");
    }
  });
  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              뒤로 가기
            </Button>
          </NextLink>
          <form onSubmit={formik2.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                로그인
              </Typography>
              <Typography
                align="center"
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                간편 로그인
              </Typography>
            </Box>
	          <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={
                    // formik.setStatus({formik.isOauth:true});
                    formik2.handleSubmit
                  }
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={formik2.handleSubmit}
                  size="large"
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
	        </form>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                회원 로그인
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.id && formik.errors.id)}
              fullWidth
              helperText={formik.touched.id && formik.errors.id}
              label="id"
              margin="normal"
              name="userId"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="id"
              value={formik.values.userId}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="userPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.userPassword}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                로그인
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              회원이 아니신가요?
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  회원가입
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
