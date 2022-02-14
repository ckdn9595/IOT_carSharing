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
    href: '/chamgo',
    icon: (<ShoppingBagIcon fontSize="small" />),
    title: '참고용'
  },
  {
    href: '/myPage',
    icon: (<UserIcon fontSize="small" />),
    title: '마이페이지'
  },
  {
    href: '/serviceCenter',
    icon: (<UserIcon fontSize="small" />),
    title: '고객센터'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small" />),
    title: '옵션 선택 화면 참고용'
  },
  {
    href: '/404',
    icon: (<XCircleIcon fontSize="small" />),
    title: 'Error - 남겨둠'
  }
];

export const DashboardSidebar = (props) => {
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
                xs={12}
              >
                <NextLink
                  href="/"
                  passHref
                >
                  <a>
                    <Logo
                      sx={{
                        height: 42,
                        width: 42
                      }}
                    />
                  </a>
                </NextLink>
              </Grid>
              
              {(userState.isLogin)  && 
              <>
                <Grid
                item
                lg={6}
                md={6}
                xs={12}
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
                xs={12}
                >
                 <Button
                    sx={{
                      height: 42,
                      width: 75,
                      fontSize: 6
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
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  Acme Inc
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  Your tier
                  {' '}
                  : Premium
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              />
            </Box>
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
          
         
            <Button
              color="secondary"
              component="a"
              endIcon={(<OpenInNewIcon />)}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              버튼
            </Button>
          
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
