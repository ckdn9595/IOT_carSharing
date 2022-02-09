import { Container, Grid, Typography} from '@mui/material';
import { AccountProfile } from '../account/account-profile';
import { AccountProfileDetails } from '../account/account-profile-details';
import { useUsersState, useUsersDispatch } from 'src/context/UserContext';


const MemberInfo = () => {
    const userState = useUsersState().user;
    return (
    <Container maxWidth="lg">
        <Typography
        sx={{ mb: 3 }}
        variant="h4"
        >
        {userState.data.userName}님 정보
        </Typography>
        <AccountProfile />
    </Container>

    );
};
export default MemberInfo;