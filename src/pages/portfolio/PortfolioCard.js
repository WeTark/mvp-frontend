import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Stack, Divider } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// utils
import { fDate } from '../../utils/formatTime';

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

PortfolioCard.propTypes = {
  event: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default function PortfolioCard({ event, index }) {
  const latestPostLarge = false;
  const latestPost = false;
  const navigate = useNavigate();

  
  const calculateMatchedAmount = (data) => {
    if(!data){
      return 0;
    }
    return data.totalAmount?data.totalAmount:0
  }

  const calculatePendingAmount = (data) => {
    if(!data){
      return 0;
    }
    return data.totalPendingAmount?data.totalPendingAmount:0
  }


  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
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


          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography color="rgb(0, 171, 85)">
              <Typography variant="h4">₹{calculateMatchedAmount(event.amount.YES)}</Typography>
              <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                Yes
              </Typography>
            </Typography>
            <Typography style={{textAlign:'right'}} color="rgb(24, 144, 255)">
              <Typography variant="h4" >₹{calculateMatchedAmount(event.amount.NO)}</Typography>
              <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                No
              </Typography>
            </Typography>
        </Stack>
        <Divider orientation="horizontal" flexItem style={{margin:"10px 0 10px 0"}}/>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography color="rgb(0, 171, 85)">
              <Typography variant="h4">₹{calculatePendingAmount(event.amount.YES)}</Typography>
              <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                Yes in process
              </Typography>
            </Typography>
            <Typography style={{textAlign:'right'}} color="rgb(24, 144, 255)">
              <Typography variant="h4" >₹{calculatePendingAmount(event.amount.NO)}</Typography>
              <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                No in process
              </Typography>
            </Typography>
        </Stack>
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
              <Typography variant="caption">{fDate(event.expireAt)}1</Typography>
            </Box>

          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
