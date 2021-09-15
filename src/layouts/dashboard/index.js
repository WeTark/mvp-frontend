import * as React from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
//
import { useDispatch, useSelector } from 'react-redux';
// 
import { SnackbarProvider } from 'notistack5';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { API } from '../../action/api/api';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  React.useEffect(()=>{
    API.fetchUser().then(response=>{
      dispatch(
        {
          type: "USER_REQUEST_SUCCESS",
          payload:response
        }
      )
    })
    .catch(e=>{ 
      navigate('/login', { replace: true });
    })
  },[])

  return (

    <SnackbarProvider maxSnack={3}>
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
    </SnackbarProvider>
  );
}
