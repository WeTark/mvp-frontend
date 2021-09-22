import * as React from 'react';

import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';
// material
import { alpha, styled } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// utils
import { fDate } from '../../utils/formatTime';
import TradeForm from '../eventDetail/TradeForm';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const TradeButtonStyle = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

TradeCard.propTypes = {
  event: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default function TradeCard({ event, index }) {
  const [open, setOpen] = React.useState(false);
  const [tradeType, setTradeType] = React.useState();
  const latestPostLarge = false;
  const latestPost = false;
  
  const navigate = useNavigate();

  const handleOpen = (tradeType) => {
    setTradeType(tradeType);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const refreshData = () => {}

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Trade open={open} handleClose={handleClose} tradeType={tradeType} event={event} refreshData={refreshData}/>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)'
              }
            })
          }}
        >
          {/* <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              ...((latestPostLarge || latestPost) && { display: 'none' })
            }}
          /> */}
          {/* <AvatarStyle
            // src="/static/ind.svg"
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40
              })
            }}
          /> */}

          <CoverImgStyle src={event.picture} onClick={()=>{ navigate(`/trade/event/${event.id}`, { replace: true })}} style={{cursor:'pointer'}}/>
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute'
            })
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {fDate(event.createdAt)}
          </Typography>

          <TitleStyle
            to={`/trade/event/${event.id}`}
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white'
              })
            }}
          >
            {event.title}
          </TitleStyle>

          <Stack direction="row" alignItems="center" justifyContent="space-evenly">
            <Typography style={{textAlign:'center'}}  color="rgb(0, 171, 85)">
              <Typography variant="h4">₹{event.yesPrice}</Typography>
              <LoadingButton variant="contained" onClick={()=>handleOpen("YES")}>Yes</LoadingButton>
            </Typography>
            <Typography style={{textAlign:'center'}} color="rgb(24, 144, 255)">
              <Typography variant="h4" >₹{event.noPrice}</Typography>
              <LoadingButton style={{marginLeft:'10px', backgroundColor:"rgb(24, 144, 255)"}} variant="contained" onClick={()=>handleOpen("NO")}>No</LoadingButton>
            </Typography>
          </Stack>

          {/* <InfoStyle>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500'
                  })
                }}
              >
                <Typography variant="caption">Yes:&nbsp;</Typography>
                <Typography variant="caption">₹{event.yesPrice}</Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500'
                  })
                }}
              >
                <Typography variant="caption">No:&nbsp;</Typography>
                <Typography variant="caption">₹{event.noPrice}</Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500'
                  })
                }}
              >
                <Typography variant="caption">Trades:&nbsp;</Typography>
                <Typography variant="caption">10k</Typography>
              </Box>
          </InfoStyle> */}
          <br/>
          <InfoStyle style={{marginTop: '3px'}}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: index === 0 ? 0 : 1.5,
                ...((latestPostLarge || latestPost) && {
                  color: 'grey.500'
                })
              }}
            >
              {/* <Box component={Icon} icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} /> */}
              <Typography variant="caption">Last Date:&nbsp;</Typography>
              <Typography variant="caption">{fDate(event.expireAt)}</Typography>
            </Box>

          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}



  
function Trade(props) {
  const isMobile = useMediaQuery({ query: `(max-width: 900px)` });
  const useStylesTrade = makeStyles((theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: isMobile?'90%':'60%',
      top:'50%',
      left:'50%',
      transform: 'translate(-50%, -50%)',
    },
  }),
);

  const classes = useStylesTrade();
  const {open, handleClose, tradeType, event, refreshData} = props;
  return(
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
      <TradeForm tradeType={tradeType} event={event} handleClose={handleClose} refreshData={refreshData}/>
      </div>
    </Modal>
  )
}