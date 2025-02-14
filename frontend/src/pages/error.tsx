// src/pages/404.tsx
import React from 'react';
import Layout from '../components/Layout';
import { Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

const Custom404: React.FC = () => {
  return (
    <Layout>
      <Box textAlign="center" mt={4}>
        <Typography variant="h3" gutterBottom>404 - Página não encontrada</Typography>
        <Link href="/" passHref>
          <Button variant="contained" color="primary">Voltar para a Home</Button>
        </Link>
      </Box>
    </Layout>
  );
};

export default Custom404;
