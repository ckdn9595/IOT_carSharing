import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Grid, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { useUsersState, useUsersDispatch } from '../context/UserContext';
import { useCommonDispatch } from '../context/CommonContext';


const items = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: '차량 예약'
  },
  {
    href: '/reservation',
    icon: (<UsersIcon fontSize="small" />),
    title: '차량 관리'
  },
  {
    href: '/driving',
    icon: (<UsersIcon fontSize="small" />),
    title: '실시간 이용정보'
  },
  {
    href: '/serviceCenter',
    icon: (<UserIcon fontSize="small" />),
    title: '고객센터'
  }
];

export const DashboardSidebar = (props) => {
  const commonDispatch = useCommonDispatch();
  const dispatch = useUsersDispatch();
  const userState = useUsersState().user;
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });
  const logOutClick = e => {
    e.preventDefault;
    dispatch({ type: 'GET_LOGOUT', data: null });
    localStorage.removeItem('loginData')
  }
  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
      commonDispatch({ type: 'SET_PAGE', data: router.asPath });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <Grid
              container
              spacing={1}
            >
              <Grid
                item
                lg={3}
                md={3}
                xs={3}
              >
                <NextLink
                  href="/"
                  passHref
                >
                  <a>
                    <img src="/static/images/logo_getCarKey.png" width="60px" height="60px" />
                    {/* <Logo
                      sx={{
                        height: 42,
                        width: 42
                      }}
                    /> */}
                  </a>
                </NextLink>
              </Grid>
              
              {(userState.isLogin)  && 
              <>
                <Grid
                item
                lg={6}
                md={6}
                xs={6}
                >
                <NavItem
                    // icon={<LockIcon fontSize="small" />}
                    href={'/myPage'}
                    title={
                      (userState.data != null) && 
                        `${userState.data.userName}님`
                    }
                />
               </Grid>
               <Grid
                item
                lg={3}
                md={3}
                xs={3}
                >
                 <Button
                 fullWidth
                    sx={{
                      height: 42,
                      width: 75,
                      fontSize: 10
                    }}
                    color="inherit"
                    onClick={logOutClick}
                  >
                  로그아웃
                 </Button>
                </Grid>
               </>
              }
               {(!userState.isLogin)  && 
               <>
                <Grid
                item
                lg={3}
                md={3}
                xs={12}
                >
                <NavItem
                  // icon={<LockIcon fontSize="small" />}
                  
                  href={'/login'}
                  title={'로그인'}
                />
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={12}
                >
                  <NavItem
                    // icon={<LockIcon fontSize="small" />}
                    href={'/register'}
                    title={'회원가입'}
                  />
                  </Grid>
                </>
              }
              
            </Grid>

          </Box>
          <Box sx={{ px: 2 }}>
            
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          
         
          
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
