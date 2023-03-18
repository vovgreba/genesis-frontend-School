import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt';
import {SnackbarContent, Snackbar} from '@mui/material';

const VideoPlayer = ({ videoSrc, id }) => {
  
  const videoRef = useRef(null);
  const [playbackRate, setPlaybackRate ] = useState(1);
  const [modal, setModal] = useState(false)
  const [videoTime, setVideoTime] = useState(0)


  const handleTimeUpdate = (event)=> {
    setVideoTime(event.target.currentTime);
    localStorage.setItem(`videoTime_${id}`, event.target.currentTime)
  }
  
  // picture in picture
  const handlePictureInPicture = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
  
    } else {
      videoRef.current.requestPictureInPicture();
    }
  };

  // change speed video
  const handleKeyDown = (event)=> {
    console.log(event.key)
    if(event.key === '+') {
      const changeRate = Math.min(playbackRate + 0.25, 2);
      setPlaybackRate(changeRate)
      videoRef.current.playbackRate = changeRate
      setModal(true)
    }
    if(event.key === '-') {
      const changeRate = Math.max(playbackRate - 0.25, 0.25);
      setPlaybackRate(changeRate);
      videoRef.current.playbackRate = changeRate
      setModal(true)
    }
    
  }



  useEffect(() => {
    
    const video = videoRef.current;
    const hls = new Hls();
    const savedTime = localStorage.getItem(`videoTime_${id}`)
    if(savedTime) {
      video.currentTime = parseFloat(savedTime)
    }
    if(video && videoRef && videoSrc) {
      if (Hls.isSupported() && video) {
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.pause();
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
        video.addEventListener('loadedmetadata', () => {
          video.pause();
        });
      }
    }



  }, [videoSrc, id]);



  return (
    
    videoSrc 
    ? <div className='video'>
      
        <video 
          className='videoPlay' 
          tabIndex={0} 
          ref={videoRef} 
          playbackrate={playbackRate } 
          onKeyDown={handleKeyDown} 
          onTimeUpdate={handleTimeUpdate}
          controls/>
        <p>To change the video playback speed, start playing it and use '+' or '-'.</p>
        <p>To display the video picture in picture, click on this window
          <PictureInPictureAltIcon  onClick={handlePictureInPicture} className='PictureInPicture'/>
        </p>
        <Snackbar
          open={modal}
          autoHideDuration={3000} // час, після якого повідомлення автоматично приховається
          onClose={() => setModal(false)} // обробник закриття повідомлення
        >
          <SnackbarContent message={`Video speed changed to ${playbackRate}X`} />
        </Snackbar>
      </div>
    : <div>Not a video link</div>
  )
};

export default VideoPlayer;
