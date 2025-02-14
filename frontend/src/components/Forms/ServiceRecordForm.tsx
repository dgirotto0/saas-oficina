import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../AuthProvider';

const ServiceRecordForm: React.FC = () => {
  const { token } = useAuth();
  const [customer, setCustomer] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [mileage, setMileage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/services/',
        {
          workshop: 1,
          customer,
          vehicle,
          service_type: 'oil_change', // Fixo para troca de óleo
          description,
          mileage,
          price,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Troca de óleo registrada com sucesso!');
      setCustomer('');
      setVehicle('');
      setMileage('');
      setPrice('');
      setDescription('');
    } catch (error) {
      setMessage('Erro ao registrar a troca de óleo.');
      console.error(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Registrar Troca de Óleo
      </Typography>
      <TextField label="ID do Cliente" fullWidth margin="normal" value={customer} onChange={(e) => setCustomer(e.target.value)} required />
      <TextField label="ID do Veículo" fullWidth margin="normal" value={vehicle} onChange={(e) => setVehicle(e.target.value)} required />
      <TextField label="Quilometragem" fullWidth margin="normal" value={mileage} onChange={(e) => setMileage(e.target.value)} required />
      <TextField label="Preço" fullWidth margin="normal" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <TextField label="Descrição" fullWidth margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} required multiline minRows={2} />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Registrar
      </Button>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default ServiceRecordForm;
