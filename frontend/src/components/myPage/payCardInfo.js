import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Container,
    Grid,
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
    Divider,
    TextField,
    Modal,
    Checkbox,
    NextLink,
    Link,
    OutlinedInput,
    InputAdornment,
    FormControl
  } from '@mui/material';
import { registerPayment, getPayment } from 'src/api/payment'


const PayCardInfo = () => {
    const [cardInfo, setCardInfo] = useState("");
    const [visible, setVisible] = useState(false);
    const cardAddBtnClick = () => {
        setVisible(true);
    };
    useEffect( async () => {
      await getPayment(
        "",
        (response) => {
          if (response.status === 200 ) {
            setCardInfo(response.data.tempPayment);
          }else {
            console.log(response);
          }
        },
        (response) => {
          console.log(response);
        })

      console.log(cardInfo);
    }, []);
    const formik = useFormik({
      initialValues: {
        cardNo: '',
        validMon: '',
        validYear: '',
        cvc: '',
        personalNo: '',
        paymentPolicy: false,
      },
      validationSchema: Yup.object({
        cardNo: Yup
        .string()
        .matches(
          /^\d{16}$/,
          "숫자 16자리"
        )
        .required(' '
          ),
        validMon: Yup
        .string()
        .matches(
          /^\d{2}$/,
          "숫자 2자리"
        )
        .required(' '
          ),
        validYear: Yup
          .string()
          .matches(
            /^\d{2}$/,
            "숫자 2자리"
          )
          .required(' '
            ),
        cvc: Yup
          .string()
          .matches(
            /^\d{3}$/,
            "숫자 3자리"
          )
          .required(' '
            ),
        personalNo: Yup
          .string()
          .matches(
            /^\d{6}$/,
            "숫자 6자리"
          )
          .required(' '
            ),
        paymentPolicy: Yup
        .boolean()
        .oneOf(
          [true],
          ''
        ),
      }),
      onSubmit: async (data, {setSubmitting}) => {
        setSubmitting(true);
        console.log(data);
        let cardDate = data.validMon + data.validYear;
        const param = {
          cardNum:data.cardNo,
          cardDate,
          cardCvc:data.cvc
        }
        await registerPayment(
          param,
          (response) =>{
            console.log(response);
            if (response.status === 200 ) {
              alert('등록 성공')
            } else {
              console.log(response);
            }
          },
          (response) => {console.log(response)}
        );
        setSubmitting(false);
      }
    })
    return (
        <Container maxWidth="lg">
          <Card>
            <CardContent>
              <Typography
                sx={{ mb: 3 }}
                variant="h5"
              >
              결제 카드 정보
              </Typography>
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
                  {cardInfo&& 
                    <TextField
                    fullWidth
                    name="carInfo"
                    value={cardInfo.card_num.substr(0,4)+ "-" + cardInfo.card_num.substr(4,4)+ "-****-**** / 개인"}
                    variant="standard"
                    aria-readonly
                  /> 
                  }
                    
                </Grid>
              </Grid>
            </CardContent>
            <Divider/>
            <CardActions>
              <Button
                color="primary"
                variant="text"
                onClick={cardAddBtnClick}
              >
                + 결제카드 등록하기
              </Button>
            </CardActions>
          </Card>
          <Container> 
            <Modal
              open={visible}
              onClose={()=>{setVisible(false)}}
              closeAfterTransition
            >  
              <Box sx={{
                width:"470px",
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 1
              }}>
                {/* <CloseOutlinedIcon onClick={()=>{setVisible(false)}} /> */}
              {/* <Box sx={{margin: '0 auto', height:0, float:'right'}}>
                  
              </Box> */}
              <form onSubmit={formik.handleSubmit}>
              <Container
                sx={{
                  display:'flex',
                  alignItems:'',
                  flexDirection:'row',
                }}
               >
                <Divider/>
                <Card 
                  sx={{
                    marginTop:0,
                    width:"95%",
                  }}
                >
                  <Grid 
                    container 
                    spacing={0}
                    sx={{
                      alignItems: '',
                      display: 'flex',
                      flexDirection: 'column',
                      fontSize:25,
                      marginTop:5
                    }}
                  >
                    <Grid 
                      item xs={12}
                      sx={{
                        fontSize:15,
                        marginBottom:"28px"
                      }}
                    >
                      카드번호
                      <TextField
                        error={Boolean(formik.touched.cardNo && formik.errors.cardNo)}
                        fullWidth
                        helperText={formik.touched.cardNo && formik.errors.cardNo}
                        name="cardNo"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.cardNo}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid 
                      container 
                      spacing={0}
                      sx={{
                        alignItems: 'start',
                        fontSize:25,
                      }}
                  >
                    <Grid 
                      item 
                      lg={6}
                      md={6}
                      xs={6}
                      sx={{
                        fontSize:15,
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom:"28px",
                      }}
                    >
                      유효기간
                      <Container
                        sx={{
                        display:'flex',
                        flexDirection:'row',
                        margin:0,
                        padding:0,
                        border:0
                      }}>
                      <TextField
                        error={Boolean(formik.touched.validMon && formik.errors.validMon)}
                        helperText={formik.touched.validMon && formik.errors.validMon}
                        margin="none"
                        name="validMon"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.validMon}
                        variant="outlined"
                        placeholder='MM'
                      />
                      &nbsp;
                      <TextField
                        error={Boolean(formik.touched.validYear && formik.errors.validYear)}
                        helperText={formik.touched.validYear && formik.errors.validYear}
                        name="validYear"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.validYear}
                        variant="outlined"
                        placeholder='YY'
                      />
                      </Container>
                    </Grid>
                    <Grid 
                      item 
                      lg={6}
                      md={6}
                      xs={6}
                      sx={{
                        fontSize:15,
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom:"28px",
                      }}
                    >
                      cvc 세자리
                      {/* <Container
                        sx={{
                        marginLeft:0,
                        width:"68px"
                      }}> */}
                      <FormControl sx={{ width: '100px', marginLeft:3 }} variant="outlined">
                        <OutlinedInput
                          error={Boolean(formik.touched.cvc && formik.errors.cvc)}
                          helperText={formik.touched.cvc && formik.errors.cvc}
                          name="cvc"
                          placeholder='***'
                          onBlur={formik.handleBlur}
                          value={formik.values.cvc}
                          onChange={formik.handleChange}
                          endAdornment={<InputAdornment position="end">cvc</InputAdornment>}
                        />
                      </FormControl>
                      {/* </Container> */}
                    </Grid>
                  </Grid>
                  <Grid 
                      container 
                      spacing={1}
                      sx={{
                        alignItems: '',
                        fontSize:25,
                      }}
                  >
                    
                    <Grid 
                      item 
                      xs={12}
                      sx={{
                        fontSize:15,
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom:"28px"
                      }}
                    >
                      주민등록번호 앞 6자리
                     
                        <OutlinedInput
                          fullWidth
                          error={Boolean(formik.touched.personalNo && formik.errors.personalNo)}
                          helperText={formik.touched.personalNo && formik.errors.personalNo}
                          name="personalNo"
                          placeholder='6자리 입력'
                          onBlur={formik.handleBlur}
                          value={formik.values.personalNo}
                          onChange={formik.handleChange}
                          endAdornment={<InputAdornment position="end">- * * * * * * *&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</InputAdornment>}
                        />
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      ml: 1,
                      mt: 2
                    }}
                  >
                    <Checkbox
                      name="paymentPolicy"
                      onChange={formik.handleChange}
                    />
                    <Typography
                      color="textSecondary"
                      variant="body2"
                    >
                        <Link
                          color="primary"
                          underline="always"
                          variant="subtitle2"
                        >
                          결제 서비스 이용약관
                        </Link>
                      에 동의합니다.
                    </Typography>
                  </Box>
                  <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                카드 등록
              </Button>
            </Box>
            </Card>
            </Container>
            </form>
              </Box>
            </Modal>
          </Container>    
        </Container>
    )
};

export default PayCardInfo;
