import * as React from 'react'
// material
import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIcon from '@material-ui/icons/Refresh';
import CardActions from '@material-ui/core/CardActions';
import { alpha, styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import { Card, Typography, Stack, Divider, Slider } from '@material-ui/core';
import { useSnackbar } from 'notistack5';

import { useMediaQuery } from 'react-responsive';
// utils
import { API } from '../../action/api/api';
import BackdropElement from '../common/BackdropElement';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function TradeForm(props) {

  const { tradeType, event, handleClose, refreshData } = props;
  const color = tradeType==="YES"?"primary":"info";
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(true);

  const [yesPending, setYesPending ] = React.useState([]);
  const [noPending, setNoPending ] = React.useState([]);

  const [ priceValue, setPriceValue] = React.useState();
  const [ qtyValue, setQtyValue] = React.useState(5);

  const isMobile = useMediaQuery({ query: `(max-width: 920px)` });

  const { enqueueSnackbar } = useSnackbar();

  const handlePriceSliderChange = (event, newValue) => {
    setPriceValue(newValue);
  };
  const handleQtySliderChange = (event, newValue) => {
    setQtyValue(newValue);
  };

  const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    // textAlign: 'center',
    // padding: theme.spacing(5, 0),
    color: tradeType==="YES"?(theme.palette.primary.darker):(theme.palette.info.darker),
    backgroundColor: tradeType==="YES"?(theme.palette.primary.lighter):(theme.palette.info.lighter),
  }));

  const showToast = (message, variant1) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {variant: variant1});
  };

  React.useState(()=>{
    API.fetchTopPendingTrade(event.id).then(response=>{
      setYesPending(response.data.YES);
      setNoPending(response.data.NO);
      setPriceValue(tradeType==="NO"?(10-(response.data.YES[0]?response.data.YES[0].price:5)):(10-(response.data.NO[0] ?response.data.NO[0].price: 5)))
      setIsRefreshing(false);
    }).catch(e=>{
      setIsRefreshing(false);
    })
  },[])

  const refresh=()=>{
    showToast("Refresing...!", 'info')
    setIsRefreshing(true);
    getTopPendingTrade();
  }
  const getTopPendingTrade = () => {
    API.fetchTopPendingTrade(event.id).then(response=>{
      showToast("Refreshed...!", 'success')
      setYesPending(response.data.YES);
      setNoPending(response.data.NO);
      setPriceValue(tradeType==="NO"?(10-response.data.YES[0].price):(10-response.data.NO[0].price))
      setIsRefreshing(false);
    }).catch(e=>{
      setIsRefreshing(false);
    })
  }

  const onBuy = () => {
    setIsSubmitting(true);
    API.newTrade({
      "event_id": event.id,
      "price": priceValue,
      "initialSize": qtyValue,
      "tradeType": tradeType,
      "user_id": ""
    }).then(response=>{
      if(response.data.size === qtyValue){
        showToast(`${qtyValue} trades in process`, 'info')
      }else{
        showToast(`${qtyValue-response.data.size} trades matched, ${response.data.size} trades in process`, 'success')
      }
      refreshData();
      handleClose();
    }).catch(e=>{
      showToast(`Failed! Try again`, 'error')
      setIsSubmitting(false);
    })
  }
  return (
    <RootStyle>
      <BackdropElement isLoading={isRefreshing}/>
      <div style={{ textAlign: 'end', padding:"10px", }} >
        {isRefreshing?<CircularProgress style={{width:"1.5em", height:"1.5em"}} color={color}/>:<RefreshIcon style={{cursor:"pointer"}} onClick={refresh}/>}
      </div>
      
      <Stack direction={isMobile?"column":"row"} divider={<Divider orientation="vertical" flexItem />} spacing={2} padding={3} style={{alignItems:isMobile?"center":null}}>
          <Typography variant="subtitle4" sx={{ opacity: 0.72 }} xs={6}>
          {event?.title}
          <Stack justifyContent="start" padding={3}>
            <Typography variant="subtitle3" gutterBottom>
              Price: ₹ {priceValue}
            </Typography>
            <Slider
              value={priceValue}
              color={color}
              onChange={handlePriceSliderChange}
              aria-labelledby="discrete-slider-custom"
              step={0.5}
              min={0.5}
              max={9.5}
              valueLabelDisplay="auto"
            />
            <Typography variant="subtitle3" gutterBottom>
              Quantity: {qtyValue}
            </Typography>
            <Slider
              color={color}
              value={qtyValue}
              onChange={handleQtySliderChange}
              aria-labelledby="discrete-slider-custom"
              step={1}
              min={1}
              max={10}
              valueLabelDisplay="auto"
            />
            <CardActions>
              <LoadingButton size="mid" color={color} variant="contained" style={{textTransform: 'none'}} loading={isSubmitting} onClick={onBuy}>
                Buy for ₹ {qtyValue*priceValue}
              </LoadingButton>
            </CardActions>
          </Stack>
          </Typography>

          <Typography variant="subtitle2" sx={{ opacity: 0.72 }} style={{width:"60%", textAlign: "center", justifyContent:"space-evenly"}}>
            <Typography variant="subtitle2" >Top pending trades</Typography>

            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} style={{justifyContent:"space-evenly"}}>
              <Typography variant="subtitle2" >
                Yes
                <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                  {
                    yesPending.length>0?(
                      <>
                      <Stack>
                        <Typography variant="subtitle2" >Price</Typography>
                        {yesPending.map(row=>(
                          <Typography variant="subtitle2" >₹{row.price}</Typography>
                        ))}
                      </Stack>
                      <Stack>
                        <Typography variant="subtitle2" >Qty</Typography>
                        {yesPending.map(row=>(
                          <Typography variant="subtitle2" >{row.size}</Typography>
                        ))}
                      </Stack>
                      </>
                    ):(<Typography variant="subtitle2" >No Data...</Typography>)
                  }
                  
                </Stack>
              </Typography>
              <Typography variant="subtitle2" >
                No
                <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                  {
                    noPending.length>0?(
                      <>
                        <Stack>
                          <Typography variant="subtitle2" >Price</Typography>
                          {noPending.map(row=>(
                            <Typography variant="subtitle2" >₹{row.price}</Typography>
                          ))}
                        </Stack>
                        <Stack>
                          <Typography variant="subtitle2" >Qty</Typography>
                          {noPending.map(row=>(
                            <Typography variant="subtitle2" >{row.size}</Typography>
                          ))}
                        </Stack>
                      </>
                    ):( <Typography variant="subtitle2" >No Data...</Typography>)
                  }
                    
              </Stack>
              </Typography>
            </Stack>
          </Typography>

        </Stack>
    </RootStyle>
  );
}
