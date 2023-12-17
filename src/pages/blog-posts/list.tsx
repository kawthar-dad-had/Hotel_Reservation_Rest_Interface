import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Drawer,
  Grid,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import TuneIcon from '@mui/icons-material/Tune';
import HotelIcon from '@mui/icons-material/Hotel';

import axios from 'axios';
import Swal from 'sweetalert2';

interface Hotel {
  id: number;
  imageUrl: string;
  nom: string;
  nombreEtoiles: number;
  nombreLits: number;
  prix: number;
  typeChambre: string;
  hotel: {
    nom: String,
  }
}

let data = {id : 2 , hotel : {id : 2} }

// Composant de la carte d'hôtel
const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  const [openReservationDialog, setOpenReservationDialog] = useState(false);
  const [formData, setFormData] = useState({
    agenceNom: "Agence 2",
    password: "motdepasse2",
    dateArrivee: "2025-07-08",
    dateDepart: "2025-07-20",
    nombrePersonnes: 1,
    idHotel: data.hotel.id,
    idChambre: data.id, // Replace with the appropriate ID if needed
    nom: "Dadoua hadria",
    prenom: "kawthar",
    numeroCarte: "1234-5678-9012-3456",
    cvv: 123, // Replace with the actual CVV
    dateExpiration: "12/25", // Replace with the actual expiration date
  });

  const handleReserveClick = () => {
    setOpenReservationDialog(true);
    setFormData({
      ...formData
    });


  };

  const handleCloseDialog = () => {
    setOpenReservationDialog(false);
  };

  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReservationSubmit = async () => {
    try {
      console.log("kawthar",formData)
      const response = await axios.post('http://localhost:8080/reservationservice/api/reservation?agenceNom=Agence%201&password=motdepasse1&dateArrivee=2025-07-24&dateDepart=2025-07-27&nombrePersonnes=1&idHotel=1&idChambre=1&nom=dadoua hadria &prenom=kawthar&numeroCarte=12345678&cvv=123&dateExpiration=27-09', {params: {formData}});

      const responseData = response.data;
      console.log(responseData)
      if (responseData) {
        
          Swal.fire(
            'Succés!',
            "Votre reservation est confirmé",
            'success'
          )
          setOpenReservationDialog(false);
        } else  {
          Swal.fire(
            'Erreur!',
            "Reservation n'est pas effectué",
            'error'
          )
          setOpenReservationDialog(false);
        }
      
    } catch (error) {
      console.error('SOAP Request Error:', error);
    }
  }

  return (
    <div>
      <Card>
        <CardMedia
          component="img"
          alt={hotel.nom}
          height="200"
          image={hotel.imageUrl}
          title={hotel.nom}
        />
        <CardContent>
          <Typography variant="h6">{hotel.nom}</Typography>
          <Typography>Hotel: {hotel.hotel.nom}</Typography>
          <Typography>Type: {hotel.typeChambre}</Typography>
          <Typography>Prix: {hotel.prix}</Typography>
          <Typography>Étoiles: {hotel.nombreEtoiles}</Typography>
          <Typography>Lits proposés: {hotel.nombreLits}</Typography>
          <Button onClick={handleReserveClick} startIcon={<HotelIcon />}>Réserver</Button>
        </CardContent>
      </Card>

      {/* Modal de réservation */}
      <Dialog open={openReservationDialog} onClose={handleCloseDialog}>
        <DialogTitle>Réservation d'hôtel</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField 
                label="Agence partenaire" 
                name="agenceNom" 
                value={formData.agenceNom} 
                onChange={handleFormChange}
                fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                label="Mot de passe" 
                type='password' 
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                label="Date d'arrivée" 
                type='date' 
                name="dateArrivee"
                value={formData.dateArrivee}
                onChange={handleFormChange}
                InputLabelProps={{
                  shrink: true
                }} 
                fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                label="Date de départ" 
                type='date' 
                name="dateDepart"
                value={formData.dateDepart}
                onChange={handleFormChange}
                InputLabelProps={{
                  shrink: true
                }} 
                fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                label="Nombre de personnes à héberger" 
                type='number' 
                name="nombrePersonnes"
                value={formData.nombrePersonnes}
                onChange={handleFormChange}
                fullWidth />
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6}>
              <TextField
                label="Nom"
                name="nom"
                value={formData.nom}
                onChange={handleFormChange}
                required={true}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleFormChange}
                required={true}
                fullWidth
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Card Number"
                name="numeroCarte"
                value={formData.numeroCarte}
                onChange={handleFormChange}
                required={true}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="CVV"
                name="cvv"
                value={formData.cvv}
                type='number'
                required={true}
                onChange={handleFormChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Expiration Date (MM/YY)"
                name='dateExpiration'
                value={formData.dateExpiration}
                onChange={handleFormChange}
              />                
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button color="primary" onClick={handleReservationSubmit}>Valider la réservation</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Composant de recherche et de filtrage
const SearchAndFilter = ({ setHotels }: { setHotels: any }) => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [formData, setFormData] = useState({
    nom: "Agence 2", 
    password: "motdepasse2" ,
    nombreLits: 1, 
    startDate: "2025-07-08" , 
    endDate: "2025-07-20" , 
    
  });

  const handleFilterClick = () => {
    setOpenFilterDrawer(true);
  };

  const handleCloseFilterDrawer = () => {
    setOpenFilterDrawer(false);
  };

  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFilterSubmit = async() => {
    
      axios.get('http://localhost:8080/disponibiliteservice/api/disponibilite', {
        params: formData,
      })  .then(response => {
        // Traite la réponse ici
        console.log(response.data);
        console.log(data)
        console.log(response.data[0].id)
        data.id = response.data[0].id
        data.hotel.id = response.data[0].hotel.id
        setHotels(response.data)
      })
      .catch(error => {
        // Gère les erreurs ici
        console.error('There was a problem with the request:', error);
      });
  };
  
  return (
    <div>
      <Box display="flex" justifyContent="center" mb={2}>
        <Stack direction="row" width="80%" spacing={2}>
          <TextField label="Rechercher par ville ou nom d'hôtel" fullWidth />
          <Button variant="contained" color="primary" onClick={handleFilterClick} startIcon={<TuneIcon />}>
            Filtrer
          </Button>
        </Stack>
      </Box>

      {/* Tiroir de filtrage */}
      <Drawer open={openFilterDrawer} onClose={handleCloseFilterDrawer}>
        <Box p={1}>
          <TextField 
            label="Agence partenaire" 
            name="nom" 
            value={formData.nom} 
            onChange={handleFormChange}
            fullWidth />
        </Box>
        <Box p={1}>
          <TextField 
            label="Mot de passe" 
            type='password' 
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            fullWidth />
        </Box>
        <Box p={1}>
          <TextField 
            label="Date d'arrivée" 
            type='date' 
            name="startDate"
            value={formData.startDate}
            onChange={handleFormChange}
            InputLabelProps={{
              shrink: true
            }} 
            fullWidth />
        </Box>
        <Box p={1}>
          <TextField 
            label="Date de départ" 
            type='date' 
            name="endDate"
            value={formData.endDate}
            onChange={handleFormChange}
            InputLabelProps={{
              shrink: true
            }} 
            fullWidth />
        </Box>
        <Box p={1}>
          <TextField 
            label="Nombre de personnes à héberger" 
            type='number' 
            name="nombreLits"
            value={formData.nombreLits}
            onChange={handleFormChange}
            fullWidth />
        </Box>
        <Box p={1}>
          <Button variant="contained" color="primary" onClick={handleFilterSubmit} >
            Appliquer les filtres
          </Button>
        </Box>
      </Drawer>
    </div>
  );
};

// Composant principal
export const HotelList = () => {
  
  const [hotels, setHotels] = useState<Hotel[]>([]); // State variable for hotels data

  return (
    <div>
      <SearchAndFilter setHotels={setHotels} />
      <Grid container spacing={2}>
        {hotels.map((hotel: Hotel) => (
          <Grid item xs={12} sm={6} md={3} key={hotel.id}>
            <HotelCard hotel={hotel} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};