import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Grid, Typography, FormControlLabel, Checkbox, CardContent, TextField, AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip, List, ListItem, ListItemButton, ListItemText, Divider, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Search as SearchIcon } from '../icons/search';
import { Location as LocationIcon} from '../icons/location';
import { GoBack as GoBackIcon } from '../icons/goBack';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';
import { useEffect, useState } from 'react';
import { useCommonState, useCommonDispatch } from '../context/CommonContext';
import { searchAddressByName } from 'src/api/car';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const curr = new Date();
  const utc = 
        curr.getTime() + 
        (curr.getTimezoneOffset() * 60 * 1000);
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const sDate =  new Date(utc + (KR_TIME_DIFF));
  let eDate =  new Date(utc + (KR_TIME_DIFF));
  eDate.setDate(eDate.getDate()+1);
  const { onSidebarOpen, ...other } = props;
  const [isResPage, setResPage] = useState();
  const [isSearch, setSearch] = useState(false);
  const [isOption, setOption] = useState(false);
  const [searchInfo, setSearchInfo] = useState([]);
  const [startDate, setStartDate] = useState(sDate);
  const [endDate, setEndDate] = useState(eDate);
  const [checkq, setCheckQ] = useState(false);
  const [checkw, setCheckW] = useState(false);
  const [checke, setCheckE] = useState(false);
  const [checkr, setCheckR] = useState(false);
  const [checkt, setCheckT] = useState(false);
  const [checky, setCheckY] = useState(false);
  const commonDatas = useCommonState();
  const commonDispatch = useCommonDispatch();
  
  const pageName = commonDatas.pageName;
  const setSearchBar = async () => {
    await setSearch(true);
    delaySolve();
  }
  const delaySolve = () => {
    const searchBar = document.getElementById("searchBar");
    searchBar.focus();
  }
  const setAddrBar = () => {
    setSearch(false);
  }
  const setOptionView = () => {
    setOption(!isOption);
  }
  const setOptionValue = () => {
    const searchOption = {
      carSizes:[checkq,checkw,checke,checkr,checkt,checky],
      startDate,
      endDate
    }
    console.log(searchOption);
    commonDispatch({ type:'SET_OPTION', data: searchOption });
    setOption(!isOption);
  }
  const searchByAddr = async () => {
    const keyWord = document.getElementById("searchBar").value;
    setSearchInfo([]);
    await searchAddressByName(
      keyWord,
      (response) => {
        if (response.status === 200 ) {
          setSearchInfo(response.data.documents);
        } else {
          console.log(response);
        }
      },
      (response) => {
        console.log(response);
      }
    );
  };
  const searchPlace = (value, e) => {
    e.preventDefault();
    setSearch(false);
    const map = commonDatas.map; // 지도를 생성합니다
    const moveLatLon = new window.kakao.maps.LatLng(value.y, value.x);
    map.setCenter(moveLatLon);
  };
  const handleChange = (e) => {
    const carIndex = Number(e.target.id) - 1;
    if(carIndex == 0){
      setCheckQ(!checkq);
    }else if(carIndex == 1){
      setCheckW(!checkw);
    }else if(carIndex == 2){
      setCheckE(!checke);
    }else if(carIndex == 3){
      setCheckR(!checkr);
    }else if(carIndex == 4){
      setCheckT(!checkt);
    }else if(carIndex == 5){
      setCheckY(!checky);
    }
  };
  useEffect( () => {
    if(pageName === '/')setResPage(true);
    else setResPage(false);
  }, [pageName]);
  
  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          {(isResPage) && 
          <>
           {(!isSearch) &&
            <Tooltip title="Search">
              <IconButton 
              sx={{ ml: 1 }}
              onClick={setOptionView}
              >
                <SearchIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            }
            {(isSearch) &&
            <Tooltip title="뒤로 가기">
              <IconButton 
              sx={{ ml: 1 }}
              onClick={setAddrBar}
              >
                <GoBackIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            }
            {(!isSearch) &&
            <TextField
              fullWidth
              id="addressBar"
              onFocus={setSearchBar}
              value={commonDatas.address + (commonDatas.roadAddr == ''? '':'   ('+ commonDatas.roadAddr + ')')}
              variant="outlined"
            />
            }
            {(isSearch) &&
            <>
            <TextField
              fullWidth
              id="searchBar"
              onKeyUp={searchByAddr}
              variant="outlined"
            >
            </TextField>
            </>
            }   
          </>
          }
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge
                badgeContent={4}
                color="primary"
                variant="dot"
              >
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
        {(isResPage) && 
         <>
        {(isSearch) &&
        <List 
          sx={{ 
            width: "100%", 
            bgcolor: "background.paper" 
          }}>
            {searchInfo.map((value) => (
              <ListItem
                key={value.id}
              >
                <ListItemButton
                  sx={{
                      color:'black'
                  }}
                  onClick={(e)=>{searchPlace(value, e)}}
                >
                  <LocationIcon fontSize="small" />
                  <ListItemText
                    primary={value.place_name}
                    secondary={value.address_name}
                  />
                </ListItemButton>
              </ListItem>
              ))}
          </List>
        }
          {(!isSearch && isOption) &&
            <CardContent
              sx={{
                color:'black'
              }}
            >
              <Grid
                container
                spacing={6}
                wrap="wrap"
              >
                <Grid
                  item
                  md={4}
                  sm={6}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  xs={12}
                >
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h6"
                  >
                    차종 
                  </Typography>
                  <Divider/>
                  
                  <FormControlLabel
                    control={(
                      <Checkbox
                        color="primary"
                        id="1"
                        onChange={handleChange}
                        checked={checkq}
                      />
                    )}
                    label="경형"
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        color="primary"
                        id="2"
                        onChange={handleChange}
                        checked={checkw}
                      />
                    )}
                    label="준중형"
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox 
                        id="3"
                        onChange={handleChange}
                        checked={checke}
                      />)}
                    label="중형"
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        color="primary"
                        id="4"
                        onChange={handleChange}
                        checked={checkr}
                      />
                    )}
                    label="준대형"
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        color="primary"
                        id="5"
                        onChange={handleChange}
                        checked={checkt}
                      />
                    )}
                    label="대형"
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        color="primary"
                        id="6"
                        onChange={handleChange}
                        checked={checky}
                      />
                    )}
                    label="승합"
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  sm={6}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  xs={12}
                >
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h6"
                  >
                    대여 기간
                  </Typography>
                  <Divider/>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h9"
                    marginTop={2}
                  >
                    대여 시각
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(params) => <TextField {...params} />}
                      value={startDate}
                      onChange={(newValue) => {
                        setStartDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h9"
                    marginTop={2}
                  >
                    반납 시각
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(params) => <TextField {...params} />}
                      value={endDate}
                      onChange={(newValue) => {
                        setEndDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                  <Button
                    color="info"
                    size="small"
                    variant="contained"
                    sx={{
                      marginTop:'30px'
                    }}
                    onClick={setOptionValue}
                  >
                    적용
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
            }
          </>
        }
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
