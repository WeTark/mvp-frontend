// material
import Backdrop from "@mui/material/Backdrop";
import React from "react";
import { useSelector } from 'react-redux';
import IframeComm from "react-iframe-comm";
import ReactDOM from 'react-dom';
import { AppBar, Tabs, Tab, CircularProgress, Box, Grid, Container, Typography } from "@material-ui/core";
import TradeCard from "./trade/TradeCard";
import { API } from "../action/api/api";
// components
import Page from "../components/Page";
import BackdropElement from "./common/BackdropElement";
import RCIframe from "./common/RCIframe";


// ----------------------------------------------------------------------

export default function Trade() {
  const [eventList, setEventList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [rcIframe, setRcIframe] = React.useState(0);

  // let count = 0;
  
  React.useEffect(() => {
    API.fetchAllEvents(0, 10)
      .then((response) => {
        setIsLoading(false);
        setEventList(response.data);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }, []);

  
  return (
    <Page title="Dashboard | WeTark">
      <BackdropElement isLoading={isLoading} />
      <Container maxWidth="xl">
        <Box>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Tabs style={{ marginBottom: 25, marginTop: 25 }}>
          <Tab style={{ background: "#F4F6F9" }} label="Cricket" />
          <Tab label="Education" />
          <Tab label="Football" />
          <Tab label="Finance" />
          <Tab label="Crypto" />
          <Tab label="Gaming" />
        </Tabs>
        
        <Grid container spacing={3}>
        {/* <button onClick={rcLogin}>Login</button> */}
          {eventList.map((event, index) => (
            <TradeCard key={event.id} event={event} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
