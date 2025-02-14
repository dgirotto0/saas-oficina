// src/pages/register.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import Layout from '../components/Layout';
import Link from 'next/link';

const Register: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/users/register/', {
        username,
        email,
        password,
      });
      router.push('/login');
    } catch (error) {
      console.error('Erro no registro', error);
      setErrorMsg('Erro ao registrar, verifique os dados e tente novamente.');
    }
  };
  

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>Registrar</Typography>
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
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            <Button variant="contained" color="primary" onClick={handleRegister}>
              Registrar
            </Button>
          </Box>
          <Box mt={2}>
            <Typography variant="body2">
              Já tem conta? <Link href="/login">Faça login</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Register;
