import { useEffect, useState, useRef } from "react";
import ReactPlayer from 'react-player'

import { useRouter } from "next/router";

import { Input, Button } from '@material-ui/core';

import ScreenShot from '../../public/components/ScreenShot'


const VideoDetail = () => {

    const router = useRouter()
    const videoId = router.query['v']

    const [docLoaded, setDocLoaded] = useState(false);

    const [url, setUrl] = useState('')
    const canvasRef = useRef();

    const updateVideoUrl = (event) => {
        event.preventDefault()
        setUrl(event.target.value)
    }
    
    useEffect(() => {
        setDocLoaded(true)
    }, [])
    
    const canIRun = docLoaded? navigator.mediaDevices.getDisplayMedia :null

    const takeScreenShot = async () => {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'screen' }
        ,
      })
      // get correct video track
      const track = stream.getVideoTracks()[0]
      // init Image Capture and not Video stream
      const imageCapture = new ImageCapture(track)
      // take first frame only
      const bitmap = await imageCapture.grabFrame()
      // destory video track to prevent more recording / mem leak
      track.stop()

      const canvas = canvasRef.current
      // this could be a document.createElement('canvas') if you want
      // draw weird image type to canvas so we can get a useful image
      canvas.width = bitmap.width
      canvas.height = bitmap.height
      const context = canvas.getContext('2d')
      context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
      
    }
    
    


    return (<div style={{marginLeft: '20px'}}>
                <div><h1> Actual video {videoId}</h1></div>
                <div id ="player" >
                    <ReactPlayer controls width='800px' height ='480px' url={url} />
                </div>
                <div style={{ marginTop: '50px'}}>
                <text style={{marginRight: '10px'}}>Enter URL link:</text>
                <Input style={{width: "45%"}} onChange={updateVideoUrl}></Input>
                </div>
                <div>
                <Button variant="contained" style={{margin: '35px'}} onClick={() => canIRun? takeScreenShot(): {}}>Click me to get Frame!</Button>
                </div>
                <ScreenShot canvasRef={canvasRef}/>
            </div>);
    
};
export default VideoDetail;
