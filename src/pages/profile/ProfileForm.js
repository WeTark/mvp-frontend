import * as Yup from 'yup';
import * as React from "react";
import { styled } from '@material-ui/core/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, TextField, Divider } from '@material-ui/core';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSelector } from 'react-redux';

import { LoadingButton } from '@material-ui/lab';
import { API } from '../../action/api/api';
import { setLocalStorage, deleteLocalStorage } from '../../action/LocalStorageActions';
import Logo from '../../components/Logo';
// ----------------------------------------------------------------------

export default function ProfileForm() {
  const account = useSelector((state) => state.userData);
  const [ balance, setBalance ] = React.useState({});

  React.useEffect(()=>{
    API.fetchUserBalance().then(response=>{
      setBalance(response.data);
    }).catch(e=>{
    })
  },[])
  // const LoginSchema = Yup.object().shape({
  //   username: Yup.string().required('User Name is required'),
  //   password: Yup.string().required('Password is required')
  // });

  const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
  }));

  const formik = useFormik({
    initialValues: account.firstName?account:{
      "firstName": "",
      "lastName": "",
      "username": "",
      "email": ""
    },
    enableReinitialize: true,
    // validationSchema: LoginSchema,
    onSubmit: (values, actions) => {
      // deleteLocalStorage("accessToken")
      // API.authenticateUser(values).then(response=>{
      //   setLocalStorage("accessToken", response.data.accessToken);
      //   navigate('/trade', { replace: true });
      //   console.log(response);
      // }).catch(e => {
      //   actions.setSubmitting(false);
      // })
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  return (
    <FormikProvider value={formik} >
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{padding:isMobile?'0 5% 0 5%':'0 20% 0 20%'}}>
        
        <Stack spacing={3}>
          <Avatar src='/static/mock-images/avatars/avatar_default.jpg' alt="photoURL" style={{width:'120px', height:'auto'}} />
          <Box sx={{ mb: 5, mx: 2.5 }}>
            <Link underline="none" component={RouterLink} to="#">
              <AccountStyle>
                <Box sx={{ ml: 2 }} style={{width:'100%'}}>
                  <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} style={{justifyContent:"space-evenly"}}>
                    <div>
                      <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                        ₹ {balance?.availableBalance}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Available Balance
                      </Typography>
                    </div>
                   
                    <div>
                      <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                      ₹ {balance?.onHoldBalance}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Onhold Balance
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                      ₹ {balance?.investedBalance}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Invested Balance
                      </Typography>
                    </div>
                  </Stack>
                </Box>
              </AccountStyle>
            </Link>
          </Box>
          <Stack direction="row" spacing={3}>
            <TextField
              disabled
              fullWidth
              type="firstName"
              label="First Name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
            <TextField
              disabled
              fullWidth
              autoComplete="lastName"
              type="lastName"
              label="Last Name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>
          <Stack direction="row" spacing={3}>
            <TextField
              disabled
              fullWidth
              autoComplete="username"
              type="username"
              label="Username"
              {...getFieldProps('username')}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />
            <TextField
              disabled
              fullWidth
              autoComplete="email"
              type="email"
              label="Email"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>
        </Stack>

        <br />

        <LoadingButton
          disabled
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Update
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
