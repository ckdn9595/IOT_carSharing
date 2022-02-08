import { useState } from 'react';
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

export const AccountProfile = (props) => {
  const userState = useUsersState().user;
  const [showEdit, setShow] = useState(false);
  const changeShowValue = e => {
    e.preventDefault();
    setShow(showEdit?false:true);
    console.log(showEdit);
  }
  const [values, setValues] = useState({
    phone: '',
    password: 'Alabama',
    country: 'USA'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
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
              src={userState.data.avatar}
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
            >
              {userState.data.userName}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {userState.data.userId}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {userState.data.userPhone}
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
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
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
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
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