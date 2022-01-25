import { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    Box,
    ListItemButton,
    Card,
    CardContent,
    CardActions,
    Divider,
    TextField
  } from '@mui/material';
import quirlyData from './dump.json';

const useGetQuerlyData = (url) => {
  //const { serverUrl, user, setUser } = useContext(CommonContext);
  const [data, setData] = useState([]);
  const getDatas = async() => {
    //let respone = [];
    setData(quirlyData);
  };
  useEffect(() => {
    getDatas();
  }, []);

  return data;
}

const ServiceInquirly = () => {
    const quirlyData = useGetQuerlyData('');
    const [qno, setQno] = useState('0');
    const getQuirlyNo = (obj) => {
      setQno(obj.index);
    }

    return (
        <Container maxWidth="lg">
          <Typography
          sx={{ mb: 3 }}
          variant="h4"
          >
          서비스 문의
          </Typography>
          <Card>
            <CardContent>
              <Typography
                sx={{ mb: 3 }}
                variant="h5"
              >
              자주 묻는 질문 [qno:{qno}]
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
                  {quirlyData.map((data, index) => (
                    <>
                      <ListItemButton
                        fullWidth
                        key={index}
                        alignItems='flex-start'
                        onClick={() => getQuirlyNo({index})}
                      >
                        {data.q_ques}
                      </ListItemButton>
                    <Divider/>
                    </>
                  ))}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
    )
};

export default ServiceInquirly;