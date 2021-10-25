import * as React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ShareIcon from "@mui/icons-material/Share";
import DoneIcon from "@mui/icons-material/Done";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import ReactHtmlParser from "react-html-parser";
import { useSnackbar } from "notistack5";

import TradeForm from "./TradeForm";
import { API } from "../../action/api/api";
import BackdropElement from "../common/BackdropElement";

const useStyles = makeStyles({
  media: {
    height: 210,
  },
});

export default function EventDetailCard(props) {
  const [copy, setcopy] = React.useState(true);
  const { event, refreshData, setIsLoading } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tradeType, setTradeType] = React.useState();
  const [eventVariable, setEventVariable] = React.useState({
    eventVariableMap: {},
    title: "",
  });
  const [editMode, setEditMode] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleOpen = (tradeType) => {
    setTradeType(tradeType);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const createPersonalEvent = () => {
    setIsLoading(true);
    API.fetchEventVariable(event.id)
      .then((response) => {
        createTitle(response.data);
        setIsLoading(false);
        setEditMode(true);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const showToast = (message, variant1) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant: variant1 });
  };

  const create = () => {
    showToast("Creating personal event...!", "info");
    Object.keys(eventVariable.eventVariableMap).forEach((key) => {
      eventVariable.eventVariableMap[key].value = document.getElementById(
        `variable-${key}`
      ).value;
    });
    API.newPersonalEvent({
      eventId: event.id,
      eventVariableMap: eventVariable.eventVariableMap,
    }).then((response) => {
      showToast("Created...!", "success");
      navigate(`/trade/personal-event`);
      // console.log(response);
    });
  };

  const createTitle = (data) => {
    Object.keys(data?.eventVariableMap).forEach((key) => {
      data.title = data?.title.replace(
        `$${key}$`,
        `<select id="variable-${key}">${data.eventVariableMap[key].options
          .map(
            (value) =>
              `<option value="${value}" ${
                value === data.eventVariableMap[key].value ? "selected" : ""
              }>${value}</option>`
          )
          .join(",")}</select>`
      );
    });
    setEventVariable(data);
  };
  return (
    <Card>
      <CardMedia className={classes.media} image={event?.picture} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {ReactHtmlParser(editMode ? eventVariable?.title : event?.title)}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {event?.description}
        </Typography>
      </CardContent>
      <CardActions style={{ padding: "20px" }}>
        {!editMode ? (
          <>
            <Button
              size="mid"
              color="primary"
              variant="contained"
              onClick={() => handleOpen("YES")}
            >
              Yes
            </Button>
            <Button
              size="mid"
              style={{ backgroundColor: "rgb(24, 144, 255)" }}
              variant="contained"
              onClick={() => handleOpen("NO")}
            >
              No
            </Button>
            <div
              style={{ display: "flex", float: "right", marginLeft: "auto" }}
            >
              {/* <div style={{ position: "absolute", right: "20px" }}> */}
              <div>
                <Button size="mid" onClick={createPersonalEvent} color="info">
                  Create personal event
                </Button>
              </div>
              {/* <div
                style={{ cursor: "pointer" }}
              >
                {copy ? (
                  <ShareIcon
                    onClick={() => {
                      navigator.clipboard.writeText(document.URL);
                      setcopy(false);
                    }}
                  />
                ) : (
                  <>
                    <DoneIcon style={{ color: "green" }} />
                    <h4 style={{ color: "green" }}>Copied</h4>
                  </>
                )}
              </div> */}
            </div>
          </>
        ) : (
          <div style={{ position: "absolute", right: "20px" }}>
            <Button size="mid" onClick={create} color="info">
              Create
            </Button>
            <Button
              size="mid"
              onClick={() => {
                setEditMode(false);
              }}
              color="info"
            >
              Cancel
            </Button>
          </div>
        )}
      </CardActions>
      <Trade
        open={open}
        handleClose={handleClose}
        tradeType={tradeType}
        event={event}
        refreshData={refreshData}
      />
    </Card>
  );
}

function Trade(props) {
  const isMobile = useMediaQuery({ query: `(max-width: 900px)` });
  const useStylesTrade = makeStyles((theme) =>
    createStyles({
      paper: {
        position: "absolute",
        width: isMobile ? "90%" : "60%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
    })
  );

  const classes = useStylesTrade();
  const { open, handleClose, tradeType, event, refreshData } = props;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <TradeForm
          tradeType={tradeType}
          event={event}
          handleClose={handleClose}
          refreshData={refreshData}
        />
      </div>
    </Modal>
  );
}
