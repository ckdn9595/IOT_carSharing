import Head from 'next/head';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { DashboardLayout } from '../components/dashboard-layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  FormControlLabel,
  Box,
  Button,
  Card,
  FormControl,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Grid,
  RadioGroup,
  Radio,
  Container,
  TextField
} from '@mui/material';
import { getCarDetail } from "src/api/car";
import { goRegRes } from "src/api/car";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { useUsersState } from '../context/UserContext';

const SeachDetail = (props) => {
  const curr = new Date();
  const utc = 
        curr.getTime() + 
        (curr.getTimezoneOffset() * 60 * 1000);
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const s_Date =  new Date(utc + (KR_TIME_DIFF));
  let e_Date =  new Date(utc + (KR_TIME_DIFF));
  e_Date.setDate(e_Date.getDate()+1);
  const router = useRouter();
  const query = router.query;
  const carSeq = query.no;
  const userState = useUsersState().user;
  const [searchData, setData] = useState();
  const [pageLV, setpageLV] = useState(0);
  const [sDate, setSDate] = useState();
  const [eDate, setEDate] = useState();
  const [startDate, setStartDate] = useState(s_Date);
  const [endDate, setEndDate] = useState(e_Date);
  const [rentPeriod, setPeriod] = useState();
  const [radioValue, setRadioValue] = useState('15000');
  const [pHour, setHour] = useState();

  const setPageLV = async (num) => {
    if(num == 4){
      window.location.href = `/driving`;
      return;
    }else if (num == 3){
      if(!userState.isLogin){
        alert("로그인 완료 후 예약가능합니다.");
        window.location.href = `/login`;
        return;
      }
      const param = {
        usrSeq : userState.data.userSeq,
        startDate,
        endDate,
        carSeq,
        resInfoSeq : searchData.res_info_seq
      }
      let error = false;
      await goRegRes(
        param,
        (response) => {
          console.log(response);
          if(response.status == 200){
           
          }else{
            alert("예약 실패");
            error = true;
          }
        },
        (response)=>{
          console.log(response);
          alert("예약 실패");
          error = true;
        }
      );
      if(error){
        return;
      }
    }else if(num == 2){
      if((endDate - startDate) / (1000*60*60) < 3){
        alert("최소 대여 기간은 세시간입니다.");
        return;
      }
    }
    setpageLV(num);
  }
  const changeStartDate = (value) => {
    if(sDate > value || value > eDate){
      alert("대여 가능 시간 확인해주세요.");
      return;
    }
    const diff = (eDate - value) / (1000*60*60);
    if(diff < 3){
      alert("최소 대여 기간은 세시간입니다.");
      return;
    }
    setStartDate(value);
    const hour = Math.floor((endDate - value)/(1000*60*60));
    const min = Math.floor((endDate - value -(hour * (1000*60*60)))/(1000*60));
    setPeriod(hour+"시간 " + min+"분");
  }
  const changeEndDate = (value) => {
    if(value > eDate){
      alert("대여 가능 시간 확인해주세요.");
      return;
    }
    
    setEndDate(value);
    const hour = Math.floor((value - startDate)/(1000*60*60));
    const min = Math.floor((value - startDate -(hour * (1000*60*60)))/(1000*60));
    setPeriod(hour+"시간 " + min+"분");
  }
  const radioHandleChange = (e) =>{
    setRadioValue(e.target.value);
  }
  useEffect(  async ()=>{
    if(carSeq){
      await getCarDetail(
        carSeq,
        (response) => {
          console.log(response);
          if(response.status == 200){
            setData(response.data);
          }else{
  
          }
        },
        (response)=>{
          console.log(response);
        }
      );
    }
  }, [carSeq]);

  useEffect( ()=>{
    if(searchData){
      setSDate(s_Date);
      setEDate(new Date(searchData.car_res_date_end));
    }
  }, [searchData]);

  useEffect( ()=>{
    if(searchData){
      setStartDate(sDate);
      setEndDate(eDate);
      const hour = Math.floor((eDate - sDate)/(1000*60*60));
      const min = Math.floor((eDate - sDate -(hour * (1000*60*60)))/(1000*60));
      setPeriod(hour+"시간 " + min+"분");
      setHour(hour+ min / 60);
    }
  }, [sDate]);
  return(
    <>
    <Head>
    <title>
      예약상세 | 차키줘바
    </title>
    </Head>
    {(searchData && pageLV==0 ) && 
    <Container
      sx={{
      display:'flex',
      alignItems:'center',
      flexDirection:'column',
    }}
    >
    <Card {...props} sx={{
      marginTop:3,
      diplay:'flex',
      minWidth: '600px',
      }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            sx={{
              alignItems: 'center',
              heigth: '200px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <img src={`/static/images/${searchData.car_img}`} width="auto" height="200px" />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
              sx={{
                alignItems: 'center',
                heigth: '2px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Grid 
                container 
                spacing={1}
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize:30
                }}
              >
                
                <Grid item xs={12}>
                  {searchData.car_year} {searchData.car_model}
                </Grid>
                
                <Grid item xs={12}>
                  {searchData.car_fuel}/{(searchData.car_segment == 1) ? "경형" : 
                                        (searchData.car_segment == 2) ? "준중형" : 
                                        (searchData.car_segment == 3) ? "중형" : 
                                        (searchData.car_segment == 4) ? "준대형" : 
                                        (searchData.car_segment == 5) ? "대형" : "승합"
                                        }
                </Grid>
                
                <Grid item xs={12}
                  color="blue"
                  sx={{
                    fontSize:15
                  }}
                >
                  단위 요금 {searchData.car_rate}원 /km&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Grid>
                <Grid item xs={12}
                  sx={{
                    fontSize:10
                  }}
                >
                  주행요금은 반납 후 등록하신 결제수단으로 자동 결제됩니다.<br></br>
                  주행거리에 맞게 단위 요금이 곱해져 결제금액에 추가됩니다.
                </Grid>
               
                <Grid item xs={12}>
                  <Button
                    color='info'
                    fullWidth
                    variant='contained'
                    //onClick={}
                  >
                    예약 문의
                  </Button>
                  <Button
                    color='info'
                    fullWidth
                    variant='contained'
                    onClick={()=>{setPageLV(1)}}
                  >
                    차량 이용하기
                  </Button>
                </Grid>
              </Grid>
          </Box>
        </Grid>
        </Grid>
      </Card>
      <Divider/>
      <Card 
        {...props}
        sx={{
          marginTop:3,
          diplay:'flex',
          minWidth: '600px',
        }}
      >
        <Grid 
          item 
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            fontSize:30
          }}
        >
          리뷰
        </Grid>
      </Card>
      <Card 
        {...props}
        sx={{
          marginTop:1,
          diplay:'flex',
          minWidth: '600px',
          height:400
        }}
      >
        <Grid 
          item 
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            fontSize:30
          }}
        >
          리뷰 목록 구역
        </Grid>
      </Card>
      </Container>}
      {(searchData && pageLV==1 ) && 
      <Container
      sx={{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
      }}
    >
      <Card {...props} sx={{
        marginTop:3,
        diplay:'flex',
        minWidth: '600px',
        }}>
      <Grid container spacing={2}>
            
        <Grid item xs={12}>
          <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
              onClick={()=>{setPageLV(0)}}
            >
              이전으로
            </Button>
          <Box
              sx={{
                alignItems: 'center',
                heigth: '150px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Grid 
                container 
                spacing={1}
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize:30
                }}
              >
                <Grid item xs={12}>
                  차량 예약
                </Grid>
                <Grid item xs={12}>
                  <img src={`/static/images/resLV1.png`} width="auto" height="100px" />
                </Grid>
              </Grid>
          </Box>
        </Grid>
        </Grid>
      </Card>
      <Divider/>
      <Card 
        {...props}
        sx={{
          marginTop:1,
          diplay:'flex',
          width: '600px',
        }}
      >
        <Grid 
          container 
          spacing={1}
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            fontSize:25
          }}
        >
          <Grid 
            item xs={12}
            sx={{
              backgroundColor:'silver',
              width:'100%'
            }}
          >
            예약 상세 설정 
          </Grid>
          <Grid item xs={12}
             sx={{
              fontSize:15
            }}
          >
            대여 가능 시각 : {sDate.toLocaleString()} ~ {eDate.toLocaleString()}
          </Grid>
          <Container
            sx={{
            display:'flex',
            flexDirection:'row',
            marginTop:1
          }}
          >
            <Grid item 
              lg={5}
              md={5}
              xs={5}
              sx={{
                fontSize:35,
                marginLeft:5
              }}
            >
                대여 시각&nbsp;&nbsp;&nbsp;
            </Grid>
            <Grid item 
              lg={7}
              md={7}
              xs={7}
              sx={{
                fontSize:35
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(params) => <TextField {...params} />}
                  value={startDate}
                  onChange={(newValue) => {
                    changeStartDate(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Container>
          <Container
            sx={{
            display:'flex',
            flexDirection:'row',
            marginTop:1
          }}
          >
            <Grid item 
              lg={5}
              md={5}
              xs={5}
              sx={{
                fontSize:35,
                marginLeft:5
              }}
            >
              반납 시각&nbsp;&nbsp;&nbsp;
            </Grid>
            <Grid item 
              lg={7}
              md={7}
              xs={7}
              sx={{
                fontSize:35
              }}
            >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(params) => <TextField {...params} />}
                value={endDate}
                onChange={(newValue) => {
                  changeEndDate(newValue);
                }}
              />
            </LocalizationProvider>
          </Grid>
          </Container>
          <Container
            sx={{
            display:'flex',
            flexDirection:'row',
            marginTop:1
          }}>
          <Grid item 
              lg={5}
              md={5}
              xs={5}
              sx={{
                fontSize:35,
                marginLeft:5
              }}
            >
              대여 기간&nbsp;&nbsp;&nbsp;
            </Grid>
            <Grid item 
              lg={7}
              md={7}
              xs={7}
              sx={{
                fontSize:35
              }}
            >
            <TextField
                value={rentPeriod}
                variant="outlined"
              />
          </Grid>
          </Container>
        </Grid>
      </Card>
      <Card 
        {...props}
        sx={{
          marginTop:1,
          diplay:'flex',
          minWidth: '600px',
        }}
      >
        <Grid 
          container 
          spacing={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            fontSize:25
          }}
        >
        <Grid 
          item xs={12}
          sx={{
            backgroundColor:'silver',
          }}
        >
          보험 설정 
        </Grid>
          <Grid item xs={12}
              sx={{
                fontSize:20,
                margin:"10px"
              }}
            >
            차키줘바의 전 차량은 자동차종합보험에 가입되어 있습니다.
          </Grid>
          <Divider/>
          <Divider/>
          <Divider/>
          <Grid item xs={12}
              sx={{
                fontSize:25,
                fontStyle:'unset',
                marginTop:"10px",
                marginLeft:2
              }}
            >
            차량손해면책 상품
          </Grid>
          <Divider/>
          <FormControl
            sx={{
              marginLeft:2
            }}
          >
          <RadioGroup 
            sx={{
              fontSize:20,
              margin:"10px"
            }}
            value={radioValue}
            onChange={radioHandleChange}
          >
            <FormControlLabel
              value="20000" 
              control={<Radio />}
              label="자기부담금 최대 50만원   > > >    +20000원" />
            <FormControlLabel 
              value="15000" 
              control={<Radio />} 
              label="자기부담금 최대 100만원   > > >     +15000원" />
            <FormControlLabel 
              value="10000" 
              control={<Radio />} 
              label="자기부담금 최대 200만원   > > >     +10000원" />
          </RadioGroup>
          </FormControl>
          <Grid item xs={12}
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
            <Button
                component="a"
                onClick={()=>{setPageLV(2)}}
                sx={{
                  width:"100px",
                }}
                variant='contained'
            >
              다음
            </Button>
          </Grid>
        </Grid>
      </Card>
      </Container>
      }
      {(searchData && pageLV==2 ) && 
      <Container
      sx={{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
      }}
     >
      <Card {...props} sx={{
        marginTop:3,
        diplay:'flex',
        width: '600px',
        }}>
      <Grid container spacing={2}>
            
        <Grid item xs={12}>
          <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
              onClick={()=>{setPageLV(1)}}
          >
            이전으로
          </Button>
          <Box
              sx={{
                alignItems: 'center',
                heigth: '150px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Grid 
                container 
                spacing={1}
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize:30
                }}
              >
                <Grid item xs={12}>
                  차량 예약
                </Grid>
                <Grid item xs={12}>
                  <img src={`/static/images/resLV2.png`} width="auto" height="100px" />
                </Grid>
              </Grid>
          </Box>
        </Grid>
        </Grid>
      </Card>
      <Divider/>
      <Card 
        {...props}
        sx={{
          marginTop:1,
          diplay:'flex',
          width: '600px',
        }}
      >
        <Grid 
          container 
          spacing={1}
          sx={{
            alignItems: '',
            display: 'flex',
            flexDirection: 'column',
            fontSize:25
          }}
        >
          <Grid 
            item xs={12}
            sx={{
              backgroundColor:'silver',
              width:'100%'
            }}
          >
            예상금액
          </Grid>
          <Grid item xs={12}
              sx={{
                fontSize:13,
                color:"blue",
                margin:"10px"
              }}
            >
            예상 결제금액은 `(대여기간 X 대여가액) + (주행거리 X 단위요금) + 보험금`으로 산출됩니다.
          </Grid>
          <Divider/>
          <Divider/>
          <Divider/>
        </Grid>
        <Grid 
          container 
          spacing={1}
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            fontSize:25
          }}
        >
        <Container
            sx={{
            display:'flex',
            flexDirection:'row',
            marginTop:1
          }}>
          <Grid item 
              lg={5}
              md={5}
              xs={5}
              sx={{
                fontSize:25,
                marginLeft:10
              }}
            >
              대여 기간&nbsp;&nbsp;&nbsp;
              </Grid>
            <Grid item 
              lg={7}
              md={7}
              xs={7}
              sx={{
                fontSize:35
              }}
            >
            <TextField
                value={rentPeriod}
                variant="standard"
              />
          </Grid>
          </Container>
          <Container
            sx={{
            display:'flex',
            flexDirection:'row',
            marginTop:1
          }}>
          <Grid item 
              lg={5}
              md={5}
              xs={5}
              sx={{
                fontSize:25,
                marginLeft:10
              }}
            >
              단위 요금&nbsp;&nbsp;&nbsp;
              </Grid>
            <Grid item 
              lg={7}
              md={7}
              xs={7}
              sx={{
                fontSize:35
              }}
            >
              <TextField
                value={`${searchData.car_rate}원 /km`}
                variant="standard"
              />
          </Grid>
          </Container>
          <Container
            sx={{
            display:'flex',
            flexDirection:'row',
            marginTop:1
          }}>
          <Grid item 
              lg={5}
              md={5}
              xs={5}
              sx={{
                fontSize:25,
                marginLeft:10
              }}
            >
              차량 대여가액&nbsp;&nbsp;&nbsp;
              </Grid>
            <Grid item 
              lg={7}
              md={7}
              xs={7}
              sx={{
                fontSize:35
              }}
            >
              <TextField
                value={`5000원 / 시간`}
                variant="standard"
              />
          </Grid>
          </Container>
          <Container
            sx={{
            display:'flex',
            flexDirection:'row',
            marginTop:1
          }}>
          <Grid item 
              lg={5}
              md={5}
              xs={5}
              sx={{
                fontSize:25,
                marginLeft:10
              }}
            >
              보험금&nbsp;&nbsp;&nbsp;
              </Grid>
            <Grid item 
              lg={7}
              md={7}
              xs={7}
              sx={{
                fontSize:35
              }}
            >
              <TextField
                value={`${radioValue}원`}
                variant="standard"
              />
          </Grid>
          </Container>
          <Container
            sx={{
            display:'flex',
            flexDirection:'row',
            marginTop:1
          }}>
          <Grid item 
              lg={5}
              md={5}
              xs={5}
              sx={{
                fontSize:25,
                marginLeft:10
              }}
            >
              결제 예상금액&nbsp;&nbsp;&nbsp;
              </Grid>
            <Grid item 
              lg={7}
              md={7}
              xs={7}
              sx={{
                fontSize:35
              }}
            >
              <TextField
                value={`${(pHour * 5000) + Number(radioValue)}원 + 주행KM X ${searchData.car_rate}원`}
                sx={{
                  fontSize:9,
                  borderColor:'white'
                }}
              />
          </Grid>
          </Container>
        </Grid>
      </Card>
      <Card 
        {...props}
        sx={{
          marginTop:1,
          diplay:'flex',
          width: '600px',
        }}
      >
        <Grid 
          container 
          spacing={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            fontSize:25
          }}
        >
        <Grid 
          item xs={12}
          sx={{
            backgroundColor:'silver',
          }}
        >
          결제 수단 선택
        </Grid>
          
          <Grid item xs={12}
              sx={{
                fontSize:25,
                fontStyle:'unset',
                marginTop:"10px",
                marginLeft:2
              }}
            >
            결제 수단 목록 창
          </Grid>
          <Divider/>
          <FormControl
            sx={{
              marginLeft:2
            }}
          >
          <RadioGroup 
            sx={{
              fontSize:20,
              margin:"10px"
            }}
            value={radioValue}
            onChange={radioHandleChange}
          >
            <FormControlLabel
              value="20000" 
              control={<Radio />}
              label=" " />
            <FormControlLabel 
              value="15000" 
              control={<Radio />} 
              label=" " />
            <FormControlLabel 
              value="10000" 
              control={<Radio />} 
              label=" " />
          </RadioGroup>
          </FormControl>
          <Grid item xs={12}
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
            <Button
                component="a"
                onClick={()=>{setPageLV(3)}}
                sx={{
                  width:"100px",
                }}
                variant='contained'
            >
              예약하기
            </Button>
          </Grid>
        </Grid>
      </Card>
      </Container>
      }
      {(searchData && pageLV==3 ) && 
      <Container
      sx={{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
      }}
     >
      <Card {...props} sx={{
        marginTop:3,
        diplay:'flex',
        width: '600px',
        }}>
      <Grid container spacing={2}>
            
        <Grid item xs={12}>
          <Box
              sx={{
                alignItems: 'center',
                heigth: '150px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Grid 
                container 
                spacing={1}
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize:30
                }}
              >
                <Grid item xs={12}>
                  차량 예약
                </Grid>
                <Grid item xs={12}>
                  <img src={`/static/images/resLV3.png`} width="auto" height="100px" />
                </Grid>
              </Grid>
          </Box>
        </Grid>
        </Grid>
      </Card>
      <Divider/>
      <Card {...props} sx={{
        marginTop:3,
        diplay:'flex',
        width: '600px',
      }}>
        <Grid 
          container 
          spacing={1}
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            fontSize:40
          }}
        >
          
          <Grid item xs={12}
              sx={{
                color:"",
                margin:"10px"
              }}
            >
            예약이 완료되었습니다.
          </Grid>
          <Grid item xs={12}
             sx={{
              fontSize:25
            }}
          >
              예약하신 내용을 확인해주세요
          </Grid>
        </Grid>
      </Card>
      <Card {...props} sx={{
        marginTop:3,
        diplay:'flex',
        width: '600px',
      }}>
        <Grid 
          container 
          spacing={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            fontSize:25
          }}
        >
        <Grid 
          item xs={12}
          sx={{
            backgroundColor:'silver',
            marginLeft:3
          }}
        >
          예약 내역
        </Grid>
          <Grid item xs={12}
             sx={{
              fontSize:20,
              marginLeft:3
            }}
          >
            대여 일시 : {startDate.toLocaleString()}
          </Grid>
          <Grid item xs={12}
             sx={{
              fontSize:20,
              marginLeft:3
            }}
          >
            반납 일시 : {endDate.toLocaleString()}
          </Grid>
          <Grid item xs={12}
             sx={{
              fontSize:20,
              marginLeft:3
            }}
          >
            차량 모델 : {searchData.car_year} {searchData.car_model}
          </Grid>
          <Grid item xs={12}
             sx={{
              fontSize:20,
              marginLeft:3
            }}
          >
            대여 기간 : {rentPeriod}
          </Grid>
          
          
          <Grid item xs={12}
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
            <Button
                component="a"
                onClick={()=>{setPageLV(4)}}
                sx={{
                  width:"100px",
                }}
                variant='contained'
            >
              완료
            </Button>
          </Grid>
        </Grid>
      </Card>
      </Container>
      }
      </>
  );
};

SeachDetail.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
export default SeachDetail;
  