import React from 'react';
// material
import { Container, Stack, Typography, Box, Grid } from '@material-ui/core';
// components
import Page from '../components/Page';
import BackdropElement from './common/BackdropElement';
import PortfolioCard from './portfolio/PortfolioCard';
import { API } from '../action/api/api';

// ----------------------------------------------------------------------

export default function Portfolio() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [portfolio, setPortfolio] = React.useState([]);

  React.useEffect(()=>{
    API.fetchUserPortfolio(0, 10).then(response=>{
      setIsLoading(false);
      setPortfolio(response.data)
    }).catch(e=>{
      setIsLoading(false);
    })
  },[])
  
  return (
    <Page title="Portfolio | WeTark">
      <BackdropElement isLoading={isLoading}/>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Portfolio</Typography>
        </Box>
        <Grid container spacing={3}>
          {portfolio.map((event, index) => (
            <PortfolioCard key={index} event={event} index={index}/>
          ))} 
        </Grid>
      </Container>
    </Page>
  );
}
