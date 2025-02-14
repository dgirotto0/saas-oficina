import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../AuthProvider';

const ProductForm: React.FC = () => {
  const { token } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/products/',
        {
          workshop: 1,
          name,
          description,
          price,
          sku,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Produto cadastrado com sucesso!');
      setName('');
      setDescription('');
      setPrice('');
      setSku('');
    } catch (error) {
      setMessage('Erro ao cadastrar produto.');
      console.error(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Cadastrar Produto
      </Typography>
      <TextField label="Nome" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label="Descrição" fullWidth margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} required multiline minRows={2} />
      <TextField label="Preço" fullWidth margin="normal" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <TextField label="SKU" fullWidth margin="normal" value={sku} onChange={(e) => setSku(e.target.value)} required />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Cadastrar
      </Button>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default ProductForm;
