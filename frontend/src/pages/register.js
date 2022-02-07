import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DateFnsUtils from '@date-io/date-fns';
import {
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
  Typography,
  Radio,
  FormControl
} from '@mui/material';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { registerUser } from "../api/member.js";

const makeDatetoString = (date) => {
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return year + '/' + month + '/' + day;
}

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      userId: '',
      userName: '',
      userPassword: '',
      userPasswordCh: '',
      userPhone: '',
      userGender: '',
      userBirth: new Date(),
      userPrivacyPolicy: false,
      userLocationBasedService: false
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
        .required('Password is required')
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
        .date()
        .required(
          'date is required')
        .nullable(),
      userGender: Yup
        .string()
        .max(2),
      userPrivacyPolicy: Yup
        .boolean()
        .oneOf(
          [true],
          'This field must be checked'
        ),
      userLocationBasedService: Yup
        .boolean()
        .oneOf(
          [true],
          'This field must be checked'
        )
    }),
    onSubmit: async (data, {setSubmitting}) => {
      setSubmitting(true);
      let date = data.userBirth;
      data.userBirth = makeDatetoString(date);
      await registerUser(
        data,
        (response) =>{
          console.log(response);
          if (response.status === 200 ) {
            alert('가입 성공')
            router.push('/');
          } else {
            alert('가입 실패, 다시 시도해주세요');
          }
        },
        () => {alert('가입 실패!!')}
      );
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
              label="id"
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
              label="name"
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
              label="password"
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
              label="password"
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
              label="phone ex) 01012345678"
              margin="normal"
              name="userPhone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.userPhone}
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: 1
              }}
            >
              <MuiPickersUtilsProvider 
                utils={DateFnsUtils} 
                >
                <KeyboardDatePicker
                  disableToolbar
                  variant='dialog'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='date-picker'
                  name='userBirth'
                  label='date of birth'
                  value={formik.values.userBirth}
                  onChange={ (e) => {formik.setFieldValue('userBirth', e);}}
                  KeyboardButtonProps={
                    {'aria-label':'change date'}
                  }
                  />
              </MuiPickersUtilsProvider>
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: 1
              }}
            >
              <FormControl margin="normal">
                <FormLabel> 성별</FormLabel>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: 3,
                    mt: 2
                  }}
                >
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
                </Box>
              </FormControl>
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: 1,
                mt: 2
              }}
            >
              <Checkbox
                // checked={formik.values.userPrivacyPolicy}
                name="userPrivacyPolicy"
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
                    개인정보처리방침
                  </Link>
                </NextLink>
                에 동의합니다.
              </Typography>
            </Box>
            {Boolean(formik.touched.userPrivacyPolicy && formik.errors.userPrivacyPolicy) && (
              <FormHelperText error>
                {formik.errors.userPrivacyPolicy}
              </FormHelperText>
            )}
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: 1,
                mt: 2
              }}
            >
              <Checkbox
                // checked={formik.values.userLocationBasedService}
                name="userLocationBasedService"
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
                    위치정보활용
                  </Link>
                </NextLink>
                에 동의합니다.
              </Typography>
            </Box>
            {Boolean(formik.touched.userLocationBasedService && formik.errors.userLocationBasedService) && (
              <FormHelperText error>
                {formik.errors.userLocationBasedService}
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
