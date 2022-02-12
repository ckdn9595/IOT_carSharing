import { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Grid,
  Container,
  TextField
} from '@mui/material';
import { useUsersState, useUsersDispatch } from 'src/context/UserContext';
import { modifyUser } from "src/api/member.js";

export const AccountProfile = (props) => {
  const dispatch = useUsersDispatch();
  const userState = useUsersState().user;
  const [showEdit, setShow] = useState(false);
  const [values, setValues] = useState({
    userPhone: (userState.data) ? userState.data.userPhone : '',
    userPassword: '',
  });
  const [userPhoneError, setUserPhoneError] = useState(false);
  const [userPassError, setUserPassError] = useState(false);
  
  useEffect(  ()=>{
    console.log("phoneChange");
    const regexPhone = /^\d{11}$/;
    setUserPhoneError(!regexPhone.test(values.userPhone));
    if(values.userPhone=='')setUserPhoneError(false);
  }, [values.userPhone]);

  useEffect(  ()=>{
    const regexPass = /(?=.*\d)(?=.*[a-z]).{8,}/;
    setUserPassError(!regexPass.test(values.userPassword));
    if(values.userPassword=='')setUserPassError(false);
  }, [values.userPassword]);

  const clickEditInfo = async (e) => {
    if(values.userPhone==''){
      alert("번호는 채워져야합니다.");
      return;
    }
    if(userPhoneError || userPassError ){
      alert("올바른 정보를 입력바랍니다.");
      return;
    }
    if(values.userPhone==userState.data.userPhone && values.userPassword==''){
      alert("변경된 정보가 없습니다.");
      return;
    }
    
    await modifyUser(
      values,
      (response) => {
        console.log(response);
        if (response.status === 200 ) {
          let userData = userState.data;
          userData.userPhone = values.userPhone;
          dispatch({ type: 'GET_USER_SUCCESS', data: userData });
        } else {
          console.log(response.message);
        }
      },
      (response) => {
        console.log(response.message);
      }
    );
  }
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const changeShowValue = e => {
    e.preventDefault();
    setShow(showEdit?false:true);
  }
 
  return(
      <Grid
          container
          spacing={3}
      >
        <Grid
        item
        lg={12}
        md={12}
        xs={12}
        >
      {(userState.isLogin)  && 
        <Card {...props}>
          <CardContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Avatar
                src={
                  (userState.data != null) && `${userState.data.avatar}`
                }
                  sx={{
                  height: 64,
                  mb: 2,
                  width: 64
                }}
              />
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h5"
              >{
                (userState.data != null) && 
                `${userState.data.userName}`
              }
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >{
                (userState.data != null) && 
                `${userState.data.userId}`
              }
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >{
                (userState.data != null) && 
                `${userState.data.userPhone}`
              }
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              fullWidth
              variant="text"
              onClick={changeShowValue}
            >
              개인정보 수정
            </Button>
          </CardActions>
        </Card>
      }
      </Grid>
      {showEdit && 
      <Grid
      item
      lg={12}
      md={12}
      xs={12}
      >
        <form
        autoComplete="off"
        noValidate
        {...props}
        >
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={userPhoneError}
                  fullWidth
                  helperText="숫자 11자리"
                  label="Phone Number"
                  name="userPhone"
                  onChange={handleChange}
                  type="number"
                  value={values.userPhone}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  error={userPassError}
                  helperText="영어소문자, 숫자 포함 8자 이상의 비밀번호"
                  label="Password"
                  name="userPassword"
                  onChange={handleChange}
                  value={values.userPassword}
                  variant="outlined"
                  type="password"
                />
              </Grid>
            
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={clickEditInfo}
            >
              수 정
            </Button>
          </Box>
        </Card>
        </form>
      </Grid>
      }
      </Grid>
     
  );
};