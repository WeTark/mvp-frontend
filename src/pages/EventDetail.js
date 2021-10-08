import * as React from "react";
import {useParams} from "react-router-dom";
import { Container, Grid } from '@material-ui/core';
import Page from '../components/Page';
import AppWeeklySales from '../components/_dashboard/app/AppWeeklySales';
import EventTradeCard from './eventDetail/EventTradeCard';
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
import EventDetailCard from "./eventDetail/EventDetailCard";
import { API } from "../action/api/api";
import BackdropElement from './common/BackdropElement';
import EventTotalAmount from "./eventDetail/EventTotalAmount";
import EventPriceGraph from './eventDetail/EventPriceGraph';


export const EventDetail = (props) => {
    const {id} = useParams()
    const [event, setEvent] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [ totalAmount, setTotalAmount] = React.useState([]);
    const [ graphData, setGraphData] = React.useState({});

    React.useEffect(()=>{
        API.fetchEventByID(id, 0, 20).then(response=>{
            setEvent(response.data);
            setIsLoading(false);
        }).catch(e=>{
            setIsLoading(false);
        })

        API.fetchTotalTradeAmount(id).then(response=>{
            setTotalAmount([response.data.noSum?response.data.noSum:0, response.data.yesSum?response.data.yesSum:0])
        }).catch(e=>{
        })

        API.fetchGraphData(id).then(response=>{
            setGraphData(response.data);
        }).catch(e=>{
        })

    },[])
    const refreshData = () => {
        API.fetchEventByID(id, 0, 20).then(response=>{
            setEvent(response.data)
        })
    }
    return(
        <Page title="Event Detail | WeTark">

        <BackdropElement isLoading={isLoading}/>
        <Container maxWidth="xl">
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={8}>
                <EventDetailCard event={event.event} refreshData={refreshData} setIsLoading={setIsLoading}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <EventTradeCard eventData = {event} refreshData={refreshData}/>
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
            <EventPriceGraph  graphData={graphData}/>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
            <EventTotalAmount totalAmount={totalAmount}/>
            </Grid>
        </Grid>
        </Container>
    </Page>
    )
}