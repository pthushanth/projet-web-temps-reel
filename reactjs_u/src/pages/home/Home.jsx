import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./home.css"
import { Box, Container, CssBaseline,Card,CardContent,Typography,Grid } from "@mui/material";


export default function Home() {
  return (

    <>
    {/* <Topbar /> */}
    < Navbar/>
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ height: '100vh' }} >
        <h2 className="title-home">Top 3 des meilleures motos de route</h2>
        <div className="container">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

        <Grid item xs={4}>
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <h2>1</h2>
                <h3>BMW R 1250 RS</h3>
                <p>La BMW R 1250 RS est une moto de route sportive de la marque BMW Motorrad. </p>
                <p>Elle est dérivée de la BMW R 1250 GS et est équipée d'un moteur bicylindre en ligne de 1254 cm3 développant 136 ch à 7750 tr/min et 143 Nm à 6750 tr/min.</p>
                <a href="#">Lire la suite</a>
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    <Grid item xs={4}>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <h2>2</h2>
          <h3>BMW R 1250 RS</h3>
          <p>La BMW R 1250 RS est une moto de route sportive de la marque BMW Motorrad. </p>
          <p>Elle est dérivée de la BMW R 1250 GS et est équipée d'un moteur bicylindre en ligne de 1254 cm3 développant 136 ch à 7750 tr/min et 143 Nm à 6750 tr/min.</p>
          <a href="#">Lire la suite</a>
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    <Grid item xs={4}>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <h2>3</h2>
          <h3>BMW R 1250 RS</h3>
          <p>La BMW R 1250 RS est une moto de route sportive de la marque BMW Motorrad. </p><p>Elle est dérivée de la BMW R 1250 GS et est équipée d'un moteur bicylindre en ligne de 1254 cm3 développant 136 ch à 7750 tr/min et 143 Nm à 6750 tr/min.</p>
          <a href="#">Lire la suite</a>
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    </Grid>
          </div>
        </Box>
      </Container>
    </React.Fragment>
    <Footer />
			
  </>
  );
}