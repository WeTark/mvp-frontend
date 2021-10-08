// material
import { Box, Grid, Container, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import React from "react";
import TradeCard from "./trade/TradeCard";
import { API } from "../action/api/api";
// components
import Page from "../components/Page";
import BackdropElement from "./common/BackdropElement";

import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import { AppBar, Tabs, Tab } from "@material-ui/core";

// ----------------------------------------------------------------------

export default function Trade() {
  const [eventList, setEventList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
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
          {eventList.map((event, index) => (
            <TradeCard key={event.id} event={event} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
