import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactPlayer from 'react-player'
import html2canvas from 'html2canvas';

import { Input, Typography, Button } from 'antd';


const VideoDetail = () => {
    const { Text } = Typography;

    const router = useRouter()
    const videoId = router.query['v']

    const [url, setUrl] = useState('')
    const [player, setPlayer] = useState(null)

    const updateVideoUrl = (event) => {
        event.preventDefault()
        setUrl(event.target.value)
    }

      
    const canIRun  = navigator.mediaDevices.getDisplayMedia 

    const takeScreenShot = async () => {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'screen' },
      })
      // get correct video track
      const track = stream.getVideoTracks()[0]
      // init Image Capture and not Video stream
      const imageCapture = new ImageCapture(track)
      // take first frame only
      const bitmap = await imageCapture.grabFrame()
      // destory video track to prevent more recording / mem leak
      track.stop()

      const canvas = document.getElementById('screenshot') 
      // this could be a document.createElement('canvas') if you want
      // draw weird image type to canvas so we can get a useful image
      canvas.width = bitmap.width
      canvas.height = bitmap.height
      const context = canvas.getContext('2d')
      context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
      const image = canvas.toDataURL()

      // this turns the base 64 string to a [File] object
      const res = await fetch(image)
      const buff = await res.arrayBuffer()
      // clone so we can rename, and put into array for easy proccessing
      const file = [
        new File([buff], `photo_${new Date()}.jpg`, {
          type: 'image/jpeg',
        }),
      ]
      return file 
}     


    return (<div style={{marginLeft: '20px'}}>
                <div><h1> Actual video {videoId}</h1></div>
                <div id ="player" >
                    <ReactPlayer ref = {(player) => setPlayer(player)} controls width='800px' height ='480px' url={url} />
                </div>
                <div style={{ marginTop: '50px'}}>
                <Text style={{marginRight: '10px'}}>Enter URL link:</Text>
                <Input style={{width: "45%"}} onChange={updateVideoUrl}></Input>
                </div>
                <div>
                <Button style={{margin: '35px'}} onClick={() => canIRun? takeScreenShot(): {}}>Click me to get Frame!</Button>
                </div>
                <canvas id ="screenshot" width='800' height ='480'/>
            </div>);
    
};
export default VideoDetail;
