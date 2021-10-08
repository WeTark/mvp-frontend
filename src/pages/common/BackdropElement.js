
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


export default function BackdropElement(props){
    const {isLoading} = props
    return(
        <Backdrop open={isLoading} style={{zIndex: '10000'}}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
