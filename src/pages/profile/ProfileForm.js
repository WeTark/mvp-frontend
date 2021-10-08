import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSelector } from 'react-redux';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  Avatar
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { API } from '../../action/api/api';
import { setLocalStorage, deleteLocalStorage } from '../../action/LocalStorageActions';
import Logo from '../../components/Logo';
// ----------------------------------------------------------------------

export default function ProfileForm() {
  const account = useSelector((state) => state.userData);

  // const LoginSchema = Yup.object().shape({
  //   username: Yup.string().required('User Name is required'),
  //   password: Yup.string().required('Password is required')
  // });

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


  return (
    <FormikProvider value={formik} >
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{padding:'0 20% 0 20%'}}>
        
        <Stack spacing={3}>
          <Avatar src='/static/mock-images/avatars/avatar_default.jpg' alt="photoURL" style={{width:'120px', height:'auto'}} />
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
