import React from "react";
import { Card, CardHeader, Box } from '@material-ui/core';
import IframeComm from 'react-iframe-comm';
import { PropTypes } from 'prop-types';

export default function RCIframe(props){
    
    const IFrameRef = React.useRef(null);

    const sendMessage = () => {
        console.log("send parents msg", IFrameRef);
        // if (!IFrameRef.currnet) return; 
        console.log(localStorage.getItem('rc-token'));
        IFrameRef.current.contentWindow.postMessage(
            {
                externalCommand: 'login-with-token',
                token: props.rocketChatToken
            }, '*'
        );
      };

      React.useEffect(() => {
        if(props.rocketChatToken !== undefined)
        window.onload = function () {
            sendMessage();
        };

        
        // window.addEventListener("message", (e)=>{
        //     console.log(e)
        // });
        // IFrameRef.current.contentWindow.postMessage(
        //     {
        //         externalCommand: 'login-with-token',
        //         token: props.rocketChatToken
        //     }, '*'
        // );
      }, [props.rocketChatToken]);
      
    // React.useEffect(()=>{
    //     if(props.rocketChatToken!==undefined){
    //         const message = {
    //             externalCommand: 'login-with-token',
    //             token: props.rocketChatToken
    //         }
    //         console.log(message)
    //         const iframe = document.getElementById('rcChannel')
    //         iframe.contentWindow.postMessage(message, '*');
    //     }
    // },[props.rocketChatToken])

    const iframeLoad = () => {
        console.log('load')
      }
    
      const iframeError = () => {
        console.log('error')
      }

    return(
        <>

          <Card>
            <CardHeader title="Live chat"/>
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
              <iframe
              ref={IFrameRef}
              style={{ width: "100%", height: "500px" }}
              src="https://chat.wetark.in/channel/TestEvent?layout=embedded"
              id="calculation"
              title="model"
              />
            </Box>
          </Card>
        </>
        // <iframe id="rcChannel" style={{width: "100%", height: "80vh"}} onLoad={iframeLoad} src="https://chat.wetark.in/channel/TestEvent?layout=embedded" title="myframe" />
    )
}