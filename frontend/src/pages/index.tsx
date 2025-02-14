// src/pages/index.tsx
import React from 'react';
import Layout from '../components/Layout';
import { Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <Layout>
      <Box textAlign="center" mt={4}>
        <Typography variant="h3" gutterBottom>
          Bem-vindo ao SaaS para Oficinas
        </Typography>
        <Typography variant="body1" gutterBottom>
          Gerencie sua oficina de forma simples, rápida e com design profissional.
        </Typography>
        <Box mt={2}>
          <Link href="/login" passHref>
            <Button variant="contained" color="primary" size="large">
              Entrar
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button variant="outlined" color="primary" size="large" sx={{ ml: 2 }}>
              Registrar
            </Button>
          </Link>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
