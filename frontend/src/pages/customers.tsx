import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { 
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField 
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../components/AuthProvider';

const CustomersPage: React.FC = () => {
  const { token } = useAuth();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      axios.get('http://127.0.0.1:8000/api/customers/', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          setCustomers(res.data);
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
    axios.post('http://127.0.0.1:8000/api/customers/', {
      workshop: 1,
      ...newCustomer,
    }, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      setMessage('Cliente cadastrado com sucesso!');
      setCustomers([...customers, res.data]);
      setOpen(false);
    })
    .catch(err => {
      console.error(err);
      setMessage('Erro ao cadastrar cliente.');
    });
  };

  return (
    <Layout>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Clientes
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
          Adicionar Cliente
        </Button>
        {loading ? (
          <Typography>Carregando...</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Nome</strong></TableCell>
                  <TableCell><strong>Telefone</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Novo Cliente</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nome"
            fullWidth
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Telefone"
            fullWidth
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
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

export default CustomersPage;
