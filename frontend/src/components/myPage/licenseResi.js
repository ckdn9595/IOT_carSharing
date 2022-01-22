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
const LicenseResi = () => {
    const [licenseNum, setLicenseNum] = useState('-렌더링 전에 받아와야함-');

    // const getLicenseNum = ({param}) => {
    //     setValues({param})
    // }
    return (
        <Container maxWidth="lg">
            <Typography
            sx={{ mb: 3 }}
            variant="h5"
            >
            운전면허 정보 (승인상태) ex) 승인완료
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
                    <TextField
                        fullWidth
                        helperText="면허 재발급으로 면허발급일이 1년 미만일 경우 문의해주세요"
                        label="면허 정보"
                        name="licenseNum"
                        value={licenseNum}
                        variant="standard"
                        aria-readonly
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => setLicenseNum('11-11111111-11')}
                    >
                        등 록 하 기
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
};

export default LicenseResi;