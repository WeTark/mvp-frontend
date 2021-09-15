import * as React from "react";
import {useParams} from "react-router-dom";
import { Container, Grid } from '@material-ui/core';
import Page from '../components/Page';
import AppWeeklySales from '../components/_dashboard/app/AppWeeklySales';
import EventTradeCard from '../components/_dashboard/app/EventTradeCard';
import AppItemOrders from '../components/_dashboard/app/AppItemOrders';
import AppBugReports from '../components/_dashboard/app/AppBugReports';
import AppWebsiteVisits from '../components/_dashboard/app/AppWebsiteVisits';
import AppTasks from '../components/_dashboard/app/AppTasks';
import AppTrafficBySite from '../components/_dashboard/app/AppTrafficBySite';
import AppOrderTimeline from '../components/_dashboard/app/AppOrderTimeline';
import AppCurrentVisits from '../components/_dashboard/app/AppCurrentVisits';
import AppConversionRates from '../components/_dashboard/app/AppConversionRates';
import AppCurrentSubject from '../components/_dashboard/app/AppCurrentSubject';
import AppNewsUpdate from '../components/_dashboard/app/AppNewsUpdate';
import EventDetailCard from "../components/_dashboard/app/event/EventDetailCard";
import { API } from "../action/api/api";


export const EventDetail = (props) => {
    const {id} = useParams()
    const [event, setEvent] = React.useState({});
    React.useEffect(()=>{
        API.fetchEventByID(id, 0, 20).then(response=>{
            setEvent(response.data)
        })
    },[])
    const refreshData = () => {
        API.fetchEventByID(id, 0, 20).then(response=>{
            setEvent(response.data)
        })
    }
    return(
        <Page title="Event Detail | WeTark">
        <Container maxWidth="xl">
        <Grid container spacing={3}>
            
            {/* <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
            </Grid> */}
            <Grid item xs={12} sm={6} md={8}>
                <EventDetailCard event={event.event} refreshData={refreshData}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <EventTradeCard eventData = {event} refreshData={refreshData}/>
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
            </Grid>

            {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
            </Grid> */}
        </Grid>
        </Container>
    </Page>
    )
}