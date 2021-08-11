import { useEffect, useState, useRef } from "react";
import ReactPlayer from 'react-player'

import { useRouter } from "next/router";

import { Input, Button } from '@material-ui/core';

import ScreenShot from '../../public/components/ScreenShot'

import axios from 'axios';

const VideoDetail = () => {

    const router = useRouter()
    const videoId = router.query['v']

    const [docLoaded, setDocLoaded] = useState(false);

    const [url, setUrl] = useState('')
    const canvasRef = useRef();
    const playerRef = useRef();
    const [vidLocation, setVidLocation] = useState('')

    const updateVideoUrl = (event) => {
        event.preventDefault()
        setUrl(event.target.value)
    }
    
    useEffect(() => {
        setDocLoaded(true)
    }, [])
    
    const canIRun = docLoaded? navigator.mediaDevices.getDisplayMedia :null
    
    const downloadVideoViaURL = async() => {
      //save the video and get back the directory
      const data = { "url" : url}
      const resp = await axios.post('http://localhost:20000/-/videos/', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setVidLocation(resp.data.location)
    }

    const takeScreenShot = async () => {
      //pass the video directory to the http get url to get the frame 
      const player = playerRef.current;

      var urlID = url.split("?").pop();
      const time = player.getCurrentTime()
      const data = { 
        "time" : time,
        "name": urlID,
        "location" : vidLocation,
      }
      
      const resp = await axios.post('http://localhost:20000/-/screenshot/', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      //display on canvas
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const image = new Image();
      image.onload = () => {
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 50, 50);
      };
      image.src = `http://localhost:20000/-/media/${urlID}_at_${time}.png`;

    }
    

    return (<div style={{marginLeft: '20px'}}>
                <div><h1> Actual video {videoId}</h1></div>
                <div id ="player" >
                    <ReactPlayer controls width='800px' height ='480px' url={url} ref={playerRef}/>
                </div>
                <div style={{ marginTop: '50px'}}>
                <text style={{marginRight: '10px'}}>Enter URL link:</text>
                <Input style={{width: "45%"}} onChange={updateVideoUrl}></Input>
                
                </div>
                <div>
                <Button variant="contained" style={{margin: '35px'}} onClick={downloadVideoViaURL}>Load URL</Button>
                <Button variant="contained" style={{margin: '35px'}} onClick={() => canIRun? takeScreenShot(): {}}>Click me to get Frame!</Button>
                </div>
                <ScreenShot canvasRef={canvasRef}/>
            </div>);
    
};
export default VideoDetail;
