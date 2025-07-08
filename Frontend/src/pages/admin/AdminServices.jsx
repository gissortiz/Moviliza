import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Container, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get("/services");
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchServices();
  }, []);

  const navigate = useNavigate();

  const handleAddService = () => {
    navigate("/admin/services/new");
  };

  const handleDeleteService = async (serviceId) => {
    if (confirm("¿Estás seguro de que quieres eliminar este servicio?")) {
      try {
        await API.delete(`/services/${serviceId}`);
        setServices(services.filter((s) => s._id !== serviceId));
        alert("Servicio eliminado correctamente ✅");
      } catch (err) {
        console.error(err);
        alert("Error al eliminar servicio");
      }
    }
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Administración de Servicios
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddService}>
          Agregar Nuevo Servicio
        </Button>
      </Box>

      {services.length === 0 ? (
        <Typography>No hay servicios cargados.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Descripción</strong></TableCell>
              <TableCell><strong>Precio</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service._id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>${service.price}</TableCell>
                <TableCell>
                  <Button size="small" color="error" onClick={() => handleDeleteService(service._id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default AdminServices;
