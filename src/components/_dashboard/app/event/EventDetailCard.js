import * as React from 'react';
import { useMediaQuery } from 'react-responsive';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import AppWeeklySales from '../AppWeeklySales';
import TradeForm from './TradeForm';

const useStyles = makeStyles({
    media: {
      height: 210,
    },
  });

export default function EventDetailCard(props) {
    const {event, refreshData} = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [tradeType, setTradeType] = React.useState();
    const handleOpen = (tradeType) => {
      setTradeType(tradeType);
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Card>
          <CardMedia
            className={classes.media}
            image="/static/ind.webp" 
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {event?.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {event?.description}
            </Typography>
          </CardContent>
        <CardActions style={{padding:"20px"}}>
          <Button size="mid" color="primary" variant="contained" onClick={()=>handleOpen("YES")}>
            Yes
          </Button>
          <Button size="mid" style={{backgroundColor:"rgb(24, 144, 255)"}} variant="contained" onClick={()=>handleOpen("NO")}>
            No
          </Button>
          <div  style={{position:"absolute", right:"20px"}}>
            <Button size="mid" onClick={()=>{}} color="info">
              Create personal event
            </Button>
          </div>
        </CardActions>
        <Trade open={open} handleClose={handleClose} tradeType={tradeType} event={event} refreshData={refreshData}/>
      </Card>
    );
  }



  
function Trade(props) {
  const isMobile = useMediaQuery({ query: `(max-width: 900px)` });

  const useStylesTrade = makeStyles((theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: isMobile?'90%':'60%',
      // backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      // boxShadow: theme.shadows[5],
      top:'50%',
      left:'50%',
      transform: 'translate(-50%, -50%)',
      // padding: theme.spacing(2, 4, 3),
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