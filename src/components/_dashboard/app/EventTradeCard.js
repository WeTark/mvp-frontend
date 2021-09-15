import * as React from 'react';
import { Icon } from '@iconify/react';
import appleFilled from '@iconify/icons-ant-design/apple-filled';
import { useMediaQuery } from 'react-responsive';

// material
import RefreshIcon from '@material-ui/icons/Refresh';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { withStyles, createStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography, Stack, Container, Avatar, Grid, ListItemText } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import { Refresh } from './Refresh';

// ----------------------------------------------------------------------
const BorderLinearProgress = withStyles((theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: "rgb(24, 144, 255)",
    },
    bar: {
      borderRadius: 5,
      backgroundColor: 'rgb(0, 171, 85)',
    },
  }),
)(LinearProgress);

const BorderLinearProgressYesPending = withStyles((theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: "#808080",
    },
    bar: {
      borderRadius: 5,
      backgroundColor: 'rgb(0, 171, 85)',
    },
  }),
)(LinearProgress);

const BorderLinearProgressNoPending = withStyles((theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: "rgb(24, 144, 255)",
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#808080',
    },
  }),
)(LinearProgress);

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(0, 0, 5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));


// ----------------------------------------------------------------------

const TOTAL = 1352831;

export default function EventTradeCard(props) {
  const {eventData, refreshData} = props
  const [openYourTralde, setOpenYourTralde] = React.useState(false);
  const [openAllTralde, setOpenAllTralde] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const handleClickYourTrade = () => {
    setOpenYourTralde(!openYourTralde);
  };
  const handleClickAllTrade = () => {
    setOpenAllTralde(!openAllTralde);
  };
  const refresh = () => {
    // refreshData().then(r=>{
    //   console.log(r)
    // })
  }
  return (
    <RootStyle>
      <Refresh isRefreshing = {isRefreshing} refresh={refresh}/>
      {/* <IconWrapperStyle>
        <Icon icon={appleFilled} width={24}/>
      </IconWrapperStyle> */}

      <Container>
      
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography color="rgb(0, 171, 85)">
              <Typography variant="h3">₹{eventData?.event?.yesPrice}</Typography>
              <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                Yes
              </Typography>
            </Typography>
            <Typography color="rgb(24, 144, 255)">
              <Typography variant="h3" >₹{eventData?.event?.noPrice}</Typography>
              <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                No
              </Typography>
            </Typography>
        </Stack>
        <List style={{margin:"-24px", maxHeight: isMobile?'70vw':'25vw', overflow: 'auto'}}>
          <ListItem button onClick={handleClickYourTrade}>
          <ListItemText primary="Your Trades" />
          {openYourTralde ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={openYourTralde} timeout="auto" unmountOnExit style={{padding:"0px 24px 0px 24px"}}>
          <div>In Process</div>

          {
              eventData?.userPendingTrades?.length > 0 ? (
                eventData?.userPendingTrades.map((row, key)=>(
                  <Stack key={key} direction="row" alignItems="center" justifyContent="space-between" mb={5} style={{marginBottom:"5px"}}>
                    {
                      row?.tradeType === "YES"?(
                        <>
                          <Avatar style={{backgroundColor:"rgb(0, 171, 85)"}}>{row.user.firstName.charAt(0)}</Avatar>
                            <Grid xs item style={{marginLeft:"5px", marginRight:"5px"}}>
                              <BorderLinearProgressYesPending variant="determinate" value={row.price*10} />
                            </Grid>
                          <Avatar><CircularProgress color="secondary" /></Avatar>
                        </>
                      ):(
                        <>
                          <Avatar><CircularProgress color="primary" /></Avatar>
                            <Grid xs item style={{marginLeft:"5px", marginRight:"5px"}}>
                              <BorderLinearProgressNoPending variant="determinate" value={row.price*10} />
                            </Grid>
                          <Avatar style={{backgroundColor:"rgb(24, 144, 255)"}}>{row.user.firstName.charAt(0)}</Avatar>
                        </>
                      )
                    }
                  </Stack>
                ))
            ): (<>No record</>)
          }
          <div>Matched</div>
          {
              eventData?.userMatchedTrades?.length > 0 ? (
                eventData?.userMatchedTrades.map((row, key)=>(
                  <Stack key={key} direction="row" alignItems="center" justifyContent="space-between" mb={5} style={{marginBottom:"5px"}}>
                    <Avatar style={{backgroundColor:"rgb(0, 171, 85)"}}>{row.yesTrade.user.firstName.charAt(0)}</Avatar>
                    <Grid xs item style={{marginLeft:"5px", marginRight:"5px"}}>
                      <BorderLinearProgress variant="determinate" value={row.yesTrade.price*10} />
                      </Grid>
                    <Avatar style={{backgroundColor:"rgb(24, 144, 255)"}}>{row.noTrade.user.firstName.charAt(0)}</Avatar>
                  </Stack>
                ))
            ): (<>No record</>)
          }
        </Collapse>
      

      <ListItem button onClick={handleClickAllTrade}>
            <ListItemText primary="All Trades" />
            {openAllTralde ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
            <Collapse in={openAllTralde} timeout="auto" unmountOnExit style={{padding:"0px 24px 0px 24px"}}>

            {
              eventData?.matchedTrades?.length > 0 ? (
                eventData?.matchedTrades.map((row, key)=>(
                  <Stack key={key} direction="row" alignItems="center" justifyContent="space-between" mb={5} style={{marginBottom:"5px"}}>
                    <Avatar style={{backgroundColor:"rgb(0, 171, 85)"}}>{row.yesTrade.user.firstName.charAt(0)}</Avatar>
                    <Grid xs item style={{marginLeft:"5px", marginRight:"5px"}}>
                      <BorderLinearProgress variant="determinate" value={row.yesTrade.price*10} />
                      </Grid>
                    <Avatar style={{backgroundColor:"rgb(24, 144, 255)"}}>{row.noTrade.user.firstName.charAt(0)}</Avatar>
                  </Stack>
                ))
            ): (<>No record</>)
          }
            </Collapse>
        </List>
      </Container>
      
      
    </RootStyle>
  );
}
