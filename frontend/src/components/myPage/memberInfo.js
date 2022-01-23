import { Container, Grid, Typography} from '@mui/material';
import { AccountProfile } from '../account/account-profile';
import { AccountProfileDetails } from '../account/account-profile-details';

const MemberInfo = () => (
    <Container maxWidth="lg">
        <Typography
        sx={{ mb: 3 }}
        variant="h4"
        >
        ID님 정보
        </Typography>
        <Grid
        container
        spacing={3}
        >
        <Grid
            item
            lg={4}
            md={6}
            xs={12}
        >
            <AccountProfile />
        </Grid>
        <Grid
            item
            lg={8}
            md={6}
            xs={12}
        >
            <AccountProfileDetails />
        </Grid>
        </Grid>
    </Container>

);

export default MemberInfo;