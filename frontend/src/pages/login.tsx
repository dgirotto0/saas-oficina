// src/pages/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../components/AuthProvider';
import Layout from '../components/Layout';
import Link from 'next/link';

const Login: React.FC = () => {
  const router = useRouter();
  const { setToken } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/users/token/', { username, password });
      setToken(res.data.access);
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro no login', error);
      setErrorMsg('Usuário ou senha inválidos.');
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>Login</Typography>
          {errorMsg && (
            <Typography variant="body1" color="error">{errorMsg}</Typography>
          )}
          <TextField
            label="Usuário"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Entrar
            </Button>
          </Box>
          <Box mt={2}>
            <Typography variant="body2">
              Não tem conta? <Link href="/register">Registre-se</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Login;
