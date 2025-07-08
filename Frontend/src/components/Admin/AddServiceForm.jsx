import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Grid
} from "@mui/material";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AddServiceForm = () => {
  const navigate = useNavigate();

  const [service, setService] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    imageUrl: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/services", {
        ...service,
        price: Number(service.price)
      });
      alert("Servicio creado con éxito");
      navigate("/admin/services");
    } catch (err) {
      console.error(err);
      alert("Error al crear servicio");
    }
  };

  const fields = [
    { label: "Nombre", name: "name" },
    { label: "Descripción", name: "description" },
    { label: "Precio", name: "price", type: "number" },
    { label: "Duración", name: "duration" },
    { label: "Imagen URL", name: "imageUrl" }
  ];

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Nuevo Servicio
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {fields.map(({ label, name, type = "text" }) => (
            <Grid item xs={12} key={name}>
              <TextField
                label={label}
                name={name}
                type={type}
                fullWidth
                value={service[name]}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, width: "100%" }}
        >
          Guardar Servicio
        </Button>
      </Box>
    </Container>
  );
};

export default AddServiceForm;

