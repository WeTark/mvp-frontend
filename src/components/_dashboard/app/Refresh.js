import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIcon from '@material-ui/icons/Refresh';

export function Refresh (props){
    const {isRefreshing, refresh} = props;
    return(
        <div style={{ textAlign: 'end', padding:"10px", }}>
          {isRefreshing?<CircularProgress style={{width:"1.5em", height:"1.5em"}}/>:<RefreshIcon style={{cursor:"pointer"}} onClick={refresh}/>}
        </div>
    )
}