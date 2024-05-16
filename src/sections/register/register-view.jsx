/* eslint-disable */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import { useAuth } from 'src/context/AuthContext';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, errors: registerError, loading, isRegistered, shouldNavigate } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
    //navigate('/login');
  });

  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const renderForm = (
    <>
      {registerError.length > 0 && (
        <Alert className="mb-4" severity="error">
          {registerError}
        </Alert>
      )}
      <form onSubmit={onSubmit}>
        <Stack spacing={3} className="mb-5">
          <TextField type="text" {...register('username', { required: true })} label="Username" />
          {errors.username && <Alert severity="info">Username is required</Alert>}

          <TextField
            type="email"
            {...register('email', { required: true })}
            label="Email address"
          />
          {errors.email && <Alert severity="info">Email is required</Alert>}

          <TextField
            {...register('password', { required: true })}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors.password && <Alert severity="info">Password is required</Alert>}
        </Stack>

        {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

        <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
          {loading ? <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" /> : 'Register'}
        </LoadingButton>
      </form>
      {shouldNavigate && <Navigate to="/login" />}
      {isRegistered && (
        <Alert severity="success" className="mt-5">
          Registrado satisfactoriamente
        </Alert>
      )}
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        overflowY: 'auto',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 'auto', width: '420px' }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Signup</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account
            <NavLink className="text-blue-500 ml-2" to="/login">
              Login
            </NavLink>
          </Typography>

          {/* <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack> */}

          {/* <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
