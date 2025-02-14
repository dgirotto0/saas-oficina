import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { 
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField 
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../components/AuthProvider';

const VehiclesPage: React.FC = () => {
  const { token } = useAuth();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    customer: '',
    make: '',
    model: '',
    year: '',
    vin: '',
    license_plate: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(token) {
      axios.get('http://127.0.0.1:8000/api/vehicles/', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          setVehicles(res.data);
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
    axios.post('http://127.0.0.1:8000/api/vehicles/', {
      ...newVehicle,
      customer: parseInt(newVehicle.customer, 10)
    }, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      setMessage('Veículo cadastrado com sucesso!');
      setVehicles([...vehicles, res.data]);
      setOpen(false);
    })
    .catch(err => {
      console.error(err);
      setMessage('Erro ao cadastrar veículo.');
    });
  };

  return (
    <Layout>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Veículos
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
          Adicionar Veículo
        </Button>
        {loading ? (
          <Typography>Carregando...</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID Cliente</strong></TableCell>
                  <TableCell><strong>Marca</strong></TableCell>
                  <TableCell><strong>Modelo</strong></TableCell>
                  <TableCell><strong>Ano</strong></TableCell>
                  <TableCell><strong>Placa</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>{vehicle.customer}</TableCell>
                    <TableCell>{vehicle.make}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>{vehicle.license_plate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Novo Veículo</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="ID do Cliente"
            fullWidth
            value={newVehicle.customer}
            onChange={(e) => setNewVehicle({ ...newVehicle, customer: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Marca"
            fullWidth
            value={newVehicle.make}
            onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Modelo"
            fullWidth
            value={newVehicle.model}
            onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Ano"
            fullWidth
            value={newVehicle.year}
            onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
          />
          <TextField
            margin="dense"
            label="VIN"
            fullWidth
            value={newVehicle.vin}
            onChange={(e) => setNewVehicle({ ...newVehicle, vin: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Placa"
            fullWidth
            value={newVehicle.license_plate}
            onChange={(e) => setNewVehicle({ ...newVehicle, license_plate: e.target.value })}
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

export default VehiclesPage;
