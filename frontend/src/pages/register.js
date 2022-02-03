import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DateFnsUtils from '@date-io/date-fns';
import {
  Grid,
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  Typography,
  Radio,
  FormControl
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const makeDatetoString = (date) => {
  if(!date){
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    return year + '/' + month + '/' + day;
  }
}
const makeStringtoDate = (dateStr) => {
  let parts = dateStr.split('/');
  console.log(new Date(parts[0], parts[1] - 1, parts[2]));
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

const Register = () => {
  const router = useRouter();
  // let dateStr = makeDatetoString();
  const formik = useFormik({
    initialValues: {
      userId: '',
      userName: '',
      userPassword: '',
      userPasswordCh: '',
      userPhone: '',
      userGender: '',
      userBirth: makeDatetoString(),
      policy: false
    },
    validationSchema: Yup.object({
      userId: Yup
        .string()
        .email(
          'Must be a valid userId')
        .max(255)
        .required(
          'Id is required'),
      userName: Yup
        .string()
        .max(255)
        .required(
          'Name is required'),
      userPassword: Yup
        .string()
        .matches(
          /(?=.*\d)(?=.*[a-z]).{8,}/,
          "영어소문자, 숫자 포함 8자 이상의 비밀번호"
        )
        .max(255)
        .required(
          'Password is required'),
      userPasswordCh: Yup
        .string()
        .max(255)
        .required()
        .oneOf([Yup.ref("userPassword"), null], "Passwords must match"),
      userPhone: Yup
        .string()
        .max(255)
        .matches(
          /^\d{11}$/,
          "숫자 11자리"
        )
        .required(
          'phone is required'),
      userBirth: Yup
        .string()
        .max(10),
      userGender: Yup
        .string()
        .max(2),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'This field must be checked'
        )
    }),
    onSubmit: (data, {setSubmitting}) => {
      setSubmitting(true);
      console.log(data);
      setSubmitting(false);
    }
  });

  return (
    <>
      <Head>
        <title>
          Register | Material Kit
        </title>
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
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                회원가입
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                회원가입!!
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.userId && formik.errors.userId)}
              fullWidth
              helperText={formik.touched.userId && formik.errors.userId}
              label="아이디"
              margin="normal"
              name="userId"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.userId}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.userName && formik.errors.userName)}
              fullWidth
              helperText={formik.touched.userName && formik.errors.userName}
              label="이름"
              margin="normal"
              name="userName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.userName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.userPassword && formik.errors.userPassword)}
              fullWidth
              helperText={formik.touched.userPassword && formik.errors.userPassword}
              label="비밀번호"
              margin="normal"
              name="userPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.userPassword}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.userPasswordCh && formik.errors.userPasswordCh)}
              fullWidth
              helperText={formik.touched.userPasswordCh && formik.errors.userPasswordCh}
              label="비밀번호 확인"
              margin="normal"
              name="userPasswordCh"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.userPasswordCh}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.userPhone && formik.errors.userPhone)}
              fullWidth
              helperText={formik.touched.userPhone && formik.errors.userPhone}
              label="전화번호 ex) 01012345678"
              margin="normal"
              name="userPhone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.userPhone}
              variant="outlined"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid 
                Container
                justify='space-around'>
                <KeyboardDatePicker
                  disableToolbar
                  variant='dialog'
                  format='MM/dd/yyy'
                  margin='normal'
                  id='date-picker'
                  label='Date Picker'
                  value={makeStringtoDate(formik.values.userBirth)}
                  onChange={formik.handleChange}
                  KeyboardButtonProps={
                    {'aria-label':'change date'}
                  }
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <FormControl margin="normal">
              <FormLabel> 성별</FormLabel>
              <RadioGroup 
                defaultValue={formik.values.userGender}
                margin="normal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="userGender"
                >
                <FormControlLabel
                  value="M" 
                  control={<Radio />} 
                  label="Male" />
                <FormControlLabel 
                  value="F" 
                  control={<Radio />} 
                  label="Female" />
              </RadioGroup>
            </FormControl>
            
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                <NextLink
                  href="#"
                  passHref
                >
                  <Link
                    color="primary"
                    underline="always"
                    variant="subtitle2"
                  >
                    이용약관
                  </Link>
                </NextLink>
                에 동의합니다.
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                제출
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              회원이신가요?
              {' '}
              <NextLink
                href="/login"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  로그인
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
