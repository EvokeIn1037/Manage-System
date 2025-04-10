import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
// import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
// import ForgotPassword from '../components/ForgotPassword';
import AppTheme from '../theme/AppTheme';
import ColorModeSelect from '../theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../components/CustomIcons';
import { useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean; apiurl?: string; }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [rePasswordError, setRePasswordError] = React.useState(false);
  const [rePasswordErrorMessage, setRePasswordErrorMessage] = React.useState('');
  // const [open, setOpen] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);
  const navigate = useNavigate();
  
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const rePassword = document.getElementById('rePassword') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    
    if (!name.value || !(/^[A-Za-z0-9 ]+$/.test(name.value))) {
      setNameError(true);
      setNameErrorMessage('Please use letters, numbers and space only.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setRePasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      setRePasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else if (password.value !== rePassword.value) {
      setPasswordError(false);
      setRePasswordError(true);
      setPasswordErrorMessage('');
      setRePasswordErrorMessage('Please type in the same password.');
    } else {
      setPasswordError(false);
      setRePasswordError(false);
      setPasswordErrorMessage('');
      setRePasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // ✅ Prevent default browser behavior

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    let isValid = validateInputs();

    if (isValid && props.apiurl) {
      try {
        const res = await fetch(props.apiurl + '/auth/signup', {
          method: 'POST',
          credentials: 'include', // 👈 IMPORTANT for sending/receiving cookies
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, name, password, rememberMe }),
        });

        if (res.ok) {
          navigate("/");
          // Redirect or do something after login
        } else {
          setPasswordError(true);
          setPasswordErrorMessage('Register failed! Please check your email or password.');
        }
      } catch (err) {
        console.error('Error registering in:', err);
      }
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                error={nameError}
                helperText={nameErrorMessage}
                id="name"
                type="name"
                name="name"
                placeholder="Please use letters, numbers and space only"
                autoComplete="name"
                required
                fullWidth
                variant="outlined"
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="rePassword">Re-type password</FormLabel>
              <TextField
                error={rePasswordError}
                helperText={rePasswordErrorMessage}
                name="rePassword"
                placeholder="••••••"
                type="password"
                id="rePassword"
                required
                fullWidth
                variant="outlined"
                color={rePasswordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={
              <Checkbox
                checked={rememberMe}
                onChange={handleCheckboxChange} 
                value="remember" 
                color="primary" />
              }
              label="Stay signed in"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Submit
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
