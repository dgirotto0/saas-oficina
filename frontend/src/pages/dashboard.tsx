import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CircularProgress, Box, CardHeader, Avatar } from '@mui/material';
import { useAuth } from '../components/AuthProvider';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';

const Dashboard: React.FC = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [workshopsCount, setWorkshopsCount] = useState<number>(0);
  const [customersCount, setCustomersCount] = useState<number>(0);
  const [vehiclesCount, setVehiclesCount] = useState<number>(0);
  const [servicesCount, setServicesCount] = useState<number>(0);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const headers = { Authorization: `Bearer ${token}` };
          const [wsRes, csRes, vhRes, srRes] = await Promise.all([
            axios.get('http://127.0.0.1:8000/api/workshops/', { headers }),
            axios.get('http://127.0.0.1:8000/api/customers/', { headers }),
            axios.get('http://127.0.0.1:8000/api/vehicles/', { headers }),
            axios.get('http://127.0.0.1:8000/api/services/', { headers }),
          ]);
          setWorkshopsCount(wsRes.data.length);
          setCustomersCount(csRes.data.length);
          setVehiclesCount(vhRes.data.length);
          setServicesCount(srRes.data.length);
        } catch (error) {
          console.error('Erro ao buscar dados do dashboard', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [token]);

  if (loading) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  const cardData = [
    { title: 'Oficinas', count: workshopsCount, icon: <BusinessIcon />, color: 'primary.main' },
    { title: 'Clientes', count: customersCount, icon: <PeopleIcon />, color: 'secondary.main' },
    { title: 'Veículos', count: vehiclesCount, icon: <DirectionsCarIcon />, color: 'primary.main' },
    { title: 'Serviços', count: servicesCount, icon: <BuildIcon />, color: 'secondary.main' },
  ];

  return (
    <Layout>
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ boxShadow: 3 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: card.color }}>
                    {card.icon}
                  </Avatar>
                }
                title={card.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {card.count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Dashboard;
