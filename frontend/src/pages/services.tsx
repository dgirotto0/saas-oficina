import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { 
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField 
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../components/AuthProvider';

const ServicesPage: React.FC = () => {
  const { token } = useAuth();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newService, setNewService] = useState({
    customer: '',
    vehicle: '',
    mileage: '',
    price: '',
    description: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(token) {
      axios.get('http://127.0.0.1:8000/api/services/', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          setServices(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [token]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    axios.post('http://127.0.0.1:8000/api/services/', {
      workshop: 1,
      customer: newService.customer,
      vehicle: newService.vehicle,
      service_type: 'oil_change',
      mileage: newService.mileage,
      price: newService.price,
      description: newService.description,
    }, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      setMessage('Serviço registrado com sucesso!');
      setServices([...services, res.data]);
      setOpen(false);
    })
    .catch(err => {
      console.error(err);
      setMessage('Erro ao registrar serviço.');
    });
  };

  return (
    <Layout>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Serviços
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
          Registrar Serviço
        </Button>
        {loading ? (
          <Typography>Carregando...</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID Cliente</strong></TableCell>
                  <TableCell><strong>ID Veículo</strong></TableCell>
                  <TableCell><strong>Quilometragem</strong></TableCell>
                  <TableCell><strong>Preço</strong></TableCell>
                  <TableCell><strong>Descrição</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>{service.customer}</TableCell>
                    <TableCell>{service.vehicle}</TableCell>
                    <TableCell>{service.mileage}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>{service.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Registrar Serviço (Troca de Óleo)</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="ID do Cliente"
            fullWidth
            value={newService.customer}
            onChange={(e) => setNewService({ ...newService, customer: e.target.value })}
          />
          <TextField
            margin="dense"
            label="ID do Veículo"
            fullWidth
            value={newService.vehicle}
            onChange={(e) => setNewService({ ...newService, vehicle: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Quilometragem"
            fullWidth
            value={newService.mileage}
            onChange={(e) => setNewService({ ...newService, mileage: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Preço"
            fullWidth
            value={newService.price}
            onChange={(e) => setNewService({ ...newService, price: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Descrição"
            fullWidth
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            multiline
            minRows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>
      {message && (
        <Typography sx={{ mt: 2, color: 'green' }}>{message}</Typography>
      )}
    </Layout>
  );
};

export default ServicesPage;
