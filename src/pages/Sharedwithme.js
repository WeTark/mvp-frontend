import React from "react";

import { Box, Grid, Container, Typography } from "@material-ui/core";

import { API } from "../action/api/api";
import Page from "../components/Page";
import BackdropElement from "./common/BackdropElement";
import TradeCard from "./trade/TradeCard";

export function Sharedwithme() {
  const [eventList, setEventList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    API.fetchAllPersonalEvents(0, 10)
      .then((response) => {
        setIsLoading(false);
        setEventList(response.data);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Page title="Shared with me | WeTark">
      <BackdropElement isLoading={isLoading} />
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Shared With Me</Typography>
        </Box>
        <Grid container spacing={3}>
          {eventList.map((event, index) => (
            <TradeCard key={event.id} event={event} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
