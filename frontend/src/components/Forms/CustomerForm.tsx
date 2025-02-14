import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../AuthProvider';

const CustomerForm: React.FC = () => {
  const { token } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/customers/',
        {
          // Para testes, assumindo que o ID da oficina seja 1.
          workshop: 1,
          name,
          phone,
          email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Cliente cadastrado com sucesso!');
      setName('');
      setPhone('');
      setEmail('');
    } catch (error) {
      setMessage('Erro ao cadastrar cliente.');
      console.error(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Cadastrar Cliente
      </Typography>
      <TextField label="Nome" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label="Telefone" fullWidth margin="normal" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Cadastrar
      </Button>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default CustomerForm;
