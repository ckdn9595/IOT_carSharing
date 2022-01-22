import { useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField
  } from '@mui/material';
const PayCardInfo = () => {
    const [cardInfo] = useState(['렌더링','전에','배열 데이터로 받아오기','ex) 국민 1031 / 개인']);
    const cardAddBtnClick = () => {
        alert("카드 등록 기능 추가");
    }
    return (
        <Container maxWidth="lg">
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
                    {cardInfo.map((str) => (
                        <TextField
                            fullWidth
                            key={str}
                            name="carInfo"
                            value={str}
                            variant="standard"
                            aria-readonly
                         />
                    ))}
                    
                    <Button
                        color="primary"
                        variant="text"
                        onClick={cardAddBtnClick}
                    >
                        + 결제카드 등록하기
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
};

export default PayCardInfo;